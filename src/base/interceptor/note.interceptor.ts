import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalService } from '../service/local.service';
import { DATA_URL } from '../const/base.const';
import { of } from 'rxjs';
import { AppNote, DataApi, HttpMothod } from '../type/base.type';



/**
 * 記事本模擬非同步攔截器
 */
@Injectable()
export class DataNoteInterceptor implements HttpInterceptor {


    constructor(
        private local: LocalService
    ) { }


    intercept(req: HttpRequest<any>, next: HttpHandler) {

        // 預設返回正常 http 請求
        let rq = next.handle(req);

        // 資料網址
        // 範例：
        // /data/note/get
        // /data/note/get/1
        // /data/note/post/
        // /data/note/patch/1
        // /data/note/delete/1
        let dataUrl = req.url.split('/');

        if (req.url.includes(DATA_URL)) {
            // 去除 ['', 'data'] 以及其他參數
            dataUrl = dataUrl.slice(2, 5);
            // 解構賦值
            let [page, mothod, id] = dataUrl;

            // 顯示除錯訊息
            this.debug(...dataUrl as [string, string, string]);

            // 取得方法
            let httpMethod = mothod.toLowerCase() as HttpMothod;

            // 判斷方法回傳資料
            switch (httpMethod) {
                case 'get':

                    // 如果有 ID
                    if (id) {
                        // 從本地取得資料
                        let data: AppNote[] = this.local.get('appNote');
                        // 比對 ID 取得筆記
                        let target = data.find( item => item.id === id);
                        // 如果有取得對應筆記，則返回筆記資料
                        // 沒有資料則返回預設錯誤訊息
                        rq = target ? this.ok(target) : this.noData();

                    } else {
                        // 從本地取得資料
                        let data = this.local.get('appNote');
                        // 如果有取得筆記列表，則返回筆記列表
                        // 沒有資料則返回預設錯誤訊息
                        rq = data ? this.ok(data) : this.noData();
                    }

                    break;

                case 'post':

                    break;

                case 'patch':

                    break;

                case 'delete':

                    break;

            }

        }


        return rq;
    }


    /**
     * 回覆狀態
     * @param data 回覆資料
     */
    ok(data = {}) {
        let apiData: DataApi = {
            code: '',
            desc: '',
            data
        };
        return of(new HttpResponse({ status: 200, body: apiData }));
    }


    /**
     * 無資料狀態返回
     */
    noData() {
        let apiData: DataApi = {
            code: '1001',
            desc: 'No data'
        };
        return of(new HttpResponse({ status: 200, body: apiData }));
    }


    /**
     * 除錯記錄
     * @param page 功能
     * @param mothod 方法
     * @param id 編號
     */
    debug(page: string, mothod: string, id?: string): void {
        console.log(`Request page: ${page}`);
        console.log(`Request mothod: ${mothod}`);
        if (id) {
            console.log(`Request id: ${id}`);
        }
    }


}
