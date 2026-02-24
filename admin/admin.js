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

    // GENERATE THE PERMANENT ROW CODE
    const historyRow = `<tr><td>${data.date}</td><td><strong>${data.fr}</strong></td><td><strong>${data.sr}</strong></td><td><span class="badge-confirmed">OFFICIAL</span></td></tr>`;
    
    // Show the code for the user to copy
    const copyArea = document.getElementById('historyGenerator');
    if(copyArea) {
        document.getElementById('copyBox').value = historyRow;
        copyArea.style.display = 'block';
    }

    alert("Today's result updated! Now copy the code below to save it in History on GitHub.");
}
