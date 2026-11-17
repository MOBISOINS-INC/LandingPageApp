// Run: npm test. Locale routing: French at the root, English under /en.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { englishRedirectFor, localeFromPath, localizePath, parseAcceptLanguage, stripLocale } from './i18n.ts';

test('localeFromPath', () => {
  assert.equal(localeFromPath('/'), 'FR');
  assert.equal(localeFromPath('/services/prise-sang'), 'FR');
  assert.equal(localeFromPath('/en'), 'EN');
  assert.equal(localeFromPath('/en/faq'), 'EN');
  assert.equal(localeFromPath('/english-page'), 'FR', 'a path merely starting with "en" is French');
  assert.equal(localeFromPath('/entreprises'), 'FR');
  assert.equal(localeFromPath(null), 'FR');
});

test('stripLocale', () => {
  assert.equal(stripLocale('/en'), '/');
  assert.equal(stripLocale('/en/articles/telesante'), '/articles/telesante');
  assert.equal(stripLocale('/faq'), '/faq');
  assert.equal(stripLocale('/en#visit'), '/#visit');
});

test('localizePath to English', () => {
  assert.equal(localizePath('/', 'EN'), '/en');
  assert.equal(localizePath('/services/prise-sang', 'EN'), '/en/services/prise-sang');
  assert.equal(localizePath('/#visit', 'EN'), '/en#visit');
  assert.equal(localizePath('/en/faq', 'EN'), '/en/faq', 'already English stays as is');
});

test('localizePath to French', () => {
  assert.equal(localizePath('/en/faq', 'FR'), '/faq');
  assert.equal(localizePath('/en', 'FR'), '/');
  assert.equal(localizePath('/contact', 'FR'), '/contact');
});

test('localizePath leaves non-page links alone', () => {
  for (const href of ['https://docs.google.com/x', 'mailto:a@b.ca', '#faq', '/favicon.png', '/Healthcare_Access_On_Demand.pdf', '/_next/static/x.js', '/api/waitlist', '//cdn.example.com/a']) {
    assert.equal(localizePath(href, 'EN'), href, href);
  }
});

// English-first default: first visit on a French URL goes to its English twin.
test('first visit to / redirects to /en', () => {
  assert.equal(englishRedirectFor('/', '', null, 'Mozilla/5.0 (iPhone)', ['en-US']), '/en');
});
test('first visit keeps the page and the hash', () => {
  assert.equal(englishRedirectFor('/services/pansements', '', null, 'Mozilla/5.0', ['en-US']), '/en/services/pansements');
  assert.equal(englishRedirectFor('/', '#how-it-works', null, 'Mozilla/5.0', ['en-US']), '/en#how-it-works');
});
test('someone who chose French is never redirected', () => {
  assert.equal(englishRedirectFor('/', '', 'FR', 'Mozilla/5.0', ['en-US']), null);
});
test('someone who chose English on a French link is left alone', () => {
  assert.equal(englishRedirectFor('/faq', '', 'EN', 'Mozilla/5.0', ['fr-CA']), null);
});
test('already on English: no redirect', () => {
  assert.equal(englishRedirectFor('/en/faq', '', null, 'Mozilla/5.0', ['en-US']), null);
});
test('crawlers are never redirected (French pages stay indexable)', () => {
  assert.equal(englishRedirectFor('/', '', null, 'Mozilla/5.0 (compatible; Googlebot/2.1)', ['en-US']), null);
  assert.equal(englishRedirectFor('/', '', null, 'facebookexternalhit/1.1', ['en-US']), null);
});

