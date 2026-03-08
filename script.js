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

// 3. THE LIVE LISTENER
// I'm using 'liveResult' as per your latest JS, but if it doesn't work, 
// check if your Firebase folder is actually named 'live-results'
database.ref('liveResult').on('value', (snapshot) => {
    const data = snapshot.val();
    console.log("Data received from Firebase:", data); // This helps us debug in the console

    if (data) {
        // --- DISPLAY LOGIC (Home Page) ---
        // These IDs now match your index.html exactly
        if(document.getElementById('res-date')) {
            document.getElementById('res-date').innerText = data.date || "--/--/----";
        }
        if(document.getElementById('fr-val')) {
            document.getElementById('fr-val').innerText = data.fr || "--";
        }
        if(document.getElementById('sr-val')) {
            document.getElementById('sr-val').innerText = data.sr || "--";
        }
        
        // Additional fields if you decide to add them to your HTML later
        if(document.getElementById('fr-house')) document.getElementById('fr-house').innerText = data.fr_house || "--";
        if(document.getElementById('sr-house')) document.getElementById('sr-house').innerText = data.sr_house || "--";
    } else {
        console.warn("No data found at 'liveResult' path in Firebase.");
    }
}, (error) => {
    console.error("Firebase Connection Error:", error);
});

// STEP 4 REMOVED: Manual Mode is active for previous-results.html
