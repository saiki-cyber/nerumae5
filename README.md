# 寝る前5分で読める文豪の名文

眠る前に一篇だけ読める、著作権保護期間が満了した短い名作を集めたサイトです。案内役は書斎の番人アワイ。

## ページ構成

| ファイル | 内容 |
| --- | --- |
| `index.html` | 表紙（今夜の一篇、書棚） |
| `yume.html` `carmen.html` `shakai.html` `mangan.html` `yume6.html` `kakei.html` `kinwa.html` `denden.html` `ame.html` `iwashi.html` | 作品ページ（1作品＝1ファイル） |
| `awai.html` | アワイの紹介 |
| `audio.html` | 朗読版について（企画中） |
| `about.html` | このサイトについて、出典と権利 |
| `assets/style.css` | 全ページ共通の見た目 |
| `assets/site.js` | 明暗切り替え、文字サイズ、今夜の一篇の日替わり |
| `assets/*.webp` | アワイの画像 |

## 編集するときの決まり

- **1ページにまとめない。** 作品は1作品1ファイルのまま増やす。
- 見た目は `assets/style.css` だけを直す。各ページに `<style>` を書き足さない。
- 画像は `assets/` に置いて参照する。HTMLに画像データを埋め込まない。
- 作品を足すとき：既存の作品ページを複製して本文と豆知識を差し替え、`index.html` の書棚と `assets/site.js` の `tonightWorks` に1件ずつ足し、前後の作品ページの「前の一篇／次の一篇」をつなぎ直す。

## 公開（GitHub Pages）

Settings → Pages → Build and deployment で「Deploy from a branch」、ブランチ `main`、フォルダ `/ (root)` を選んで保存。
