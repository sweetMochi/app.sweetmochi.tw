import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { apiYoutube, WidgetService } from '../../../root';
import { YoutubeService } from './youtube.service';
import { ApiYoutubeVideo } from './youtube.type';

describe('YoutubeService', () => {
	let service: YoutubeService;
	let httpTesting: HttpTestingController;
	let widgetServiceSpy: { snackBar: ReturnType<typeof vi.fn> };

	/** 測試用影片 ID */
	const id = 'dQw4w9WgXcQ';

	/** 建立縮圖資料 */
	const thumbnail = (url: string) => ({ url, width: 0, height: 0 });

	/** 建立主機回傳影片資料 */
	const video = (thumbnails: ApiYoutubeVideo['thumbnails']): ApiYoutubeVideo => ({
		title: 'Test video',
		thumbnails,
	});

	/** 攔截影片請求 */
	const expectVideoRequest = () => httpTesting.expectOne(`${apiYoutube}?id=${id}`);

	beforeEach(() => {
		widgetServiceSpy = { snackBar: vi.fn() };

		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(),
				provideHttpClientTesting(),
				{ provide: WidgetService, useValue: widgetServiceSpy },
			],
		});

		service = TestBed.inject(YoutubeService);
		httpTesting = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		// 確認沒有未處理的請求
		httpTesting.verify();
	});

	describe('id', () => {
		it('should get ID from watch URL', () => {
			expect(service.id(`https://www.youtube.com/watch?v=${id}`)).toBe(id);
		});

		it('should get ID from short URL', () => {
			expect(service.id(`https://youtu.be/${id}`)).toBe(id);
		});
	});

	describe('thumbnailUrl', () => {
		it('should return maxres thumbnail by default', () => {
			expect(service.thumbnailUrl(id)).toBe(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
		});

		it('should return empty string for unsupported size', () => {
			expect(service.thumbnailUrl(id, 'default')).toBe('');
		});
	});

	describe('thumbnailCheck', () => {
		it('should request host API with video ID', async () => {
			const result = service.thumbnailCheck(id);

			const req = expectVideoRequest();
			expect(req.request.method).toBe('GET');
			req.flush({ code: '', data: video({ maxres: thumbnail('maxres.jpg') }) });

			await expect(result).resolves.toBe('maxres');
		});

		it('should resolve largest available thumbnail and save video data', async () => {
			const data = video({ standard: thumbnail('sd.jpg'), high: thumbnail('hq.jpg') });
			const result = service.thumbnailCheck(id);

			expectVideoRequest().flush({ code: '', data });

			await expect(result).resolves.toBe('standard');
			expect(service.getVideoSave()).toEqual(data);
		});

		it('should reject when API returns error code', async () => {
			const result = service.thumbnailCheck(id);

			expectVideoRequest().flush({ code: '3002', desc: 'YouTube video not available' });

			await expect(result).rejects.toThrow('YouTube video not available');
			expect(service.getVideoSave()).toBeUndefined();
		});

		it('should reject when no supported thumbnail exists', async () => {
			const result = service.thumbnailCheck(id);

			expectVideoRequest().flush({ code: '', data: video({ default: thumbnail('default.jpg') }) });

			await expect(result).rejects.toThrow('YouTube video thumbnail is not available');
		});

		it('should reject and show message when request fails', async () => {
			const result = service.thumbnailCheck(id);

			// 400 不在重試狀態碼內，不會重試
			expectVideoRequest().flush(
				{ code: '3001', desc: 'Invalid YouTube video ID' },
				{ status: 400, statusText: 'Bad Request' },
			);

			await expect(result).rejects.toThrow('YouTube API is not available');
			expect(widgetServiceSpy.snackBar).toHaveBeenCalledWith('YouTube is not available');
		});
	});
});
