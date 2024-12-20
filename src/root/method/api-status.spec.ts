import { ApiStatus } from './api-status';

describe('ApiStatus', () => {

    it('should create an instance', () => {
        expect(new ApiStatus('')).toBeTruthy();
    });

    it('should return HTTP status with code only', (done) => {
        const apiStatus = new ApiStatus('200');
        apiStatus.http.subscribe(response => {
            expect(response.status).toBe(200);

			let status = response.body!;
            expect(status.code).toBe('200');
            expect(status.desc).toBeUndefined();
            expect(status.data).toBeUndefined();
            done();
        });
    });

    it('should return HTTP status with code and description', (done) => {
        const apiStatus = new ApiStatus('200', 'Success');
        apiStatus.http.subscribe(response => {
            expect(response.status).toBe(200);

			let status = response.body!;
            expect(status.code).toBe('200');
            expect(status.desc).toBe('Success');
            expect(status.data).toBeUndefined();
            done();
        });
    });

    it('should return HTTP status with code, description, and data', (done) => {
        const apiStatus = new ApiStatus('200', 'Success', { key: 'value' });
        apiStatus.http.subscribe(response => {
            expect(response.status).toBe(200);

			let status = response.body!;
            expect(status.code).toBe('200');
            expect(status.desc).toBe('Success');
            expect(status.data).toEqual({ key: 'value' });
            done();
        });
    });
});
