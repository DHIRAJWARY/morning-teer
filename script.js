// 1. YOUR FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyD2bLQVv7Bwe2fUzrstGc640VaUjauxG3g",
    authDomain: "teer-ac8f5.firebaseapp.com",
    projectId: "teer-ac8f5",
    storageBucket: "teer-ac8f5.firebasestorage.app",
    messagingSenderId: "849245400322",
    appId: "1:849245400322:web:c404167e678158e92b261b",
    measurementId: "G-FRYNDCH59K",
    databaseURL: "https://teer-ac8f5-default-rtdb.firebaseio.com"
};

// 2. INITIALIZE FIREBASE
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 3. THE LIVE LISTENER (Replaces your old 'fetch' code)
database.ref('liveResult').on('value', (snapshot) => {
    const data = snapshot.val();
    
    if (data) {
        // Update Main Results
        if(document.getElementById('res-date')) 
            document.getElementById('res-date').innerText = data.date || "--/--/----";
        
        if(document.getElementById('fr-val')) 
            document.getElementById('fr-val').innerText = data.fr || "--";
        
        if(document.getElementById('sr-val')) 
            document.getElementById('sr-val').innerText = data.sr || "--";

        // Update Target/Common Numbers (House, Ending, Common)
        const houseEl = document.getElementById('house-display');
        const endingEl = document.getElementById('ending-display');
        const commonEl = document.getElementById('common-display');

        if(houseEl) houseEl.innerText = data.house || "--";
        if(endingEl) endingEl.innerText = data.ending || "--";
        if(commonEl) commonEl.innerText = data.common || "--";

        console.log("⚡ Live Update: Results Synced from Firebase.");
    }
}, (error) => {
    console.error("Firebase Error:", error);
});
