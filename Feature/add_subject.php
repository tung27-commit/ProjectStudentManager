
<?php
require_once 'config.php';
if ($_SERVER("REQUEST_METHOD" === 'POST')) {
    $subject_name = $_POST['subject_name'];
    $credits = $_POST['credits'];
    $major = $_POST['major'];
    
    $sql = "INSERT INTO subjects (subject_name, credits, major) VALUES ('?,?,?')";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $student_name, $credits, $major);

    if ($stmt->execute()) {
        echo "Thêm sinh viên thành công";
    } else {
        echo "LỖI: " . $stmt->error;
    }
    $stmt->close();
    $conn->close();
}
?>