import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { urlRegex } from '../const/root.const';
import { UrlValidationErrors } from '../type/error.type';



/**
 * 驗證方法
 *
 * 驗證相關的方法放在這裡
 *
 */
export class AppValidators {


    /**
     * 網址驗證
     */
    static get url(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let value = control.value;

            if (!value) {
                return null;
            }

            // 錯誤訊息
            let error: UrlValidationErrors = { 'invalidUrl': 'Invalid URL' };

            return urlRegex.test(value) ? null : error;

        };
    }


}
