import { NoteData } from '../../app/page/note/_base/note-base.type';



/**
 * 本地儲存
 */
export interface LocalStorage {
    /** API 服務離線測試 */
    apiOffline: boolean;
    /** Youtube API 離線測試 */
    youTubeOffline: boolean;
    /** 筆記本 */
    noteData: NoteData[];
}


/**
 * 本地儲存欄位
 */
export type LocalStorageKey = keyof LocalStorage;
