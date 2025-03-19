import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartBandListComponent } from './smart-band-list.component';

describe('SmartBandListComponent', () => {
  let component: SmartBandListComponent;
  let fixture: ComponentFixture<SmartBandListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartBandListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartBandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
