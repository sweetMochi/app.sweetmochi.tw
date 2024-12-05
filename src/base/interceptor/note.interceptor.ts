import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_STATUS } from '../const/api-status.const';
import { DATA_URL } from '../const/base.const';
import { LocalService } from '../service/local.service';
import { ApiStatus, NoteData, NoteKey } from '../type/base.type';
import { HttpMothod } from '../type/http.type';



/**
 * 記事本模擬非同步攔截器
 */
@Injectable()
export class DataNoteInterceptor implements HttpInterceptor {

    /** POST 請求基本欄位 */
    rqBaseKey: NoteKey[] = ['title', 'content', 'date'];

    /** POST 請求新增欄位 */
    rqNewKey: NoteKey[] = ['title', 'content', 'date', 'image', 'tag'];


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

        // 符合資料網址格式
        // '/data' 網址開頭
        if (req.url.indexOf(DATA_URL) === 0) {
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
                    rq = this.getRq(id);
                    break;

                case 'post':
                    rq = this.postRq(req);
                    break;

                case 'patch':
                    rq = this.patchRq(id, req);
                    break;

                case 'delete':
                    rq = this.deleteRq(id);
                    break;

            }

        }

        return rq;
    }


    /**
     * 取得方法
     * @param id 編號
     */
    private getRq(id?: string): Observable<HttpEvent<any>> {
        // 如果有 ID
        if (id) {
            // 從本地取得資料
            let data: NoteData[] = this.local.get('noteData');
            // 比對 ID 取得筆記
            let target = data.find( item => item.id === id);
            // 如果有取得對應筆記，則返回筆記資料
            // 沒有資料則返回預設錯誤訊息
            return target ? this.ok(target) : API_STATUS.NO_DATA.http;
        }

        // 從本地取得資料
        let data = this.local.get('noteData');
        // 如果有取得筆記列表，則返回筆記列表
        // 沒有資料則返回預設錯誤訊息
        return data ? this.ok(data) : API_STATUS.NO_DATA.http;
    }


    /**
     * 新增方法
     * @param req HTTP 請求
     */
    private postRq(req: HttpRequest<any>) {

        // 檢查是否滿足基本欄位
        let ok = this.rqBaseKey.every(data => req.params.has(data));

        // 如果已滿足
        if (ok) {

            // 取得記事本列表
            let noteList = this.local.get<NoteData[]>('noteData');

            // 創建筆記物件
            let add = this.noteDataRq(req.params);
            console.log(`Request post data: `, add);

            // 如果筆記列表已存在且已經有資料
            if (noteList && noteList.length > 0) {
                // 新增當前資料
                noteList.push(add);
                // 更新本地資料
                this.local.set<NoteData[]>('noteData', noteList);
            } else {
                // 將新增資料當作是第一筆紀錄
                this.local.set<NoteData[]>('noteData', [add]);
            }

            // 回覆 OK
            return API_STATUS.OK.http;
        }

        // 資料格式錯誤
        return API_STATUS.DATA_INVALID.http;

    }


    /**
     * 編輯方法
     * @param id 編號
     * @param req HTTP 請求
     */
    private patchRq(id: string, req: HttpRequest<any>) {

        if (!id) {
            // 需填寫 ID
            return API_STATUS.ID_REQUIRED.http;
        }

        // 檢查是否滿足基本欄位
        let ok = this.rqBaseKey.every(data => req.params.has(data));

        if (!ok) {
            // 資料格式錯誤
            return API_STATUS.DATA_INVALID.http;
        }

        // 從本地取得資料
        let data: NoteData[] = this.local.get('noteData');

        // 比對 ID 序號取得筆記
        let index = data.findIndex( item => item.id === id);

        // 如果沒有取得序號
        if (index < 0) {
            // 找不到資料
            return API_STATUS.DATA_NOT_FOUND.http;
        }

        // 修改筆記物件
        let edit = this.noteDataRq(req.params, id);
        console.log(`Request patch data: `, edit);

        // 更新對應資料
        data[index] = edit;

        // 更新本地資料
        this.local.set<NoteData[]>('noteData', data);

        // 回覆 OK
        return API_STATUS.OK.http;

    }


    /**
     * 刪除方法
     * @param id 編號
     */
    private deleteRq(id: string) {

        if (!id) {
            // 資料格式錯誤
            return API_STATUS.DATA_INVALID.http;
        }

        console.log(`Del data: ${id}`);

        // 從本地取得資料
        let data: NoteData[] = this.local.get('noteData');

        // 比對 ID 序號取得筆記
        let index = data.findIndex( item => item.id === id);

        // 如果沒有取得序號
        if (index < 0) {
            // 找不到資料
            return API_STATUS.DATA_NOT_FOUND.http;
        }

        // 移除指定序號的資料
        data.splice(index, 1);

        // 更新本地資料
        this.local.set<NoteData[]>('noteData', data);

        // 回覆 OK
        return API_STATUS.OK.http;

    }


    /**
     * 記事本請求資料
     * @param params 參數
     * @param id 序號
     */
    private noteDataRq(params: HttpParams, id?: string): NoteData {
        return {
            id: id ? id : this.local.id(),
            title: params.get('title') || '',
            content: params.get('content') || '',
            date: params.get('date') || '',
            image: params.get('image') || '',
            // 陣列必須使用 getAll 方法
            tag: params.getAll('tag') || []
        };
    }


    /**
     * 回覆正常
     * @param data 回覆資料
     */
    ok(data = {}) {
        return new ApiStatus('', '', data).http;
    }


    /**
     * 除錯記錄
     * @param page 功能
     * @param mothod 方法
     * @param id 編號
     */
    debug(page: string, mothod: string, id?: string): void {
        console.log(`Request page: ${page} and use mothod: ${mothod}`);

        if (id) {
            console.log(`Request id: ${id}`);
        }
    }


}
