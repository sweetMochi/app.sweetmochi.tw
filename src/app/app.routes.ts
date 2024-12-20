import { Routes } from '@angular/router';
import { AppNoteListComponent } from './page/note/note-list/note-list.component';
import { AppNotePageComponent } from './page/note/note-page/note-page.component';
import { AppSettingComponent } from './page/setting/setting.component';
import { AppYoutubeThumbnailComponent } from './page/youtube-thumbnail/youtube-thumbnail.component';


export const routes: Routes = [
    {
        path: 'note',
        children: [
            {
                path: '',
                component: AppNoteListComponent
            },
            {
                path: 'new',
                component: AppNotePageComponent
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
