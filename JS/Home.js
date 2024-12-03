document.addEventListener('DOMContentLoaded', function() {
    loadStudents();

    const searchButton = document.querySelector('.search-bar button');
    const searchInput = document.querySelector('.search-bar input');

    searchButton.addEventListener('click', function() {
        loadStudents(searchInput.value.trim());
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loadStudents(this.value.trim());
        }
    });

    // Thêm sinh viên
    document.querySelector('button.add-student').addEventListener('click', function() {
        document.getElementById('addStudentPopup').style.display = 'block';
    });

    document.getElementById('addStudentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const studentData = Object.fromEntries(formData.entries());

        fetch('add_student.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(studentData)
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            loadStudents();
            document.getElementById('addStudentPopup').style.display = 'none';
            this.reset();
        })
        .catch(error => console.error('Error:', error));
    });

    // Xóa sinh viên
    document.querySelector('button.delete-student').addEventListener('click', function() {
        document.getElementById('deleteStudentPopup').style.display = 'block';
    });

    document.getElementById('deleteStudentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const studentData = Object.fromEntries(formData.entries());

        fetch('delete_student.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(studentData)
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            loadStudents();
            document.getElementById('deleteStudentPopup').style.display = 'none';
            this.reset();
        })
        .catch(error => console.error('Error:', error));
    });

    // Thêm môn học
    document.querySelector('button.add-subject').addEventListener('click', function() {
        document.getElementById('addSubjectPopup').style.display = 'block';
    });

    document.getElementById('addSubjectForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const subjectData = Object.fromEntries(formData.entries());

        fetch('add_subject.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(subjectData)
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            loadCredits();
            document.getElementById('addSubjectPopup').style.display = 'none';
            this.reset();
        })
        .catch(error => console.error('Lỗi:', error));
    });

    // Xóa môn học
    document.querySelector('button.delete-subject').addEventListener('click', function() {
        document.getElementById('deleteSubjectPopup').style.display = 'block';
    });

    document.getElementById('deleteSubjectForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const subjectData = Object.fromEntries(formData.entries());

        fetch('delete_subject.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(subjectData)
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            loadCredits();
            document.getElementById('deleteSubjectPopup').style.display = 'none';
            this.reset();
        })
        .catch(error => console.error('Lỗi:', error));
    });

    // Đóng popup khi nhấn nút hủy
    document.querySelectorAll('.popup .cancel').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.popup').style.display = 'none';
        });
    });

    // Đóng popup khi click bên ngoài
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('popup')) {
            e.target.style.display = 'none';
        }
    });

    // Thêm sự kiện click cho các menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            // Xóa class active từ tất cả menu items
            document.querySelectorAll('.menu-item').forEach(i => {
                i.classList.remove('active');
            });

            // Thêm class active cho item được click
            this.classList.add('active');

            // Chuyển đổi hiển thị bảng dựa vào menu item được click
            const studentTable = document.getElementById('student-table');
            const creditManagementTable = document.getElementById('credit-management-table');

            if (this.querySelector('span').textContent.trim() === 'Quản lý Tín chỉ') {
                studentTable.style.display = 'none';
                creditManagementTable.style.display = 'block';
                loadCredits(); // Hàm để tải dữ liệu tín chỉ
            } else {
                studentTable.style.display = 'block';
                creditManagementTable.style.display = 'none';
            }
        });
    });

    // Xử lý đóng/mở sidebar
    const toggleBtn = document.querySelector('.toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    let isCollapsed = false;

    toggleBtn.addEventListener('click', () => {
        isCollapsed = !isCollapsed;
        sidebar.classList.toggle('collapsed');
    });

    // Thêm sự kiện click vào tên sinh viên
    document.getElementById('student-list').addEventListener('click', function(e) {
        if (e.target.tagName === 'TD' && e.target.cellIndex === 2) { // Kiểm tra nếu click vào cột tên
            const studentCode = e.target.parentElement.cells[1].textContent;
            loadSubjectsForRegistration(studentCode);
            document.getElementById('registerSubjectPopup').style.display = 'block';
        }
    });

    // Xử lý form đăng ký môn học
    document.getElementById('registerSubjectForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const selectedSubjects = [];
        formData.forEach((value, key) => {
            if (value === 'on') {
                selectedSubjects.push(key);
            }
        });

        fetch('register_subjects.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ student_code: currentStudentCode, subjects: selectedSubjects.join(',') })
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            document.getElementById('registerSubjectPopup').style.display = 'none';
        })
        .catch(error => console.error('Lỗi:', error));
    });

    // Hàm load danh sách môn học để đăng ký
    function loadSubjectsForRegistration(studentCode) {
        currentStudentCode = studentCode;
        fetch('get_subjects.php')
            .then(response => response.json())
            .then(subjects => {
                const checkboxesContainer = document.getElementById('subject-checkboxes');
                checkboxesContainer.innerHTML = '';
                subjects.forEach(subject => {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = subject.id;
                    checkbox.id = `subject-${subject.id}`;

                    const label = document.createElement('label');
                    label.htmlFor = `subject-${subject.id}`;
                    label.textContent = `${subject.name} (${subject.credits} tín chỉ)`;

                    checkboxesContainer.appendChild(checkbox);
                    checkboxesContainer.appendChild(label);
                    checkboxesContainer.appendChild(document.createElement('br'));
                });
            })
            .catch(error => console.error('Lỗi:', error));
    }

    // Biến để lưu mã sinh viên hiện tại
    let currentStudentCode = '';
});

function loadStudents(search = '') {
    const tbody = document.getElementById('student-list');
    
    tbody.innerHTML = '<tr><td colspan="6">Đang tải dữ liệu...</td></tr>';
    
    let url = 'get_students.php';
    if (search) {
        url += `?search=${encodeURIComponent(search)}`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Lỗi kết nối mạng');
            }
            return response.text();
        })
        .then(data => {
            tbody.innerHTML = data;
        })
        .catch(error => {
            tbody.innerHTML = `<tr><td colspan="6">Lỗi: ${error.message}</td></tr>`;
        });
}

function loadCredits() {
    const tbody = document.getElementById('credit-list');
    tbody.innerHTML = '<tr><td colspan="4">Đang tải dữ liệu...</td></tr>';

    fetch('get_credits.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Lỗi kết nối mạng');
            }
            return response.text();
        })
        .then(data => {
            tbody.innerHTML = data;
        })
        .catch(error => {
            tbody.innerHTML = `<tr><td colspan="4">Lỗi: ${error.message}</td></tr>`;
        });
}
