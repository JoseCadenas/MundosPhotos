<template>
  <q-layout view="hHh Lpr lFf">
    <!-- Header -->
    <q-header elevated class="bg-black">
      <q-toolbar class="row items-center q-gutter-x-sm">
        <BaseBtn
          flat
          dense
          :icon="global?.iconList?.menu"
          @click="toggleDrawer"
        />
        <q-toolbar-title> {{ $t("skeletonCode") }} </q-toolbar-title>
        <q-space />
        <base-btn
          v-if="usersStore?.hasAuthUser"
          :loading="isSigningOut"
          label="signOut"
          @click="signOut"
        />
        <LanguageSelector />
      </q-toolbar>
    </q-header>

    <!-- Drawer -->
    <q-drawer
      bordered
      show-if-above
      :width="200"
      :breakpoint="500"
      class="bg-grey-3"
      v-model="drawerState"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="link in links" :key="link.title">
            <q-item
              v-ripple
              clickable
              :to="link?.to"
              :active="link?.to?.name == route?.name"
            >
              <q-item-section avatar>
                <q-icon :name="link.icon" />
              </q-item-section>
              <q-item-section>
                {{ i18n.t(link.title) }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- Page -->
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useI18n } from "vue-i18n";
import { computed, inject, ref } from "vue";
import { useRoute } from "vue-router";
import { useUsersStore } from "src/stores/services/users.js";
export default {
  setup() {
    const i18n = useI18n();
    const global = inject("global");
    const route = useRoute();
    const usersStore = useUsersStore();

    const drawerState = ref(false);
    function toggleDrawer() {
      drawerState.value = !drawerState.value;
    }

    const links = computed(() => {
      const arr = [
        {
          title: "home",
          icon: global?.iconList?.home,
          to: { name: "home" },
        },
      ];

      if (usersStore?.hasAuthUser) {
        arr.push({
          title: "account",
          icon: global?.iconList?.account,
          to: {
            name: "account",
            params: { uid: usersStore?.authorizedUser?.uid },
          },
        });
      } else {
        arr.push(
          {
            title: "signIn",
            icon: global?.iconList?.signIn,
            to: { name: "signIn" },
          },
          {
            title: "signUp",
            icon: global?.iconList?.signUp,
            to: { name: "signUp" },
          }
        );
      }

      return arr;
    });

    const isSigningOut = ref(false);
    const signOut = async () => {
      try {
        isSigningOut.value = true;
        await usersStore.signOut();
      } catch (err) {
        console.error("mainLayout - signOut", err);
      } finally {
        isSigningOut.value = false;
      }
    };
    return {
      i18n,
      global,
      route,
      usersStore,
      drawerState,
      toggleDrawer,
      links,
      isSigningOut,
      signOut,
    };
  },
};
</script>
