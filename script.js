// 1. YOUR FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyD2bLQVv7Bwe2fUzrstGc640VaUjauxG3g",
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
database.ref('liveResult').on('value', (snapshot) => {
    const data = snapshot.val();
    
    if (data) {
        console.log("⚡ Data received from Singapore:", data);
        
        // --- MAIN PAGE RESULTS ---
        if(document.getElementById('res-date')) 
            document.getElementById('res-date').innerText = data.date || "--/--/----";
        
        if(document.getElementById('fr-val')) 
            document.getElementById('fr-val').innerText = data.fr || "--";
        
        if(document.getElementById('sr-val')) 
            document.getElementById('sr-val').innerText = data.sr || "--";

        // --- COMMON NUMBERS PAGE (FR) ---
        if(document.getElementById('fr-house')) 
            document.getElementById('fr-house').innerText = data.fr_house || "--";
        
        if(document.getElementById('fr-ending')) 
            document.getElementById('fr-ending').innerText = data.fr_ending || "--";
        
        if(document.getElementById('fr-common')) 
            document.getElementById('fr-common').innerText = data.fr_common || "--";

        // --- COMMON NUMBERS PAGE (SR) ---
        if(document.getElementById('sr-house')) 
            document.getElementById('sr-house').innerText = data.sr_house || "--";
        
        if(document.getElementById('sr-ending')) 
            document.getElementById('sr-ending').innerText = data.sr_ending || "--";
        
        if(document.getElementById('sr-common')) 
            document.getElementById('sr-common').innerText = data.sr_common || "--";

    } else {
        console.log("Connected, but no data found in 'liveResult'.");
    }
}, (error) => {
    console.error("Firebase Connection Error:", error);
});
