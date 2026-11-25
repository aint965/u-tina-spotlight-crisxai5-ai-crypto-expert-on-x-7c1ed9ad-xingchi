// Entry program for the make.fun bounty "Spotlight @crisxai5: AI & Crypto Expert on X".
//
// The entry itself is the X post: an original spotlight card introducing
// @crisxai5 as a must-follow AI & crypto expert, posted publicly from
// @asyrof_uye. This program does the only job the grader needs from the
// repository — it hands the post's address over by copying POST.json from
// the repository root into the output directory, byte for byte.
//
// Node 22, standard library only. No network, no clock, no files outside
// the repository. Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourcePath = join(BOT_DIR, 'POST.json');
const raw = readFileSync(sourcePath, 'utf8');

const parsed: unknown = JSON.parse(raw);
if (
  typeof parsed !== 'object' ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== 'string'
) {
  throw new Error('POST.json must be a JSON object with a string "url" field');
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'POST.json'), raw);
