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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

database.ref('liveResult').on('value', (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    // Updates Date on both pages
    if(document.getElementById('res-date')) document.getElementById('res-date').innerText = data.date || "--/--/----";

    // Updates Home Page Live Results
    if(document.getElementById('fr-val')) document.getElementById('fr-val').innerText = data.fr || "--";
    if(document.getElementById('sr-val')) document.getElementById('sr-val').innerText = data.sr || "--";

    // Updates Common Number Page Details
    if(document.getElementById('fr-house')) document.getElementById('fr-house').innerText = data.fr_house || "--";
    if(document.getElementById('fr-ending')) document.getElementById('fr-ending').innerText = data.fr_ending || "--";
    if(document.getElementById('fr-common')) document.getElementById('fr-common').innerText = data.fr_common || "--";

    if(document.getElementById('sr-house')) document.getElementById('sr-house').innerText = data.sr_house || "--";
    if(document.getElementById('sr-ending')) document.getElementById('sr-ending').innerText = data.sr_ending || "--";
    if(document.getElementById('sr-common')) document.getElementById('sr-common').innerText = data.sr_common || "--";

}, (error) => {
    console.error("Firebase Connection Error:", error);
});
