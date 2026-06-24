import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDRfbsZcQFhJE_BL2OJWUTK-enUtbipjjM',
  authDomain: 'prime-fit-commerce.firebaseapp.com',
  databaseURL: 'https://prime-fit-commerce-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'prime-fit-commerce',
  storageBucket: 'prime-fit-commerce.firebasestorage.app',
  messagingSenderId: '545201431260',
  appId: '1:545201431260:web:f86e381a5dbd2217f50a19'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
connectFirestoreEmulator(db, '127.0.0.1', 8080)

const auth = getAuth(app)
connectAuthEmulator(auth, 'http://127.0.0.1:9099')

const storage = getStorage()
connectStorageEmulator(storage, '127.0.0.1', 9199)

const realtimeDB = getDatabase()
connectDatabaseEmulator(realtimeDB, '127.0.0.1', 9000)

export { db, auth, storage, realtimeDB }
