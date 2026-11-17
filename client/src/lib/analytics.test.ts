// Run: npm test. Analytics must load nothing until the owner sets the env vars.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PLAUSIBLE_DEFAULT_SRC, analyticsConfig } from './analytics.ts';

test('no domain → no analytics (nothing rendered)', () => {
  assert.equal(analyticsConfig({}), undefined);
  assert.equal(analyticsConfig({ NEXT_PUBLIC_PLAUSIBLE_DOMAIN: '  ' }), undefined);
  assert.equal(analyticsConfig({ NEXT_PUBLIC_PLAUSIBLE_SRC: 'https://plausible.io/js/x.js' }), undefined, 'src alone is not enough');
});

test('domain only → default script that counts outbound clicks (the waitlist form)', () => {
  assert.deepEqual(analyticsConfig({ NEXT_PUBLIC_PLAUSIBLE_DOMAIN: 'mobisoins.com' }), { domain: 'mobisoins.com', src: PLAUSIBLE_DEFAULT_SRC });
  assert.match(PLAUSIBLE_DEFAULT_SRC, /outbound-links/);
});

test('domain is normalised if pasted as a URL', () => {
  assert.equal(analyticsConfig({ NEXT_PUBLIC_PLAUSIBLE_DOMAIN: 'https://www.mobisoins.com/' })?.domain, 'www.mobisoins.com');
});

test('custom script URL is used; a non-https one disables analytics', () => {
  assert.equal(analyticsConfig({ NEXT_PUBLIC_PLAUSIBLE_DOMAIN: 'mobisoins.com', NEXT_PUBLIC_PLAUSIBLE_SRC: 'https://plausible.io/js/pa-abc.js' })?.src, 'https://plausible.io/js/pa-abc.js');
  const original = console.error;
  console.error = () => {};
  try {
    assert.equal(analyticsConfig({ NEXT_PUBLIC_PLAUSIBLE_DOMAIN: 'mobisoins.com', NEXT_PUBLIC_PLAUSIBLE_SRC: 'http://evil.example/x.js' }), undefined);
  } finally {
    console.error = original;
  }
});

test('the root document wires analytics from the env (both languages share it)', () => {
  const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'app', 'RootDocument.tsx'), 'utf8');
  assert.match(src, /analyticsConfig\(process\.env\)/);
});
