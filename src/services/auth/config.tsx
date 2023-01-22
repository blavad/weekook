import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyALeyWOaIUU3lHaL8-hIj8kZExbIWez5Tc",

    authDomain: "weekook-a7786.firebaseapp.com",
  
    projectId: "weekook-a7786",
  
    storageBucket: "weekook-a7786.appspot.com",
  
    messagingSenderId: "514358676211",
  
    appId: "1:514358676211:web:443a6c080883d81e188586"
  
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// export const urlNewsletterSubscription = 'https://b952e082.sibforms.com/serve/MUIEAAg-Tqyodqdtt4icyucfOpEoOnjvvq2Z2CejMSRQiZRKw7SzqoUbpCPswb82tEFcEQLZQPG8DdC-guVsSOLiF38TZwC6p8v_tImxap9RI9KzhO9mQt6L5Zzhp5K3Mm36052TEhMLx2_d_288QCVBTAq2V380pCaY5vORSSlqh4BLqLOSXEYZ8AJkSIDJZ026_a5ePQEqtPAo'