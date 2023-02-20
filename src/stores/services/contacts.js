import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { useFirestore } from "vuefire";
import { collection, onSnapshot } from "firebase/firestore";

export const useContactsStore = defineStore('contact', () => {
    const db = useFirestore();
    let data = reactive({
        contacts: [],
    });

    onSnapshot(collection(db, "contacts"), (querySnapshot) => {
        const fbContacts = reactive([]);
        querySnapshot.forEach((doc) => {
            fbContacts.push(doc.data());
        });
        data.contacts = fbContacts;
    });

    return { data }
});
