document.addEventListener('DOMContentLoaded', () => {
    // 1. Grab the data saved from your Admin Panel
    const savedData = localStorage.getItem('teerResult');

    if (savedData) {
        const data = JSON.parse(savedData);
        
        // 2. Midnight Reset Logic: Get today's date from the user's device
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-11
        const year = today.getFullYear();
        
        // Format the date to match your Admin input: "DD/MM/YYYY"
        const currentDateString = `${day}/${month}/${year}`;

        // 3. Comparison: If the stored date isn't today, delete it and stop
        if (data.date !== currentDateString) {
            localStorage.removeItem('teerResult');
            console.log("Old data cleared for the new day.");
            return; 
        }

        // 4. Update the Homepage: If it is still today, show the numbers and times
        
        // Update the Date display
        if(document.getElementById('res-date')) {
            document.getElementById('res-date').innerText = data.date;
        }
        
        // Update the Round Numbers (F/R and S/R)
        if(document.getElementById('fr-val')) {
            document.getElementById('fr-val').innerText = data.fr;
        }
        if(document.getElementById('sr-val')) {
            document.getElementById('sr-val').innerText = data.sr;
        }

        // Update the Time Labels (e.g., F/R (10:30 AM))
        if(document.getElementById('fr-time-label')) {
            document.getElementById('fr-time-label').innerText = "F/R (" + data.frT + ")";
        }
        if(document.getElementById('sr-time-label')) {
            document.getElementById('sr-time-label').innerText = "S/R (" + data.srT + ")";
        }
    }
});
