import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { VueFire, VueFireAuth } from 'vuefire';

export const firebaseApp = initializeApp({
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
});
export const firestore = getFirestore(firebaseApp);

export default boot(({ app }) => {
    app.use(VueFire, {
        firebaseApp,
        modules: [
            // VueFireAuth(), // Auth     
        ],
    });
})