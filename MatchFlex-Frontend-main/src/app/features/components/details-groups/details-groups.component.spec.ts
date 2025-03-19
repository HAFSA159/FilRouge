import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGroupsComponent } from './details-groups.component';

describe('DetailsGroupsComponent', () => {
  let component: DetailsGroupsComponent;
  let fixture: ComponentFixture<DetailsGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsGroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
