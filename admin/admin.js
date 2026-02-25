const MY_SECRET_PASSWORD = "yezdiADVENTURE"; 

function checkPassword() {
    if (document.getElementById('passInput').value === MY_SECRET_PASSWORD) {
        document.getElementById('login-gate').style.display = 'none';
        document.getElementById('management-panel').style.display = 'block';
        // Auto-fill today's date
        const now = new Date();
        document.getElementById('resDate').value = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    } else { alert("Wrong!"); }
}

function generateEverything() {
    const data = {
        date: document.getElementById('resDate').value,
        fr: document.getElementById('frNum').value || "--",
        sr: document.getElementById('srNum').value || "--",
        frT: "10:33 AM",
        srT: "11:33 AM",
        // Adding the new fields
        house: document.getElementById('house').value || "--",
        ending: document.getElementById('ending').value || "--",
        common: document.getElementById('commonNumbers').value || "--"
    };

    const jsonString = JSON.stringify(data, null, 2);
    document.getElementById('copyBox').value = jsonString;
    document.getElementById('output-area').style.display = 'block';
    
    alert("JSON Created! Copy it to results.json on GitHub.");
}
