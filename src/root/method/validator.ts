import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DATE_REGEX, URL_REGEX } from '../const/base.const';
import { DateValidationErrors, UrlValidationErrors } from '../type/error.type';



/**
 * 驗證方法
 */
export class AppValidators {


    /**
     * 日期驗證
     */
    static date(): ValidatorFn {
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
    static url(): ValidatorFn {
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


}
