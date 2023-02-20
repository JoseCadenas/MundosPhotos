<template>
  <q-input
    :dense="!notDense"
    :filled="!notFilled"
    :rules="computedRules"
    :type="isPasswordVisible ? 'text' : type"
    :error-message="global?.translation(errorMessage)"
    @update:modelValue="emit('update:input', $event)"
    :modelValue="input"
  >
    <template v-slot:append>
      <slot name="append"></slot>
      <section v-if="type === 'password'">
        <BaseBtn
          flat
          color="grey-6"
          size="md"
          :icon="
            isPasswordVisible
              ? global?.iconList?.visibility_off ?? 'visibility_off'
              : global?.iconList?.visibility ?? 'visibility'
          "
          @click="isPasswordVisible = !isPasswordVisible"
        />
      </section>
    </template>
  </q-input>
</template>


<script setup>
import { ref, inject } from "vue";
const { computed } = require("@vue/runtime-core");
const { useI18n } = require("vue-i18n");
const i18n = useI18n();
const emit = defineEmits(["update:input"]);
const global = inject("global");

const props = defineProps({
  input: {
    required: true,
  },
  type: {
    type: String,
  },
  notDense: Boolean,
  notFilled: Boolean,
  rules: [Array, Boolean],
  errorMessage: String,
});

const isPasswordVisible = ref(false);

const computedRules = computed(() => {
  if (!props?.rules) return null;

  if (typeof props?.rules == "boolean" && props?.rules) {
    return [(val) => val?.length || i18n?.t("rules.input")];
  } else return props?.rules;
});
</script>