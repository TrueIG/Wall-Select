use crate::utils::*;
use std::process::Command;

#[tauri::command]
pub fn create_wallpaper_folder(
    app_handle: tauri::AppHandle,
    wallpaper_folder_name: &str,
    path: &str,
) {
    let app_cache = get_cache_folder(app_handle).unwrap().join("wallpapers");
    let _ = create_dir(&app_cache.join(wallpaper_folder_name));
    create_cache_wallpaper_folder(app_cache, wallpaper_folder_name, path);
}

#[tauri::command]
pub fn change_wallpaper(wallpaper: &str) {
    Command::new("swww")
        .args([
            "img",
            wallpaper,
            "--transition-type",
            "any",
            "--transition-fps",
            "60",
        ])
        .output()
        .expect("failed to execute process");
}

#[tauri::command]
pub fn get_gtk_theme() -> String {
    let output = Command::new("gtk-theme").output().expect("failed");

    String::from_utf8(output.stdout).unwrap()
}
