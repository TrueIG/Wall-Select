import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWallpaperFolderComponent } from './select-wallpaper-folder.component';

describe('SelectWallpaperFolderComponent', () => {
  let component: SelectWallpaperFolderComponent;
  let fixture: ComponentFixture<SelectWallpaperFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectWallpaperFolderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectWallpaperFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
