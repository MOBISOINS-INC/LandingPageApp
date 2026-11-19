// Run: npm test. The store links and the /app smart link must send each phone to its own store.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  APP_STORE_URL,
  NOTIFY_FORM_URL,
  appLinkLanguage,
  ownSiteRefererPath,
  PLAY_STORE_URL,
  detectPlatform,
  smartAppTarget,
  storeUrlFor,
} from './stores.ts';

const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1';
const ANDROID = 'Mozilla/5.0 (Linux; Android 15; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36';
const MAC = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15';
const WINDOWS = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const FB_IN_APP_IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/490.0]';

test('store URLs are the approved listings', () => {
  assert.equal(APP_STORE_URL, 'https://apps.apple.com/ca/app/mobisoins/id6767878428');
  assert.equal(PLAY_STORE_URL, 'https://play.google.com/store/apps/details?id=com.mobisoins.android');
});

test('platform detection: iPhone, Android, in-app browsers, computers, missing UA', () => {
  assert.equal(detectPlatform(IPHONE), 'ios');
  assert.equal(detectPlatform(FB_IN_APP_IPHONE), 'ios');
  assert.equal(detectPlatform(ANDROID), 'android');
  assert.equal(detectPlatform(MAC), 'other');
  assert.equal(detectPlatform(WINDOWS), 'other');
  assert.equal(detectPlatform(''), 'other');
  assert.equal(detectPlatform(null), 'other');
  assert.equal(detectPlatform(undefined), 'other');
});

test('each phone gets its own store; a computer gets no store (it chooses)', () => {
  assert.equal(storeUrlFor('ios'), APP_STORE_URL);
  assert.equal(storeUrlFor('android'), PLAY_STORE_URL);
  assert.equal(storeUrlFor('other'), null);
});

test('/app target: store on phones, home badges in the right language on computers', () => {
  assert.equal(smartAppTarget(IPHONE, 'FR'), APP_STORE_URL);
  assert.equal(smartAppTarget(ANDROID, 'EN'), PLAY_STORE_URL);
  assert.equal(smartAppTarget(MAC, 'FR'), '/#telecharger');
  assert.equal(smartAppTarget(WINDOWS, 'EN'), '/en#telecharger');
  assert.equal(smartAppTarget(null, 'FR'), '/#telecharger');
});

test('/app language: the page clicked from wins over the browser language (FR page stayed FR)', () => {
  // The reported bug: French page, English-language browser → was sent to /en.
  assert.equal(appLinkLanguage({ refererPath: '/', acceptLanguages: ['en-US'] }), 'FR');
  assert.equal(appLinkLanguage({ refererPath: '/infirmiere-a-domicile/laval', acceptLanguages: ['en-US'] }), 'FR');
  assert.equal(appLinkLanguage({ refererPath: '/en', acceptLanguages: ['fr-CA'] }), 'EN');
  assert.equal(appLinkLanguage({ refererPath: '/en/faq', cookie: 'FR' }), 'EN');
  assert.equal(appLinkLanguage({ refererPath: '/entreprise' }), 'FR', '/en prefix only, not any path starting with "en"');
});

test('/app language without a referring page: cookie, then browser, then French', () => {
  assert.equal(appLinkLanguage({ cookie: 'EN', acceptLanguages: ['fr-CA'] }), 'EN');
  assert.equal(appLinkLanguage({ acceptLanguages: ['en-US', 'de'] }), 'EN');
  assert.equal(appLinkLanguage({ acceptLanguages: ['en-US', 'fr'] }), 'FR');
  assert.equal(appLinkLanguage({}), 'FR');
  assert.equal(appLinkLanguage({ cookie: 'xx', acceptLanguages: [] }), 'FR');
});

test('/app referer: mobisoins.com counts as our site even though Netlify serves us on its own host', () => {
  // The prod bug: request host was "<deploy>--mobisoins.netlify.app", so an /en click on www.mobisoins.com looked external.
  const own = ['www.mobisoins.com', '6afe6fc16617241343c74359--mobisoins.netlify.app'];
  assert.equal(ownSiteRefererPath('https://www.mobisoins.com/en/faq', own), '/en/faq');
  assert.equal(ownSiteRefererPath('https://mobisoins.com/', own), '/', 'apex = www');
  assert.equal(ownSiteRefererPath('https://deploy-preview-6--mobisoins.netlify.app/en', [...own, 'deploy-preview-6--mobisoins.netlify.app']), '/en');
  assert.equal(ownSiteRefererPath('https://www.instagram.com/en/', own), null, 'other sites say nothing about language');
  assert.equal(ownSiteRefererPath('not a url', own), null);
  assert.equal(ownSiteRefererPath(null, own), null);
  assert.equal(ownSiteRefererPath('https://evil-mobisoins.com/en', own), null, 'exact host match only');
});

// Regression guard: after launch no page may still promise a future launch or
// point visitors at the waitlist form except through NOTIFY_FORM_URL (out-of-area fallback).
const SRC = join(dirname(fileURLToPath(import.meta.url)), '..');
function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return files(p);
    return /\.(ts|tsx)$/.test(name) && !name.endsWith('.test.ts') ? [p] : [];
  });
}
// Pre-launch phrases (FR + EN). Articles may still say "liste d'attente" about the PUBLIC network, so match our own claims only.
const STALE = [
  /Nous lançons bientôt/, /We launch soon/, /Coming soon/,
  /Rejoindre la liste d.attente/, /Join the waitlist/i, /Join Waitlist/, /Join the waiting list/i, /Liste d’attente ouverte/,
  /Nous ne donnons pas encore de visites/, /not providing visits yet/,
  /prépar\w* (?:ses|nos|les) premières visites/, /preparing (?:its|our|the) first visits/,
  /Lancement (?:dans|à) (?:le )?(?:Grand )?Montréal/, /Launching in/,
];
// Components that are not rendered anywhere (kept for reference) are skipped.
const UNRENDERED = /components[\\/]sections[\\/](WaitlistSection|WaitlistForm)\.tsx$|app[\\/]api[\\/]waitlist/;

test('no rendered page still says the app is coming / join the waitlist', () => {
  const hits: string[] = [];
  for (const f of files(SRC)) {
    if (UNRENDERED.test(f)) continue;
    const text = readFileSync(f, 'utf8');
    for (const re of STALE) if (re.test(text)) hits.push(`${f.slice(SRC.length)}: ${re}`);
  }
  assert.deepEqual(hits, []);
});

test('the Google Form URL lives only in stores.ts (one place to change it)', () => {
  const formId = NOTIFY_FORM_URL.split('/d/')[1].split('/')[0];
  const owners = files(SRC).filter((f) => !UNRENDERED.test(f) && readFileSync(f, 'utf8').includes(formId));
  assert.deepEqual(owners.map((f) => f.slice(SRC.length)), ['/lib/stores.ts']);
});
