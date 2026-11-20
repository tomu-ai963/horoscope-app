# Stella Chart

ビルド不要の静的ホロスコープWebアプリです（天体計算に[astronomy-engine](https://github.com/cosinekitty/astronomy)を同梱して利用しています）。
Cloudflare Workers の静的アセット配信で `https://stella.tomu-ai.dev` に公開します。

## ローカル確認

```sh
npx wrangler dev    # http://localhost:8787（本番と同じ _headers の CSP 付き）
node --test         # 天体計算（calc.js）のテスト。npm install は不要
```

`wrangler dev` は起動時に `dist/` を作るので、起動中にファイルを直したら `node tools/build-site.mjs` で作り直してください。

## 公開方法（Cloudflare Workers）

```sh
npx wrangler deploy
```

- `wrangler.jsonc` の `build.command` で `tools/build-site.mjs` が先に走り、公開するファイルだけを `dist/` に集めます。
  公開するファイルを増やすときは `tools/build-site.mjs` の一覧に足してください（一覧にないファイルは配信されません）
- セキュリティヘッダー（CSP など）は `_headers` に書きます
- 入口は `stella.tomu-ai.dev` のカスタムドメインだけです（`workers.dev` と Preview URL は無効）

## ファイル構成

- `calc.js`: 天体計算（DOM に触らない関数だけ）。`tests/calc.test.mjs` が `node:vm` で読み込んで検証します
- `app.js`: 画面の表示と出生図の描画
- `vendor/astronomy-engine-2.1.19/`: 天体計算ライブラリ [astronomy-engine](https://github.com/cosinekitty/astronomy)（MIT、ライセンス表記はファイル先頭）を同梱して自前で配信しています（CSP は `script-src 'self'` だけ）。
  更新するときは npm の配布物の `astronomy.browser.min.js` を新しい版のフォルダに置き、`index.html` の読み込み先と、テストの `VENDOR` / `VENDOR_SHA256` を書き換えてください。`.gitattributes` で改行を変換しない設定にしてあります

## 現在の機能

- 生年月日・出生時刻・出生地（47都道府県）の入力。出生時刻が分からない場合は「出生時刻がわからない」にチェック（正午で計算し、ASC・ハウスを出さず、その日のうちに太陽・月の星座が変わる場合は注記する）
- 結果の共有: 入力内容を URL のハッシュ（`#d=1990-01-20&t=09:30&p=12`）に入れる。ハッシュはサーバーへ送られないので、生年月日はブラウザの外に出ない。「結果の URL をコピー」ボタンあり
- 太陽星座・月星座・アセンダント（ASC）の判定と簡易リーディング（いずれも実際の黄経で判定）
- 10天体と ASC・MC の配置一覧（星座・度数・ハウス・逆行）
- イコールハウス方式による12ハウスの表示
- 主要5アスペクト（合・セクスタイル・スクエア・トライン・オポジション）の一覧表示
- 実際の黄経に基づくSVG出生図（ASC を左に置き反時計回りの一般的な向き。時刻不明のときは牡羊座 0 度を左に置く。天体位置・ASC/MC 軸・ハウス境界・逆行を反映。近い天体は記号が重ならないよう位置をずらし、実際の位置へ引き出し線でつなぐ）
- モバイル対応

## 制約・スコープ外

- 出生地は日本の都道府県のみ対応（タイムゾーンは常にJST +9:00固定、海外の出生地・サマータイムは非対応）
- ハウスシステムはイコールハウスのみ（Placidusなど緯度依存の方式は未対応）
- 生年月日は 1900〜2100 年に対応
