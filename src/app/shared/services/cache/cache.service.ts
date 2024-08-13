import { Injectable } from '@angular/core';
import { convertFileSrc, invoke } from '@tauri-apps/api/tauri';
import { appCacheDir } from '@tauri-apps/api/path';
import log from 'loglevel';
import { UtilsService } from '../util/utils.service';
import { FoldersService } from './folders.service';
import { BaseDirectory, FileEntry, readDir, readTextFile, writeFile } from '@tauri-apps/api/fs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(private utils: UtilsService, private foldersService: FoldersService) {
    this.init();
  }

  private async init(): Promise<void> {
    await this.bootstrap();
  }

  public async cacheWallapersFolder(folder: string): Promise<void> {
    try {
      const hashName: string = await this.utils.hashString(folder);
      await invoke("create_wallpaper_folder", { wallpaperFolderName: hashName, path: folder });
      await this.utils.wait(10000);

      const files = await this.readFolderInCache(hashName);
      const formattedFiles = files.map(item => this.formatFiles(item)).filter(Boolean);
      const folderInfo = await this.createBasicFolderInfo(folder, hashName);
      formattedFiles.forEach(file => {
        if (file) folderInfo.children?.push(file);
      });
      await this.writeFolderInCache(hashName, folderInfo);
      this.foldersService.foldersInCache = folderInfo;
    } catch (error) {
      log.error(`Error caching folder \n ${folder} \n ${error}`);
      throw error;
    }
  }

  private async createBasicFolderInfo(folder: string, hashName: string): Promise<FileEntry> {
    return {
      path: `${await appCacheDir()}wallpapers/${hashName}`,
      name: folder.split('/').pop() ?? '',
      children: []
    };
  }

  private async writeFolderInCache(folder: string, content: FileEntry): Promise<void> {
    try {
      await writeFile(`wallpapers/${folder}/info.json`, JSON.stringify(content), { dir: BaseDirectory.AppCache });
    } catch (error) {
      log.error(`Error saving folder info \n folder: ${folder} \n ${error}`);
      throw error;
    }
  }

  private formatFiles(file: FileEntry): FileEntry | null {
    if (file.name === "link" || file.name === "info.json") return null;
    file.path = convertFileSrc(file.path);
    return file;
  }

  private async readFolderInCache(folder: string): Promise<FileEntry[]> {
    try {
      return await readDir(`wallpapers/${folder}`, { dir: BaseDirectory.AppCache });
    } catch (error) {
      log.error(`Error reading folder in cache \n folder: ${folder} \n ${error}`);
      throw error;
    }
  }

  private async bootstrap(): Promise<void> {
    try {
      const folders = await readDir("wallpapers", { dir: BaseDirectory.AppCache });
      const paths: string[] = folders.map(folder => folder.path);
      for (const path of paths) {
        this.foldersService.foldersInCache = JSON.parse(await readTextFile(`${path}/info.json`));
      }
    } catch (error) {
      log.error(`Error during bootstrap \n ${error}`);
      throw error;
    }
  }
}
