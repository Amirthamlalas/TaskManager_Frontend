import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpTestingController=TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a post request to the login endpoint', () => {
    const testData = { username: 'testuser', password: 'testpassword' };
    service.userLogin(testData).subscribe();

    const req = httpTestingController.expectOne('http://localhost:8080/login');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testData);

    req.flush({});
  });

  it('should send a post request to the logout endpoint', () => {
    const testData = { id: 123 };
    service.userLogout(testData).subscribe();

    const req = httpTestingController.expectOne('http://localhost:8080/logout');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testData);

    req.flush({});
  });
});
