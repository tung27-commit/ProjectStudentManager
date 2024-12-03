<?php
require_once 'config.php';

$sql = "SELECT id, subject_name AS name, credits FROM subjects";
$result = $conn->query($sql);

$subjects = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $subjects[] = $row;
    }
}

echo json_encode($subjects);

$conn->close();
?>