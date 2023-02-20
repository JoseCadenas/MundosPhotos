<template>
  <BaseInfo noColon title="Account Page" />
  {{ usersStore?.authorizedUser?.email }}
  {{ usersStore?.authorizedUser?.uid }}
</template>


<script>
import { useI18n } from "vue-i18n";
import { inject } from "vue";
import { useRoute } from "vue-router";
import { useUsersStore } from "src/stores/services/users.js";
export default {
  setup() {
    const i18n = useI18n();
    const global = inject("global");
    const route = useRoute();
    const usersStore = useUsersStore();

    return {
      i18n,
      global,
      route,
      usersStore,
    };
  },
};
</script>
