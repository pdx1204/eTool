use clipboard::{ClipboardContext, ClipboardProvider};
use tauri::PhysicalPosition;

mod screenshot;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
pub fn capture_full(position: PhysicalPosition<i32>, file_name: String) -> Vec<u8> {
    println!("x: {}, y: {}", position.x, position.y);
    let buffer = screenshot::capture_full(position, file_name);
    return buffer;
}

#[tauri::command]
pub fn capture_region(x: f32, y: f32, width: f32, height: f32, file_name: String) -> Vec<u8> {
    let buffer = Vec::new();
    if width <= 0.0 || height <= 0.0 {
        return buffer;
    }
    let buffer =
        screenshot::capture_region(x as i32, y as i32, width as u32, height as u32, file_name);
    let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();
    println!("{:?}", ctx.get_contents());
    ctx.set_contents(String::from_utf8_lossy(&buffer).to_string())
        .unwrap();
    return buffer;
}
