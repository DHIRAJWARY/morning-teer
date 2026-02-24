const MY_SECRET_PASSWORD = "yezdiADVENTURE"; 

/**
 * 1. Login Function
 */
function checkPassword() {
    const input = document.getElementById('passInput').value;
    if (input === MY_SECRET_PASSWORD) {
        document.getElementById('login-gate').style.display = 'none';
        document.getElementById('management-panel').style.display = 'block';
    } else { 
        alert("Wrong Password!"); 
    }
}

/**
 * 2. Save Live Results & Generate History Row
 */
function saveData() {
    const data = {
        date: document.getElementById('resDate').value,
        frT: document.getElementById('frTime').value,
        fr: document.getElementById('frNum').value,
        srT: document.getElementById('srTime').value,
        sr: document.getElementById('srNum').value
    };

    // Save for the Live Result section
    localStorage.setItem('teerResult', JSON.stringify(data));

    // Generate the HTML code for the Previous Results section
    const historyRow = `<tr><td>${data.date}</td><td><strong>${data.fr}</strong></td><td><strong>${data.sr}</strong></td><td><span class="badge-confirmed">OFFICIAL</span></td></tr>`;
    
    // Display the code for manual GitHub update
    const historyBox = document.getElementById('historyGenerator');
    const copyInput = document.getElementById('copyBox');
    
    if(historyBox && copyInput) {
        copyInput.value = historyRow;
        historyBox.style.display = 'block';
    }

    alert("Live Result Published! Don't forget to copy the history code for GitHub.");
}

/**
 * 3. Save Common Numbers (Image 7c147c.png Layout)
 */
function saveCommonNumbers() {
    // Get today's date in DD/MM/YYYY format for reset comparison
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const todayStr = `${day}/${month}/${year}`;

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
