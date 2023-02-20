<template>
  <q-card-section class="q-gutter-sm">
    <q-form greedy @submit="signUp">
      <!-- Form -->
      <BaseInfo noColon titleClass="gf-header" title="signUp">
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
        <!-- Confirm Password -->
        <BaseInfo required title="confirmPassword">
          <BaseInput
            type="password"
            lazyRules
            :rules="[
              (val) => val?.length || i18n?.t('rules.input'),
              (val) => val == password || 'Password does not match',
            ]"
            v-model:input="confirmPassword"
            @focus="clearErrors"
          />
        </BaseInfo>
      </BaseInfo>
      <!-- Action -->
      <q-card-actions align="right">
        <!-- Sign in route -->
        <BaseBtn
          :disable="isRegistering"
          flat
          color="primary"
          label="alreadyHaveAnAccountSignIn"
          :to="{ name: 'signIn' }"
        />
        <!-- Sign in with Google - TODO -->
        <BaseBtn
          :disable="isRegistering"
          label="Sign in with Google"
          @click="signInWithGoogle"
        />
        <!-- Sign Up -->
        <BaseBtn :loading="isRegistering" label="signUp" type="submit" />
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
    const confirmPassword = ref("");
    const isRegistering = ref(false);
    const errors = reactive({
      email: null,
      password: null,
    });

    function clearErrors() {
      if (errors?.email) errors.email = null;
      if (errors?.password) errors.password = null;
    }
    async function signUp() {
      try {
        isRegistering.value = true;
        await usersStore.createUserWithEmailAndPassword(
          email.value,
          password.value
        );

        router.push({ name: "home" });
      } catch (err) {
        // console.error("signUp - signUp", { ...err });
        switch (err?.code) {
          case "auth/email-already-in-use":
            errors.email = "errors.emailAlreadyInUse";
            setTimeout(() => {
              router.push({ name: "signIn" });
            }, 4000);
            break;
          case "auth/invalid-email":
            errors.email = "errors.invalidEmail";
            break;
          case "auth/weak-password":
            errors.email = "errors.weakPassword";
            break;
          case "auth/operation-not-allowed":
          default:
            errors.email = "errors.general";
            break;
        }
      } finally {
        isRegistering.value = false;
      }
    }
    function signInWithGoogle() {
      console.log("Register with google - TODO");
    }

    return {
      i18n,
      global,
      router,
      email,
      password,
      confirmPassword,
      isRegistering,
      errors,
      clearErrors,
      signUp,
      signInWithGoogle,
    };
  },
};
</script>