<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $student_code = $_POST['student_code'];

    $sql = "DELETE FROM students WHERE student_code = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $student_code);

    if ($stmt->execute()) {
        echo "Xóa sinh viên thành công!";
    } else {
        echo "Lỗi: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>