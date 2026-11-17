// Run: npm test. Service-area pages: one per city, each its own page (not a
// copy with the name swapped), correctly linked, translated, and searchable.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CITIES, CITY_FEATURED_SERVICES, getCity } from './cities.ts';
import { getServiceBySlug } from './services.ts';
import { CITY_HUB_DESCRIPTION, CITY_HUB_TITLE, citySearchDescription, citySearchTitle } from '../lib/citySearch.ts';
import { MAX_DESCRIPTION, serviceSearchTitle } from '../lib/serviceSearch.ts';
import { SERVED_CITIES } from '../lib/organizationLd.ts';

const BRAND = ' | MobiSoins';
const words = (s: string) => new Set(s.toLowerCase().match(/[\p{L}’'-]+/gu) ?? []);
const jaccard = (a: string, b: string) => {
  const A = words(a), B = words(b);
  const inter = [...A].filter((w) => B.has(w)).length;
  return inter / new Set([...A, ...B]).size;
};

test('the owner-confirmed cities all have a page', () => {
  const expected = ['montreal', 'ouest-de-l-ile', 'laval', 'longueuil', 'brossard', 'saint-lambert', 'boucherville',
    'terrebonne', 'repentigny', 'blainville', 'vaudreuil-dorion', 'chateauguay'];
  assert.deepEqual(CITIES.map((c) => c.slug).sort(), [...expected].sort());
});

test('slugs are unique and URL-safe', () => {
  const slugs = CITIES.map((c) => c.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const s of slugs) assert.match(s, /^[a-z0-9]+(-[a-z0-9]+)*$/, s);
});

test('nearby links point at real city pages, never at the page itself, no duplicates', () => {
  for (const c of CITIES) {
    assert.ok(c.nearby.length >= 2, `${c.slug}: link at least two neighbours`);
    assert.equal(new Set(c.nearby).size, c.nearby.length, `${c.slug}: duplicate neighbour`);
    for (const n of c.nearby) {
      assert.ok(getCity(n), `${c.slug}: unknown neighbour ${n}`);
      assert.notEqual(n, c.slug);
    }
  }
});

test('every city page is linked from at least one other city page (no orphans)', () => {
  for (const c of CITIES) assert.ok(CITIES.some((o) => o.nearby.includes(c.slug)), `${c.slug} is never linked as a neighbour`);
});

test('featured services exist in the catalog', () => {
  for (const s of CITY_FEATURED_SERVICES) assert.ok(getServiceBySlug(s), s);
});

test('each page has its own wording (not doorway copies)', () => {
  for (const field of ['leadFr', 'leadEn', 'localFr', 'localEn'] as const) {
    for (let i = 0; i < CITIES.length; i++) {
      for (let j = i + 1; j < CITIES.length; j++) {
        const a = CITIES[i], b = CITIES[j];
        const sim = jaccard(a[field].replaceAll(a.nameFr, '').replaceAll(a.nameEn, ''), b[field].replaceAll(b.nameFr, '').replaceAll(b.nameEn, ''));
        assert.ok(sim < 0.7, `${field}: ${a.slug} and ${b.slug} read almost the same (${sim.toFixed(2)})`);
      }
    }
  }
});

test('English copy is really English and French copy really French', () => {
  const FRENCH = /\b(infirmière|à domicile|chez vous|prise de sang|pansement|soins)\b/i;
  const ENGLISH = /\b(nurse|home|blood test|dressing|care)\b/i;
  for (const c of CITIES) {
    for (const t of [c.leadEn, c.localEn, c.inEn]) assert.ok(!FRENCH.test(t), `${c.slug} EN has French: "${t}"`);
    for (const t of [c.leadFr, c.localFr]) assert.ok(!ENGLISH.test(t), `${c.slug} FR has English: "${t}"`);
    assert.match(c.inFr, /^(à|dans) /);
    assert.match(c.inEn, /^in /);
    assert.notEqual(c.leadFr, c.leadEn);
  }
});

test('city titles: unique, name the city, fit a search result; no clash with service titles', () => {
  const services = new Set(['FR', 'EN'].flatMap((l) => ['prise-sang', 'pansements'].map((s) => serviceSearchTitle(s, l as 'FR' | 'EN'))));
  for (const lang of ['FR', 'EN'] as const) {
    const titles = CITIES.map((c) => citySearchTitle(c.slug, lang));
    assert.equal(new Set(titles).size, titles.length, `${lang} duplicate city titles`);
    CITIES.forEach((c, i) => {
      assert.ok(titles[i].includes(lang === 'EN' ? c.inEn : c.inFr), titles[i]);
      assert.ok((titles[i] + BRAND).length <= 70, `${titles[i]} too long`);
      assert.ok(!services.has(titles[i]));
    });
  }
  assert.equal(citySearchTitle('laval', 'FR'), 'Infirmière à domicile à Laval');
  assert.equal(citySearchTitle('ouest-de-l-ile', 'EN'), 'Home Care Nurse in the West Island');
});

test('city and hub descriptions fit a search result', () => {
  for (const c of CITIES) {
    for (const lang of ['FR', 'EN'] as const) {
      const d = citySearchDescription(c.slug, lang);
      assert.ok(d.length <= MAX_DESCRIPTION && d.length >= 110, `${c.slug} ${lang}: ${d.length} chars`);
      assert.ok(d.includes(lang === 'EN' ? c.inEn : c.inFr), d);
    }
  }
  for (const lang of ['FR', 'EN'] as const) {
    assert.ok(CITY_HUB_DESCRIPTION[lang].length <= MAX_DESCRIPTION);
    assert.ok((CITY_HUB_TITLE[lang] + BRAND).length <= 70);
  }
});

test('unknown city throws instead of rendering an empty title', () => {
  assert.throws(() => citySearchTitle('quebec', 'FR'), /unknown city/);
});

test('the business structured data lists every served municipality', () => {
  for (const name of ['Montréal', 'Laval', 'Longueuil', 'Pointe-Claire', 'Dorval', 'Brossard', 'Châteauguay', 'Vaudreuil-Dorion']) {
    assert.ok(SERVED_CITIES.includes(name), name);
  }
  assert.ok(!SERVED_CITIES.includes('Ouest-de-l’Île'), 'the West Island page stands for its municipalities, not a city named so');
  assert.ok(!SERVED_CITIES.includes('Québec'), 'Québec City is a waitlist city, not served');
});
