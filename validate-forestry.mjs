import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const theme = JSON.parse(readFileSync(new URL('./Forestry.json', import.meta.url), 'utf8'));

assert.equal(theme.spec, 3, 'theme must use the current Raincord spec 3 format');
assert.match(theme.version, /^\d+\.\d+\.\d+$/);
assert.equal(theme.id, 'taakoofficial.dark-forest-ios');
assert.equal(theme.main.type, 'dark');
assert.ok(theme.main.semantic && !Array.isArray(theme.main.semantic));
assert.ok(theme.main.raw && !Array.isArray(theme.main.raw));
assert.ok(!Object.hasOwn(theme.main.semantic, 'KEYBOARD'), 'KEYBOARD breaks iOS 27 keyboard theming');
assert.ok(!Object.hasOwn(theme.main.semantic, 'BACKGROUND_PRIMARY'), 'BACKGROUND_PRIMARY breaks iOS 27 keyboard theming');
assert.equal(theme.display.authors[0].name, 'Razorbill');
assert.equal(theme.display.authors[0].id, '1387455182526484582');
assert.match(theme.main.background.url, /^https:\/\//);
assert.ok(theme.main.background.opacity >= 0 && theme.main.background.opacity <= 1);

for (const [key, entry] of Object.entries(theme.main.semantic)) {
  if (typeof entry === 'string') {
    assert.match(entry, /^#[\da-f]{6}([\da-f]{2})?$/i, key);
  } else {
    assert.equal(entry.type, 'raw', key);
    assert.match(entry.value, /^#[\da-f]{6}$/i, key);
    assert.ok(entry.opacity >= 0 && entry.opacity <= 1, key);
  }
}
for (const [key, color] of Object.entries(theme.main.raw)) {
  assert.match(color, /^#[\da-f]{6}([\da-f]{2})?$/i, key);
}

console.log('PASS: Dark Forest uses Raincord spec 3 and excludes iOS 27 keyboard overrides.');
