import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { urlValidators, youTubeValidators } from '../base/validator/url';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {


	/** 圖片路徑 */
	imgSrc = '';

	/** 驗證表單 */
	formGroup = this.formBuilder.group(
		{
			url: ['', [Validators.required, urlValidators(), youTubeValidators()]]
		},
		{
			updateOn: 'submit'
		}
	);

	constructor(private formBuilder: FormBuilder) {}


	ngOnInit(): void {

	}


	/**
	 * 送出表單事件
	 */
	onSubmit(): void {

		if (this.formGroup.invalid) {
			return;
		}

		let url = new URL(this.formGroup.value.url || '');

		let id = url.searchParams.get('v');

		this.imgSrc = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

	}


}
