// 1. YOUR FIREBASE CONFIG
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

// 2. INITIALIZE FIREBASE
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// 3. THE LIVE LISTENER + AUTO-RESET LOGIC (Manual Save Mode)
database.ref('liveResult').on('value', (snapshot) => {
    const data = snapshot.val();
    const todayStr = new Date().toLocaleDateString('en-GB'); 

    // --- AUTO-RESET ONLY ---
    // This clears the home screen at midnight. 
    // It DOES NOT save to history because you do that manually in HTML.
    if (data && data.date && data.date !== todayStr && data.date !== "Pending") {
        database.ref('liveResult').update({
            date: "Pending",
            fr: "--",
            sr: "--",
            fr_house: "--",
            fr_ending: "--",
            fr_common: "--",
            sr_house: "--",
            sr_ending: "--",
            sr_common: "--"
        });
        return; 
    }

    // --- DISPLAY LOGIC (Home Page) ---
    if (data) {
        if(document.getElementById('res-date')) document.getElementById('res-date').innerText = data.date || "--/--/----";
        if(document.getElementById('fr-val')) document.getElementById('fr-val').innerText = data.fr || "--";
        if(document.getElementById('sr-val')) document.getElementById('sr-val').innerText = data.sr || "--";
        
        if(document.getElementById('fr-house')) document.getElementById('fr-house').innerText = data.fr_house || "--";
        if(document.getElementById('fr-ending')) document.getElementById('fr-ending').innerText = data.fr_ending || "--";
        if(document.getElementById('fr-common')) document.getElementById('fr-common').innerText = data.fr_common || "--";

        if(document.getElementById('sr-house')) document.getElementById('sr-house').innerText = data.sr_house || "--";
        if(document.getElementById('sr-ending')) document.getElementById('sr-ending').innerText = data.sr_ending || "--";
        if(document.getElementById('sr-common')) document.getElementById('sr-common').innerText = data.sr_common || "--";
    }
}, (error) => {
    console.error("Firebase Connection Error:", error);
});

// STEP 4 HAS BEEN REMOVED SO IT DOES NOT OVERWRITE YOUR MANUAL HTML ROWS


