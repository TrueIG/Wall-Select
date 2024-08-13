use crate::prelude::{p, pb};
use std::fs::create_dir_all;
use std::process::Command;
use tauri::api::dir::is_dir;

fn create_symlink(original_path: &str, link_output: &str) {
    if !is_dir(link_output).unwrap_or(false) {
        Command::new("ln")
            .args(["-s", original_path, link_output])
            .output()
            .expect("failed to execute process");
    }
}

pub fn create_cache_wallpaper_folder(app_cache: pb, wallpapers_folder_name: &str, path: &str) {
    create_symlink(
        path,
        app_cache
            .join(format!("{}/{}", wallpapers_folder_name, "link"))
            .to_str()
            .unwrap(),
    );
    mogrify(path, &app_cache.join(wallpapers_folder_name));
}

pub fn create_dir(dir: &p) -> tauri::Result<()> {
    if !dir.exists() {
        create_dir_all(dir)?;
    }
    Ok(())
}

pub fn get_cache_folder(app_handle: tauri::AppHandle) -> Result<pb, Box<dyn std::error::Error>> {
    let app_cache = app_handle
        .path_resolver()
        .app_cache_dir()
        .ok_or("Failed to get app cache directory")?;
    Ok(app_cache)
}

pub fn mogrify(base_dir_path: &str, path: &p) {
    let file_types = ["*.png", "*.jpg"];
    for file_type in file_types {
        Command::new("mogrify")
            .current_dir(base_dir_path)
            .args(["-resize", "10%", "-path", path.to_str().unwrap(), file_type])
            .spawn()
            .expect("failed to execute process");
    }
}
