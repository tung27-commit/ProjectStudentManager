<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $student_code = $_POST['student_code'];
    $subjects = explode(',', $_POST['subjects']);

    // Xóa các đăng ký cũ
    $sql = "DELETE FROM student_subjects WHERE student_code = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $student_code);
    $stmt->execute();

    // Thêm các đăng ký mới
    $sql = "INSERT INTO student_subjects (student_code, subject_id) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    foreach ($subjects as $subject_id) {
        $stmt->bind_param("si", $student_code, $subject_id);
        $stmt->execute();
    }

    echo "Đăng ký môn học thành công!";
    $stmt->close();
    $conn->close();
}
?>