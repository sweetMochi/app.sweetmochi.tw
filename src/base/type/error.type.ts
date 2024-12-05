
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
 * Youtube 錯誤型別
 *
 *      invalidYouTubeId: 無效的 YouTube ID
 *      invalidYouTubeUrl: 無效的 YouTube 網址
 *      youTubeThumbnailUseStandard: YouTube 影片縮圖使用 standard 版本
 *      youTubeThumbnailUseHigh: YouTube 影片縮圖使用 high 版本
 *      YouTubeIsNotAvailable: YouTube 目前無法使用
 *
 */
export type YoutubeValidationErrorsType = 'invalidYouTubeId' | 'invalidYouTubeUrl' | 'youTubeThumbnailUseStandard' | 'youTubeThumbnailUseHigh' | 'YouTubeIsNotAvailable'


/**
 * 筆記卡牌錯誤型別
 *
 *      dateInvalid: 日期格式不正確
 *      matDatepickerParse: 內建格式驗證方法
 *
 */
export type DateValidationErrorsType = 'invalidDate' | 'matDatepickerParse';


/**
 * 筆記卡牌錯誤型別
 */
export type NoteValidationErrorsType = ValidationErrorsType | DateValidationErrorsType;


/**
 * Youtube 驗證錯誤格式
 */
export type YoutubeValidationErrors<T = string> = {
    [key in YoutubeValidationErrorsType]?: T;
}


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


/**
 * 筆記卡牌錯誤格式
 */
export type NoteValidationErrors<T = string> = {
    [key in NoteValidationErrorsType]?: T;
}
