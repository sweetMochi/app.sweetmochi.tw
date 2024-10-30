import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { API_URL } from '../const/base.const';
import { LocalService } from '../service/local.service';



/**
 * 測試用攔截器
 */
@Injectable()
export class TestInterceptor implements HttpInterceptor {


    constructor(
		private local: LocalService
    ) { }


    intercept(req: HttpRequest<any>, next: HttpHandler) {

        // 如果當前為 API 離線狀態並且請求網址為 API 網址
        if (this.local.get<boolean>('apiOffline') && req.url.includes(API_URL)) {
            return throwError(
                () =>
                    new HttpErrorResponse({
                        error: 'your error',
                        status: 403
                    }
                )
            );
        }

        return next.handle(req);
    }
}
