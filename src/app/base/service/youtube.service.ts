/// <reference types="gapi.youtube" />

import { Injectable } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { YOUTUBE_API, YOUTUBE_THUMBNAIL_HOST, YOUTUBE_URL_SHORT } from '../../../root/const/youtube.const';
import { RootService } from '../../../root/root.service';
import { YouTubeThumbnailList } from '../../../root/type/youtube.type';



/**
 * Youtube 服務
 */
@Injectable()
export class YoutubeService extends RootService {


    /** 預覽圖排序 */
    readonly thumbnailList: YouTubeThumbnailList[] = ['maxres', 'standard', 'high'];

    /** 預覽圖對照 */
    readonly thumbnailMap: {[key in YouTubeThumbnailList]?: string} = {
        maxres: 'maxresdefault',
        standard: 'sddefault',
        high: 'hqdefault'
    };

    /** 影片暫存資料 */
    private videoSave: GoogleApiYouTubeVideoResource | undefined;



    /**
     * 取得 YouTube ID
     * @param val 網址
     */
    id(val: string): string {
        let id = '';
        let url = this.httpService.url(val);

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
    getVideoSave(): GoogleApiYouTubeVideoResource | undefined {
        return this.videoSave;
    }


    /**
     * 讀取 YouTube 預覽圖圖片
     * @param id 影片 ID
     */
    async thumbnailCheck(id: string) {

        // 取得 API key
        let key = await this.httpService.apiKey();

        return new Promise<YouTubeThumbnailList>((resolve, reject) => {

            let params = new URLSearchParams(
                {
                    id,
                    key,
                    part: 'snippet'
                }
            );

            let url = new URL(`${YOUTUBE_API}?${params}`);

            this.httpService.getRoot(url.toString()).pipe(
                catchError(
                    () => {
                        this.widgetService.snackBar('YouTube is not available');
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
