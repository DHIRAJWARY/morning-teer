document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('teerResult');

    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Midnight Reset Logic
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const currentDateString = `${day}/${month}/${year}`;

        if (data.date !== currentDateString) {
            localStorage.removeItem('teerResult');
            return; 
        }

        // Update UI
        if(document.getElementById('res-date')) document.getElementById('res-date').innerText = data.date;
        if(document.getElementById('fr-val')) document.getElementById('fr-val').innerText = data.fr;
        if(document.getElementById('sr-val')) document.getElementById('sr-val').innerText = data.sr;
        if(document.getElementById('fr-time-label')) document.getElementById('fr-time-label').innerText = "F/R (" + data.frT + ")";
        if(document.getElementById('sr-time-label')) document.getElementById('sr-time-label').innerText = "S/R (" + data.srT + ")";
    }
});
