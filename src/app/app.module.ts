import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';


import { DATE_FORMATS } from '../root/const/base.const';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { noteInterceptor } from '../root/interceptor/note.interceptor';
import { testInterceptor } from '../root/interceptor/test.interceptor';
import { RootService } from '../root/root.service';
import { HttpService } from '../root/service/http.service';
import { WidgetService } from '../root/service/widget.service';
import { PopupConfirmComponent } from '../root/widget/popup-confirm/popup-confirm.component';


import { YoutubeService } from './base/service/youtube.service';
import { YoutubeValidatorService } from './base/validator/youtube-validator.service';
import { NoteBaseCardComponent } from './page/note/base/note-base-card/note-base-card.component';
import { NoteBaseEditComponent } from './page/note/base/note-base-edit/note-base-edit.component';
import { AppNoteListComponent } from './page/note/note-list/note-list.component';
import { AppNotePageComponent } from './page/note/note-page/note-page.component';
import { AppSettingComponent } from './page/setting/setting.component';
import { AppYoutubeThumbnailComponent } from './page/youtube-thumbnail/youtube-thumbnail.component';



@NgModule({
	declarations: [
		AppComponent,
		NoteBaseCardComponent,
		NoteBaseEditComponent,
		AppNotePageComponent,
		AppNoteListComponent,
		AppSettingComponent,
		AppYoutubeThumbnailComponent,
		PopupConfirmComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatCardModule,
		MatChipsModule,
		MatDatepickerModule,
		MatDialogModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatSlideToggle,
		MatSidenavModule,
		MatSnackBarModule,
		MatToolbarModule,
	],
	exports: [
		MatButtonModule,
		MatCardModule,
		MatChipsModule,
		MatDatepickerModule,
		MatDialogModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatSlideToggle,
		MatSidenavModule,
		MatSnackBarModule,
		MatToolbarModule,
	],
	providers: [
		RootService,
		HttpService,
		WidgetService,
		YoutubeService,
		YoutubeValidatorService,
		provideAnimationsAsync(),
		provideMomentDateAdapter(DATE_FORMATS),
		provideHttpClient(
			withInterceptors([
				noteInterceptor,
				testInterceptor,
			])
		),
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
