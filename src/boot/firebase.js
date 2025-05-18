import { defineBoot } from "#q-app/wrappers";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { VueFire, VueFireAuth } from "vuefire";
import { VueReCaptcha } from "vue-recaptcha-v3";
import { getStorage, ref, list, getDownloadURL } from "firebase/storage";
import { useReCaptcha } from "vue-recaptcha-v3";

export const firebaseApp = initializeApp({
  apiKey: process.env.VITE_MUNDOS_PHOTOS_FIREBASE_API_KEY,
  authDomain: process.env.VITE_MUNDOS_PHOTOS_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_MUNDOS_PHOTOS_PROJECT_ID,
  storageBucket: process.env.VITE_MUNDOS_PHOTOS_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_MUNDOS_PHOTOS_MESSAGE_SENDER_ID,
  appId: process.env.VITE_MUNDOS_PHOTOS_APP_ID,
  measurementId: process.env.VITE_MUNDOS_PHOTOS_MEASUREMENT_ID,
});
export const firestore = getFirestore(firebaseApp);

// Storage
export const storage = getStorage();
export const fb = { ref, list, getDownloadURL };
// Get folder then download url from Firebase Storage
// if (props?.src?.includes("firebase:")) {
//     const firebasePath = props?.src?.replace("firebase:", "");
//     const firebaseFolderRef = fb?.ref(
//       storage,
//       `mundosWebsite/${firebasePath}`
//     );
//     const list = await fb?.list(firebaseFolderRef);
//     const urls = [];
//     for (let ref of list?.items ?? []) {
//       const url = await fb?.getDownloadURL(ref);
//       if (url) urls.push(url);
//     }
//     return urls;
//   }

// reCAPTCHA v3
export const reCaptchaSiteKey =
  process.env.VITE_MUNDOS_PHOTOS_RECAPTCHA_SITE_KEY;
export const validateReCaptcha = async (
  key,
  { recaptchaLoaded, executeRecaptcha }
) => {
  await recaptchaLoaded();

  const token = await executeRecaptcha(key);
};

export default defineBoot(({ app }) => {
  app.use(VueFire, {
    firebaseApp,
    modules: [
      // VueFireAuth(), // Auth
    ],
  });

  app.use(VueReCaptcha, { siteKey: reCaptchaSiteKey });
});
