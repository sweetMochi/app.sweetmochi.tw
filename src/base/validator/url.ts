import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


/** 網址正則表達式 */
const URL_REGEX = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

/** YouTube 網域 */
const YOUTUBE_HOST = 'youtube.com';


export function urlValidators(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let value = control.value;

        if (!value) {
            return null;
        }

        let regex = new RegExp(URL_REGEX);

        return regex.test(value) ? null : { 'invalidUrl': 'Invalid URL' };

    }
}


/**
 * 驗證 YouTube 方法
 */
export function youTubeValidators(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let value = control.value;
        let regex = new RegExp(URL_REGEX);

        if (!value || !regex.test(value)) {
            return null;
        }

        let url = new URL(value);

        let domain = url.hostname;
        let video = url.searchParams.get('v');

        return (domain.includes(YOUTUBE_HOST) && video) ? null : { 'invalidYouTube': 'Invalid YouTube URL' };

    }
}
