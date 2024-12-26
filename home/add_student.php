<?php
require_once 'config.php';

if($_SERVER("REQUEST_METHOD"=== 'POST')){
    $student_code = $_POST['student_code'];
    $name = $_POST['name'];
    $dob = $_POST['dob'];
    $course = $_POST['course'];
    $faculty = $_POST['faculty'];

    $sql = "INSERT INTO students ( student_code, name, dob, course, faculty) VALUES (?,?,?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss",$student_code,$name,$course,$faculty);

    if($stmt->execute()){
        echo "Thêm sinh viên thành công";
    }
    else{
        echo "LỖI: " . $stmt->error;
    }
    $stmt->close();
    $conn->close();
}
?>