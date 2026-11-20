import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-app.ts';

// Deliver the application and preview images from this entry's directory.
const entryDirectory = fileURLToPath(new URL('.', import.meta.url));
const outputDirectory = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDirectory, { recursive: true });
for (const folder of ['app', 'screenshots']) {
  cpSync(join(entryDirectory, folder), join(outputDirectory, folder), {
    recursive: true,
  });
}

const dossier = buildDossier(outputDirectory, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
  app_path_max_bytes: 1000,
});

writeFileSync(join(outputDirectory, 'dossier.json'), dossier);
