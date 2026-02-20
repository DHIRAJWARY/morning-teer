const MY_SECRET_PASSWORD = "yezdiADVENTURE"; 

function checkPassword() {
    if (document.getElementById('passInput').value === MY_SECRET_PASSWORD) {
        document.getElementById('login-gate').style.display = 'none';
        document.getElementById('management-panel').style.display = 'block';
    } else { alert("Wrong Password!"); }
}

function saveData() {
    const data = {
        date: document.getElementById('resDate').value,
        frT: document.getElementById('frTime').value,
        fr: document.getElementById('frNum').value,
        srT: document.getElementById('srTime').value,
        sr: document.getElementById('srNum').value
    };
    localStorage.setItem('teerResult', JSON.stringify(data));
    alert("Updated locally! Remember to edit GitHub to make it permanent for everyone.");
    window.location.href = "../index.html";
}
