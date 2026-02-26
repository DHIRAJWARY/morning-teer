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

// 3. THE LIVE LISTENER (With Midnight Reset)
database.ref('liveResult').on('value', (snapshot) => {
    const data = snapshot.val();
    
    // --- MIDNIGHT RESET LOGIC ---
    const now = new Date();
    const hours = now.getHours(); // 0 is 12 AM
    
    // If it is 12 AM (midnight), we hide results until 1 AM
    const isMidnight = (hours === 0); 

    if (data && !isMidnight) {
        console.log("⚡ Data received from Singapore:", data);
        
        // Update Main Results
        if(document.getElementById('res-date')) document.getElementById('res-date').innerText = data.date || "--/--/----";
        if(document.getElementById('fr-val')) document.getElementById('fr-val').innerText = data.fr || "--";
        if(document.getElementById('sr-val')) document.getElementById('sr-val').innerText = data.sr || "--";

        // Update FR Common Numbers
        if(document.getElementById('fr-house')) document.getElementById('fr-house').innerText = data.fr_house || "--";
        if(document.getElementById('fr-ending')) document.getElementById('fr-ending').innerText = data.fr_ending || "--";
        if(document.getElementById('fr-common')) document.getElementById('fr-common').innerText = data.fr_common || "--";

        // Update SR Common Numbers
        if(document.getElementById('sr-house')) document.getElementById('sr-house').innerText = data.sr_house || "--";
        if(document.getElementById('sr-ending')) document.getElementById('sr-ending').innerText = data.sr_ending || "--";
        if(document.getElementById('sr-common')) document.getElementById('sr-common').innerText = data.sr_common || "--";

    } else {
        console.log("🕛 It's midnight or no data - clearing screen.");
        const elements = ['res-date', 'fr-val', 'sr-val', 'fr-house', 'fr-ending', 'fr-common', 'sr-house', 'sr-ending', 'sr-common'];
        elements.forEach(id => {
            if(document.getElementById(id)) document.getElementById(id).innerText = "--";
        });
    }
}, (error) => {
    console.error("Firebase Connection Error:", error);
});
