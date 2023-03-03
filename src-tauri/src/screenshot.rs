use std::{env, fs, path};

use screenshots::Screen;
use tauri::{PhysicalPosition, api::path::home_dir};

// 截屏
pub fn capture_full(position: PhysicalPosition<i32>) -> Vec<u8> {
    let screen = Screen::from_point(position.x, position.y).unwrap();

    let image = screen.capture().unwrap();
    let buffer = image.buffer();
    let home_path = home_dir().unwrap();

    let path = format!("{}/.eTool/screenshot.png", home_path.display());
    println!("{}", path);
    fs::write(path, buffer).unwrap();
    return buffer.to_vec();
}

// 区域截屏
pub fn capture_region(x: i32, y: i32, width: u32, height: u32) -> Vec<u8> {
    let screen = Screen::from_point(x, y).unwrap();

    let image = screen.capture_area(x, y, width, height).unwrap();
    let buffer = image.buffer();
    let home_path = home_dir().unwrap();

    let path = format!("{}/.eTool/screenshot.png", home_path.display());
    println!("{}", path);
    fs::write(path, buffer).unwrap();
    return buffer.to_vec();
}
