<template>
  <div
    class="fullscreen bg-black text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 28vh">404</div>
      <div class="gf-48 text-white" style="opacity: 0.4">
        Oops. Nothing here...
      </div>
      <BaseBtn
        color="white"
        text-color="black"
        to="/"
        label="Click Me"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorNotFound",
  setup() {},
};
</script>
