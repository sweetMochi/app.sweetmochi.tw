import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { NoteData, NoteKey } from '../../../../../base/type/base.type';
import { NoteValidationErrors } from '../../../../../base/type/error.type';
import { HttpMothod } from '../../../../../base/type/http.type';
import { NoteBaseComponent } from '../note-base.component';



/**
 * 筆記編輯
 */
@Component({
	standalone: false,
	selector: 'note-edit',
	templateUrl: './note-edit.component.html',
	styleUrl: './note-edit.component.less'
})
export class NoteEditComponent extends NoteBaseComponent {
	@ViewChild('fileUpload') fileUpload: ElementRef | null = null;

	/** 傳入資料 */
	@Input() item: NoteData = {
		id: '',
		title: '',
		content: '',
		date: ''
	};

	/** 卡牌模式 */
	@Input() type: HttpMothod = 'post';

	/** 送出回調 */
	@Output() action = new EventEmitter<NoteData>();

	/** 錯誤回調 */
	@Output() error = new EventEmitter();

	/** 標籤 */
	tagList: string[] = [];

	/** 驗證表單 */
	formGroup = this.formBuilder.group(
		{
			/** 標題 */
			title: [
				'',
				[Validators.required]
			],
			/** 內容 */
			content: [
				'',
				[Validators.required]
			],
			/** 日期 */
			date: [
				'',
				[Validators.required]
			],
			/** 圖片 */
			image: [
				''
			],
			/** 標籤 */
			tag: [
				[] as string[]
			]
		},
		{
			updateOn: 'submit'
		}
	);


	init(): void {

		// 如果有傳入筆記序號
		if (this.item.id) {

			this.tagList = this.item.tag || [];

			// 設定表單預設值
			this.formGroup.setValue({
				title: this.item.title,
				content: this.item.content,
				date: this.item.date,
				image: this.item.image || '',
				tag: this.item.tag || []
			});
		}

	}


	/**
	 * 表單錯誤
	 * @param key 欄位
	 */
	formError(key: NoteKey): NoteValidationErrors | null | undefined {
		return this.formGroup.get(key)?.errors;
	}


	/**
	 * 更新日期
	 * @param data 日期輸入物件
	 */
	userDate(data: MatDatepickerInputEvent<moment.Moment>): void {

		// 取得日期物件
		let dateObj = data.value;

		// 轉換日期格式
		let val = dateObj?.format('YYYY-MM-DD');

		// 設定日期數值
		this.formGroup.controls.date.setValue(val || '');

	}


	/**
	 * 返回檔案 input HTML 結構
	 */
	get fileHtml(): HTMLInputElement {
		let html = this.fileUpload?.nativeElement as HTMLInputElement;
		return html;
	}


	/**
	 * 觸發上傳檔案事件
	 */
	userFile(): void {

		if (!this.fileHtml) {
			return;
		}

		// 觸發檔案上傳
		this.fileHtml.click();

	}


	/**
	 * 送出資料
	 */
	userSend(): void {

		// 表單驗證未通過
		if (this.formGroup.invalid) {
			return;
		}

		// 送出回調
		this.action.emit(this.rqData());

	}


	/**
	 * 請求資料
	 */
	rqData(): NoteData {
		return this.rqDataTrimEmpty({
			title: this.formGroup.value.title || '',
			content: this.formGroup.value.content || '',
			date: this.formGroup.value.date || '',
			image: this.formGroup.value.image || '',
			tag: this.tagList
		});
	}


	/**
	 * 選擇上傳檔案
	 * @param event 變更事件
	 */
	userSelectFile(event: Event): void {
		if (event.target instanceof HTMLInputElement) {
			let file: File = event.target.files![0];
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				this.formGroup.controls.image.setValue(reader.result as string);
			};
		}
	}


	/**
	 * 使用者移除上傳檔案
	 */
	userRemoveFile(): void {

		if (!this.fileHtml) {
			return;
		}

		// 清空上傳檔案
		this.fileHtml.value = '';
		// 清除表單輸入
		this.formGroup.controls.image.setValue('');

	}


	/**
	 * 移除標籤
	 * @param i 排序
	 */
	userRemoveTag(i: number): void {
		if (i < 0) {
			return;
		}

		this.tagList.splice(i, 1);
	}


	/**
	 * 增加標籤
	 * @param event 標籤事件
	 */
	userAddTag(event: MatChipInputEvent): void {
		let value = (event.value || '').trim();

		// 如果有輸入值
		if (value) {
			this.tagList.push(value);
		}

		// 清除輸入的標籤文字
		event.chipInput!.clear();
	}


	/**
	 * 刪除空白資料
	 * @param data 送出資料
	 */
	rqDataTrimEmpty(data: NoteData): NoteData {
		// 遞迴送出資料
		for (let key in data) {
			let target = data[key as keyof NoteData];
			// 如果資料為空或是沒有數量時
			if (
				target === ''
				||
				target === null
				||
				target === undefined
				||
				!target?.length
			) {
				// 刪除該欄位資料
				delete data[key as keyof NoteData];
			}
		}
		return data;
	}


}
