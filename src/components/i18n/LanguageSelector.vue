<template>
  <BaseSelect :label="t('languageSelector')" emitValue mapOptions class="bg-white text-black rounded-borders"
    style="min-width: 150px" :options="options" v-model:select="locale" />
</template>

<script setup>
const { useI18n } = require("vue-i18n");
const { t, locale } = useI18n({ useScope: "global" });

const options = [
  { value: "en-US", label: "English" },
  { value: "es-MX", label: "Español" },
];
</script>