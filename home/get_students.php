<?php
require_once 'config.php';

$search = isset($_GET['search']) ? $_GET['search'] : '';

$sql = "SELECT * FROM students";
if ($search) {
    $search = "%{$search}%";
    $sql .= " WHERE student_code LIKE ? OR name LIKE ? OR course LIKE ? OR faculty LIKE ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $search, $search, $search, $search);
} else {
    $stmt = $conn->prepare($sql);
}

$stmt->execute();
$result = $stmt->get_result();

$output = '';
$stt = 1;

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $dob = date('d/m/Y', strtotime($row['dob']));
        
        $output .= "<tr>
            <td>{$stt}</td>
            <td>{$row['student_code']}</td>
            <td>{$row['name']}</td>
            <td>{$dob}</td>
            <td>{$row['course']}</td>
            <td>{$row['faculty']}</td>
        </tr>";
        $stt++;
    }
} else {
    $output = "<tr><td colspan='6'>Không có dữ liệu</td></tr>";
}

echo $output;
$stmt->close();
$conn->close();
?>
