import { boot } from 'quasar/wrappers'
import { readonly } from 'vue';
import { i18n } from 'src/boot/i18n.js';

const numbers = {
    randomNumber: (max = 9999999) => {
        return Math.floor(Math.random() * max)
    },
    middleIndexes: (arr) => {
        if (!arr.length)
            return;

        const mid = arr.length / 2;
        if (arr.length % 2 === 1) {
            return Math.floor(mid);
        } else {
            return [
                mid - 1,
                mid,
            ];
        }
    },
    randomNumber: (max = 9999999) => {
        return Math.floor(Math.random() * max)
    }
};

const global = {
    iconList: {
        error: 'error',
        menu: 'fas fa-bars',
        visibility: 'visibility',
        visibilityOff: 'visibility_off',
        signUp: 'how_to_reg',
        signIn: 'login',
        signOut: 'logout',
        home: 'fas fa-house',
        photography: 'fas fa-camera',
        photoBooth: 'fas fa-person-booth',
        contactUs: 'fas fa-address-card',
        account: 'account_circle',
        asterisk: 'emergency',
        send: 'send',
        phone: 'phone',
        email: 'email',
        emailSent: 'mark_email_read',
    },
    translation: (key) => {
        if (!key || typeof key != 'string') return key;

        return i18n?.global?.te(key) ? i18n?.global?.t(key) : key;
    },
    numbers,
};

export default boot(({ app }) => {
    app.provide('global', readonly(global));
})