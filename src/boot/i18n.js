import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

const messages = {
  'en-US': {
    save: 'Save',
    close: 'Close',
    skeletonCode: 'Skeleton Code',
    languageSelector: 'Selector de idioma',
    optional: 'Optional',
    required: 'Required',
    account: 'Account',
    signUp: 'Sign up',
    signIn: 'Sign in',
    signOut: 'Sign out',
    alreadyHaveAnAccountSignIn: 'Already have an account, sign in.',
    forgotPassword: 'Forgot password?',
    createAnAccount: 'Create an Account',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    home: 'Home',
    rules: {
      input: 'Please enter something.',
      select: 'Please select an option. | Please select two or more options.',
      date: 'Please select a date.',
      passwordMustBeAtLeastNumberCharacters: ({ number = 6 }) => `Password must be at least ${number} characters.`,
    },
    success: {},
    warnings: {},
    errors: {
      somethingWentWrong: 'Something went wrong.',
      pleaseTryAgain: 'Please try again.',
      general: '@:errors.somethingWentWrong @:errors.pleaseTryAgain',
      emailAlreadyInUse: 'Email already in use, please sign in.',
      invalidEmail: 'Invalid email.',
      weakPassword: '@:rules.passwordMustBeAtLeastNumberCharacters',
      accountDisabled: 'Account disabled.',
      accountNotFound: 'Account not found.',
      wrongPassword: 'Wrong password.',
    },
  },
  'es-MX': {
    save: 'Guardar',
    close: 'Cerrar',
    skeletonCode: 'Código Esqueleto',
    languageSelector: 'Language selector',
    optional: 'Opcional',
    required: 'Necesario',
    account: 'Cuenta',
    signUp: 'Inscribirse',
    signIn: 'Iniciar sesión',
    signOut: 'Cerrar sesión',
    alreadyHaveAnAccountSignIn: 'Ya tienes una cuenta, inicia sesión.',
    forgotPassword: '¿Has olvidado tu contraseña?',
    createAnAccount: 'Crea una Cuenta',
    email: 'Correo Electrónico',
    password: 'Clave',
    confirmPassword: '@:confirm @:password',
    confirm: 'Confirmar',
    home: 'Inicio',
    rules: {
      input: 'Por favor ingrese algo.',
      select: 'Por favor seleccione una opción. | Seleccione dos o más opciones.',
      date: 'Seleccione una fecha.',
      passwordMustBeAtLeastNumberCharacters: ({ number = 6 }) => `La contraseña debe tener al menos ${number} caracteres.`,
    },
    success: {},
    warnings: {},
    errors: {
      somethingWentWrong: 'Algo salió mal.',
      pleaseTryAgain: 'Inténtalo de nuevo.',
      general: '@:errors.somethingWentWrong @:errors.pleaseTryAgain',
      emailAlreadyInUse: 'Correo electrónico ya en uso, por favor inicie sesión.',
      invalidEmail: 'Email inválido.',
      weakPassword: '@:rules.passwordMustBeAtLeastNumberCharacters',
      accountDisabled: 'Cuenta desactivada.',
      accountNotFound: 'Cuenta no encontrada.',
      wrongPassword: 'Contraseña incorrecta.',
    },
  },
}

export const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
  globalInjection: true,
  messages,
});

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n)
})
