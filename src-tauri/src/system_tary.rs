use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu};

pub fn create_system_tary() -> SystemTray {
    let system_tary = SystemTray::new().with_menu(create_system_tary_menu());
    return system_tary;
}

fn create_system_tary_menu() -> SystemTrayMenu {
    let quit = CustomMenuItem::new("quit".to_string(), "退出");
    let tray_menu = SystemTrayMenu::new().add_item(quit);

    return tray_menu;
}
