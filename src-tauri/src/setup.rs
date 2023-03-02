use std::{env, fs};

use tauri::api::path::home_dir;

pub fn create_dir() {
    // FIXME 在 windows 下会打包 C 盘主目录下
    let mut home_path = home_dir().unwrap();

    home_path.push("/.eTool");

    let result = fs::create_dir(std::path::PathBuf::from(home_path));
    match result {
        Ok(()) => println!("文件夹创建成功"),
        Err(error) => println!("文件夹创建失败: {}", error),
    }
}
