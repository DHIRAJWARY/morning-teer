// 1. FIREBASE CONFIGURATION
const firebaseConfig = {
    databaseURL: "https://teer-ac8f5-default-rtdb.asia-southeast1.firebasedatabase.app"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// --- AUTO-RESET REMOVED ---
// No more checkMidnight or performReset. 
// You now have 100% manual control over your data.

// 2. LIVE DATA LISTENER
// This updates Home, Common, and Analytics pages instantly when you edit Firebase.
database.ref('liveResult').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // Main Results (Home Page)
        if(document.getElementById('res-date')) document.getElementById('res-date').innerText = data.date || "--/--/----";
        if(document.getElementById('fr-val')) document.getElementById('fr-val').innerText = data.fr || "--";
        if(document.getElementById('sr-val')) document.getElementById('sr-val').innerText = data.sr || "--";

        // First Round Common Page IDs
        if(document.getElementById('fr-house')) document.getElementById('fr-house').innerText = data.fr_house || "--";
        if(document.getElementById('fr-ending')) document.getElementById('fr-ending').innerText = data.fr_ending || "--";
        if(document.getElementById('fr-common')) document.getElementById('fr-common').innerText = data.fr_common || "--";

        // Second Round Common Page IDs
        if(document.getElementById('sr-house')) document.getElementById('sr-house').innerText = data.sr_house || "--";
        if(document.getElementById('sr-ending')) document.getElementById('sr-ending').innerText = data.sr_ending || "--";
        if(document.getElementById('sr-common')) document.getElementById('sr-common').innerText = data.sr_common || "--";
    }
});
