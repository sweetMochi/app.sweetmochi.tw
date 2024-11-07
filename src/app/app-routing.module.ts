import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageSettingComponent } from './page/setting/setting.component';
import { PageYoutubeThumbnailComponent } from './page/youtube-thumbnail/youtube-thumbnail.component';
import { PageNoteComponent } from './page/note/note.component';

const routes: Routes = [
	{
		path: '',
		component: PageNoteComponent
	},
	{
		path: 'note',
		component: PageNoteComponent
	},
	{
		path: 'youtube-thumbnail',
		component: PageYoutubeThumbnailComponent
	},
	{
		path: 'setting',
		component: PageSettingComponent
	},
	{
		path: '**',
		redirectTo: 'note',
		pathMatch: 'full',
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
