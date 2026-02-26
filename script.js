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

// 3. THE LIVE LISTENER (Home Page & Common Numbers)
database.ref('liveResult').on('value', (snapshot) => {
    const data = snapshot.val();
    const now = new Date();
    const hours = now.getHours(); // 0 is 12 AM
    
    // Reset Logic: If it's 12 AM, clear results for the new day
    const isMidnight = (hours === 0); 

    if (data && !isMidnight) {
        console.log("⚡ Live Data received:", data);
        
        // Main Page Results
        if(document.getElementById('res-date')) document.getElementById('res-date').innerText = data.date || "--/--/----";
        if(document.getElementById('fr-val')) document.getElementById('fr-val').innerText = data.fr || "--";
        if(document.getElementById('sr-val')) document.getElementById('sr-val').innerText = data.sr || "--";

        // FR Common Numbers
        if(document.getElementById('fr-house')) document.getElementById('fr-house').innerText = data.fr_house || "--";
        if(document.getElementById('fr-ending')) document.getElementById('fr-ending').innerText = data.fr_ending || "--";
        if(document.getElementById('fr-common')) document.getElementById('fr-common').innerText = data.fr_common || "--";

        // SR Common Numbers
        if(document.getElementById('sr-house')) document.getElementById('sr-house').innerText = data.sr_house || "--";
        if(document.getElementById('sr-ending')) document.getElementById('sr-ending').innerText = data.sr_ending || "--";
        if(document.getElementById('sr-common')) document.getElementById('sr-common').innerText = data.sr_common || "--";

    } else {
        // Midnight Reset: Set all live displays to "--"
        const elements = ['res-date', 'fr-val', 'sr-val', 'fr-house', 'fr-ending', 'fr-common', 'sr-house', 'sr-ending', 'sr-common'];
        elements.forEach(id => {
            if(document.getElementById(id)) document.getElementById(id).innerText = "--";
        });
    }
}, (error) => {
    console.error("Firebase Connection Error:", error);
});

// 4. PREVIOUS RESULTS LISTENER (History Page Injection)
database.ref('history').on('value', (snapshot) => {
    const historyBody = document.getElementById('history-body');
    if (!historyBody) return; // Only runs if the user is on the previous-results.html page

    const data = snapshot.val();
    if (data) {
        // Convert history entries to array and reverse (newest first)
        const newItems = Object.values(data).reverse();
        
        let firebaseRows = "";
        newItems.forEach(item => {
            firebaseRows += `
                <tr class="firebase-row">
                    <td>${item.date}</td>
                    <td><strong>${item.fr}</strong></td>
                    <td><strong>${item.sr}</strong></td>
                    <td><span class="badge-confirmed">OFFICIAL</span></td>
                </tr>`;
        });

        // Remove previous dynamically added rows to prevent duplication during live updates
        document.querySelectorAll('.firebase-row').forEach(el => el.remove());
        
        // Inject new rows at the very top of the <tbody>
        historyBody.insertAdjacentHTML('afterbegin', firebaseRows);
    }
});
