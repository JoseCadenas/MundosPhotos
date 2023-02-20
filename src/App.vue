<template>
  <router-view />
</template>

<script>
import { useI18n } from "vue-i18n";
import { inject } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "src/stores/services/users.js";
import { onAuthStateChanged } from "firebase/auth";
export default {
  name: "App",
  setup() {
    const i18n = useI18n();
    const global = inject("global");
    const router = useRouter();

    // Authorized User
    const usersStore = useUsersStore();
    onAuthStateChanged(usersStore?.auth, (user) => {
      usersStore?.setAuthorizedUser(user);
    });

    return {};
  },
};
</script>