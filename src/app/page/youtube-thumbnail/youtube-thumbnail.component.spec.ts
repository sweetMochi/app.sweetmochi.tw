import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageYoutubeThumbnailComponent } from './youtube-thumbnail.component';

describe('PageYoutubeThumbnailComponent', () => {
  let component: PageYoutubeThumbnailComponent;
  let fixture: ComponentFixture<PageYoutubeThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageYoutubeThumbnailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageYoutubeThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
