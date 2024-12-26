
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
        echo '<script>window.location.href = "Home.js";</script>';
    } else {
        echo "LỖI: " . $stmt->error;
    }
    $stmt->close();
    $conn->close();
}
?>