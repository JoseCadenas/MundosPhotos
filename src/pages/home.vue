<template>
  <BaseInfo noColon title="Home Page" />
</template>

<script>
import { useI18n } from "vue-i18n";
import { inject } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "src/stores/services/users.js";
export default {
  setup() {
    const i18n = useI18n();
    const global = inject("global");
    const router = useRouter();
    const usersStore = useUsersStore();
    return {
      i18n,
      global,
      router,
      usersStore,
    };
  },
};
</script>