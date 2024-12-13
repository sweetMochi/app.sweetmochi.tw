import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { API_URL } from '../const/base.const';
import { YOUTUBE_API } from '../const/youtube.const';
import { AppLocal } from '../method/local';



/**
 * 測試用攔截器
 */
export const testInterceptor: HttpInterceptorFn = (req, next) => {

    /** 本地方法 */
    let local = AppLocal;

    // 預設返回正常 http 請求
    let rq = next(req);

    switch (true) {
        // 如果本地儲存 API 離線測試條件為開啟
        // 且
        // 請求網址包含 API 網址
        case local.get<boolean>('apiOffline') && req.url.includes(API_URL):
            rq = throwError(
                () => new HttpErrorResponse(
                    {
                        error: 'Test "apiOffline" Error',
                        status: 403
                    }
                )
            );
            break;

        // 如果本地儲存 Youtube 離線測試條件為開啟
        // 並
        // 請求網址包含 YouTube API 網址
        case local.get<boolean>('youTubeOffline') && req.url.includes(YOUTUBE_API):
            rq = throwError(
                () => new HttpErrorResponse(
                    {
                        error: 'Test "youTubeOffline" Error',
                        status: 403
                    }
                )
            );
            break;
    }


    return rq;

}
