import { inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AppRoot, urlRegex } from '../../../root';
import { youtubeHostList } from './youtube.const';
import { YoutubeService } from './youtube.service';
import { YoutubeValidationErrors } from './youtube.type';




/**
 * 驗證方法
 */
@Injectable()
export class YoutubeValidatorService {
    youTubeService = inject(YoutubeService);


    /**
     * 驗證 YouTube 網址
     */
    get url(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let value = control.value;
            let regex = new RegExp(urlRegex);

            if (!value || !regex.test(value)) {
                return null;
            }

            // 取得建構網址
            let url = AppRoot.url(value);

            // 是否為 Youtube 的網域
            let validUrl = youtubeHostList.includes(url.hostname);

            // 錯誤訊息
            let error: YoutubeValidationErrors = { 'invalidYouTubeUrl': 'Invalid YouTube URL' };

            return (validUrl && this.youTubeService.id(value)) ? null : error;

        }
    }


    /**
     * 驗證 YouTube 影片是否有效
     */
    get video(): AsyncValidatorFn {
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

                    // 如果是較高
                    case 'high':
                        error = { 'youTubeThumbnailUseHigh': true };
                        break;

                }

                return error;

            } catch (error) {

                // 錯誤訊息
                let msg: YoutubeValidationErrors = { 'YouTubeIsNotAvailable': 'YouTube is not available' };

                return msg;
            }

        };
    }

}
