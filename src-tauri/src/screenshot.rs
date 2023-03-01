use screenshots::Screen;
use std::{fs, time::Instant};

pub fn screenshot() {
    let start = Instant::now();
    let screens = Screen::all().unwrap();

    for screen in screens {
        println!("capturer {screen:?}");
        let image = screen.capture().unwrap();
        let buffer = image.buffer();
        fs::write(format!("{}.png", screen.display_info.id), buffer).unwrap();
    }
    println!("运行耗时: {:?}", start.elapsed());
}
