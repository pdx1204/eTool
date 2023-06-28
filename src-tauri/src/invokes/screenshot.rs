use std::fs;

use screenshots::Screen;
use tauri::{api::path::home_dir, PhysicalPosition};

// 截屏
pub fn capture_full(position: PhysicalPosition<i32>) -> Vec<u8> {
    let screen = Screen::from_point(position.x, position.y).unwrap();

    let image = screen.capture().unwrap();
    let buffer = image.to_png().unwrap();
    let home_path = home_dir().unwrap();

    let path = format!("{}/.eTool/screenshot.png", home_path.display());
    println!("{}", path);
    fs::write(path, buffer.clone()).unwrap();
    return buffer.to_vec();
}

// 区域截屏
pub fn capture_region(x: i32, y: i32, width: u32, height: u32) -> Vec<u8> {
    let screen = Screen::from_point(x, y).unwrap();

    let image = screen.capture_area(x, y, width, height).unwrap();
    let buffer = image.to_png().unwrap();
    let home_path = home_dir().unwrap();

    let path = format!("{}/.eTool/screenshot.png", home_path.display());
    println!("{}", path);
    fs::write(path, buffer.clone()).unwrap();
    return buffer.to_vec();
}
