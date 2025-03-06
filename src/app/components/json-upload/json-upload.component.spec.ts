import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonUploadComponent } from './json-upload.component';

describe('JsonUploadComponent', () => {
  let component: JsonUploadComponent;
  let fixture: ComponentFixture<JsonUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
