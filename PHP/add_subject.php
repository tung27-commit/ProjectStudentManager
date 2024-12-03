<?php
$servername = "localhost";
$username = "root"; // Thay bằng username của bạn
$password = ""; // Thay bằng password của bạn
$dbname = "student_management"; // Thay bằng tên database của bạn

// Tạo kết nối
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

// Lấy dữ liệu từ form
$subject_name = $_POST['subject_name'];
$credits = $_POST['credits'];
$major = $_POST['major'];

// Thêm môn học vào database
$sql = "INSERT INTO subjects (subject_name, credits, major) VALUES ('$subject_name', $credits, '$major')";

if ($conn->query($sql) === TRUE) {
    echo "Thêm môn học thành công!";
} else {
    echo "Lỗi: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>