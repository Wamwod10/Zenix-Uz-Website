import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const appSource = fs.readFileSync(path.resolve(here, '../src/App.jsx'), 'utf8');

assert.doesNotMatch(
  appSource,
  /useEffect\(move\s*,/,
  'ScrollToTop must not pass a callback with a return value directly to useEffect',
);

console.log('ScrollToTop effect does not leak the scrollTo return value as cleanup.');
