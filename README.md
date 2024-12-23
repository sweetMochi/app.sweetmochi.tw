# Mochi APP

+ Youtube 縮圖擷取工具，使用 Youtube API 串接
+ 記事本功能可上傳圖片、寫入日期和標籤功能，包含新增、刪除和修改

## Directory Structure

```
app.sweetmochi.tw
├── app
│   ├── app.component.ts 路由事件與側欄功能
│   ├── app.config.ts Interceptor 設定
│   ├── app.const.ts 全域服務設定
│   ├── app.routes.ts 路由設定
│   ├── app.type.ts 側欄型別
│   ├── base
│   │   ├── form.component.ts 表單基礎功能
│   │   └── youtube
│   │       ├── youtube-validator.service.ts Youtube 非同步驗證方法
│   │       ├── youtube.const.ts Youtube 網址設定參數
│   │       ├── youtube.service.ts
│   │       └── youtube.type.ts
│   └── page
│       ├── note
│       │   ├── note-list
│       │   │   ├── note-list.component.html
│       │   │   ├── note-list.component.less
│       │   │   └── note-list.component.ts
│       │   ├── note-page
│       │   │   ├── note-page.component.html
│       │   │   ├── note-page.component.less
│       │   │   └── note-page.component.ts
│       │   └── _base
│       │       ├── note-base-card
│       │       │   ├── note-base-card.component.html
│       │       │   ├── note-base-card.component.less
│       │       │   └── note-base-card.component.ts
│       │       ├── note-base-edit
│       │       │   ├── note-base-edit.component.html
│       │       │   ├── note-base-edit.component.less
│       │       │   └── note-base-edit.component.ts
│       │       ├── note-base.component.ts
│       │       └── note-base.type.ts
│       ├── setting
│       │   ├── setting.component.html
│       │   ├── setting.component.less
│       │   └── setting.component.ts
│       └── youtube-thumbnail
│           ├── youtube-thumbnail.component.html
│           ├── youtube-thumbnail.component.less
│           └── youtube-thumbnail.component.ts
├── root
│   ├── const
│   │   ├── api-list.const.ts
│   │   ├── api-status.const.ts
│   │   ├── config.const.ts
│   │   └── root.const.ts
│   ├── interceptor
│   │   ├── api.interceptor.ts
│   │   └── note.interceptor.ts
│   ├── method
│   │   ├── api-status.ts
│   │   ├── local.ts
│   │   ├── root.ts
│   │   └── validator.ts
│   ├── root.component.ts
│   ├── root.module.ts
│   ├── root.service.ts
│   ├── service
│   │   ├── http.service.ts
│   │   └── widget.service.ts
│   ├── type
│   │   ├── api.type.ts
│   │   ├── error.type.ts
│   │   └── local.type.ts
│   └── widget
│       └── popup-confirm
│           ├── popup-confirm.component.html
│           ├── popup-confirm.component.less
│           └── popup-confirm.component.ts
├── index.html
├── main.ts
└── styles.less
```

## Development server

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.1.

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.
