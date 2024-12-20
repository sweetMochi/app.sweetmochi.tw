/// <reference types="gapi.youtube" />

/**
 * 縮圖列表
 */
export type YouTubeThumbnailList = keyof GoogleApiYouTubeVideoResource['snippet']['thumbnails'];


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
 * Youtube 驗證錯誤格式
 */
export type YoutubeValidationErrors<T = string> = {
    [key in YoutubeValidationErrorsType]?: T;
}
