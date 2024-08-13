import { Injectable } from '@angular/core';
import { open } from '@tauri-apps/api/dialog';
import log from 'loglevel';

@Injectable({
  providedIn: 'root'
})
export class SelectFolderService {
  public async selectFolder(): Promise<string[] | void> {
    try {
      const select = await open({
        directory: true,
        multiple: true,
      })
      if (select) return select as string[]
    } catch (error) {
      log.error(`Error selecting folder: ${error}`);
      throw error
    }
  }

}
