import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@NgModule({
	declarations: [

	],
	imports: [
		ReactiveFormsModule,
		MatButtonModule,
		MatCardModule,
		MatChipsModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatSlideToggle,
	],
	exports: [
		ReactiveFormsModule,
		MatButtonModule,
		MatCardModule,
		MatChipsModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatSlideToggle,
	]
})
export class RootModule { }
