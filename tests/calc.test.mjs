// calc.js の検証。ブラウザと同じく、同梱の astronomy-engine → calc.js の順に 1 つの環境へ読み込む。
// 実行: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = fileURLToPath(new URL('..', import.meta.url));
const VENDOR = 'vendor/astronomy-engine-2.1.19/astronomy.browser.min.js';
// npm の astronomy-engine@2.1.19（tarball の integrity を npm が検証）と jsDelivr の配布物で同じ値
const VENDOR_SHA256 = 'f41139a87941ea017ab902b954c9389fa27ea72083d7fab4971756d7769d14e6';

const ctx = vm.createContext({});
for (const file of [VENDOR, 'calc.js']) {
  vm.runInContext(readFileSync(root + file, 'utf8'), ctx, { filename: file });
}
const C = vm.runInContext('StellaCalc', ctx);
const A = vm.runInContext('Astronomy', ctx);
// astronomy-engine は instanceof Date で判定するので、日付は読み込んだ環境の Date で作る
const CDate = vm.runInContext('Date', ctx);
const at = iso => new CDate(iso);
const angleDiff = (a, b) => { const d = Math.abs(C.norm360(a) - C.norm360(b)) % 360; return d > 180 ? 360 - d : d; };

const TOKYO = [35.68, 139.77], SAPPORO = [43.06, 141.35], NAHA = [26.21, 127.68];

test('同梱した astronomy-engine が配布元と同じバイト列', () => {
  const sha = createHash('sha256').update(readFileSync(root + VENDOR)).digest('hex');
  assert.equal(sha, VENDOR_SHA256);
});

test('jstToUtc: JST を UTC に直す（日付・年をまたぐ場合と 100 年未満の年）', () => {
  assert.equal(C.jstToUtc(1990, 1, 1, 5, 0).toISOString(), '1989-12-31T20:00:00.000Z');
  assert.equal(C.jstToUtc(2024, 2, 29, 23, 59).toISOString(), '2024-02-29T14:59:00.000Z');
  assert.equal(C.jstToUtc(50, 6, 1, 12, 0).getUTCFullYear(), 50);
});

test('太陽星座は実際の黄経で決まる（春分の前後で魚座→牡羊座）', () => {
  const eq = A.Seasons(2000).mar_equinox.date.getTime();
  assert.equal(C.signOfLongitude(C.eclipticLongitude('Sun', new CDate(eq - 3600e3))), 11);
  assert.equal(C.signOfLongitude(C.eclipticLongitude('Sun', new CDate(eq + 3600e3))), 0);
});

test('太陽星座: 固定の日付表と食い違う日も実際の黄経に従う（1950-01-20 正午 JST は山羊座）', () => {
  const lon = C.eclipticLongitude('Sun', C.jstToUtc(1950, 1, 20, 12, 0));
  assert.equal(C.signOfLongitude(lon), 9);
  assert.ok(lon > 299 && lon < 300, `太陽黄経 ${lon}`);
});

test('ASC: 太陽の中心が東の地平線（高度 0 度）に来た時刻には ASC ≒ 太陽黄経、MC: 南中の時刻には MC ≒ 太陽黄経', () => {
  for (const [lat, lon] of [TOKYO, SAPPORO, NAHA]) {
    const observer = new A.Observer(lat, lon, 0);
    for (const iso of ['2024-01-15T00:00:00Z', '2024-04-15T00:00:00Z', '2024-07-15T00:00:00Z', '2024-10-15T00:00:00Z']) {
      // 暦の「日の出」（上辺が大気差込みで地平線に出た瞬間）では中心がまだ地平線の下にあり、最大 2 度ずれるので使わない
      const rise = A.SearchAltitude(A.Body.Sun, observer, +1, at(iso), 2, 0).date;
      assert.ok(angleDiff(C.ascMc(rise, lat, lon).asc, C.eclipticLongitude('Sun', rise)) < 0.05, `ASC ${lat},${lon} ${iso}`);

      const noon = A.SearchHourAngle(A.Body.Sun, observer, 0, at(iso), +1).time.date;
      assert.ok(angleDiff(C.ascMc(noon, lat, lon).mc, C.eclipticLongitude('Sun', noon)) < 0.1, `MC ${lat},${lon} ${iso}`);
    }
  }
});

