<?php
// Thông tin kết nối database
$db_host = "localhost";  // host database
$db_user = "root";      // username database
$db_pass = "";          // password database 
$db_name = "user_management"; // tên database của bạn

// Tạo kết nối
$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

// Kiểm tra kết nối
if (!$conn) {
    die(json_encode([
        "success" => false,
        "message" => "Kết nối database thất bại: " . mysqli_connect_error()
    ]));
}

// Set charset để hỗ trợ tiếng Việt
mysqli_set_charset($conn, "utf8mb4");