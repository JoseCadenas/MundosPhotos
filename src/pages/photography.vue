<template>
  <BasePhotoMasonry useMiddleSlot src="folder:photography">
    <template #middle>
      <q-card>
        <q-card-section class="column items-center">
          <BaseInfo
            class="on-top"
            titleClass="gf-title text-center"
            :title="global?.translation('photographyDescription')"
          />
          <section>
            <BaseBtn
              class="on-top"
              flat
              icon="img:socialMedia/instagram/instagram.png"
              label="Mundos Photos"
              href="https://www.instagram.com/mundosphotos"
              target="_blank"
            />
          </section>
        </q-card-section>
      </q-card>
    </template>
  </BasePhotoMasonry>
</template>

<script>
import { useI18n } from "vue-i18n";
import { inject } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const i18n = useI18n();
    const global = inject("global");
    const router = useRouter();
    return {
      i18n,
      global,
      router,
    };
  },
};
</script>
