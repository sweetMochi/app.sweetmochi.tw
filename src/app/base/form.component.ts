import { Directive, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RootComponent } from '../../root';



/**
 * 表單功能
 */
@Directive()
export abstract class FormComponent extends RootComponent {
	private injectorFormBuilder = inject(FormBuilder);


	/**
	 * 繼承的子類別都必須使用 formGroup()
	 */
	abstract formGroup: FormGroup;


	/**
	 * 表單建構器
	 */
	get formBuilder() {
		return this.injectorFormBuilder;
	}

}
