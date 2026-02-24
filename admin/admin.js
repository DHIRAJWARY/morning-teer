// Password is: yezdiADVENTURE
const MY_SECRET_PASSWORD = "yezdiADVENTURE"; 

/**
 * Validates password and shows the panel
 */
function checkPassword() {
    const userInput = document.getElementById('passInput').value;
    if (userInput === MY_SECRET_PASSWORD) {
        document.getElementById('login-gate').classList.add('hidden');
        document.getElementById('management-panel').classList.remove('hidden');
    } else {
        alert("Wrong Password! Hint: Case-sensitive.");
    }
}

/**
 * Saves result and generates code for GitHub
 */
function saveData() {
    const now = new Date();
    // Format: DD/MM/YYYY
    const todayStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    const data = {
        date: todayStr,
        fr: document.getElementById('frNum').value || "--",
        frT: "10:33 AM", // Your requested timing
        sr: document.getElementById('srNum').value || "--",
        srT: "11:33 AM"  // Your requested timing
    };

    // 1. Local update for your own device
    localStorage.setItem('teerResult', JSON.stringify(data));

    // 2. Generate JSON code for results.json
    const jsonString = JSON.stringify(data, null, 2);

    // 3. Generate HTML row for previous-results.html
    const historyRow = `<tr><td>${data.date}</td><td><strong>${data.fr}</strong></td><td><strong>${data.sr}</strong></td><td><span class="badge-confirmed">OFFICIAL</span></td></tr>`;

    // 4. Put both in the copy box
    const copyBox = document.getElementById('copyBox');
    const generatorDiv = document.getElementById('historyGenerator');
    
    if(copyBox) {
        copyBox.value = `--- JSON FOR results.json ---\n${jsonString}\n\n--- ROW FOR previous-results.html ---\n${historyRow}`;
        generatorDiv.classList.remove('hidden');
    }

    alert("Published! Copy the codes below and update GitHub to sync all devices.");
}
