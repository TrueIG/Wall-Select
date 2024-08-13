import { Component, OnInit } from '@angular/core';
import { FoldersService } from '@services/cache/folders.service';
import { invoke } from '@tauri-apps/api';
import { FileEntry } from '@tauri-apps/api/fs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  public folder!: FileEntry
  constructor(private foldersService: FoldersService) { }

  public ngOnInit(): void {
    this.foldersService.selectedFolderObservable.subscribe((folder) => {
      if (folder) this.folder = folder
    })
  }

  public selectWallpaper(wallpaperIndex: number) {
    if (!this.folder.children) return
    const wallpaper = `${this.folder.path}/link/${this.folder.children[wallpaperIndex].name}`
    invoke("change_wallpaper", { wallpaper: wallpaper })
  }

}
