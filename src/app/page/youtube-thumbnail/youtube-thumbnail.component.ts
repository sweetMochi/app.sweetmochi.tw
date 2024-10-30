import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { filter, Subject, takeUntil } from 'rxjs';
import { YOUTUBE_URL_SHORT } from '../../../base/const/youtube.const';
import { ValidatorService } from '../../../base/service/validator.service';
import { WidgetService } from '../../../base/service/widget.service';
import { YoutubeService } from '../../../base/service/youtube.service';
import { UrlValidationErrorsType, ValidationErrorsType, YoutubeValidationErrorsType } from '../../../base/type/error.type';
import { YouTubeThumbnailList } from '../../../base/type/youtube.type';



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

	/** 短網址 */
	shortUrl = '';

	/** 標題名稱 */
	videoTitle = '';

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
		private widget: WidgetService,
		private youtube: YoutubeService,
		private formBuilder: FormBuilder,
		private validatorService: ValidatorService
	) {}


	ngOnInit(): void {
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
			filter( data => (data === 'INVALID' || data === 'VALID'))
		).subscribe(data => {

			// 取得影片 ID
			let id = this.youtube.id(this.formGroup.value.url || '');

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
		this.imgSrc = this.youtube.thumbnailUrl(id, size);
		this.shortUrl = `${YOUTUBE_URL_SHORT}/${id}`;
		this.videoTitle = this.youtube.getVideoSave()?.snippet.title || '';
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
		this.widget.snackBar('Copy to clipboard!');
	}


	ngOnDestroy(): void {
		this.unsubscribe.next(null);
		this.unsubscribe.complete();
	}

}
