document.addEventListener('DOMContentLoaded', () => {
    // The leading slash ensures it works perfectly on custom domains
    const jsonUrl = '/results.json';

    function updateUI(data) {
        // Find elements
        const resDate = document.getElementById('res-date');
        const frVal = document.getElementById('fr-val');
        const srVal = document.getElementById('sr-val');
        const frLabel = document.getElementById('fr-time-label');
        const srLabel = document.getElementById('sr-time-label');

        // Apply data
        if (resDate) resDate.innerText = data.date;
        if (frVal) frVal.innerText = data.fr;
        if (srVal) srVal.innerText = data.sr;
        
        // Force the official times you requested
        if (frLabel) frLabel.innerText = `F/R (10:33 AM)`;
        if (srLabel) srLabel.innerText = `S/R (11:33 AM)`;
    }

    // Fetch from the custom domain root with a cache-buster
    fetch(jsonUrl + '?nocache=' + new Date().getTime())
        .then(response => {
            if (!response.ok) throw new Error('Update file not found');
            return response.json();
        })
        .then(data => {
            updateUI(data);
            console.log("Global update successful");
        })
        .catch(err => {
            console.warn("Could not sync globally, checking local backup...");
            // Fallback for the admin/publisher
            const localData = localStorage.getItem('teerResult');
            if (localData) updateUI(JSON.parse(localData));
        });
});
