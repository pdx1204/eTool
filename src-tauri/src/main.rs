#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod invokes;
mod setup;
mod system_tary;

use tauri::{AppHandle, GlobalWindowEvent, Manager, SystemTrayEvent};

fn main() {
    let app = tauri::Builder::default();

    app.setup(|_app| {
        // 应用打开时做的一些操作
        setup::create_dir();
        Ok(())
    })
    // 配置窗口事件监听
    .on_window_event(handle_window_event)
    // 配置系统托盘
    .system_tray(system_tary::create_system_tary())
    // 配置系统托盘事件监听
    .on_system_tray_event(handle_system_tray_event)
    // 前端跟后端通信
    .invoke_handler(tauri::generate_handler![
        invokes::capture_full,
        invokes::capture_region
    ])
    .build(tauri::generate_context!())
    .expect("error while running tauri application")
    .run(|_app_handle, event| match event {
        tauri::RunEvent::ExitRequested { api, .. } => {
            // 允许后台运行
            api.prevent_exit();
        }
        _ => {}
    });
}

fn handle_system_tray_event(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::LeftClick { .. } => {
            // 显示窗口
            let window = app.get_window("main").unwrap();
            window.show().unwrap();
            window.set_focus().unwrap();
        }
        SystemTrayEvent::MenuItemClick { tray_id, id, .. } => {
            println!("{}, {}", tray_id, id);

            match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                _ => {}
            }
        }
        _ => {}
    }
}

fn handle_window_event(event: GlobalWindowEvent) {
    match event.event() {
        tauri::WindowEvent::CloseRequested { api, .. } => {
            println!("正在执行窗口关闭事件函数...");
            event.window().get_window("main").unwrap().hide().unwrap();
            // 允许后台运行
            api.prevent_close();
        }
        _ => {}
    }
}
