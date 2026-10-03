import { TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { YoutubeValidatorService } from './youtube-validator.service';
import { YoutubeService } from './youtube.service';
import { Mocked } from 'vitest';

describe('YoutubeValidatorService', () => {
	let service: YoutubeValidatorService;
	let youtubeServiceSpy: Mocked<Pick<YoutubeService, 'id' | 'thumbnailCheck'>>;

	beforeEach(() => {
		youtubeServiceSpy = {
			id: vi.fn<YoutubeService['id']>(),
			thumbnailCheck: vi.fn<YoutubeService['thumbnailCheck']>(),
		}

		TestBed.configureTestingModule({
			providers: [
				{ provide: YoutubeService, useValue: youtubeServiceSpy }
			]
		});

		service = TestBed.inject(YoutubeValidatorService);

	});

	describe('url validator', () => {
		it('should return null for invalid URL', () => {
			const control = { value: 'invalid-url' } as AbstractControl;
			const result = service.url(control);
			expect(result).toBeNull();
		});

		it('should return error for non-YouTube URL', () => {
			const control = { value: 'https://example.com' } as AbstractControl;
			const result = service.url(control);
			expect(result).toEqual({ 'invalidYouTubeUrl': 'Invalid YouTube URL' });
		});

		it('should return null for valid YouTube URL', () => {
			const control = { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } as AbstractControl;
			youtubeServiceSpy.id.mockReturnValue('dQw4w9WgXcQ');
			const result = service.url(control);
			expect(result).toBeNull();
		});
	});

	describe('video async validator', () => {
		it('should return error for invalid YouTube ID', async () => {
			const control = { value: 'https://www.youtube.com/watch?v=invalid' } as AbstractControl;
			youtubeServiceSpy.id.mockReturnValue('invalid');
			youtubeServiceSpy.thumbnailCheck.mockReturnValue(Promise.reject('error'));
			const result = await service.video(control);
			expect(result).toEqual({ 'YouTubeIsNotAvailable': 'YouTube is not available' });
		});

		it('should return null for valid YouTube video', async () => {
			const control = { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } as AbstractControl;
			youtubeServiceSpy.id.mockReturnValue('dQw4w9WgXcQ');
			youtubeServiceSpy.thumbnailCheck.mockResolvedValue('maxres')
			const result = await service.video(control);
			expect(result).toBeNull();
		});

		it('should return standard thumbnail error', async () => {
			const control = { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } as AbstractControl;
			youtubeServiceSpy.id.mockReturnValue('dQw4w9WgXcQ');
			youtubeServiceSpy.thumbnailCheck.mockResolvedValue('standard');
			const result = await service.video(control);
			expect(result).toEqual({ 'youTubeThumbnailUseStandard': true });
		});

		it('should return high thumbnail error', async () => {
			const control = { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } as AbstractControl;
			youtubeServiceSpy.id.mockReturnValue('dQw4w9WgXcQ');
			youtubeServiceSpy.thumbnailCheck.mockResolvedValue('high');
			const result = await service.video(control);
			expect(result).toEqual({ 'youTubeThumbnailUseHigh': true });
		});
	});
});
