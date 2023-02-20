import { defineStore } from 'pinia';
import { useFirestore } from "vuefire";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
export const useUsersStore = defineStore('user', {
    state: () => {
        return {
            db: useFirestore(),
            auth: getAuth(),
            authorizedUser: null,
        }
    },
    getters: {
        hasAuthUser() {
            return !!this?.authorizedUser?.uid;
        },
    },
    actions: {
        setAuthorizedUser(user) {
            if (user) this.authorizedUser = user;
            else this.authorizedUser = null;
        },
        async authorizedUserCheck() {
            if (!this.authorizedUser) throw Error('Authorized user not found.');
        },
        async createUserWithEmailAndPassword(email, password) {
            return await createUserWithEmailAndPassword(this.auth, email, password);
        },
        async signInWithEmailAndPassword(email, password) {
            return await signInWithEmailAndPassword(this.auth, email, password);
        },
        async signOut() {
            const result = await signOut(this.auth);
            router?.push({ name: 'home' });
            return result;
        },
    }
});
