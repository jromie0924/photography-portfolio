import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselImageComponent } from './carousel-image.component';

describe('ImageComponent', () => {
  let component: CarouselImageComponent;
  let fixture: ComponentFixture<CarouselImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselImageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
