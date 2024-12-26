function Register() {
    const username = document.getElementById('input_acc').value;
    const password = document.getElementById('input_pass').value;
    const confirmPassword = document.getElementById('input_agPass').value;

    if (password !== confirmPassword) {
        alert('Mật khẩu không khớp!');
        return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    fetch('register.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Đăng ký thành công!');
            window.location.href = 'login.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi!');
    });
}