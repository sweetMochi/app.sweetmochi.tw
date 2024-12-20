import { DateValidationErrorsType, ValidationErrorsType } from '../../../../root';



/**
 * 筆記本 - 回傳資料
 */
export interface NoteData {
    /** 編號 */
    id?: string;
    /** 標題 */
    title: string;
    /** 內文 */
    content: string;
    /** 圖片 */
    image?: string;
    /** 日期 */
    date: string;
    /** 標籤 */
    tag?: string[];
}


/**
 * 筆記本 - 欄位名稱
 */
export type NoteKey = keyof NoteData;


/**
 * 筆記卡牌錯誤型別
 */
export type NoteValidationErrorsType = ValidationErrorsType | DateValidationErrorsType;


/**
 * 筆記卡牌錯誤格式
 */
export type NoteValidationErrors<T = string> = {
    [key in NoteValidationErrorsType]?: T;
}
