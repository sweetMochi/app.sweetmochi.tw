/// <reference types="gapi.youtube" />

import { Injectable } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { apiYoutube, AppRoot, DataApi, RootService } from '../../../root';
import { ApiYoutubeVideo, YouTubeThumbnailList } from './youtube.type';
import { youtubeThumbnailHost, youtubeUrlShort } from './youtube.const';



/**
 * Youtube 服務
 */
@Injectable({ providedIn: 'root' })
export class YoutubeService extends RootService {


	/** 預覽圖排序 */
	readonly thumbnailList: YouTubeThumbnailList[] = ['maxres', 'standard', 'high'];

	/** 預覽圖對照 */
	readonly thumbnailMap: { [key in YouTubeThumbnailList]?: string } = {
		maxres: 'maxresdefault',
		standard: 'sddefault',
		high: 'hqdefault'
	};

	/** 影片暫存資料 */
	private videoSave: ApiYoutubeVideo | undefined;



	/**
	 * 取得 YouTube ID
	 * @param val 網址
	 */
	id(val: string): string {
		let id = '';
		let url = AppRoot.url(val);

		// 如果為短網址參數
		if (url.hostname === youtubeUrlShort) {
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

		return `${youtubeThumbnailHost}/${id}/${this.thumbnailMap[size]}.jpg`;

	}


	/**
	 * 取得影片暫存資料
	 */
	getVideoSave(): ApiYoutubeVideo | undefined {
		return this.videoSave;
	}


	/**
	 * 讀取 YouTube 預覽圖圖片
	 * @param id 影片 ID
	 */
	async thumbnailCheck(id: string) {

		return new Promise<YouTubeThumbnailList>((resolve, reject) => {

			// 建構請求資料
			let params = new URLSearchParams(
				{
					id,
				}
			);

			let url = new URL(`${apiYoutube}?${params}`);

			// 取得主機 YouTube API 回傳資料
			this.httpService.getJson<DataApi>(
				url.toString()
			).pipe(
				catchError(
					() => {
						// 如果發生錯誤
						this.widgetService.snackBar('YouTube is not available');
						reject(new Error('YouTube API is not available'));
						return EMPTY;
					}
				)
			).subscribe(res => {

				// 如果有錯誤代碼或沒有回傳資料
				if (res.code !== '' || !res.data) {
					reject(new Error('YouTube video not available'));
					return;
				}

				let video: ApiYoutubeVideo = res.data;

				// 依照預覽圖排序由大到小，尋找 API 中對應的縮圖
				let key = this.thumbnailList.find(item => video.thumbnails?.[item]);

				// 如果有找到縮圖
				if (key) {
					// 暫存縮圖資料
					this.videoSave = video;
					resolve(key);
					return;
				}

				reject(new Error('YouTube video thumbnail is not available'));

			});

		});
	}

}
