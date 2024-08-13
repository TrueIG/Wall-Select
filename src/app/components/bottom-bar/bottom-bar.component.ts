import { Component } from '@angular/core';
import { AddFolderComponent } from "@components/add-folder/add-folder.component";
import { SelectWallpaperFolderComponent } from "@components/select-wallpaper-folder/select-wallpaper-folder.component";

@Component({
  selector: 'app-bottom-bar',
  standalone: true,
  imports: [AddFolderComponent, SelectWallpaperFolderComponent],
  templateUrl: './bottom-bar.component.html',
  styleUrl: './bottom-bar.component.scss'
})
export class BottomBarComponent {

}
