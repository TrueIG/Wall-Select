import { Component } from '@angular/core';
import { SelectFolderService } from '@services/util/select-folder.service';
import { CacheService } from '@services/cache/cache.service';

@Component({
  selector: 'app-add-folder',
  standalone: true,
  imports: [],
  templateUrl: './add-folder.component.html',
  styleUrl: './add-folder.component.scss'
})
export class AddFolderComponent {

  constructor(private SelectFolderService: SelectFolderService, private CacheService: CacheService) { }

  public async onClick(): Promise<void> {
    const folders = await this.SelectFolderService.selectFolder()
    if (folders) folders.forEach(async folder => await this.CacheService.cacheWallapersFolder(folder))
  }

}
