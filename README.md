# Mochi APP

+ Youtube 縮圖擷取工具，使用 Youtube API 串接
+ 記事本功能可上傳圖片、寫入日期和標籤功能，包含新增、刪除和修改

## Directory Structure

```
app.sweetmochi.tw
├── app
│   ├── app.component.html
│   ├── app.component.less
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.const.ts
│   ├── app.routes.ts
│   ├── app.type.ts
│   ├── base
│   │   ├── form.component.ts
│   │   └── youtube
│   │       ├── youtube-validator.service.ts
│   │       ├── youtube.const.ts
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

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```


## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
