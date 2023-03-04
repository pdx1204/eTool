use tauri::PhysicalPosition;

mod screenshot;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
pub fn capture_full(position: PhysicalPosition<i32>) -> Vec<u8> {
    println!("x: {}, y: {}", position.x, position.y);
    let buffer = screenshot::capture_full(position);
    return buffer;
}

#[tauri::command]
pub fn capture_region(x: f32, y: f32, width: f32, height: f32) -> Vec<u8> {
    let buffer = Vec::new();
    if width <= 0.0 || height <= 0.0 {
        return buffer;
    }
    let buffer = screenshot::capture_region(x as i32, y as i32, width as u32, height as u32);
    return buffer;
}
