use crate::prelude::{p, pb};
use std::process::Command;
use tauri::api::dir::is_dir;

fn mogrify(base_dir_path: &str, path: &p) {
    let file_types = ["*.png", "*.jpg"];
    for file_type in file_types {
        Command::new("mogrify")
            .current_dir(base_dir_path)
            .args(["-resize", "10%", "-path", path.to_str().unwrap(), file_type])
            .spawn()
            .expect("failed to execute process");
    }
}

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
