import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageSettingComponent } from './page/setting/setting.component';
import { PageYoutubeThumbnailComponent } from './page/youtube-thumbnail/youtube-thumbnail.component';
import { TestInterceptor } from '../base/interceptor/test.interceptor';



@NgModule({
	declarations: [
		AppComponent,
		PageYoutubeThumbnailComponent,
		PageSettingComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatToolbarModule,
		MatSlideToggle,
		MatSidenavModule,
		MatSnackBarModule,
		MatButtonModule,
		MatListModule,
		MatInputModule,
		MatCardModule,
		MatFormFieldModule
	],
	exports: [
		MatIconModule,
		MatButtonModule,
		MatToolbarModule,
		MatSlideToggle,
		MatSidenavModule,
		MatSnackBarModule,
		MatButtonModule,
		MatListModule,
		MatInputModule,
		MatCardModule,
		MatFormFieldModule
	],
	providers: [
		provideAnimationsAsync(),
		provideHttpClient(
			withInterceptorsFromDi()
		),
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TestInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
