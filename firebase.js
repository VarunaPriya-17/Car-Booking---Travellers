/* js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_X5dVGwRu6rHSvMHhoeeA1xBeug_BAmY",
  authDomain: "cab-booking-sys.firebaseapp.com",
  projectId: "cab-booking-sys",
  storageBucket: "cab-booking-sys.firebasestorage.app",
  messagingSenderId: "933351534970",
  appId: "1:933351534970:web:5a7241a04659b6691926c3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app); 

// 🔴 REPLACE with your Firebase config later
const firebaseConfig = {
  apiKey: "AIzaSyC_X5dVGwRu6rHSvMHhoeeA1xBeug_BAmY",
  authDomain: "cab-booking-sys.firebaseapp.com",
  databaseURL: "https://console.firebase.google.com/project/cab-booking-sys/firestore/databases/-default-/data",
  projectId: "cab-booking-sys",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database(); 


// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_X5dVGwRu6rHSvMHhoeeA1xBeug_BAmY",
  authDomain: "cab-booking-sys.firebaseapp.com",
  databaseURL: "https://console.firebase.google.com/project/cab-booking-sys/firestore/databases/-default-/data",
  projectId: "cab-booking-sys",
  storageBucket: "cab-booking-sys.firebasestorage.app",
  messagingSenderId: "933351534970",
  appId: "1:933351534970:web:5a7241a04659b6691926c3"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
*/

// Firebase v8 configuration (NON-MODULE)

// Firebase v8 config (JS FILE – NO <script> TAGS)

// Firebase v8 ONLY
var firebaseConfig = {
  apiKey: "AIzaSyC_X5dVGwRu6rHSvMHhoeeA1xBeug_BAmY",
  authDomain: "cab-booking-sys.firebaseapp.com",
  databaseURL: "https://cab-booking-sys-default-rtdb.firebaseio.com",
  projectId: "cab-booking-sys",
  storageBucket: "cab-booking-sys.firebasestorage.app",
  messagingSenderId: "933351534970",
  appId: "1:933351534970:web:5a7241a04659b6691926c3"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();


