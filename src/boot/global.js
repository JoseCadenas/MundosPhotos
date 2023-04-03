import { boot } from 'quasar/wrappers'
import { readonly } from 'vue';
import { i18n } from 'src/boot/i18n.js';

export const numbers = {
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

const { startCase, camelCase, snakeCase, kebabCase, upperCase, lowerCase } = require('lodash');
export const strings = {
    caseModifier: (string, caseType) => {
        let str = String(string);
        const words = str.split(/[ _-]/); // split words by space, underscore or dash
        switch (caseType) {
            case "Capitalize":
            case "c":
                return str.charAt(0)?.toUpperCase() + str?.slice(1);
            case "Title Case":
            case 'tc':
                return startCase(str);
            case "PascalCase":
            case 'pc':
                return words?.reduce((acc, val) => acc + val?.charAt(0)?.toUpperCase() + val?.slice(1), '');
            case "camelCase":
            case 'cc':
                return camelCase(str);
            case "snake_case":
            case 'sc':
                return snakeCase(str);
            case "kebab-case":
            case 'kb':
                return kebabCase(str);
            case 'UPPERCASE':
            case 'uppercase':
            case 'upperCase':
            case 'up':
                return upperCase(str);
            case 'lowercase':
            case 'lc':
                return lowerCase(str);
            default:
                throw new Error(`Invalid case type specified: ${caseType}`);
        }
    },
}

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