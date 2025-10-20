import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { API_CONFIG, ApiConfig } from '../config/environment.config';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;
  
  const mockApiConfig: ApiConfig = {
    baseUrl: 'http://localhost:3001',
    timeout: 30000
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpService,
        { provide: API_CONFIG, useValue: mockApiConfig }
      ]
    });
    
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform GET request with relative endpoint', () => {
    const mockData = { id: 1, name: 'Test' };
    const endpoint = '/api/test';
    const fullUrl = 'http://localhost:3001/api/test';

    service.get<typeof mockData>(endpoint).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(fullUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should perform GET request with absolute URL', () => {
    const mockData = { id: 1, name: 'Test' };
    const url = 'https://external-api.com/data';

    service.get<typeof mockData>(url).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should perform POST request', () => {
    const mockData = { id: 1, name: 'Test' };
    const postData = { name: 'Test' };
    const endpoint = '/api/test';
    const fullUrl = 'http://localhost:3001/api/test';

    service.post<typeof mockData>(endpoint, postData).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(fullUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(postData);
    req.flush(mockData);
  });

  it('should perform PUT request', () => {
    const mockData = { id: 1, name: 'Updated' };
    const putData = { name: 'Updated' };
    const url = 'http://localhost:3001/api/test/1';

    service.put<typeof mockData>(url, putData).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(putData);
    req.flush(mockData);
  });

  it('should perform PATCH request', () => {
    const mockData = { id: 1, name: 'Patched' };
    const patchData = { name: 'Patched' };
    const url = 'http://localhost:3001/api/test/1';

    service.patch<typeof mockData>(url, patchData).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(patchData);
    req.flush(mockData);
  });

  it('should perform DELETE request', () => {
    const url = 'http://localhost:3001/api/test/1';

    service.delete(url).subscribe();

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should handle HTTP errors', () => {
    const url = 'http://localhost:3001/api/test';
    const errorMessage = 'Server error';

    service.get(url).subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.message).toContain(errorMessage);
      }
    });

    const req = httpMock.expectOne(url);
    req.flush({ message: errorMessage }, { status: 500, statusText: 'Server Error' });
  });

  it('should pass withCredentials option', () => {
    const url = 'http://localhost:3001/api/test';

    service.get(url, { withCredentials: true }).subscribe();

    const req = httpMock.expectOne(url);
    expect(req.request.withCredentials).toBe(true);
    req.flush({});
  });
});
