const MY_SECRET_PASSWORD = "yezdiADVENTURE"; 

function checkPassword() {
    if (document.getElementById('passInput').value === MY_SECRET_PASSWORD) {
        document.getElementById('login-gate').style.display = 'none';
        document.getElementById('management-panel').style.display = 'block';
    } else { alert("Wrong Password!"); }
}

function saveData() {
    // Automatically get today's date in DD/MM/YYYY format
    const now = new Date();
    const todayStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    const data = {
        date: todayStr,
        frT: document.getElementById('frTime').value,
        fr: document.getElementById('frNum').value,
        srT: document.getElementById('srTime').value,
        sr: document.getElementById('srNum').value
    };

    // Save to local storage for instant update on your device
    localStorage.setItem('teerResult', JSON.stringify(data));

    // Generate History Code for GitHub (The permanent update)
    const historyRow = `<tr><td>${data.date}</td><td><strong>${data.fr}</strong></td><td><strong>${data.sr}</strong></td><td><span class="badge-confirmed">OFFICIAL</span></td></tr>`;
    const copyInput = document.getElementById('copyBox');
    if(copyInput) {
        copyInput.value = historyRow;
        document.getElementById('historyGenerator').style.display = 'block';
    }
    
    alert("Live Result Published Locally! Now copy the code below and paste it into GitHub for your visitors.");
}

function saveCommonNumbers() {
    const now = new Date();
    const todayStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    const commonData = {
        date: todayStr,
        d1: document.getElementById('in-d1').value,
        h1: document.getElementById('in-h1').value,
        e1: document.getElementById('in-e1').value,
        d2: document.getElementById('in-d2').value,
        h2: document.getElementById('in-h2').value,
        e2: document.getElementById('in-e2').value
    };
    localStorage.setItem('commonNumbers', JSON.stringify(commonData));
    alert("Common Numbers updated for " + todayStr);
}
