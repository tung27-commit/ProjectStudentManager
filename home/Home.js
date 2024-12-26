 // Thêm sự kiện cho tất cả các mục collapsible
 document.querySelectorAll('.collapsible, .collapsible-profile').forEach(collapsible => {
  collapsible.addEventListener('click', function () {
      const submenu = this.nextElementSibling; // Tìm submenu liền kề
      const toggleIcon = this.querySelector('.menu-toggle'); // Biểu tượng toggle

      // Hiển thị hoặc ẩn submenu
      if (submenu.style.display === 'block') {
          submenu.style.display = 'none';
          toggleIcon.textContent = '▼';
      } else {
          submenu.style.display = 'block';
          toggleIcon.textContent = '▲';
      }
  });
});

// Hiển thị popup
function showPopup() {
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('addStudentPopup').style.display = 'block';
}

// Đóng popup
function closePopup() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('addStudentPopup').style.display = 'none';
}

function showStudentManagement() {
  // Ẩn phần tìm kiếm và hi���n thị các nút Thêm, Sửa, Xóa
  document.getElementById('findSection').classList.add('hidden');
  document.getElementById('actionButtons').classList.remove('hidden');
  document.getElementById('student-table').classList.remove('hidden');
}

function addStudent() {
  alert('Thêm sinh viên mới!');
}

function editStudent() {
  alert('Chỉnh sửa thông tin sinh viên!');
}

function deleteStudent() {
  alert('Xóa sinh viên đã chọn!');
}

function searchStudent() {
  const searchValue = document.getElementById('textSearch').value;
  alert(`Tìm kiếm sinh viên với từ khóa: ${searchValue}`);
}

// JavaScript để hiển thị các nút "Thêm sinh viên", "Sửa sinh viên", "Xóa sinh viên"
document.addEventListener('DOMContentLoaded', function () {
  const manageStudentLink = document.querySelector('.menu-text'); // Đối tượng "Quản lý sinh viên"
  const buttonContainer = document.querySelector('.button'); // Đối tượng chứa các nút Thêm, Sửa, Xóa
  const buttonFind = document.querySelector('.find'); // Đối tượng chứa nút tìm kiếm

  // Lắng nghe sự kiện click vào "Quản lý sinh viên"
  manageStudentLink.addEventListener('click', function () {
      // Chuyển display của nút thành block khi nhấn vào "Quản lý sinh viên"
      if (buttonContainer.style.display === 'none' || buttonContainer.style.display === '') {
          buttonContainer.style.display = 'flex';
          buttonFind.style.display = 'none';
      }
  });
});
function toggleDarkMode() {
  // Chuyển đổi lớp "dark-mode" cho thẻ body
  document.body.classList.toggle('dark-mode');

  // Chuyển đổi Dark Mode cho các phần tử khác nếu cần
  const sidebar = document.querySelector('.sidebar');
  const table = document.querySelector('.table');

  sidebar.classList.toggle('dark-mode');
  table.classList.toggle('dark-mode');

  // Cập nhật văn bản của nút
  const button = document.getElementById('darkModeButton');
  if (document.body.classList.contains('dark-mode')) {
      button.textContent = 'Tắt Dark Mode';
  } else {
      button.textContent = 'Bật Dark Mode';
  }
}
