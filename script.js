document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('teerResult');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Get today's date to verify
        const now = new Date();
        const todayStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

        // Update the UI only if the result is for today
        if (data.date === todayStr) {
            if(document.getElementById('res-date')) document.getElementById('res-date').innerText = data.date;
            if(document.getElementById('fr-val')) document.getElementById('fr-val').innerText = data.fr || "--";
            if(document.getElementById('sr-val')) document.getElementById('sr-val').innerText = data.sr || "--";
            
            // Update Round Times
            const frLabel = document.getElementById('fr-time-label');
            const srLabel = document.getElementById('sr-time-label');
            if(frLabel) frLabel.innerText = `F/R (${data.frT})`;
            if(srLabel) srLabel.innerText = `S/R (${data.srT})`;
        }
    }
});
