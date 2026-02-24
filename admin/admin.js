const MY_SECRET_PASSWORD = "yezdiADVENTURE"; 

function checkPassword() {
    const userInput = document.getElementById('passInput').value;
    if (userInput === MY_SECRET_PASSWORD) {
        document.getElementById('login-gate').style.display = 'none';
        document.getElementById('management-panel').style.display = 'block';
    } else {
        alert("Wrong Password!");
    }
}

function saveData() {
    const now = new Date();
    const todayStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    const data = {
        date: todayStr,
        fr: document.getElementById('frNum').value || "--",
        frT: "10:33 AM",
        sr: document.getElementById('srNum').value || "--",
        srT: "11:33 AM"
    };

    // Save locally for instant preview
    localStorage.setItem('teerResult', JSON.stringify(data));

    // Generate JSON string
    const jsonString = JSON.stringify(data, null, 2);

    // Generate History Row
    const historyRow = `<tr><td>${data.date}</td><td><strong>${data.fr}</strong></td><td><strong>${data.sr}</strong></td><td><span class="badge-confirmed">OFFICIAL</span></td></tr>`;

    // Display in the copy box
    const copyBox = document.getElementById('copyBox');
    if(copyBox) {
        copyBox.value = `--- COPY INTO results.json ---\n${jsonString}\n\n--- COPY INTO previous-results.html ---\n${historyRow}`;
        document.getElementById('historyGenerator').style.display = 'block';
    }

    alert("Codes generated! Now update your files on GitHub to sync all devices.");
}
