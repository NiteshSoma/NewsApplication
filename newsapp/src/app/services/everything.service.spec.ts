import { TestBed } from '@angular/core/testing';



import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { EverythingService } from '../../app/services/everything.service';


describe('EverythingService', () => {
  let service: EverythingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EverythingService);
  });

  it('should be created', () => {
    const service: EverythingService = TestBed.get(EverythingService);
    expect(service).toBeTruthy();
  });
});

describe('HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('works', () => {
  });
});