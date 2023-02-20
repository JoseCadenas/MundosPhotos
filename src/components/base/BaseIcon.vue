<template>
  <q-icon>
    <q-tooltip v-if="tooltip" class="gf-13">
      {{ computedTooltip }}
    </q-tooltip>
    <slot></slot>
  </q-icon>
</template>

<script setup>
const { computed } = require("@vue/runtime-core");
const { useI18n } = require("vue-i18n");
const i18n = useI18n();

const props = defineProps({
  tooltip: String,
});

const computedTooltip = computed(() => {
  return i18n?.te(props?.tooltip) ? i18n?.t(props?.tooltip) : props?.tooltip;
});
</script>