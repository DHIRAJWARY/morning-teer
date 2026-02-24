document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('teerResult');
    if (savedData) {
        const data = JSON.parse(savedData);
        const today = new Date().toLocaleDateString('en-GB');

        // Only show if the date in storage matches today's date
        if (data.date === today) {
            document.getElementById('res-date').innerText = data.date;
            document.getElementById('fr-val').innerText = data.fr;
            document.getElementById('sr-val').innerText = data.sr;
            document.getElementById('fr-time-label').innerText = `F/R (${data.frT})`;
            document.getElementById('sr-time-label').innerText = `S/R (${data.srT})`;
        }
    }
});
