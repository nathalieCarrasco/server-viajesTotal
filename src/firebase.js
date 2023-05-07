// Import the functions you need from the SDKs you need
const { initializeApp } = require ("firebase/app");


const firebaseConfig = {
    apiKey: "AIzaSyCB0p5ZcipvCXm-4RulTvVgAMcn7rgKnF0",
    authDomain: "proyectoviajestotalof.firebaseapp.com",
    projectId: "proyectoviajestotalof",
    storageBucket: "proyectoviajestotalof.appspot.com",
    messagingSenderId: "1039222723419",
    appId: "1:1039222723419:web:53ef20b336a28ea6c0807e"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

/* Configuracion FIREBASE _ADMIN */


var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket:"proyectoviajestotalof.appspot.com"
});
/** EXPORTAR  */
module.exports= {
    app,
    admin
}