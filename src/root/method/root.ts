
/**
 * 通用方法
 *
 * 無分類的方法放在這裡
 *
 */
export class AppRoot {

    /**
     * 重建 URL 物件
     * @param url 網址
     */
    static url(url: string): URL {

        // 網址正則表達，開頭為 http 或 https
        let httpRegex = new RegExp('^https?://');
        // 如果沒有 http 或 https 則加入 https
        let urlRaw = httpRegex.test(url) ? url : `https://${url}`;

        return new URL(urlRaw);

    }

}
