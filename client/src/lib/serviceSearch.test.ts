// Run: npm test. What Google shows for each service page: unique, names the city, fits.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { allServiceSlugs } from '../data/services.ts';
import { MAX_DESCRIPTION, clampDescription, serviceSearchDescription, serviceSearchTitle } from './serviceSearch.ts';

const LANGS = ['FR', 'EN'] as const;
const BRAND = ' | MobiSoins';

test('every service title is unique within its language (no two pages compete)', () => {
  for (const lang of LANGS) {
    const seen = new Map<string, string>();
    for (const slug of allServiceSlugs()) {
      const title = serviceSearchTitle(slug, lang);
      assert.ok(!seen.has(title), `${lang} "${title}" is used by both ${seen.get(title)} and ${slug}`);
      seen.set(title, slug);
    }
  }
});

test('the formerly duplicated pairs now have distinct titles', () => {
  for (const lang of LANGS) {
    assert.notEqual(serviceSearchTitle('prise-sang', lang), serviceSearchTitle('prise-sang-labo', lang));
    assert.notEqual(serviceSearchTitle('suivi-tension', lang), serviceSearchTitle('suivi-tension-aines', lang));
  }
});

test('every service title names Montréal / Montreal', () => {
  for (const slug of allServiceSlugs()) {
    assert.match(serviceSearchTitle(slug, 'FR'), /à Montréal$/, slug);
    assert.match(serviceSearchTitle(slug, 'EN'), /in Montreal$/, slug);
  }
});

test('titles fit a search result (≤ 70 characters with the brand)', () => {
  for (const lang of LANGS) {
    for (const slug of allServiceSlugs()) {
      const full = serviceSearchTitle(slug, lang) + BRAND;
      assert.ok(full.length <= 70, `${lang} ${slug}: "${full}" is ${full.length} chars`);
    }
  }
});

test('no ambiguous stand-alone titles ("Grippe à domicile")', () => {
  assert.equal(serviceSearchTitle('grippe', 'FR'), 'Vaccin contre la grippe à domicile à Montréal');
  assert.equal(serviceSearchTitle('grippe', 'EN'), 'Flu shot at home in Montreal');
});

test('corporate services say "en entreprise", not "à domicile"', () => {
  assert.equal(serviceSearchTitle('vaccination-collective', 'FR'), 'Vaccination collective en entreprise à Montréal');
  assert.equal(serviceSearchTitle('vaccination-collective', 'EN'), 'Group vaccination at work in Montreal');
  assert.match(serviceSearchDescription('medecine-travail', 'FR'), /^En entreprise à Montréal, Laval et Longueuil/);
});

test('descriptions name the three cities first and fit in a search result', () => {
  for (const slug of allServiceSlugs()) {
    const fr = serviceSearchDescription(slug, 'FR');
    const en = serviceSearchDescription(slug, 'EN');
    assert.match(fr, /^(À domicile|En entreprise) à Montréal, Laval et Longueuil par une infirmière de l’OIIQ\. /, slug);
    assert.match(en, /^At (home|your workplace) in Montreal, Laval and Longueuil, by an OIIQ-licensed nurse\. /, slug);
    for (const d of [fr, en]) assert.ok(d.length <= MAX_DESCRIPTION, `${slug}: ${d.length} chars`);
  }
});

test('clampDescription cuts at a word boundary and leaves short text alone', () => {
  assert.equal(clampDescription('court'), 'court');
  const long = 'mot '.repeat(60).trim();
  const out = clampDescription(long);
  assert.ok(out.length <= MAX_DESCRIPTION);
  assert.ok(out.endsWith('mot…'), out.slice(-10));
  assert.equal(clampDescription('aaaa, bbbb cccc', 10), 'aaaa…', 'no dangling comma before the ellipsis');
});

test('unknown slug throws instead of rendering an empty title', () => {
  assert.throws(() => serviceSearchTitle('nope', 'FR'), /unknown service/);
});
