// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import App from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/auth";
import "firebase/compat/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuS526DKzo-GCWRZ3HQ7lr3AUYiDcNUyA",
  authDomain: "authwhats.firebaseapp.com",
  databaseURL: "https://authwhats-default-rtdb.firebaseio.com",
  projectId: "authwhats",
  storageBucket: "authwhats.firebasestorage.app",
  messagingSenderId: "703261389744",
  appId: "1:703261389744:web:edb3fa9a2ea976c8879c75",
  measurementId: "G-055FHW7KY6"
};

// Initialize Firebase
const firebase = App.initializeApp(firebaseConfig);
export default firebase;
// const analytics = getAnalytics(app);

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tsukwqwadjwfkmbfnwpp.supabase.co';
const supabaseKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzdWt3cXdhZGp3ZmttYmZud3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MDU1MDIsImV4cCI6MjA0ODI4MTUwMn0.kYjwqXEfwvudBXQoh6nrdI3BQ2-nGRX007vE84F5URg';

const supabase = createClient(supabaseUrl, supabaseKey);
export {supabase};