// Browser language gate: French-speaking browsers stay on the French URL; the
// English redirect only applies when no browser language is French.
const UA = 'Mozilla/5.0 (iPhone)';
test('French browser (fr-CA) stays on the French URL', () => {
  assert.equal(englishRedirectFor('/', '', null, UA, ['fr-CA']), null);
  assert.equal(englishRedirectFor('/services/pansements', '#x', null, UA, ['fr']), null);
});
test('French match is case-insensitive', () => {
  assert.equal(englishRedirectFor('/', '', null, UA, ['FR-fr']), null);
  assert.equal(englishRedirectFor('/', '', null, UA, ['Fr']), null);
});
test('English browser is redirected to /en', () => {
  assert.equal(englishRedirectFor('/', '', null, UA, ['en-US', 'en']), '/en');
  assert.equal(englishRedirectFor('/faq', '', null, UA, ['es-ES']), '/en/faq');
});
test('mixed list with French anywhere stays', () => {
  assert.equal(englishRedirectFor('/', '', null, UA, ['en-US', 'fr-CA']), null);
});
test('no language list (no Accept-Language header) never redirects', () => {
  // Crawlers, curl and link previews send no Accept-Language: they must get the French URL.
  assert.equal(englishRedirectFor('/', '', null, UA, []), null);
  assert.equal(englishRedirectFor('/services/pansements', '', null, UA, parseAcceptLanguage(null)), null);
});
test('a language merely starting with "f" or containing "fr" is not French', () => {
  assert.equal(englishRedirectFor('/', '', null, UA, ['fi-FI']), '/en');
  assert.equal(englishRedirectFor('/', '', null, UA, ['en-FR']), '/en', 'region FR is not language fr');
});
test('saved preference still wins over browser language', () => {
  assert.equal(englishRedirectFor('/', '', 'FR', UA, ['en-US']), null);
  assert.equal(englishRedirectFor('/faq', '', 'EN', UA, ['fr-CA']), null);
});
test('bots are still never redirected, whatever the language', () => {
  assert.equal(englishRedirectFor('/', '', null, 'Mozilla/5.0 (compatible; Googlebot/2.1)', ['en-US']), null);
});
test('already on English never redirects, even for an English browser', () => {
  assert.equal(englishRedirectFor('/en/faq', '', null, UA, ['en-US']), null);
});

// --- Server-side redirect input: the Accept-Language header -----------------
test('parseAcceptLanguage orders by q and keeps ties in header order', () => {
  assert.deepEqual(parseAcceptLanguage('en-US,en;q=0.9,fr;q=0.8'), ['en-US', 'en', 'fr']);
  assert.deepEqual(parseAcceptLanguage('fr;q=0.5, en-CA'), ['en-CA', 'fr']);
  assert.deepEqual(parseAcceptLanguage('fr-CA'), ['fr-CA']);
});
test('parseAcceptLanguage drops q=0, wildcard, blanks and junk', () => {
  assert.deepEqual(parseAcceptLanguage('en, fr;q=0'), ['en'], 'q=0 means "not French"');
  assert.deepEqual(parseAcceptLanguage('*'), []);
  assert.deepEqual(parseAcceptLanguage(''), []);
  assert.deepEqual(parseAcceptLanguage(undefined), []);
  assert.deepEqual(parseAcceptLanguage('en;q=abc, es'), ['es']);
});
test('header -> decision: the cases the proxy sees', () => {
  const go = (h: string | null, ua = UA, saved: string | null = null, path = '/') =>
    englishRedirectFor(path, '', saved, ua, parseAcceptLanguage(h));
  assert.equal(go('en-US,en;q=0.9'), '/en', 'English Chrome');
  assert.equal(go('en-CA,en;q=0.9,fr-CA;q=0.8'), null, 'bilingual Montrealer with French listed stays');
  assert.equal(go('fr-CA,fr;q=0.9,en;q=0.8'), null, 'French browser stays');
  assert.equal(go('en, fr;q=0'), '/en', 'French explicitly refused');
  assert.equal(go(null), null, 'no header (crawler/curl)');
  assert.equal(go('en-US', 'Mozilla/5.0 (compatible; Google-InspectionTool/1.0;)'), null, 'Search Console live test');
  assert.equal(go('en-US', 'Mozilla/5.0 (compatible; bingbot/2.0)'), null);
  assert.equal(go('en-US', UA, 'FR'), null, 'chose French with the switcher');
  assert.equal(go('en-US', UA, null, '/services/prise-sang-labo'), '/en/services/prise-sang-labo');
});
