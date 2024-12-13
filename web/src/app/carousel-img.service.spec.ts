import { TestBed } from '@angular/core/testing';

import { CarouselImgService } from './carousel-img.service';

describe('CarouselImgService', () => {
  let service: CarouselImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarouselImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
