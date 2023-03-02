#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod screenshot;

use tauri::PhysicalPosition;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_position(position: PhysicalPosition<i32>) -> Vec<u8> {
    println!("x: {}, y: {}", position.x, position.y);
    let buffer = screenshot::screenshot(position);
    return buffer;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_position])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
