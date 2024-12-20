import { ApiStatus as S } from '../method';


/**
 * 狀態物件列表
 */
export const apiStatus = {
    /** 正常回覆 */
    ok: new S(''),
    /** 沒有資料可以顯示 */
    noData: new S('1001', 'No data'),
    /** 資料格式錯誤 */
    dataInvalid: new S('2001', 'Data invalid'),
    /** 需傳入 ID */
    idRequired: new S('2002', 'ID required'),
    /** 連線失敗 */
    connectFailure: new S('9001', 'Connect failure')
};
