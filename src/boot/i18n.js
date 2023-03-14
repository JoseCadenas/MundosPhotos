import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

const messages = {
  'en-US': {
    skeletonCode: 'Skeleton Code',
    languageSelector: 'Selector de idioma',
    optional: 'Optional',
    required: 'Required',
    save: 'Save',
    close: 'Close',
    send: 'Send',
    sendMessage: 'Send Message',
    name: 'Name',
    phoneNumber: 'Phone Number',
    message: 'Message',
    home: 'Home',
    dismiss: 'Dismiss',
    //Auth
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
    //Photography
    photography: 'photography',
    photographyDescription: 'Capture your special moments forever with our professional photography services. At Mundos Photos, we specialize in creating beautiful, high-quality photographs for every occasion. From family portraits and engagement shoots to weddings and corporate events, we have the skills and experience to deliver stunning results. Our team of expert photographers will work closely with you to understand your unique vision, and bring it to life through our lens. With flexible packages and competitive pricing, we make it easy to get the perfect shots. Don\'t settle for less – contact us today to book your next photography session!',
    //Photo Booth
    photoBooth: 'Photo Booth',
    photoBoothDescription: 'Capture the fun and memories at your next event with our top-of-the-line photo booth service! Our state-of-the-art equipment and friendly staff will ensure that your guests have a blast while taking stunning, high-quality photos. Choose from a variety of props, and custom photo templates to make your pictures truly one-of-a-kind. Contact us today to book your event and let us make your special occasion even more memorable!',
    //Contact Us
    contactUs: 'Contact Us',
    letsGetInTouch: 'Let\'s get in touch',
    emailSentMessage: 'Your message has been sent. Thank you for your interest. We will respond as soon as possible.',
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
    skeletonCode: 'Código Esqueleto',
    languageSelector: 'Language selector',
    optional: 'Opcional',
    required: 'Necesario',
    save: 'Guardar',
    close: 'Cerrar',
    send: 'Enviar',
    sendMessage: 'Enviar Mensaje',
    name: 'Nombre',
    phoneNumber: 'Número de Teléfono',
    message: 'Mensaje',
    home: 'Inicio',
    dismiss: 'Despedir',
    //Auth
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
    //Photography
    photography: 'Fotografía',
    photographyDescription: 'Captura tus momentos especiales para siempre con nuestros servicios de fotografía profesional. En Mundos Photos, nos especializamos en crear fotografías hermosas y de alta calidad para cada ocasión. Desde retratos familiares y sesiones de compromiso hasta bodas y eventos corporativos, tenemos las habilidades y la experiencia para ofrecer resultados impresionantes. Nuestro equipo de fotógrafos expertos trabajará estrechamente contigo para comprender tu visión única y darle vida a través de nuestro lente. Con paquetes flexibles y precios competitivos, hacemos que sea fácil obtener las tomas perfectas. No te conformes con menos, contáctanos hoy mismo para reservar tu próxima sesión de fotografía.',
    //Photo Booth
    photoBooth: 'Cabina Fotográfica',
    photoBoothDescription: 'Capture la diversión y los recuerdos en su próximo evento con nuestro servicio de cabina fotográfica de primera línea. Nuestro equipo de última generación y nuestro personal cordial se asegurarán de que sus huéspedes se diviertan mientras toman fotos impresionantes de alta calidad. Elige entre una gran variedad de accesorios y plantillas de fotos personalizadas para que tus fotografías sean realmente únicas. Póngase en contacto con nosotros hoy mismo para reservar su evento y permítanos hacer que su ocasión especial sea aún más memorable.',
    //Contact Us
    contactUs: 'Contactarnos',
    letsGetInTouch: 'Mantengámonos en contacto',
    emailSentMessage: 'Tu mensaje ha sido enviado. Gracias por su interés. Responderemos lo antes posible.',
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
  fallbackLocale: 'en-US',
  // locale: navigator?.language ?? 'en-US',
  locale: 'en-US',
  globalInjection: true,
  messages,
});

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n)
})
