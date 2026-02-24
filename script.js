document.addEventListener('DOMContentLoaded', () => {
    // Always fetch from results.json to ensure all devices match
    fetch('results.json?nocache=' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            const today = new Date().toLocaleDateString('en-GB');
            if (data.date === today) {
                document.getElementById('res-date').innerText = data.date;
                document.getElementById('fr-val').innerText = data.fr;
                document.getElementById('sr-val').innerText = data.sr;
                
                // Set the corrected times
                document.getElementById('fr-time-label').innerText = `F/R (10:33 AM)`;
                document.getElementById('sr-time-label').innerText = `S/R (11:33 AM)`;
            }
        })
        .catch(() => console.log("Waiting for results.json..."));
});
