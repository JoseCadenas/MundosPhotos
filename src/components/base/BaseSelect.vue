<template>
  <q-select
    :dense="!notDense"
    :filled="!notFilled"
    :rules="computedRules"
    :error-message="global?.translation(errorMessage)"
    @update:modelValue="emit('update:select', $event)"
    :modelValue="select"
  />
</template>

<script setup>
import { inject } from "vue";
const { computed } = require("@vue/runtime-core");
const { useI18n } = require("vue-i18n");

const i18n = useI18n();
const emit = defineEmits(["update:select"]);
const global = inject("global");

const props = defineProps({
  select: {
    required: true,
  },
  notDense: Boolean,
  notFilled: Boolean,
  rules: [Array, Boolean],
  errorMessage: String,
  multiple: Boolean,
});

const computedRules = computed(() => {
  if (!props?.rules) return null;

  if (typeof props?.rules == "boolean" && props?.multiple)
    return [(val) => val?.length >= 2 || i18n?.t("rules.select", 2)];
  else if (typeof props?.rules == "boolean")
    return [(val) => val || i18n?.t("rules.select")];
  else return props?.rules;
});
</script>
