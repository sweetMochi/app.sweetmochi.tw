import { Injectable } from '@angular/core';


/**
 * 網址服務
 */
@Injectable({
    providedIn: 'root'
})
export class UrlService {


    /**
     * http 正則表達，開頭為 http 或 https
     */
    readonly httpRegex = '^https?://';


    /**
     * 重建 URL 物件
     * @param url 網址
     */
    rebuild(url: string): URL {

        // 網址正則表達
        let httpRegex = new RegExp(this.httpRegex);
        // 如果沒有 http 或 https 則加入 https
        let urlRaw = httpRegex.test(url) ? url : `https://${url}`;

        return new URL(urlRaw);

    }

}
