use std::{env, fs};

pub fn create_dir() {
    let mut home_path = env::var_os("HOME").unwrap();

    home_path.push("/.eTool");

    let result = fs::create_dir(home_path);

    match result {
        Ok(()) => println!("文件夹创建成功"),
        Err(error) => println!("文件夹创建失败: {}", error),
    }
}
