/// <reference types="gapi.youtube" />

import { Injectable } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { YOUTUBE_API, YOUTUBE_THUMBNAIL_HOST, YOUTUBE_URL_SHORT } from '../const/youtube.const';
import { YouTubeThumbnailList } from '../type/youtube.type';
import { HttpService } from './http.service';
import { WidgetService } from './widget.service';



/**
 * Youtube 服務
 */
@Injectable({
    providedIn: 'root'
})
export class YoutubeService {


    /** 預覽圖排序 */
    readonly thumbnailList: YouTubeThumbnailList[] = ['maxres', 'standard', 'high'];

    /** 預覽圖對照 */
    readonly thumbnailMap: {[key in YouTubeThumbnailList]?: string} = {
        maxres: 'maxresdefault',
        standard: 'sddefault',
        high: 'hqdefault'
    };

    /** 影片暫存資料 */
    private videoSave!: GoogleApiYouTubeVideoResource;


    constructor(
        private http: HttpService,
        private widget: WidgetService
    ) { }


    /**
     * 取得 YouTube ID
     * @param val 網址
     */
    id(val: string): string {
        let id = '';
        let url = this.http.url(val);

        // 如果為短網址參數
        if (url.hostname === YOUTUBE_URL_SHORT) {
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
    thumbnailUrl(id: string, size: YouTubeThumbnailList = 'maxres'): string {

        if (!this.thumbnailMap[size]) {
            return '';
        }

        return `${YOUTUBE_THUMBNAIL_HOST}/${id}/${this.thumbnailMap[size]}.jpg`;

    }


    /**
     * 取得影片暫存資料
     */
    getVideoSave(): GoogleApiYouTubeVideoResource | null {
        return this.videoSave;
    }


    /**
     * 讀取 YouTube 預覽圖圖片
     * @param id 影片 ID
     */
    async thumbnailCheck(id: string) {

        // 取得 API key
        let key = await this.http.apiKey();

        return new Promise<YouTubeThumbnailList>((resolve, reject) => {

            let params = new URLSearchParams(
                {
                    id,
                    key,
                    part: 'snippet'
                }
            );

            let url = new URL(`${YOUTUBE_API}?${params}`);

            this.http.getRoot(url.toString()).pipe(
                catchError(
                    () => {
                        this.widget.snackBar('YouTube is not available');
                        reject(new Error('YouTube API is not available'));
                        return EMPTY;
                    }
                )
            ).subscribe(res => {
                let data = res as GoogleApiYouTubePageInfo<GoogleApiYouTubeVideoResource>;

                if (!data.items.length) {
                    reject(new Error('YouTube video not available'));
                    return;
                }

                let key = this.thumbnailList.find(item => data.items[0].snippet.thumbnails[item]);

                if (key) {
                    this.videoSave = data.items[0];
                    resolve(key);
                    return;
                }

                reject(new Error('YouTube video thumbnail is not available'));

            });

        });
    }

}
