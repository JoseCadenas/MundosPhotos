<template>
  <q-layout view="hHh lpr lFf">
    <!-- Header -->
    <q-header elevated class="bg-black">
      <section
        :class="['row items-end', q?.screen?.gt?.sm ? '' : 'justify-center']"
      >
        <!-- Logo -->
        <q-img
          v-scroll="onScroll"
          :width="logoStyle?.width"
          :height="logoStyle?.height"
          class="resize-transition"
          src="~assets/companyLogos/mundosPhotoLogo.png"
          @click="
            router.push({
              name: 'photography',
            })
          "
        />
        <q-space v-if="q?.screen?.gt?.sm" />
        <!-- Tabs -->
        <q-tabs
          :class="[q?.screen?.gt?.sm ? '' : 'col-12']"
          mobile-arrows
          inline-label
          :modelValue="selectedTab"
        >
          <q-route-tab
            v-for="tab of tabs"
            :key="tab?.label"
            :name="tab?.label"
            :icon="tab?.icon"
            :label="global?.translation(tab?.label)"
            :to="tab?.to"
          />
        </q-tabs>
      </section>
    </q-header>

    <!-- Page -->
    <q-page-container>
      <q-page class="bg-white q-pa-sm q-pb-md scroll">
        <router-view />
        <!-- Footer -->
        <footer
          :class="[
            'absolute-bottom text-center text-subtle',
            `gf-${q?.screen?.gt?.sm ? 10 : 8}`,
          ]"
        >
          reCAPTCHA subject to Google
          <a
            target="_blank"
            href="https://policies.google.com/privacy"
            class="text-subtle"
            >Privacy Policy</a
          >
          &
          <a
            target="_blank"
            href="https://policies.google.com/terms"
            class="text-subtle"
            >Terms of Service</a
          >
        </footer>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useI18n } from "vue-i18n";
import { computed, inject, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
export default {
  setup() {
    const i18n = useI18n();
    const global = inject("global");
    const route = useRoute();
    const router = useRouter();
    const q = useQuasar();

    const logoStyle = reactive({ width: 160 + "px", height: 80 + "px" });
    const onScroll = function (verticalScrollPosition) {
      if (verticalScrollPosition > 200 && q?.screen?.gt?.sm) {
        logoStyle.width = 96 + "px";
        logoStyle.height = 48 + "px";
      } else {
        logoStyle.width = 160 + "px";
        logoStyle.height = 80 + "px";
      }
    };

    const selectedTab = computed(() => {
      return route?.name;
    });
    const tabs = computed(() => {
      return [
        {
          label: "photography",
          icon: global?.iconList?.photography,
          to: { name: "photography" },
        },
        {
          label: "photoBooth",
          icon: global?.iconList?.photoBooth,
          to: { name: "photoBooth" },
        },
        {
          label: "contactUs",
          icon: global?.iconList?.contactUs,
          to: { name: "contactUs" },
        },
      ];
    });
    return {
      i18n,
      global,
      route,
      router,
      q,
      onScroll,
      logoStyle,
      selectedTab,
      tabs,
    };
  },
};
</script>
