import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { filter, Subject, takeUntil } from 'rxjs';
import { UrlValidationErrorsType, ValidationErrorsType, YoutubeValidationErrorsType } from '../../../base/type/error.type';
import { ValidatorService } from '../../../base/service/validator.service';
import { YoutubeService } from '../../../base/service/youtube.service';



/**
 * 取得 YouTube 預覽圖功能
 */
@Component({
	selector: 'app-youtube-thumbnail',
	templateUrl: './youtube-thumbnail.component.html',
	styleUrl: './youtube-thumbnail.component.less'
})
export class PageYoutubeThumbnailComponent implements OnInit {

	/** 取消訂閱 */
	private unsubscribe = new Subject();

	/** 圖片路徑 */
	imgSrc = '';

	/** 圖片標題 */
	imgTitle = '';

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
		private validatorService: ValidatorService
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
				this.imgTitle = this.youtube.getVideoSave().snippet.title;
			} else {

				if (this.formError('youTubeThumbnailUseStandard')) {
					this.formGroup.controls.url.setErrors(null);
					this.imgSrc = this.youtube.thumbnailUrl(id, 'standard');
					this.imgTitle = this.youtube.getVideoSave().snippet.title;
					return;
				}

				if (this.formError('youTubeThumbnailUseHigh')) {
					this.formGroup.controls.url.setErrors(null);
					this.imgSrc = this.youtube.thumbnailUrl(id, 'high');
					this.imgTitle = this.youtube.getVideoSave().snippet.title;
					return;
				}

				this.clearImg();

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
