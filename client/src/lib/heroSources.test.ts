// Run: npm test. Which hero film each device gets: the 4K film only where it
// helps and can be decoded, and the files that shipped before as the fallback.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { HERO, HEVC, HEVC_HI, pickHeroSource, type HeroEnv } from './heroSources.ts';

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'public');
const env = (over: Partial<HeroEnv> = {}): HeroEnv => ({
  mobile: false,
  hiRes: false,
  canHevc: true,
  canHevcHi: true,
  saveData: false,
  ...over,
});

test('big or high-density desktop screens get the 4K film, with the H.264 film as fallback', () => {
  assert.deepEqual(pickHeroSource(env({ hiRes: true })), {
    src: '/video/hero-v3-4k.hevc.mp4',
    fallback: '/video/hero-v2.mp4',
  });
});

test('ordinary desktop screens keep the 1080p film (no 4K download they cannot show)', () => {
  assert.deepEqual(pickHeroSource(env({ hiRes: false })), {
    src: '/video/hero-v2.hevc.mp4',
    fallback: '/video/hero-v2.mp4',
  });
});

test('phones get the sharper phone film, with the H.264 phone film as fallback', () => {
  assert.deepEqual(pickHeroSource(env({ mobile: true })), {
    src: '/video/hero-mobile-v3.hevc.mp4',
    fallback: '/video/hero-mobile-v2.mp4',
  });
  // A phone is never handed the landscape 4K film, whatever its pixel density.
  assert.equal(pickHeroSource(env({ mobile: true, hiRes: true })).src, '/video/hero-mobile-v3.hevc.mp4');
});

test('a device that cannot decode the high-level HEVC gets exactly what it got before', () => {
  assert.deepEqual(pickHeroSource(env({ hiRes: true, canHevcHi: false })), {
    src: '/video/hero-v2.hevc.mp4',
    fallback: '/video/hero-v2.mp4',
  });
  assert.deepEqual(pickHeroSource(env({ mobile: true, canHevcHi: false })), {
    src: '/video/hero-mobile-v2.hevc.mp4',
    fallback: '/video/hero-mobile-v2.mp4',
  });
});

test('no HEVC at all: H.264 only, no fallback to chase', () => {
  assert.deepEqual(pickHeroSource(env({ hiRes: true, canHevc: false, canHevcHi: false })), { src: '/video/hero-v2.mp4' });
  assert.deepEqual(pickHeroSource(env({ mobile: true, canHevc: false, canHevcHi: false })), { src: '/video/hero-mobile-v2.mp4' });
  // canHevcHi without canHevc is not a real device; never trust it into the 4K file.
  assert.deepEqual(pickHeroSource(env({ hiRes: true, canHevc: false, canHevcHi: true })), { src: '/video/hero-v2.mp4' });
});

test('Data Saver keeps the light films even on a 4K-capable screen', () => {
  assert.equal(pickHeroSource(env({ hiRes: true, saveData: true })).src, '/video/hero-v2.hevc.mp4');
  assert.equal(pickHeroSource(env({ mobile: true, saveData: true })).src, '/video/hero-mobile-v2.hevc.mp4');
});

test('the two HEVC type strings differ only by level, so each tier is offered to the right decoders', () => {
  assert.equal(HEVC, 'video/mp4; codecs="hvc1.1.6.L120.90"');
  assert.equal(HEVC_HI, 'video/mp4; codecs="hvc1.1.6.L150.90"');
});

test('every hero file the page can ask for exists, and the new films stay within their weight budget', () => {
  const files = [
    ...Object.values(HERO.desktop),
    ...Object.values(HERO.desktopHi),
    ...Object.values(HERO.mobile),
    ...Object.values(HERO.mobileHi),
  ];
  for (const f of files) assert.ok(existsSync(join(PUBLIC, f)), `missing ${f}`);
  const mb = (f: string) => statSync(join(PUBLIC, f)).size / 1e6;
  // A hero that autoplays must not turn into a 70 MB download.
  assert.ok(mb(HERO.desktopHi.hevc) < 16, `4K film is ${mb(HERO.desktopHi.hevc).toFixed(1)} MB`);
  assert.ok(mb(HERO.mobileHi.hevc) < 9, `phone film is ${mb(HERO.mobileHi.hevc).toFixed(1)} MB`);
  assert.ok(mb(HERO.desktopHi.hevc) > 1 && mb(HERO.mobileHi.hevc) > 1, 'new films look truncated');
});
