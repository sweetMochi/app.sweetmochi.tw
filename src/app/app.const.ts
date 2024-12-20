
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../root/service/http.service';
import { WidgetService } from '../root/service/widget.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { YoutubeService, YoutubeValidatorService } from './base/youtube';


/**
 * Provider 列表 (全域服務)
 */
export const appSetProvider = [
	HttpService,
	WidgetService,
	HttpClient,
	YoutubeService,
	YoutubeValidatorService
];


/**
 * Import 列表
 */
export const appSetImport = [
	RouterOutlet,
	MatButtonModule,
	MatIconModule,
	MatListModule,
	MatSidenavModule,
	MatToolbarModule,
	RouterLink
];
