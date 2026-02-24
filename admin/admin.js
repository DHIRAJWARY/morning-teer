function saveData() {
    const now = new Date();
    const todayStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    const data = {
        date: todayStr,
        fr: document.getElementById('frNum').value || "--",
        frT: "10:33 AM", // Corrected time
        sr: document.getElementById('srNum').value || "--",
        srT: "11:33 AM"  // Corrected time
    };

    localStorage.setItem('teerResult', JSON.stringify(data));
    
    // Generate output for GitHub
    const jsonString = JSON.stringify(data, null, 2);
    const historyRow = `<tr><td>${data.date}</td><td><strong>${data.fr}</strong></td><td><strong>${data.sr}</strong></td><td><span class="badge-confirmed">OFFICIAL</span></td></tr>`;

    const copyBox = document.getElementById('copyBox');
    if(copyBox) {
        copyBox.value = `--- JSON FOR results.json ---\n${jsonString}\n\n--- HISTORY FOR previous-results.html ---\n${historyRow}`;
    }
    alert("Result Published with 10:33 AM / 11:33 AM timings!");
}
