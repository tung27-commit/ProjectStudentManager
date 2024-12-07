
// Tai khoan admin
const adminAccount = {
    username: "Admin", password: "1"
};
function login(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");
    if(username === adminAccount.username && password === adminAccount.password){
        alert("Welcome Admin");
        window.location.href = "/main/home.html";
    }
    else{
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        error.textContent = "Tài khoản hoặc mật khẩu không đúng";
    }
}

