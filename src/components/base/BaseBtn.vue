<template>
  <q-btn
    :dense="!notDense"
    :push="!notPush"
    :noCaps="!caps"
    :label="global?.translation(label)"
  >
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #loading>
      <slot name="loading"></slot>
    </template>
  </q-btn>
</template>

<script setup>
import { inject } from "vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const global = inject("global");
const props = defineProps({
  label: [String, Number],
  caps: Boolean,
  notPush: Boolean,
  notDense: Boolean,
});
</script>