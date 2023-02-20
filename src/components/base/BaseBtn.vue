<template>
  <q-btn
    :dense="!notDense"
    :push="!notPush"
    :noCaps="!caps"
    :label="global?.translation(label)"
  >
  </q-btn>
</template>

<script setup>
import { inject } from "vue";
const { useI18n } = require("vue-i18n");

const i18n = useI18n();
const global = inject("global");
const props = defineProps({
  label: [String, Number],
  caps: Boolean,
  notPush: Boolean,
  notDense: Boolean,
});
</script>