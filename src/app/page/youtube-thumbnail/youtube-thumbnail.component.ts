import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { filter, Subject, takeUntil } from 'rxjs';
import { AppValidators, RootModule, UrlValidationErrorsType, ValidationErrorsType } from '../../../root';
import { FormComponent, YoutubeService, YouTubeThumbnailList, youtubeUrl, youtubeUrlShort, YoutubeValidationErrorsType, YoutubeValidatorService } from '../../base';



/**
 * 取得 YouTube 預覽圖功能
 */
@Component({
	selector: 'page-youtube-thumbnail',
	imports: [
		RootModule
	],
	templateUrl: './youtube-thumbnail.component.html',
	styleUrl: './youtube-thumbnail.component.less'
})
export class AppYoutubeThumbnailComponent extends FormComponent {
	// 不使用 constructor 方式注入
	youtubeService = inject(YoutubeService);
	youtubeValidator = inject(YoutubeValidatorService);

	/** 取消訂閱 */
	private unsubscribe = new Subject();

	/** 圖片路徑 */
	imgSrc = '';

	/** 短網址 */
	shortUrl = '';

	/** 網址 */
	webUrl = '';

	/** 標題名稱 */
	videoTitle = '';

	/** 驗證表單 */
	formGroup = this.formBuilder.group(
		{
			/** 網址 */
			url: [
				'',
				[Validators.required, AppValidators.url, this.youtubeValidator.url],
				[this.youtubeValidator.video]
			]
		},
		{
			updateOn: 'submit'
		}
	);


	init(): void {
		this.formStatusChanges();
	}


	/**
	 * 關注表單狀態變更事件
	 */
	formStatusChanges(): void {
		this.formGroup.statusChanges.pipe(
			// 關注取消訂閱事件
			takeUntil(this.unsubscribe),
			// 僅驗證通過與為通過狀態
			filter(data => (data === 'INVALID' || data === 'VALID'))
		).subscribe(data => {

			// 取得影片 ID
			let id = this.youtubeService.id(this.formGroup.value.url || '');

			// 驗證通過
			if (data === 'VALID') {

				// 使用最高解析度預覽圖
				this.initVideoInfo(id);

			} else {

				// 如果圖片使用標準畫質
				if (this.formError('youTubeThumbnailUseStandard')) {
					this.formGroup.controls.url.setErrors(null);
					this.initVideoInfo(id, 'standard');
					return;
				}

				// 如果圖片使用高畫質
				if (this.formError('youTubeThumbnailUseHigh')) {
					this.formGroup.controls.url.setErrors(null);
					this.initVideoInfo(id, 'high');
					return;
				}

				// 清除當前圖片
				this.imgSrc = '';

			}

		});

	}


	/**
	 * 初始畫影片資料
	 * @param id 影片 ID
	 * @param size 影片預覽圖大小
	 */
	initVideoInfo(id: string, size?: YouTubeThumbnailList): void {
		this.imgSrc = this.youtubeService.thumbnailUrl(id, size);

		// 網址範例：
		// youtu.be/92tvv7PgKeI
		// youtube.com/watch?v=92tvv7PgKeI
		this.shortUrl = `${youtubeUrlShort}/${id}`;
		this.webUrl = `${youtubeUrl}/watch?v=${id}`;

		this.videoTitle = this.youtubeService.getVideoSave()?.snippet.title || '';
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
		// 重置表單狀態
		this.formGroup.reset();
		// 移除清空時產生的錯誤訊息
		this.formGroup.controls.url.setErrors(null);
	}


	/**
	 * 使用者複製功能
	 * @param txt 文字
	 */
	userCopy(txt: string): void {
		if (!txt) {
			return;
		}
		navigator.clipboard.writeText(txt);
		super.widgetService.snackBar('Copy to clipboard!');
	}


	ngOnDestroy(): void {
		this.unsubscribe.next(null);
		this.unsubscribe.complete();
	}

}
