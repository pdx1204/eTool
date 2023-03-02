use screenshots::Screen;
use tauri::PhysicalPosition;

pub fn screenshot(position: PhysicalPosition<i32>) -> Vec<u8> {
    let screen = Screen::from_point(position.x, position.y).unwrap();

    let image = screen.capture().unwrap();
    let buffer = image.buffer();
    return buffer.to_vec();
}
