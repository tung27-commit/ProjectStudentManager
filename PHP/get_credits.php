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

// Lấy dữ liệu môn học
$sql = "SELECT * FROM subjects";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $stt = 1;
    while($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>" . $stt++ . "</td>
                <td>" . $row['subject_name'] . "</td>
                <td>" . $row['credits'] . "</td>
                <td>" . $row['major'] . "</td>
              </tr>";
    }
} else {
    echo "<tr><td colspan='4'>Không có dữ liệu</td></tr>";
}

$conn->close();
?>