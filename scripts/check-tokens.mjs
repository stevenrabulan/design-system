// Fails if the preset references a token that tokens.css does not define, or if
// a themed token exists in one theme but not the other.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = new URL('..', import.meta.url);

const css = readFileSync(new URL('tokens.css', root), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const preset = require('../tailwind-preset.js');

const blockFor = (selector) => {
  const match = css.match(new RegExp(`${selector}\\s*\\{([^}]*)\\}`));
  if (!match) throw new Error(`tokens.css: no block found for selector "${selector}"`);
  return match[1];
};
const namesIn = (text) => new Set([...text.matchAll(/--([\w-]+)\s*:/g)].map((m) => m[1]));

const light = namesIn(blockFor(':root,\\s*\\.light'));
const dark = namesIn(blockFor('\\.dark'));
const all = namesIn(css);

const errors = [];

for (const name of light) if (!dark.has(name)) errors.push(`--${name} is in the light theme but missing from .dark`);
for (const name of dark) if (!light.has(name)) errors.push(`--${name} is in .dark but missing from the light theme`);

const referenced = new Set([...JSON.stringify(preset).matchAll(/var\(--([\w-]+)\)/g)].map((m) => m[1]));
if (referenced.size === 0) errors.push('tailwind-preset.js references no tokens, which means the check itself is broken');
for (const name of referenced) if (!all.has(name)) errors.push(`tailwind-preset.js uses --${name}, which tokens.css does not define`);

if (errors.length > 0) {
  console.error(`Token check failed:\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`Token check passed: ${all.size} tokens defined, ${referenced.size} used by the preset, themes in sync.`);
