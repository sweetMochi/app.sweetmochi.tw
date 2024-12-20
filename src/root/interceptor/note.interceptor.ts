import { HttpEvent, HttpInterceptorFn, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NoteData, NoteKey } from '../../app/page/note/_base/note-base.type';
import { apiStatus, dataUrl } from '../const';
import { ApiStatus, AppLocal } from '../method';
import { HttpMothod } from '../type';




/**
 * 筆記本模擬資料庫攔截器
 */
export const noteInterceptor: HttpInterceptorFn = (req, next) => {

    /** POST 請求基本欄位 */
    let rqBaseKey: NoteKey[] = ['title', 'content', 'date'];

    /** 本地 */
    let local = AppLocal;

    // 預設返回正常 http 請求
    let rq = next(req);


    /**
     * 取得方法
     * @param id 編號
     */
    function getRq(id?: string): Observable<HttpEvent<any>> {

        // 如果有 ID
        if (id) {
            // 從本地取得資料
            let data: NoteData[] = local.get('noteData');
            // 比對 ID 取得筆記
            let target = data.find( item => item.id === id);
            // 如果有取得對應筆記，則返回筆記資料
            // 沒有資料則返回預設錯誤訊息
            return target ? ok(target) : apiStatus.noData.http;
        }

        // 從本地取得資料
        let data = local.get('noteData');
        // 如果有取得筆記列表，則返回筆記列表
        // 沒有資料則返回預設錯誤訊息
        return data ? ok(data) : apiStatus.noData.http;
    }


    /**
     * 新增方法
     * @param req HTTP 請求
     */
    function postRq(req: HttpRequest<any>) {

        // 檢查是否滿足基本欄位
        let ok = rqBaseKey.every(data => req.params.has(data));

        // 如果已滿足
        if (ok) {

            // 取得筆記本列表
            let noteList = local.get<NoteData[]>('noteData');

            // 創建筆記物件
            let add = noteDataRq(req.params);
            console.log(`Request post data: `, add);

            // 如果筆記列表已存在且已經有資料
            if (noteList && noteList.length > 0) {
                // 新增當前資料
                noteList.push(add);
                // 更新本地資料
                local.set<NoteData[]>('noteData', noteList);
            } else {
                // 將新增資料當作是第一筆紀錄
                local.set<NoteData[]>('noteData', [add]);
            }

            // 回覆 OK
            return apiStatus.ok.http;
        }

        // 資料格式錯誤
        return apiStatus.dataInvalid.http;

    }


    /**
     * 編輯方法
     * @param id 編號
     * @param req HTTP 請求
     */
    function patchRq(id: string, req: HttpRequest<any>) {

        if (!id) {
            // 需填寫 ID
            return apiStatus.idRequired.http;
        }

        // 檢查是否滿足基本欄位
        let ok = rqBaseKey.every(data => req.params.has(data));

        if (!ok) {
            // 資料格式錯誤
            return apiStatus.dataInvalid.http;
        }

        // 從本地取得資料
        let data: NoteData[] = local.get('noteData');

        // 比對 ID 序號取得筆記
        let index = data.findIndex( item => item.id === id);

        // 如果沒有取得序號
        if (index < 0) {
            // 找不到資料
            return apiStatus.noData.http;
        }

        // 修改筆記物件
        let edit = noteDataRq(req.params, id);
        console.log(`Request patch data: `, edit);

        // 更新對應資料
        data[index] = edit;

        // 更新本地資料
        local.set<NoteData[]>('noteData', data);

        // 回覆 OK
        return apiStatus.ok.http;

    }


    /**
     * 刪除方法
     * @param id 編號
     */
    function deleteRq(id: string) {

        if (!id) {
            // 資料格式錯誤
            return apiStatus.dataInvalid.http;
        }

        console.log(`Del data: ${id}`);

        // 從本地取得資料
        let data: NoteData[] = local.get('noteData');

        // 比對 ID 序號取得筆記
        let index = data.findIndex( item => item.id === id);

        // 如果沒有取得序號
        if (index < 0) {
            // 找不到資料
            return apiStatus.noData.http;
        }

        // 移除指定序號的資料
        data.splice(index, 1);

        // 更新本地資料
        local.set<NoteData[]>('noteData', data);

        // 回覆 OK
        return apiStatus.ok.http;

    }


    /**
     * 筆記本請求資料
     * @param params 參數
     * @param id 序號
     */
    function noteDataRq(params: HttpParams, id?: string): NoteData {
        return {
            id: id ? id : local.id(),
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
    function ok(data = {}) {
        return new ApiStatus('', '', data).http;
    }


    /**
     * 除錯記錄
     * @param page 功能
     * @param mothod 方法
     * @param id 編號
     */
    function debug(page: string, mothod: string, id?: string): void {
        console.log(`Request page: ${page} and use mothod: ${mothod}`);

        if (id) {
            console.log(`Request id: ${id}`);
        }
    }



    // 資料網址
    // 範例：
    // /data/note/get
    // /data/note/get/1
    // /data/note/post/
    // /data/note/patch/1
    // /data/note/delete/1
    let url = req.url.split('/');

        // 符合資料網址格式
        // '/data' 網址開頭
        if (req.url.indexOf(dataUrl) === 0) {
            // 去除 ['', 'data'] 以及其他參數
            url = url.slice(2, 5);
            // 解構賦值
            let [page, mothod, id] = url;

            // 顯示除錯訊息
            debug(...url as [string, string, string]);

            // 取得方法
            let httpMethod = mothod.toLowerCase() as HttpMothod;

            // 判斷方法回傳資料
            switch (httpMethod) {

                case 'get':
                    rq = getRq(id);
                    break;

                case 'post':
                    rq = postRq(req);
                    break;

                case 'patch':
                    rq = patchRq(id, req);
                    break;

                case 'delete':
                    rq = deleteRq(id);
                    break;

            }

        }


    return rq;
};
