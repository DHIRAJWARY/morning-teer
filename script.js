document.addEventListener('DOMContentLoaded', () => {
    fetch('/results.json?nocache=' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            // Update Results
            document.getElementById('res-date').innerText = data.date;
            document.getElementById('fr-val').innerText = data.fr;
            document.getElementById('sr-val').innerText = data.sr;

            // Update Target/Common if elements exist on the page
            const houseEl = document.getElementById('house-display');
            const endingEl = document.getElementById('ending-display');
            const commonEl = document.getElementById('common-display');

            if(houseEl) houseEl.innerText = data.house;
            if(endingEl) endingEl.innerText = data.ending;
            if(commonEl) commonEl.innerText = data.common;
        })
        .catch(err => console.log("Fetch error or file not ready yet."));
});
