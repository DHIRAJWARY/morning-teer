document.addEventListener('DOMContentLoaded', () => {
    // URL of your JSON file on GitHub (Replace 'yourusername' and 'your-repo')
    const jsonUrl = 'results.json';

    function fetchLiveResults() {
        fetch(jsonUrl + '?nocache=' + new Date().getTime()) // Stops browser from showing old data
            .then(response => response.json())
            .then(data => {
                const today = new Date().toLocaleDateString('en-GB');

                // Update the UI if the date matches today
                if (data.date === today) {
                    if(document.getElementById('res-date')) document.getElementById('res-date').innerText = data.date;
                    if(document.getElementById('fr-val')) document.getElementById('fr-val').innerText = data.fr;
                    if(document.getElementById('sr-val')) document.getElementById('sr-val').innerText = data.sr;
                    
                    const frLabel = document.getElementById('fr-time-label');
                    const srLabel = document.getElementById('sr-time-label');
                    if(frLabel) frLabel.innerText = `F/R (${data.frT})`;
                    if(srLabel) srLabel.innerText = `S/R (${data.srT})`;
                }
            })
            .catch(error => console.error('Error fetching results:', error));
    }

    fetchLiveResults();
});
