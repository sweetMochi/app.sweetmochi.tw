import { TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { YoutubeValidatorService } from './youtube-validator.service';
import { YoutubeService } from './youtube.service';

describe('YoutubeValidatorService', () => {
    let service: YoutubeValidatorService;
    let youtubeServiceSpy: jasmine.SpyObj<YoutubeService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('YoutubeService', ['id', 'thumbnailCheck']);

        TestBed.configureTestingModule({
            providers: [
                YoutubeValidatorService,
                { provide: YoutubeService, useValue: spy }
            ]
        });

        service = TestBed.inject(YoutubeValidatorService);
        youtubeServiceSpy = TestBed.inject(YoutubeService) as jasmine.SpyObj<YoutubeService>;
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

        // it('should return null for valid YouTube URL', () => {
        //     const control = { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } as AbstractControl;
        //     youtubeServiceSpy.id.and.returnValue('dQw4w9WgXcQ');
        //     const result = service.url(control);
        //     expect(result).toBeNull();
        // });
    });

    describe('video async validator', () => {
        it('should return error for invalid YouTube ID', async () => {
            const control = { value: 'https://www.youtube.com/watch?v=invalid' } as AbstractControl;
            youtubeServiceSpy.id.and.returnValue('invalid');
            youtubeServiceSpy.thumbnailCheck.and.returnValue(Promise.reject('error'));
            const result = await service.video(control);
            expect(result).toEqual({ 'YouTubeIsNotAvailable': 'YouTube is not available' });
        });

        // it('should return null for valid YouTube video', async () => {
        //     const control = { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } as AbstractControl;
        //     youtubeServiceSpy.id.and.returnValue('dQw4w9WgXcQ');
        //     youtubeServiceSpy.thumbnailCheck.and.returnValue(Promise.resolve('maxres'));
        //     const result = await service.video(control);
        //     expect(result).toBeNull();
        // });

        // it('should return standard thumbnail error', async () => {
        //     const control = { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } as AbstractControl;
        //     youtubeServiceSpy.id.and.returnValue('dQw4w9WgXcQ');
        //     youtubeServiceSpy.thumbnailCheck.and.returnValue(Promise.resolve('standard'));
        //     const result = await service.video(control);
        //     expect(result).toEqual({ 'youTubeThumbnailUseStandard': true });
        // });

        // it('should return high thumbnail error', async () => {
        //     const control = { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } as AbstractControl;
        //     youtubeServiceSpy.id.and.returnValue('dQw4w9WgXcQ');
        //     youtubeServiceSpy.thumbnailCheck.and.returnValue(Promise.resolve('high'));
        //     const result = await service.video(control);
        //     expect(result).toEqual({ 'youTubeThumbnailUseHigh': true });
        // });
    });
});
