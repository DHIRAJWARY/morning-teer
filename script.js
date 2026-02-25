// 1. YOUR FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyD2bLQVv7Bwe2fUzrstGc640VaUjauxG3g",
    authDomain: "teer-ac8f5.firebaseapp.com",
    projectId: "teer-ac8f5",
    storageBucket: "teer-ac8f5.firebasestorage.app",
    messagingSenderId: "849245400322",
    appId: "1:849245400322:web:c404167e678158e92b261b",
    measurementId: "G-FRYNDCH59K",
    // FIXED: Now pointing to your Singapore server
    databaseURL: "https://teer-ac8f5-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// 2. INITIALIZE FIREBASE
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 3. THE LIVE LISTENER
database.ref('liveResult').on('value', (snapshot) => {
    const data = snapshot.val();
    
    if (data) {
        console.log("Data found!", data);
        
        if(document.getElementById('res-date')) 
            document.getElementById('res-date').innerText = data.date || "--/--/----";
        
        if(document.getElementById('fr-val')) 
            document.getElementById('fr-val').innerText = data.fr || "--";
        
        if(document.getElementById('sr-val')) 
            document.getElementById('sr-val').innerText = data.sr || "--";

        // Update Target/Common Numbers
        const houseEl = document.getElementById('house-display');
        const endingEl = document.getElementById('ending-display');
        const commonEl = document.getElementById('common-display');

        if(houseEl) houseEl.innerText = data.house || "--";
        if(endingEl) endingEl.innerText = data.ending || "--";
        if(commonEl) commonEl.innerText = data.common || "--";

        console.log("⚡ Success: Website updated with Singapore Data.");
    } else {
        console.log("Connected to Singapore, but 'liveResult' folder is missing or empty.");
    }
}, (error) => {
    console.error("Firebase Connection Error:", error);
});
