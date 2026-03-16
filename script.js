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
    const indiaTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(now);

    if (indiaTime === "00:00") {
        performReset();
    }
}

setInterval(checkMidnight, 60000);

// 3. THE LIVE DISPLAY LISTENER
database.ref('liveResult').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // Main Home Page IDs
        if(document.getElementById('res-date')) document.getElementById('res-date').innerText = data.date || "--/--/----";
        if(document.getElementById('fr-val')) document.getElementById('fr-val').innerText = data.fr || "--";
        if(document.getElementById('sr-val')) document.getElementById('sr-val').innerText = data.sr || "--";
        
        // Common Page IDs - MATCHED TO YOUR HTML
        if(document.getElementById('fr-house')) document.getElementById('fr-house').innerText = data.fr_house || "--";
        if(document.getElementById('fr-ending')) document.getElementById('fr-ending').innerText = data.fr_ending || "--";
        if(document.getElementById('fr-common')) document.getElementById('fr-common').innerText = data.fr_common || "--";
        
        if(document.getElementById('sr-house')) document.getElementById('sr-house').innerText = data.sr_house || "--";
        if(document.getElementById('sr-ending')) document.getElementById('sr-ending').innerText = data.sr_ending || "--";
        if(document.getElementById('sr-common')) document.getElementById('sr-common').innerText = data.sr_common || "--";
    }
});

checkMidnight();
