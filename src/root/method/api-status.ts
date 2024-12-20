import { HttpResponse } from '@angular/common/http';
import { DataApi, HttpRs } from '../type';
import { of } from 'rxjs';



/**
 * API 狀態
 */
export class ApiStatus implements DataApi {

    /** 錯誤代碼 */
    code = '';

    /** 錯誤說明 */
    desc = '';

    /** 回傳資料 */
    data: any = null;

    constructor(
        code: string,
        desc?: string,
        data?: any
    ) {
        this.code = code || '';
        this.desc = desc || '';
        this.data = data || null;
    }

    /**
     * 取得 HTTP 狀態
     */
    get http() {

        // 網路請求回覆格式
        let HttpRs: HttpRs = {
            status: 200,
            body: {
                code: this.code
            }
        };

        // 如果有錯誤說明
        if (this.desc) {
            HttpRs.body.desc = this.desc;
        }

        // 如果有回傳資料
        if (this.data) {
            HttpRs.body.data = this.data;
        }

        return of(new HttpResponse(HttpRs));
    }

}
