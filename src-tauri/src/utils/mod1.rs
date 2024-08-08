use crate::prelude::{p, pb};
use std::fs::create_dir_all;

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
