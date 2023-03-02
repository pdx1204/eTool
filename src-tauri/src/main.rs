#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod screenshot;
mod setup;

use tauri::PhysicalPosition;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn capture_full(position: PhysicalPosition<i32>) -> Vec<u8> {
    println!("x: {}, y: {}", position.x, position.y);
    let buffer = screenshot::capture_full(position);
    return buffer;
}

#[tauri::command]
fn capture_region(x: f32, y: f32, width: f32, height: f32) -> Vec<u8> {
    let buffer = Vec::new();
    if width <= 0.0 || height <= 0.0 {
        return buffer;
    }
    let buffer = screenshot::capture_region(x as i32, y as i32, width as u32, height as u32);
    return buffer;
}

fn main() {
    tauri::Builder::default()
        .setup(|_app| {
            setup::create_dir();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![capture_full, capture_region])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
