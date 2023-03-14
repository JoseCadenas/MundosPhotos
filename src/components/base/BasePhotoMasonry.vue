<template>
  <section v-if="columnObjects?.length" class="row q-gutter-x-sm">
    <section
      v-for="(data, i) of columnObjects"
      :key="i"
      :class="[
        'column q-gutter-y-sm',
        isPlainObject(data) ? data?.class : 'col',
      ]"
    >
      <!-- Middle Slot -->
      <slot
        name="middle"
        v-if="
          useMiddleSlot && !isPlainObject(data) && Array.isArray(middleIndexes)
            ? middleIndexes?.[0] == i
            : middleIndexes == i
        "
      >
      </slot>
      <!-- Middle use case -->
      <section v-if="isPlainObject(data)" class="row q-gutter-x-sm">
        <!-- Middle Slot -->
        <slot
          name="middle"
          v-if="
            useMiddleSlot && Array.isArray(middleIndexes)
              ? middleIndexes?.[0] == i
              : middleIndexes == i
          "
        >
        </slot>
        <!-- Middle use case image rendering -->
        <section
          v-for="(data, i) of data?.photos"
          :key="i"
          class="col column q-gutter-y-sm q-pt-sm"
        >
          <q-img
            v-for="(src, index) of data"
            :key="index"
            :src="src"
            class="rounded-borders"
          />
        </section>
      </section>
      <!-- Render image -->
      <q-img
        v-else
        v-for="(src, index) of data"
        :key="index"
        :src="src"
        class="rounded-borders"
      />
    </section>
  </section>
</template>

<script>
import { useI18n } from "vue-i18n";
import { computed, inject } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { storage, fb } from "src/boot/firebase";
import { computedAsync } from "@vueuse/core";
import { isPlainObject, shuffle } from "lodash";
export default {
  name: "BasePhotoMasonry",
  props: {
    src: "string",
    numberOfPhotos: Number,
    useMiddleSlot: Boolean,
  },
  setup(props) {
    const i18n = useI18n();
    const global = inject("global");
    const router = useRouter();
    const q = useQuasar();

    const photos = computedAsync(async () => {
      const arr = [];
      if (props?.src?.includes("folder:")) {
        const folderPath = props?.src?.replace("folder:", "");
        for (let i = 1; i < props?.numberOfPhotos + 1 ?? 50; i++) {
          arr.push(`photos/${folderPath}/photo${i}.jpeg`);
        }
      }
      return shuffle(arr);
    });
    const numberOfColumns = computed(() => {
      if (q?.screen?.xs) return 1;
      else if (q?.screen?.sm) return 2;
      else if (q?.screen?.md) return 3;
      else if (q?.screen?.lg) return 4;
      else if (q?.screen?.xl) return 5;
    });
    const middleIndexes = computed(() => {
      return numberOfColumns?.value > 1
        ? global?.numbers?.middleIndexes([
            ...Array(numberOfColumns?.value).keys(),
          ])
        : 0;
    });
    const columnObjects = computed(() => {
      const isMIArray = Array.isArray(middleIndexes?.value);
      let arrays = (photos?.value || [])
        .reduce(
          (arr, photo, index) => {
            const i = index % numberOfColumns?.value ?? 1;
            arr[i].push(photo);

            return arr;
          },
          [...Array(numberOfColumns?.value ?? 1)].map(() => [])
        )
        .sort((a, b) => a?.length - b?.length);

      //Shortest array length in middle
      let temp = [];
      for (let i = 0; i < numberOfColumns?.value; i++) {
        const isInMiddle = isMIArray
          ? middleIndexes?.value?.includes(i)
          : middleIndexes?.value == i;
        const el = arrays?.[isInMiddle ? "shift" : "pop"]();
        temp.push(el);
      }
      arrays = temp;

      return arrays.reduce((arr, photos, index) => {
        if (
          Array.isArray(middleIndexes?.value) &&
          middleIndexes?.value?.includes(index)
        ) {
          const insertIndex =
            middleIndexes?.value?.[0] == index ? index : index - 1;
          if (!arr?.[insertIndex])
            arr[insertIndex] = {
              class: numberOfColumns?.value == 2 ? "col-12" : "col-6",
              photos: [photos],
            };
          else arr[insertIndex].photos.push(photos);
        } else arr.push(photos);
        return arr;
      }, []);
    });

    return {
      i18n,
      global,
      router,
      numberOfColumns,
      middleIndexes,
      columnObjects,
      //Imported
      isPlainObject,
    };
  },
};
</script>