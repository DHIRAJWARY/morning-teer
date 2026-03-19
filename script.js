// 1. FIREBASE CONFIGURATION
const firebaseConfig = {
    databaseURL: "https://teer-ac8f5-default-rtdb.asia-southeast1.firebasedatabase.app"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// HELPER: Adds a zero for full results (e.g., 5 becomes 05)
function formatResult(num) {
    if (num === null || num === undefined || num === "--") return "--";
    let n = num.toString();
    return n.length === 1 ? "0" + n : n;
}

// HELPER: Ensures House/Ending stays as a single digit
function formatSingle(num) {
    if (num === null || num === undefined || num === "--") return "--";
    let n = num.toString();
    // Only takes the last digit if you accidentally type two digits
    return n.length > 1 ? n.slice(-1) : n;
}

// 2. LIVE DATA LISTENER
database.ref('liveResult').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // Main Date
        if(document.getElementById('res-date')) document.getElementById('res-date').innerText = data.date || "--/--/----";

        // FR/SR Results (Shows 00, 05, 34)
        if(document.getElementById('fr-val')) document.getElementById('fr-val').innerText = formatResult(data.fr);
        if(document.getElementById('sr-val')) document.getElementById('sr-val').innerText = formatResult(data.sr);

        // House & Ending (Shows 0, 5, 9 - Single Digit Only)
        if(document.getElementById('fr-house')) document.getElementById('fr-house').innerText = formatSingle(data.fr_house);
        if(document.getElementById('fr-ending')) document.getElementById('fr-ending').innerText = formatSingle(data.fr_ending);
        
        if(document.getElementById('sr-house')) document.getElementById('sr-house').innerText = formatSingle(data.sr_house);
        if(document.getElementById('sr-ending')) document.getElementById('sr-ending').innerText = formatSingle(data.sr_ending);

        // Common Numbers (Keep as 05, 00 format)
        if(document.getElementById('fr-common')) document.getElementById('fr-common').innerText = formatResult(data.fr_common);
        if(document.getElementById('sr-common')) document.getElementById('sr-common').innerText = formatResult(data.sr_common);
    }
});
