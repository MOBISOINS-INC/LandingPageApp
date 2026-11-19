// Run: npm test. The launch banner shows on every load, then leaves by itself after a minute.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LAUNCH_BANNER_MS, launchBannerMsLeft } from './launchBanner.ts';

test('visible for about a minute', () => {
  assert.equal(LAUNCH_BANNER_MS, 60_000);
});

test('fresh load → full minute left', () => {
  assert.equal(launchBannerMsLeft(1_000, 1_000), 60_000);
});

test('part way through → the rest of the minute (page changes keep the same clock)', () => {
  assert.equal(launchBannerMsLeft(0, 45_000), 15_000);
});

test('exactly at, and past, the minute → 0 (hidden, never negative)', () => {
  assert.equal(launchBannerMsLeft(0, 60_000), 0);
  assert.equal(launchBannerMsLeft(0, 10 * 60_000), 0);
});

test('clock oddities: now before load (clock moved back) is capped at a minute; bad numbers hide it', () => {
  assert.equal(launchBannerMsLeft(10_000, 0), 60_000);
  assert.equal(launchBannerMsLeft(NaN, 5), 0);
  assert.equal(launchBannerMsLeft(0, Infinity), 0);
});
