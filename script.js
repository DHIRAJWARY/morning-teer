// 1. FIREBASE CONFIGURATION
const firebaseConfig = {
    databaseURL: "https://teer-ac8f5-default-rtdb.asia-southeast1.firebasedatabase.app"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// HELPER FUNCTION: Adds a leading zero if the number is less than 10
function formatNumber(num) {
    if (num === null || num === undefined || num === "--") return "--";
    // If it's a single digit (0-9), add a leading zero
    let n = num.toString();
    return n.length === 1 ? "0" + n : n;
}

// 2. LIVE DATA LISTENER
database.ref('liveResult').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // Main Results (Home Page) with Auto-Zero Fix
        if(document.getElementById('res-date')) document.getElementById('res-date').innerText = data.date || "--/--/----";
        if(document.getElementById('fr-val')) document.getElementById('fr-val').innerText = formatNumber(data.fr);
        if(document.getElementById('sr-val')) document.getElementById('sr-val').innerText = formatNumber(data.sr);

        // Common Page IDs with Auto-Zero Fix
        if(document.getElementById('fr-house')) document.getElementById('fr-house').innerText = formatNumber(data.fr_house);
        if(document.getElementById('fr-ending')) document.getElementById('fr-ending').innerText = formatNumber(data.fr_ending);
        if(document.getElementById('fr-common')) document.getElementById('fr-common').innerText = formatNumber(data.fr_common);

        if(document.getElementById('sr-house')) document.getElementById('sr-house').innerText = formatNumber(data.sr_house);
        if(document.getElementById('sr-ending')) document.getElementById('sr-ending').innerText = formatNumber(data.sr_ending);
        if(document.getElementById('sr-common')) document.getElementById('sr-common').innerText = formatNumber(data.sr_common);
    }
});
