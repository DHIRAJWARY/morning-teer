document.addEventListener('DOMContentLoaded', () => {
    const jsonUrl = 'results.json';

    function updateUI(data) {
        const resDate = document.getElementById('res-date');
        const frVal = document.getElementById('fr-val');
        const srVal = document.getElementById('sr-val');
        const frLabel = document.getElementById('fr-time-label');
        const srLabel = document.getElementById('sr-time-label');

        if (resDate) resDate.innerText = data.date;
        if (frVal) frVal.innerText = data.fr;
        if (srVal) srVal.innerText = data.sr;
        if (frLabel) frLabel.innerText = `F/R (${data.frT || '10:33 AM'})`;
        if (srLabel) srLabel.innerText = `S/R (${data.srT || '11:33 AM'})`;
    }

    // 1. Try to fetch from GitHub first (for all users)
    fetch(jsonUrl + '?v=' + new Date().getTime())
        .then(response => {
            if (!response.ok) throw new Error('File not found');
            return response.json();
        })
        .then(data => {
            console.log("Loaded from GitHub:", data);
            updateUI(data);
        })
        .catch(err => {
            console.warn("GitHub fetch failed, checking local storage...");
            // 2. Fallback: Try to load from local memory (for you/admin)
            const localData = localStorage.getItem('teerResult');
            if (localData) {
                updateUI(JSON.parse(localData));
            }
        });
});
