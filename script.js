// 1. FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyD0_pryWiRPy_V83ZWw0YuJbIbbZY9WKzY",
    authDomain: "teer-ac8f5.firebaseapp.com",
    projectId: "teer-ac8f5",
    storageBucket: "teer-ac8f5.firebasestorage.app",
    messagingSenderId: "849245400322",
    appId: "1:849245400322:web:c404167e678158e92b261b",
    measurementId: "G-FRYNDCH59K",
    databaseURL: "https://teer-ac8f5-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// 2. INITIALIZE
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// 3. LIVE LISTENER + AUTO-RESET
database.ref('liveResult').on('value', (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    // --- AUTO-RESET LOGIC ---
    // Get today's date in DD/MM/YYYY format
    const today = new Date().toLocaleDateString('en-GB'); 

    // If the database date is NOT today, reset everything to "Pending"
    // This triggers at 12:00 AM when you or a user visits the site
    if (data.date && data.date !== today && data.date !== "Pending") {
        database.ref('liveResult').update({
            date: today,
            fr: "--",
            sr: "--",
            fr_house: "--",
            fr_ending: "--",
            fr_common: "--",
            sr_house: "--",
            sr_ending: "--",
            sr_common: "--"
        });
        return; // Stop here and wait for the reset to finish
    }

    // --- DISPLAY LOGIC ---
    // Date
    if(document.getElementById('res-date')) document.getElementById('res-date').innerText = data.date || "--/--/----";

    // Home Page (index.html)
    if(document.getElementById('fr-val')) document.getElementById('fr-val').innerText = data.fr || "--";
    if(document.getElementById('sr-val')) document.getElementById('sr-val').innerText = data.sr || "--";

    // Common Page (common.html)
    if(document.getElementById('fr-house')) document.getElementById('fr-house').innerText = data.fr_house || "--";
    if(document.getElementById('fr-ending')) document.getElementById('fr-ending').innerText = data.fr_ending || "--";
    if(document.getElementById('fr-common')) document.getElementById('fr-common').innerText = data.fr_common || "--";

    if(document.getElementById('sr-house')) document.getElementById('sr-house').innerText = data.sr_house || "--";
    if(document.getElementById('sr-ending')) document.getElementById('sr-ending').innerText = data.sr_ending || "--";
    if(document.getElementById('sr-common')) document.getElementById('sr-common').innerText = data.sr_common || "--";

}, (error) => {
    console.error("Firebase Connection Error:", error);
});
