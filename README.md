# Stella Chart

ビルド不要の静的ホロスコープWebアプリです（天体計算に[astronomy-engine](https://github.com/cosinekitty/astronomy)をCDN経由で利用しています）。
Cloudflare Workers の静的アセット配信で `https://stella.tomu-ai.dev` に公開します。

## ローカル確認

```sh
npx wrangler dev    # http://localhost:8787（本番と同じ _headers の CSP 付き）
```

## 公開方法（Cloudflare Workers）

```sh
npx wrangler deploy
```

- `wrangler.jsonc` の `build.command` で `tools/build-site.mjs` が先に走り、公開するファイルだけを `dist/` に集めます。
  公開するファイルを増やすときは `tools/build-site.mjs` の一覧に足してください（一覧にないファイルは配信されません）
- セキュリティヘッダー（CSP など）は `_headers` に書きます
- 入口は `stella.tomu-ai.dev` のカスタムドメインだけです（`workers.dev` と Preview URL は無効）

## 現在の機能

- 生年月日・出生時刻・出生地（47都道府県）の入力
- 太陽星座・月星座・アセンダント（ASC）の判定と簡易リーディング
- イコールハウス方式による12ハウスの表示
- 主要5アスペクト（合・セクスタイル・スクエア・トライン・オポジション）の一覧表示
- 実際の黄経に基づくSVG出生図（惑星位置・ASC・ハウス境界を反映）
- モバイル対応

## 制約・スコープ外

- 出生地は日本の都道府県のみ対応（タイムゾーンは常にJST +9:00固定、海外の出生地・サマータイムは非対応）
- ハウスシステムはイコールハウスのみ（Placidusなど緯度依存の方式は未対応）
- 太陽星座は伝統的な固定日付レンジで判定（月・惑星・ASCは実際の黄経で判定するため、年によっては境界日1日分だけ結果がずれる場合があります）
