<template>
  <q-card-section class="q-gutter-sm">
    <q-form autofocus greedy @submit="signIn">
      <!-- Form -->
      <BaseInfo
        noColon
        titleClass="gf-header row justify-between"
        title="signIn"
      >
        <template #title>
          <!-- Create Account (Router) -->
          <BaseBtn
            :disable="isAuthenticating"
            color="primary"
            label="createAnAccount"
            :to="{ name: 'signUp' }"
          />
        </template>
        <!-- Email -->
        <BaseInfo required title="email">
          <BaseInput
            reactiveRules
            rules
            :error="!!errors?.email"
            :errorMessage="errors?.email"
            type="email"
            v-model:input="email"
            @focus="clearErrors"
          />
        </BaseInfo>
        <!-- Password -->
        <BaseInfo required title="password">
          <BaseInput
            reactiveRules
            :rules="[
              (val) =>
                val?.length >= 6 ||
                i18n?.t('rules.passwordMustBeAtLeastNumberCharacters'),
            ]"
            :error="!!errors?.password"
            :errorMessage="errors?.password"
            type="password"
            v-model:input="password"
            @focus="clearErrors"
          />
        </BaseInfo>
      </BaseInfo>
      <!-- Actions -->
      <q-card-actions align="right">
        <!-- Forgot password route - TODO -->
        <BaseBtn
          :disable="isAuthenticating"
          flat
          color="primary"
          label="forgotPassword"
          :to="{ name: 'forgotPassword' }"
        />
        <!-- Sign in with Google - TODO -->
        <BaseBtn
          :disable="isAuthenticating"
          label="Sign in with Google"
          @click="signInWithGoogle"
        />
        <!-- Sign in -->
        <BaseBtn
          :loading="isAuthenticating"
          :icon="global?.iconList?.signIn"
          label="signIn"
          type="submit"
        />
      </q-card-actions>
    </q-form>
  </q-card-section>
</template>

<script>
import { useI18n } from "vue-i18n";
import { inject, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "src/stores/services/users.js";
export default {
  setup() {
    const i18n = useI18n();
    const global = inject("global");
    const router = useRouter();
    const usersStore = useUsersStore();

    const email = ref("");
    const password = ref("");
    const isAuthenticating = ref(false);
    const errors = reactive({
      email: null,
      password: null,
    });

    function clearErrors() {
      if (errors?.email) errors.email = null;
      if (errors?.password) errors.password = null;
    }
    async function signIn() {
      try {
        isAuthenticating.value = true;
        await usersStore.signInWithEmailAndPassword(
          email.value,
          password.value
        );

        router.push({ name: "home" });
      } catch (err) {
        // console.error("signIn - signIn", { ...err });
        switch (err?.code) {
          case "auth/invalid-email":
            errors.email = "errors.invalidEmail";
            break;
          case "auth/user-disabled":
            errors.email = "errors.accountDisabled";
            break;
          case "auth/user-not-found":
            errors.email = "errors.accountNotFound";
            break;
          case "auth/wrong-password":
            errors.password = "errors.wrongPassword";
            break;
          default:
            errors.email = "errors.general";
            break;
        }
      } finally {
        isAuthenticating.value = false;
      }
    }
    function signInWithGoogle() {
      console.log("Sign in with Google", usersStore);
    }

    return {
      i18n,
      global,
      router,
      email,
      password,
      isAuthenticating,
      errors,
      clearErrors,
      signIn,
      signInWithGoogle,
    };
  },
};
</script>