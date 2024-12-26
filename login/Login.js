document.getElementById('btn_login').addEventListener('click', function() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorDiv = document.getElementById('error');

  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  fetch('login.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          window.location.href = '/home/home.html'; 
      } else {
          errorDiv.textContent = data.message;
      }
  })
  .catch(error => {
      console.error('Error:', error);
      errorDiv.textContent = 'Đã xảy ra lỗi!';
  });
});
