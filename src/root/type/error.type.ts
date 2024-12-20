
/**
 * 基本錯誤類型
 */
export type ValidationErrorsType = 'required';


/**
 * 網址錯誤型別
 *
 *      invalidUrl: 無效的網址
 *
 */
export type UrlValidationErrorsType = 'invalidUrl';


/**
 * 筆記卡牌錯誤型別
 *
 *      matDatepickerParse: 內建格式驗證方法
 *
 */
export type DateValidationErrorsType = 'matDatepickerParse';


/**
 * 日期驗證錯誤格式
 */
export type DateValidationErrors<T = string> = {
    [key in DateValidationErrorsType]?: T;
}


/**
 * 網址驗證錯誤格式
 */
export type UrlValidationErrors<T = string> = {
    [key in UrlValidationErrorsType]?: T;
}

