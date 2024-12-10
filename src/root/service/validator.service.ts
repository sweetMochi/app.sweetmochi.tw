import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { YOUTUBE_HOST_LIST } from '../const/youtube.const';
import { DateValidationErrors, UrlValidationErrors, YoutubeValidationErrors } from '../type/error.type';
import { YoutubeService } from './youtube.service';
import { HttpService } from './http.service';
import { DATE_REGEX, URL_REGEX } from '../const/base.const';
import { WidgetService } from './widget.service';



/**
 * 驗證方法
 */
@Injectable({
    providedIn: 'root'
})
export class ValidatorService {

	constructor(
        private widget: WidgetService,
        private httpService: HttpService,
        private youTubeService: YoutubeService
	) {}


    /**
     * 日期驗證
     */
    get date(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let value = control.value;

            if (!value) {
                return null;
            }

            // 錯誤訊息
            let error: DateValidationErrors = { 'invalidDate': 'Invalid date' };

            return DATE_REGEX.test(value) ? null : error;

        }
    }


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
            let url = this.httpService.url(value);

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

                let key = await this.youTubeService.thumbnailCheck(id);

                let error: YoutubeValidationErrors | YoutubeValidationErrors<boolean> | null = { 'invalidYouTubeId': 'YouTube video not available' }

                switch (key) {

                    // 如果是最高解析度
                    case 'maxres':
                        error = null;
                        break;

                    // 如果是標準畫質
                    case 'standard':
                        error = { 'youTubeThumbnailUseStandard': true };
                        break;

                    // 如果是標準畫質
                    case 'high':
                        error = { 'youTubeThumbnailUseHigh': true };
                        break;

                }

                return error;

            } catch (error) {

                // 錯誤訊息
                let msg: YoutubeValidationErrors = { 'YouTubeIsNotAvailable': 'YouTube is not available' };

                // 使用者提醒
                this.widget.snackBar('YouTube is not available');

                return msg;
            }

        };
    }

}
