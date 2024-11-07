import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../../base/service/http.service';
import { AppNote } from '../../../base/type/base.type';



/**
 * 記事本功能
 */
@Component({
	selector: 'page-note',
	templateUrl: './note.component.html',
	styleUrl: './note.component.less'
})
export class PageNoteComponent implements OnInit {


	constructor(
		private http: HttpService,
		private formBuilder: FormBuilder
	) { }


	ngOnInit(): void {
		this.http.get<AppNote[]>(
			'/data/note/get',
			data => {
				console.log(data);
			},
			data => {
				console.log(data);
			}
		);

	}


}
