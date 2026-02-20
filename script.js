document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('teerResult');

    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Update Date
        if(document.getElementById('res-date')) 
            document.getElementById('res-date').innerText = data.date;
        
        // Update Numbers
        if(document.getElementById('fr-val')) 
            document.getElementById('fr-val').innerText = data.fr;
        if(document.getElementById('sr-val')) 
            document.getElementById('sr-val').innerText = data.sr;

        // Update Times
        if(document.getElementById('fr-time-label')) 
            document.getElementById('fr-time-label').innerText = "F/R (" + data.frT + ")";
        if(document.getElementById('sr-time-label')) 
            document.getElementById('sr-time-label').innerText = "S/R (" + data.srT + ")";
    }
});
