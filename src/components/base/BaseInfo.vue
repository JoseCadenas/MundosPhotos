<template>
  <section
    :class="[...(computedWrapperClass ?? {}), inline ? 'on-bottom' : '']"
  >
    <!-- Title -->
    <div
      :class="[
        ...(computedTitleClass ?? {}),
        inline ? 'on-left items-center' : '',
      ]"
      :style="titleStyle"
    >
      <div v-if="title" class="row title items-end">
        <BaseIcon
          v-if="icon && iconLeft"
          class="on-left self-center"
          :name="icon"
          :size="iconSize"
          :color="iconColor"
          :tooltip="iconTooltip"
        />
        {{ global?.translation(props?.title) }}
        {{ colon ? ":" : "" }}
        {{ poundSign ? "#" : "" }}
        <div
          v-if="requirements"
          :class="['gf-12 self-center on-right', requirements?.class]"
        >
          {{ requirements?.label }}
        </div>
        <BaseIcon
          v-if="icon && !iconLeft"
          class="on-right self-center"
          :name="icon"
          :size="iconSize"
          :color="iconColor"
          :tooltip="iconTooltip"
        />
      </div>
      <slot name="title"></slot>
    </div>
    <!-- Data -->
    <div :class="[computedDataClass, inline ? 'col' : '']" :style="dataStyle">
      <div v-if="data">
        {{ typeof data == "string" && i18n?.te(data) ? i18n?.t(data) : data }}
      </div>
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
import { inject } from "vue";
const { computed } = require("@vue/runtime-core");
const { useI18n } = require("vue-i18n");

const global = inject("global");
const i18n = useI18n();
const props = defineProps({
  //Wrapper Props
  class: [String, Array, Object],
  inline: Boolean,
  //Title Props
  colon: Boolean,
  poundSign: Boolean,
  title: String,
  titleClass: [String, Array, Object],
  titleStyle: [String, Array, Object],
  //Requirements
  required: Boolean,
  optional: Boolean,
  //Data Props
  data: String,
  dataClass: [String, Array, Object],
  dataStyle: [String, Array, Object],
  //Icon Props
  icon: String,
  iconSize: String,
  iconColor: String,
  iconLeft: Boolean,
  iconTooltip: String,
});

const computedWrapperClass = computed(() => {
  const base = [];

  if (props?.inline) base.push("row items-center");

  if (!props?.class) return base;
  if (["string", "object"].includes(typeof props?.class)) {
    base.push(props?.class);
  } else base.push(...props?.class);

  return base;
});
const computedTitleClass = computed(() => {
  let string = "gf-title row items-center";
  if (props?.titleClass?.includes("gf-"))
    string = string.replace("gf-title ", "");
  const base = [string];
  if (!props?.titleClass) return base;

  if (["string", "object"].includes(typeof props?.titleClass)) {
    base.push(props?.titleClass);
  } else base.push(...props?.titleClass);

  return base;
});
const computedDataClass = computed(() => {
  const base = [];
  if (!props?.dataClass) return base;

  if (typeof props?.dataClass == "string") {
    base.push(props?.dataClass);
  } else base.push(...props?.dataClass);

  return base;
});
const requirements = computed(() => {
  if (props?.required)
    return {
      label: i18n?.t("required"),
      class: "text-red",
    };
  else if (props?.optional)
    return {
      label: i18n?.t("optional"),
      class: "text-subtle",
    };
  return null;
});
</script>