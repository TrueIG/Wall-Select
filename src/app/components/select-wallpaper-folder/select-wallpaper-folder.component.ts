import { Component, OnInit } from '@angular/core';
import { FileEntry } from '@tauri-apps/api/fs';
import { FoldersService } from '../../services/cache/folders.service';

@Component({
  selector: 'app-select-wallpaper-folder',
  standalone: true,
  imports: [],
  templateUrl: './select-wallpaper-folder.component.html',
  styleUrl: './select-wallpaper-folder.component.scss'
})
export class SelectWallpaperFolderComponent implements OnInit {
  public foldersInCache: FileEntry[] = [];
  private selectedFolder: FileEntry | null = null;

  constructor(private foldersService: FoldersService) { }

  public ngOnInit(): void {
    this.foldersService.foldersInCacheObservable.subscribe((folders) => {
      this.foldersInCache = folders;
      if (folders.length > 0) this.selectFolder(0);
    });
  }

  public onSelectFolder(event: Event): void {
    const selectedIndex = (event.target as HTMLSelectElement).selectedIndex;
    this.selectFolder(selectedIndex);
  }

  private selectFolder(index: number): void {
    this.selectedFolder = this.foldersInCache[index];
    this.foldersService.selectedFolder = this.selectedFolder;
  }
}
