import { TestBed } from '@angular/core/testing';

import { TopHeadlinesService } from './top-headlines.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {TopHeadlinesComponent} from '../top-headlines/top-headlines.component';
import { HttpClientModule } from '@angular/common/http';

describe('TopHeadlinesService', () => {
  let service: TopHeadlinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    declarations: [TopHeadlinesComponent]
    imports: [HttpClientModule]
    service = TestBed.inject(TopHeadlinesService);
  });

  it('should be created', () => {
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
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('works', () => {
  });
});