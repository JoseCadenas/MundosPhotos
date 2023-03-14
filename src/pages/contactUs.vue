<template>
  <!-- Email Sent Banner -->
  <q-slide-transition :duration="150">
    <q-banner
      v-if="emailSentStatus == 'success'"
      dense
      inline-actions
      class="text-white bg-primary on-top"
    >
      <section class="row items-center">
        <base-icon
          class="on-left"
          size="sm"
          :name="global?.iconList?.emailSentStatus"
        />
        <base-info
          class="col"
          :title="global.translation('emailSentMessage')"
        />
      </section>
      <template v-slot:action>
        <base-btn
          label="dismiss"
          @click="($event) => (emailSentStatus = null)"
        />
      </template>
    </q-banner>
  </q-slide-transition>
  <section class="row justify-evenly">
    <!-- Email Form -->
    <q-card class="col-md-6 col-sm-8 col-xs-12">
      <q-card-section>
        <q-form greedy @submit="sendEmail">
          <!-- Header -->
          <BaseInfo
            noColon
            :inline="q?.screen?.gt?.sm"
            class="items-end justify-between"
            titleClass="gf-header"
            title="letsGetInTouch"
            dataClass="text-subtle"
            data="Please provide your information and a message."
          />
          <!-- name -->
          <BaseInfo required title="name">
            <BaseInput
              reactiveRules
              rules
              type="text"
              @update:input="clearEmailSent"
              v-model:input="name"
            />
          </BaseInfo>
          <!-- email -->
          <BaseInfo required title="email">
            <BaseInput
              reactiveRules
              rules
              type="email"
              @update:input="clearEmailSent"
              v-model:input="email"
            />
          </BaseInfo>
          <!-- phoneNumber -->
          <BaseInfo optional title="phoneNumber">
            <BaseInput
              mask="(###) ###-####"
              type="tel"
              @update:input="clearEmailSent"
              v-model:input="phoneNumber"
            />
          </BaseInfo>
          <!-- message -->
          <BaseInfo required title="message">
            <BaseInput
              reactiveRules
              rules
              type="textarea"
              @update:input="clearEmailSent"
              v-model:input="message"
            />
          </BaseInfo>
          <!-- Error indicator and Send Message -->
          <q-card-actions align="right">
            <!-- Email Sent Error -->
            <q-slide-transition>
              <q-chip
                v-if="emailSentStatus == 'error'"
                color="negative"
                textColor="white"
                :icon="global?.iconList?.error"
                :label="global.translation('errors.pleaseTryAgain')"
              />
            </q-slide-transition>
            <!-- sendMessage -->
            <BaseBtn
              :loading="isSendingEmail"
              :iconRight="global?.iconList?.send"
              label="sendMessage"
              color="primary"
              type="submit"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
    <!-- Contact Methods -->
    <q-list
      :class="[
        q?.screen?.xs || q?.screen?.sm
          ? 'row items-center justify-center q-py-sm'
          : 'order-first',
      ]"
    >
      <q-item
        v-for="CM in contactsMethods"
        :key="CM?.label"
        v-ripple
        clickable
        :href="CM?.href"
        :target="CM?.target"
        class="rounded-borders"
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white" :icon="CM?.icon" />
        </q-item-section>
        <q-item-section>{{ CM?.label }}</q-item-section>
      </q-item>
    </q-list>
  </section>
</template>

<script>
import { useI18n } from "vue-i18n";
import { inject, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useEmailStore } from "src/stores/services/email";
import { useReCaptcha } from "vue-recaptcha-v3";
import { validateReCaptcha } from "src/boot/firebase";
export default {
  setup() {
    const i18n = useI18n();
    const global = inject("global");
    const router = useRouter();
    const q = useQuasar();
    const emailStore = useEmailStore();

    const name = ref(null);
    const email = ref(null);
    const phoneNumber = ref(null);
    const subject = computed(() => {
      return `${name?.value} - Mundos Photos Inquiry${
        phoneNumber?.value ? ` -  ${phoneNumber?.value}` : ""
      }`;
    });
    const message = ref(null);

    const emailSentStatus = ref(null);
    const clearEmailSent = () => {
      emailSentStatus.value = null;
    };

    const isSendingEmail = ref(false);
    const reCaptchaParams = useReCaptcha();
    const sendEmail = async () => {
      try {
        isSendingEmail.value = true;

        await validateReCaptcha("contactUs", reCaptchaParams);

        const newEmailDoc = await emailStore.sendEmail({
          replyTo: email?.value,
          subject: subject?.value,
          text: message?.value,
        });
        console.log("On Submit", newEmailDoc);
        emailSentStatus.value = "success";
      } catch (err) {
        console.log("sendingEmail Error: ", err, reCaptchaParams);
        emailSentStatus.value = "error";
      } finally {
        isSendingEmail.value = false;
      }
    };

    const contactsMethods = [
      {
        icon: global?.iconList?.phone,
        href: "tel:9516605942",
        label: "(951) 660-5942",
      },
      {
        icon: global?.iconList?.email,
        href: "mailto:MundosPhotos@gmail.com",
        label: "MundosPhotos@gmail.com",
      },
      {
        icon: "img:socialMedia/instagram/whiteIcon.png",
        href: "https://www.instagram.com/mundosphotos",
        target: "_blank",
        label: "Mundos Photos",
      },
      {
        icon: "img:socialMedia/instagram/whiteIcon.png",
        href: "https://www.instagram.com/mundosphotobooth",
        target: "_blank",
        label: "Mundos Photo Booth",
      },
    ];

    return {
      i18n,
      global,
      router,
      q,
      name,
      email,
      phoneNumber,
      message,
      emailSentStatus,
      clearEmailSent,
      isSendingEmail,
      sendEmail,
      contactsMethods,
    };
  },
};
</script>