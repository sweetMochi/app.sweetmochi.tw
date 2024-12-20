import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { apiUrl, apiYoutube } from '../const';
import { AppLocal } from '../method';



/**
 * API 攔截器
 */
export const apiInterceptor: HttpInterceptorFn = (req, next) => {

    /** 本地方法 */
    let local = AppLocal;

    // 預設返回正常 http 請求
    let rq = next(req);

    switch (true) {
        // 如果本地儲存 API 離線測試條件為開啟
        // 且
        // 請求網址包含 API 網址
        case local.get<boolean>('apiOffline') && req.url.includes(apiUrl):
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
        case local.get<boolean>('youTubeOffline') && req.url.includes(apiYoutube):
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
