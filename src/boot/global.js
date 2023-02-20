import { boot } from 'quasar/wrappers'
import { readonly } from 'vue';
import { i18n } from 'src/boot/i18n.js';

const global = {
    iconList: {
        menu: 'fas fa-bars',
        visibility: 'visibility',
        visibilityOff: 'visibility_off',
        signUp: 'how_to_reg',
        signIn: 'login',
        signOut: 'logout',
        home: 'home',
        account: 'account_circle',
        asterisk: 'emergency',
    },
    translation: (key) => {
        if (!key || typeof key != 'string') return key;

        return i18n?.global?.te(key) ? i18n?.global?.t(key) : key;
    }
};

export default boot(({ app }) => {
    app.provide('global', readonly(global));
})