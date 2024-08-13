#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod error;
mod events;
mod prelude;
mod utils;

use error::FsError;
use events::{change_wallpaper, create_wallpaper_folder, get_gtk_theme};
use prelude::FsError::BootstrapFailed;
use utils::{create_dir, get_cache_folder};

fn bootstrap(app_handle: tauri::AppHandle) -> Result<(), FsError> {
    let app_cache = get_cache_folder(app_handle)
        .map_err(|e| BootstrapFailed(format!("Failed to get cache folder: {}", e)))?;

    create_dir(&app_cache.join("wallpapers"))
        .map_err(|e| BootstrapFailed(format!("Failed to create directory: {}", e)))?;

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let _ = bootstrap(app.handle());
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            create_wallpaper_folder,
            change_wallpaper,
            get_gtk_theme
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
