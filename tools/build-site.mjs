// 公開するファイルだけを dist/ に集める（wrangler.jsonc の build.command から呼ばれる）。
// 一覧に書いたものだけが公開される。新しいファイルを公開するときはここに足す
import { cp, mkdir, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const DIST = join(ROOT, 'dist');
const PUBLIC_FILES = ['index.html', 'calc.js', 'app.js', 'style.css', '_headers', 'vendor'];

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });
for (const file of PUBLIC_FILES) {
  await cp(join(ROOT, file), join(DIST, file), { recursive: true });
}
console.log(`dist/ に ${PUBLIC_FILES.length} 件を配置しました`);
