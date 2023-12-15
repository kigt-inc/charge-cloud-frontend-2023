import { initializeApp } from "@firebase/app";
import { getFirestore, connectFirestoreEmulator } from "@firebase/firestore";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_AUTHDOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_DATABASEURL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_APPID,
};

const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app);
const realTimeDb = getDatabase(app);
const auth = getAuth(app);

// if (process.env.NEXT_PUBLIC_FIREBASE_ENV === "dev") {
//   connectAuthEmulator(auth, "http://127.0.0.1:9099");
//   connectFirestoreEmulator(database, "localhost", 8080);
//   connectDatabaseEmulator(realTimeDatabase, "localhost", 9000);
// }

export { app, firestoreDb, auth, realTimeDb };
