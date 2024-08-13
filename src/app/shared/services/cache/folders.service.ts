import { Injectable } from '@angular/core';
import { FileEntry } from '@tauri-apps/api/fs';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoldersService {
  private _foldersInCache = new BehaviorSubject<FileEntry[]>([])
  private _selectedFolder = new BehaviorSubject<FileEntry | null>(null);

  public set foldersInCache(folder: FileEntry) {
    const currentFolders = this._foldersInCache.value;
    this._foldersInCache.next([...currentFolders, folder]);
  }

  public get foldersInCache(): FileEntry[] {
    return this._foldersInCache.value;
  }

  public get foldersInCacheObservable(): Observable<FileEntry[]> {
    return this._foldersInCache.asObservable();
  }

  public set selectedFolder(folder: FileEntry) {
    this._selectedFolder.next(folder);
  }

  public get selectedFolder(): FileEntry | null {
    return this._selectedFolder.value;
  }

  public get selectedFolderObservable(): Observable<FileEntry | null> {
    return this._selectedFolder.asObservable();
  }
}
