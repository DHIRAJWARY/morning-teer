const admin = require('firebase-admin');

// You will get this JSON from Firebase Settings > Service Accounts
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://teer-ac8f5-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.database();

async function autoSave() {
  const snapshot = await db.ref('liveResult').once('value');
  const data = snapshot.val();

  if (data && data.fr !== "--") {
    // 1. Push current live result to history
    await db.ref('history').push(data);
    
    // 2. Clear live result for the new day
    await db.ref('liveResult').update({
      date: "--/--/----",
      fr: "--",
      sr: "--",
      fr_house: "--",
      fr_ending: "--",
      fr_common: "--",
      sr_house: "--",
      sr_ending: "--",
      sr_common: "--"
    });
    console.log("Success: Results archived and live cleared!");
  }
  process.exit();
}

autoSave();
