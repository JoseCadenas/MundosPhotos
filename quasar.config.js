/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js

import { defineConfig } from "#q-app/wrappers";
import { config } from "dotenv";
config();

export default defineConfig((ctx) => {
  return {
    // https://v2.quasar.dev/quasar-cli-webpack/supporting-ts
    supportTS: false,

    // https://v2.quasar.dev/quasar-cli-webpack/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-webpack/boot-files
    boot: ["i18n", "components", "global", "firebase", "navigationGuard"],

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-css
    css: ["app.css", "override.css"],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: ["fontawesome-v6", "material-icons"],

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-build
    build: {
      vueRouterMode: "history", // available values: 'hash', 'history'
      env: {
        VITE_PHOTO_BOOTH_EMAIL: process.env.VITE_PHOTO_BOOTH_EMAIL,
        VITE_MUNDOS_PHOTOS_FIREBASE_API_KEY:
          process.env.VITE_MUNDOS_PHOTOS_FIREBASE_API_KEY,
        VITE_MUNDOS_PHOTOS_FIREBASE_AUTH_DOMAIN:
          process.env.VITE_MUNDOS_PHOTOS_FIREBASE_AUTH_DOMAIN,
        VITE_MUNDOS_PHOTOS_PROJECT_ID:
          process.env.VITE_MUNDOS_PHOTOS_PROJECT_ID,
        VITE_MUNDOS_PHOTOS_STORAGE_BUCKET:
          process.env.VITE_MUNDOS_PHOTOS_STORAGE_BUCKET,
        VITE_MUNDOS_PHOTOS_MESSAGE_SENDER_ID:
          process.env.VITE_MUNDOS_PHOTOS_MESSAGE_SENDER_ID,
        VITE_MUNDOS_PHOTOS_APP_ID: process.env.VITE_MUNDOS_PHOTOS_APP_ID,
        VITE_MUNDOS_PHOTOS_MEASUREMENT_ID:
          process.env.VITE_MUNDOS_PHOTOS_MEASUREMENT_ID,
        VITE_MUNDOS_PHOTOS_RECAPTCHA_SITE_KEY:
          process.env.VITE_MUNDOS_PHOTOS_RECAPTCHA_SITE_KEY,
      },

      // webpackTranspile: false,
      // publicPath: '/',

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // webpackTranspileDependencies: [],

      // rtl: true, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // webpackShowProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://v2.quasar.dev/quasar-cli-webpack/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain

      chainWebpack(/* chain */) {},
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-devServer
    devServer: {
      server: {
        type: "http",
      },
      port: 8080,
      open: true, // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-framework
    framework: {
      config: {
        brand: {
          primary: "#000000",
          secondary: "#FFFFFF",
        },
      },

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [],
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      maxAge: 1000 * 60 * 60 * 24 * 30,
      // Tell browser when a file from the server should expire from cache (in ms)

      chainWebpackWebserver(/* chain */) {},

      middlewares: [
        ctx.prod ? "compression" : "",
        "render", // keep this as last one
      ],
    },

    // https://v2.quasar.dev/quasar-cli-webpack/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: "GenerateSW", // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW

      // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
      // if using workbox in InjectManifest mode

      chainWebpackCustomSW(/* chain */) {},

      manifest: {
        name: `MUNDOS PHOTOS`,
        short_name: `mundosPhotos`,
        description: `Mundo's photography and photo booth company website.`,
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#027be3",
        icons: [
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/configuring-electron
    electron: {
      bundler: "packager", // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: "MundosPhotos",
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain

      chainWebpackMain(/* chain */) {},

      chainWebpackPreload(/* chain */) {},
    },
  };
});
