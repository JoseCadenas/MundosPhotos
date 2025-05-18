import { defineStore } from "pinia";
import { useFirestore } from "vuefire";
import { addDoc, collection } from "firebase/firestore";

export const useEmailStore = defineStore("email", {
  state: () => {
    return {
      db: useFirestore(),
    };
  },
  actions: {
    /**
     * Send Email - trigger email extension will take care of the rest
     * @param {Array || String} params.replyTo
     * @param {Array || String} params.to
     * @param {Array || String} params.cc
     * @param {String} params.subject
     * @param {String} params.text
     */
    async sendEmail(params) {
      const email = {
        replyTo: null,
        to: process.env.VITE_PHOTO_BOOTH_EMAIL,
        cc: null,
        message: {
          subject: params?.subject ?? "",
          text: params?.text ?? "",
        },
      };
      if (params?.replyTo) email.replyTo = params?.replyTo;
      if (params?.to?.length) email.to = params?.to;
      if (params?.cc?.length) email.cc = params?.cc;
      console.log("Newly created email document - BEFORE", params, email);

      return await addDoc(collection(this.db, "email"), email);
    },
  },
});
