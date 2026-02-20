document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('teerResult');

    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('res-date').innerText = data.date;
        document.getElementById('fr-val').innerText = data.fr;
        document.getElementById('sr-val').innerText = data.sr;
        // This updates the TIME labels
        document.getElementById('fr-time-label').innerText = "F/R (" + data.frT + ")";
        document.getElementById('sr-time-label').innerText = "S/R (" + data.srT + ")";
    }
});