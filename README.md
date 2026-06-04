# anibrowser

基於 [TMDB](https://www.themoviedb.org/) API 的動漫 / 影集瀏覽器，使用 Next.js 14 App Router 建構。

## 功能

- 透過 TMDB API 取得動漫與影集資料（Discover、詳情、季度資訊、類型分類）
- 以格狀卡片顯示節目清單，支援可展開按鈕互動
- 包含 Navbar 導覽列與 MainGrid 主要顯示區域
- 支援本地 `sample.json` 資料預覽（離線模式）

## 技術棧

| 層級 | 套件 |
|------|------|
| 框架 | [Next.js 14](https://nextjs.org/) (App Router) |
| UI | React 18 |
| HTTP | axios |
| 資料來源 | TMDB API v3 |

## 專案結構

```
src/
├── app/
│   ├── component/     # UI 元件（Navbar, MainGrid, Card, Button...）
│   ├── css/           # 模組化 CSS
│   ├── layout.js      # 全域版面
│   └── page.js        # 首頁
└── entry/
    ├── tmdb/          # TMDB API 封裝函式
    │   ├── getDiscover.func.js
    │   ├── getSeason.func.js
    │   ├── getTVDetail.func.js
    │   ├── getTVGenre.func.js
    │   └── getToken.func.js
    └── func/
        └── generateFolder.func.js
```

## 快速開始

### 安裝依賴

```bash
npm install
```

### 設定環境變數

建立 `.env.local` 並填入 TMDB API 金鑰：

```env
TMDB_API_KEY=your_api_key_here
TMDB_ACCESS_TOKEN=your_read_access_token
```

> TMDB API 金鑰可至 [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api) 申請。

### 啟動開發伺服器

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 即可瀏覽。

### 抓取資料（資料入口腳本）

```bash
# 抓取 Discover 資料
node src/entry/daily.index.js

# 匯出資料
node src/entry/output.index.js
```

## 授權

MIT