// Run: npm test. Owner's rule (2026-11-19, "very important"): the green launch banner
// NEVER leaves on its own. It stays the whole visit; only the × closes it (until refresh).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LAUNCH_BANNER_ATTR } from './launchBanner.ts';

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..');
const banner = readFileSync(join(SRC, 'components/layout/LaunchBanner.tsx'), 'utf8');
const css = readFileSync(join(SRC, 'app/globals.css'), 'utf8');

test('the banner has no timer: nothing hides it after a minute (or two)', () => {
  assert.doesNotMatch(banner, /setTimeout|setInterval|launchBannerMsLeft|timeOrigin/);
  assert.doesNotMatch(css, /launch-banner[^{]*\{[^}]*animation/, 'no CSS animation that could fade it out');
});

test('the only way it hides is the × button (this page view only)', () => {
  const hides = banner.match(/setAttribute\(LAUNCH_BANNER_ATTR, 'off'\)/g) ?? [];
  assert.equal(hides.length, 1);
  assert.match(banner, /onClick=\{close\}/);
  assert.doesNotMatch(banner, /localStorage|sessionStorage|cookie/, 'nothing remembered: a refresh brings it back');
  assert.equal(LAUNCH_BANNER_ATTR, 'data-launch-banner');
});
