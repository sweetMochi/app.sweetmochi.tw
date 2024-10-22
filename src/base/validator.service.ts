import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { URL_REGEX, YOUTUBE_HOST_LIST } from './const';
import { UrlValidationErrors, YoutubeValidationErrors } from './error.type';
import { UrlService } from './url.service';
import { YoutubeService } from './youtube.service';



/**
 * 驗證方法
 */
@Injectable({
    providedIn: 'root'
})
export class ValidatorService {

	constructor(
        private urlService: UrlService,
        private youTubeService: YoutubeService
	) {}


    /**
     * 網址驗證
     */
    get url(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let value = control.value;

            if (!value) {
                return null;
            }

            // 錯誤訊息
            let error: UrlValidationErrors = { 'invalidUrl': 'Invalid URL' };

            return URL_REGEX.test(value) ? null : error;

        }
    }


    /**
     * 驗證 YouTube 網址
     */
    get youTubeUrl(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let value = control.value;
            let regex = new RegExp(URL_REGEX);

            if (!value || !regex.test(value)) {
                return null;
            }

            // 取得建構網址
            let url = this.urlService.rebuild(value);

            // 是否為 Youtube 的網域
            let validUrl = YOUTUBE_HOST_LIST.includes(url.hostname);

            // 錯誤訊息
            let error: YoutubeValidationErrors = { 'invalidYouTubeUrl': 'Invalid YouTube URL' };

            return (validUrl && this.youTubeService.id(value)) ? null : error;

        }
    }


    /**
     * 驗證 YouTube 影片是否有效
     */
    get youTubeVideo(): AsyncValidatorFn {
        return async (control: AbstractControl): Promise<ValidationErrors | null> => {
            let value = control.value;

            let id = this.youTubeService.id(value || '');

            try {

                if (await this.youTubeService.thumbnailTest(id) ) {
                    return null;
                }

                if (await this.youTubeService.thumbnailTest(id, 'hqdefault')) {

                    // 錯誤訊息
                    let error: YoutubeValidationErrors<boolean> = { 'youTubeThumbnailUseHq': true };

                    return error;
                }

                // 錯誤訊息
                let error: YoutubeValidationErrors = { 'invalidYouTubeId': 'YouTube video not available' };

                return error;
            } catch (error) {

                // 錯誤訊息
                let msg: YoutubeValidationErrors = { 'YouTubeIsNotAvailable': 'YouTube is not available' };

                return msg;
            }

        };
    }

}
