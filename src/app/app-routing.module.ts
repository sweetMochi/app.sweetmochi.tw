import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppNoteNewComponent } from './page/note/note-new/note-new.component';
import { AppNotePageComponent } from './page/note/note-page/note-page.component';
import { AppNoteComponent } from './page/note/note.component';
import { AppSettingComponent } from './page/setting/setting.component';
import { AppYoutubeThumbnailComponent } from './page/youtube-thumbnail/youtube-thumbnail.component';

const routes: Routes = [
	{
		path: 'note',
		children: [
			{
				path: '',
				component: AppNoteComponent
			},
			{
				path: 'new',
				component: AppNoteNewComponent
			},
			{
				path: ':id',
				component: AppNotePageComponent
			}
		]
	},
	{
		path: 'youtube-thumbnail',
		component: AppYoutubeThumbnailComponent
	},
	{
		path: 'setting',
		component: AppSettingComponent
	},
	{
		path: '**',
		redirectTo: 'youtube-thumbnail',
		pathMatch: 'full',
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
