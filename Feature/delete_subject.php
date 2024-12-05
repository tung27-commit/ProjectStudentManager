<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $subject_name = $_POST['subject_name'];

    // Kiểm tra xem môn học có tồn tại không
    $check_sql = "SELECT id FROM subjects WHERE subject_name = ?";
    $check_stmt = $conn->prepare($check_sql);
    $check_stmt->bind_param("s", $subject_name);
    $check_stmt->execute();
    $check_result = $check_stmt->get_result();

    if ($check_result->num_rows === 0) {
        echo "Lỗi: Môn học không tồn tại!";
    } else {
        // Lấy ID của môn học
        $subject_id = $check_result->fetch_assoc()['id'];

        // Xóa các đăng ký môn học liên quan trong bảng student_subjects
        $delete_registrations = "DELETE FROM student_subjects WHERE subject_id = ?";
        $reg_stmt = $conn->prepare($delete_registrations);
        $reg_stmt->bind_param("i", $subject_id);
        $reg_stmt->execute();

        // Xóa môn học
        $delete_subject = "DELETE FROM subjects WHERE subject_name = ?";
        $subject_stmt = $conn->prepare($delete_subject);
        $subject_stmt->bind_param("s", $subject_name);

        if ($subject_stmt->execute()) {
            echo "Xóa môn học thành công!";
        } else {
            echo "Lỗi: " . $subject_stmt->error;
        }

        $reg_stmt->close();
        $subject_stmt->close();
    }

    $check_stmt->close();
    $conn->close();
}
?>