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

// 3. LIVE LISTENER
database.ref('liveResult').on('value', (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    // --- SHARED DATA (Date) ---
    const dateEl = document.getElementById('res-date');
    if(dateEl) dateEl.innerText = data.date || "--/--/----";

    // --- HOME PAGE ONLY (fr-val, sr-val) ---
    const frVal = document.getElementById('fr-val');
    const srVal = document.getElementById('sr-val');
    if(frVal) frVal.innerText = data.fr || "--";
    if(srVal) srVal.innerText = data.sr || "--";

    // --- COMMON NUMBER PAGE ONLY ---
    // First Round Details
    const frh = document.getElementById('fr-house');
    const fre = document.getElementById('fr-ending');
    const frc = document.getElementById('fr-common');
    if(frh) frh.innerText = data.fr_house || "--";
    if(fre) fre.innerText = data.fr_ending || "--";
    if(frc) frc.innerText = data.fr_common || "--";

    // Second Round Details
    const srh = document.getElementById('sr-house');
    const sre = document.getElementById('sr-ending');
    const src = document.getElementById('sr-common');
    if(srh) srh.innerText = data.sr_house || "--";
    if(sre) sre.innerText = data.sr_ending || "--";
    if(src) src.innerText = data.sr_common || "--";

}, (error) => {
    console.error("Firebase Connection Error:", error);
});
