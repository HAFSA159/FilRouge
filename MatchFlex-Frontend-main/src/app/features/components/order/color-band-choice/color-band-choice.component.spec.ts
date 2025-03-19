import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorBandChoiceComponent } from './color-band-choice.component';

describe('ColorBandChoiceComponent', () => {
  let component: ColorBandChoiceComponent;
  let fixture: ComponentFixture<ColorBandChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorBandChoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorBandChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
