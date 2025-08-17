/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RequestTransformService } from './request-transform.service';

describe('Service: RequestTransform', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestTransformService]
    });
  });

  it('should ...', inject([RequestTransformService], (service: RequestTransformService) => {
    expect(service).toBeTruthy();
  }));
});
