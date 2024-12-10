import { ApiStatus as S } from '../type/base.type';


/**
 * 狀態物件列表
 */
export const API_STATUS = {
    OK: new S(''),
    NO_DATA: new S('1001', 'No data'),
    DATA_INVALID: new S('1002', 'Data invalid'),
    DATA_NOT_FOUND: new S('1003', 'Data not found'),
    ID_REQUIRED: new S('2001', 'ID required'),
    PAGE_NOT_FOUND: new S('9000', 'Page not found')
};