test('houseOf: イコールハウスで 0 度をまたぐ境界', () => {
  assert.equal(C.houseOf(5, 350), 1);
  assert.equal(C.houseOf(349.9, 350), 12);
  assert.equal(C.houseOf(19.9, 350), 1);
  assert.equal(C.houseOf(20, 350), 2);
  assert.deepEqual(JSON.parse(JSON.stringify(C.computeHouses(350).slice(0, 3))), [350, 20, 50]);
});

test('isRetrograde: 既知の逆行期間（水星 2023-04-21〜05-15、火星 2022-10-30〜2023-01-12）', () => {
  assert.equal(C.isRetrograde('Mercury', at('2023-05-01T00:00:00Z')), true);
  assert.equal(C.isRetrograde('Mercury', at('2023-06-01T00:00:00Z')), false);
  assert.equal(C.isRetrograde('Mars', at('2022-12-01T00:00:00Z')), true);
  assert.equal(C.isRetrograde('Mars', at('2023-03-01T00:00:00Z')), false);
  assert.equal(C.isRetrograde('Sun', at('2023-05-01T00:00:00Z')), false);
  assert.equal(C.isRetrograde('Moon', at('2023-05-01T00:00:00Z')), false);
});

test('computeAspects: 角度とオーブの判定、オーブの小さい順', () => {
  const res = C.computeAspects({ Sun: 0, Moon: 121, Mars: 183 }).map(a => `${a.a}-${a.b}:${a.name}:${a.orb}`);
  assert.deepEqual([...res], ['Sun-Moon:トライン:1', 'Moon-Mars:セクスタイル:2', 'Sun-Mars:オポジション:3']);
  // 0 度をまたぐ合。太陽・月を含まない組はオーブ 5 度まで
  assert.equal(C.computeAspects({ Venus: 358, Mars: 2 })[0].name, '合');
  assert.equal(C.computeAspects({ Venus: 355, Mars: 3 }).length, 0);
});

// spreadGlyphs の結果が「どの 2 つも minSep 以上離れ、黄経の並び順を保っている」ことを確かめる
function checkSpread(longitudes, minSep) {
  const shown = C.spreadGlyphs(longitudes, minSep);
  const names = Object.keys(longitudes).sort((a, b) => C.norm360(longitudes[a]) - C.norm360(longitudes[b]));
  let total = 0, maxShift = 0;
  names.forEach((name, i) => {
    const next = names[(i + 1) % names.length];
    const gap = C.norm360(shown[next] - shown[name]) || (names.length === 1 ? 360 : 0);
    assert.ok(gap >= minSep - 1e-9, `${name}→${next} の間隔 ${gap}`);
    total += gap;
    maxShift = Math.max(maxShift, angleDiff(shown[name], longitudes[name]));
  });
  // 並び順が保たれていれば、順に進んだ間隔の合計がちょうど 1 周になる
  assert.ok(Math.abs(total - 360) < 1e-6, `一周の合計 ${total}`);
  return maxShift;
}

test('spreadGlyphs: 重なる天体を離し、離れている天体は動かさない', () => {
  const same = Object.fromEntries(C.BODIES.map(b => [b, 0]));
  assert.ok(checkSpread(same, 10) <= 45 + 1e-9);
  checkSpread({ a: 355, b: 358, c: 1, d: 3 }, 10);
  const apart = { a: 10, b: 100, c: 200 };
  const shown = C.spreadGlyphs(apart, 10);
  for (const k in apart) assert.equal(shown[k], apart[k]);
});

test('spreadGlyphs: 1960〜2009 年の毎週の実際の配置で、重なりが残らない', () => {
  let charts = 0, worst = 0;
  for (let t = Date.UTC(1960, 0, 1); t < Date.UTC(2010, 0, 1); t += 7 * 864e5) {
    const date = new CDate(t);
    const longitudes = Object.fromEntries(C.BODIES.map(b => [b, C.eclipticLongitude(b, date)]));
    worst = Math.max(worst, checkSpread(longitudes, 10));
    charts++;
  }
  assert.equal(charts, 2609);
  assert.ok(worst <= 45, `最大のずらし幅 ${worst}`);
  console.log(`  ${charts} 件・記号の最大のずらし幅 ${worst.toFixed(1)}°`);
});
