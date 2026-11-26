// Indonesia in Numbers — hand-in program (Node 22, standard library only).
//
// The site lives in app/ next to this file: plain static files, no build
// step, nothing loaded over the network. This program copies app/ and
// screenshots/ into the grader's output directory and writes dossier.json,
// the summary the judge reads, using the vendored make.fun library.
// vendor/makefun-frontend.ts is the kit's copy and must stay unchanged:
// the scorer rebuilds the dossier with its own copy and compares bytes.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const root = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function handIn() {
  mkdirSync(outDir, { recursive: true });
  cpSync(join(root, 'app'), join(outDir, 'app'), { recursive: true });

  const shots = join(outDir, 'screenshots');
  mkdirSync(shots, { recursive: true });
  const localShots = join(root, 'screenshots');
  if (existsSync(localShots)) cpSync(localShots, shots, { recursive: true });

  // The scorer's own caps, as the kit documents them: at most 4
  // screenshots of 256 KiB, at most 993 app files and 16 MiB of app
  // files, and the dossier text capped at 160 KiB.
  const dossier = buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  });
  writeFileSync(join(outDir, 'dossier.json'), dossier);
}

handIn();
