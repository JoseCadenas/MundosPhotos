import { defineBoot } from "#q-app/wrappers";
import LanguageSelector from "src/components/i18n/LanguageSelector.vue";
import BaseInfo from "src/components/base/BaseInfo.vue";
import BaseInput from "src/components/base/BaseInput.vue";
import BaseSelect from "src/components/base/BaseSelect.vue";
import BaseBtn from "src/components/base/BaseBtn.vue";
import BaseIcon from "src/components/base/BaseIcon.vue";
import BasePhotoMasonry from "src/components/base/BasePhotoMasonry.vue";
export default defineBoot(({ app }) => {
  app.component("LanguageSelector", LanguageSelector);
  app.component("BaseInfo", BaseInfo);
  app.component("BaseInput", BaseInput);
  app.component("BaseSelect", BaseSelect);
  app.component("BaseBtn", BaseBtn);
  app.component("BaseIcon", BaseIcon);
  app.component("BasePhotoMasonry", BasePhotoMasonry);
});
