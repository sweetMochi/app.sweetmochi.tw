import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { filter, Subject, takeUntil } from 'rxjs';
import { YOUTUBE_HOST_LIST } from '../base/const';
import { UrlValidationErrorsType, ValidationErrorsType, YoutubeValidationErrorsType } from '../base/error.type';
import { ValidatorService } from '../base/validator.service';
import { YoutubeService } from '../base/youtube.service';



@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {

	/** 取消訂閱 */
	private unsubscribe = new Subject();

	/** 圖片路徑 */
	imgSrc = '';

	/** 顯示圖片 */
	imgShow = false;

	/** 驗證表單 */
	formGroup = this.formBuilder.group(
		{
			/** 網址 */
			url: [
				'',
				[Validators.required, this.validatorService.url, this.validatorService.youTubeUrl],
				[this.validatorService.youTubeVideo]
			]
		},
		{
			updateOn: 'submit'
		}
	);

	constructor(
		private youtube: YoutubeService,
		private formBuilder: FormBuilder,
		private validatorService: ValidatorService,
	) {}


	ngOnInit(): void {

		// 關注表單狀態變更事件
		this.formGroup.statusChanges.pipe(
			// 關注取消訂閱事件
			takeUntil(this.unsubscribe),
			// 僅驗證通過與為通過狀態
			filter( data => (data === 'INVALID' || data === 'VALID'))
		).subscribe(data => {

			// 取得影片 ID
			let id = this.youtube.id(this.formGroup.value.url || '');

			// 驗證通過
			if (data === 'VALID') {
				// 使用最高解析度預覽圖
				this.imgSrc = this.youtube.thumbnailUrl(id);
			} else {

				// 如果為使用 HQ 預覽圖錯誤
				if (this.formError('youTubeThumbnailUseHq')) {

					this.formGroup.controls.url.setErrors(null);
					this.imgSrc = this.youtube.thumbnailUrl(id, 'hqdefault');
				} else {
					this.clearImg();
				}

			}

		});
	}


	/**
	 * 驗證表單錯誤訊息
	 * @param type 錯誤類型
	 */
	formError(type: ValidationErrorsType | UrlValidationErrorsType | YoutubeValidationErrorsType): string {
		return this.formGroup.controls.url.getError(type);
	}


	/**
	 * 顯示 YouTube 網域列表
	 */
	displayYoutubeHostList(): string {
		return YOUTUBE_HOST_LIST.join(', ');
	}


	/**
	 * 清空圖片
	 */
	clearImg(): void {
		this.imgSrc = '';
	}


	ngOnDestroy(): void {
		this.unsubscribe.next(null);
		this.unsubscribe.complete();
	}


}
