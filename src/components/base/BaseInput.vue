<template>
  <q-input
    :dense="!notDense"
    :filled="!notFilled"
    :rules="computedRules"
    bottom-slots
    :type="type == 'password' && isPasswordVisible ? 'text' : type"
    :error-message="global?.translation(errorMessage)"
    @update:modelValue="$emit('update:input', $event)"
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

<script>
import { useI18n } from "vue-i18n";
import { ref, computed, inject } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "BasePhotoMasonry",
  emits: ["update:input"],
  props: {
    input: {
      required: true,
    },
    type: String,
    notDense: Boolean,
    notFilled: Boolean,
    rules: [Array, Boolean],
    errorMessage: String,
  },
  setup(props) {
    const i18n = useI18n();
    const global = inject("global");
    const router = useRouter();

    const isPasswordVisible = ref(false);

    const computedRules = computed(() => {
      if (!props?.rules) return null;

      if (typeof props?.rules == "boolean" && props?.rules == true) {
        if (["tel", "number"].includes(props?.type))
          return [(val) => !!val || i18n?.t("rules.input")];
        else return [(val) => val?.length || i18n?.t("rules.input")];
      } else if (props?.rules) return props?.rules;
      else return null;
    });

    return {
      i18n,
      global,
      router,
      isPasswordVisible,
      computedRules,
    };
  },
};
</script>