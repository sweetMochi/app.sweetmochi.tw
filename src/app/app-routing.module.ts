import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageYoutubeThumbnailComponent } from './page/youtube-thumbnail/youtube-thumbnail.component';

const routes: Routes = [
	{
		path: 'youtube-thumbnail',
		component: PageYoutubeThumbnailComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
