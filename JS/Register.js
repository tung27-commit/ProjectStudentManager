function togglePasswordVisibility(checkboxId, inputId) {
    const checkbox = document.getElementById(checkboxId);
    const input = document.getElementById(inputId);

    checkbox.addEventListener("change", function() {
        input.type = checkbox.checked ? "text" : "password";
    });
}

togglePasswordVisibility("show-pass1", "input_pass");
togglePasswordVisibility("show-pass2", "input_agPass");

//Luu vao, lay ra local storage trong js