// 1. YOUR FIREBASE CONFIGURATION
const firebaseConfig = {
    databaseURL: "https://teer-ac8f5-default-rtdb.asia-southeast1.firebasedatabase.app"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 2. THE NEW "SUPER RESET" FUNCTION (12:00 AM IST)
function performReset() {
    console.log("Midnight reached. Clearing results for the new day...");
    database.ref('liveResult').set({
        date: new Date().toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata' }),
        fr: "--",
        sr: "--",
        fr_house: "--",
        fr_ending: "--",
        fr_common: "--",
        sr_house: "--",
        sr_ending: "--",
        sr_common: "--"
    });
}

function checkMidnight() {
    const now = new Date();
    
    // Check exact time in India
    const indiaTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(now);

    // If it's 12:00 AM, trigger the reset
    if (indiaTime === "00:00") {
        performReset();
    }
}

// Check every 60 seconds
setInterval(checkMidnight, 60000);

// 3. THE LIVE DISPLAY LISTENER
// This only updates the text on your screen; it does NOT reset anything.
database.ref('liveResult').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // Update the date and the main FR/SR numbers
        if(document.getElementById('res-date')) document.getElementById('res-date').innerText = data.date || "--/--/----";
        if(document.getElementById('fr-val')) document.getElementById('fr-val').innerText = data.fr || "--";
        if(document.getElementById('sr-val')) document.getElementById('sr-val').innerText = data.sr || "--";
        
        // Update the bottom fields if they exist in your HTML
        if(document.getElementById('fr-h')) document.getElementById('fr-h').innerText = data.fr_house || "--";
        if(document.getElementById('fr-e')) document.getElementById('fr-e').innerText = data.fr_ending || "--";
        // ... add any other IDs you use for common numbers here
    }
});

// Run one check immediately when page loads
checkMidnight();
