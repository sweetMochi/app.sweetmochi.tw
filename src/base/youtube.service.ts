import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YOUTUBE_SHORT_URL } from './const';
import { YoutubeThumbnail } from './type';
import { UrlService } from './url.service';



/**
 * Youtube 服務
 */
@Injectable({
    providedIn: 'root'
})
export class YoutubeService {


    /** 預覽圖錯誤尺寸 */
    readonly thumbnailErrorWidth = 120;


	constructor(
        private urlService: UrlService
	) {}


    /**
     * 取得 YouTube ID
     * @param val 網址
     */
    id(val: string): string {
        let id = '';
        let url = this.urlService.rebuild(val);

        // 如果為短網址參數
        if (url.hostname === YOUTUBE_SHORT_URL) {
            // 從第一層路徑取得影片 ID
            id = url.pathname.split('/')[1];
        } else {
            // 從參數取得影片 ID
            id = url.searchParams.get('v') || '';
        }

        return id;

    }


    /**
     * 取得預覽圖網址
     * @param id 影片 ID
     * @param size 縮圖大小
     */
    thumbnailUrl(id: string, size: YoutubeThumbnail = 'maxresdefault') {
        return `https://img.youtube.com/vi/${id}/${size}.jpg`;
    }


    /**
     * 讀取 YouTube 預覽圖圖片
     * @param id 影片 ID
     * @param size 縮圖大小
     */
    async thumbnailTest(id: string, size: YoutubeThumbnail = 'maxresdefault') {
        return new Promise<boolean>((resolve, reject) => {

            let img = new Image();
            img.src = this.thumbnailUrl(id, size);

            // 圖片加載事件
            img.onload = (data) => {

                // 圖片元素
                let target = data.target as HTMLImageElement;

                // 圖片原生寬度如果大於錯誤預覽圖
                if (target.naturalWidth > this.thumbnailErrorWidth) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }

            // 圖片加載失敗
            img.onerror = () => {
                reject();
            }

        });
    }

}
