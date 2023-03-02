use std::{env, fs, path};

use screenshots::Screen;
use tauri::PhysicalPosition;

// 截屏
pub fn capture_full(position: PhysicalPosition<i32>) -> Vec<u8> {
    let screen = Screen::from_point(position.x, position.y).unwrap();

    let image = screen.capture().unwrap();
    let buffer = image.buffer();
    let mut home_path = env::var_os("HOME").unwrap();

    home_path.push("/.eTool/screenshot.png");
    let path = format!("{}", home_path.to_str().unwrap());
    println!("{}", path);
    fs::write(path, buffer).unwrap();
    return buffer.to_vec();
}

// 区域截屏
pub fn capture_region(x: i32, y: i32, width: u32, height: u32) -> Vec<u8> {
    let screen = Screen::from_point(x, y).unwrap();

    let image = screen.capture_area(x, y, width, height).unwrap();
    let buffer = image.buffer();
    let mut home_path = env::var_os("HOME").unwrap();

    home_path.push("/.eTool/screenshot.png");
    let path = format!("{}", home_path.to_str().unwrap());
    println!("{}", path);
    fs::write(path, buffer).unwrap();
    return buffer.to_vec();
}
