// Run: npm test. The homepage hero must sell "en un clic" AND say where we are.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { HERO_COPY } from './heroCopy.ts';

const heading = (l: 'FR' | 'EN') => `${HERO_COPY[l].badge} ${HERO_COPY[l].title} ${HERO_COPY[l].titleHighlight}.`;

test('FR headline is "Une infirmière à domicile en un clic"', () => {
  assert.equal(`${HERO_COPY.FR.title} ${HERO_COPY.FR.titleHighlight}`, 'Une infirmière à domicile en un clic');
});

test('EN headline mirrors it', () => {
  assert.equal(`${HERO_COPY.EN.title} ${HERO_COPY.EN.titleHighlight}`, 'A home care nurse in one click');
});

test('the main heading (eyebrow is inside the h1) names Montréal and Québec', () => {
  assert.match(heading('FR'), /Grand Montréal/);
  assert.match(heading('FR'), /Québec/);
  assert.match(heading('EN'), /Greater Montreal/);
  assert.match(heading('EN'), /Quebec/);
  assert.match(heading('FR'), /infirmière à domicile/i, 'search phrase stays in the h1');
});

test('both subtitles (phone + computer) say Montréal + surroundings + Québec', () => {
  for (const s of [HERO_COPY.FR.subtitle, HERO_COPY.FR.subtitleShort]) {
    assert.match(s, /Montréal/);
    assert.match(s, /Québec/);
  }
  assert.match(HERO_COPY.FR.subtitle, /environs/);
  for (const s of [HERO_COPY.EN.subtitle, HERO_COPY.EN.subtitleShort]) {
    assert.match(s, /Montreal/);
    assert.match(s, /Quebec/);
  }
});

test('the phone line stays short enough to fit under the headline', () => {
  assert.ok(HERO_COPY.FR.subtitleShort.length <= 90, HERO_COPY.FR.subtitleShort);
  assert.ok(HERO_COPY.EN.subtitleShort.length <= 90, HERO_COPY.EN.subtitleShort);
});
