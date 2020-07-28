<template>
  <div class="map-container">
    <div class="map">
      <image-map v-if="current === 'image'" />
      <model-map v-if="current === 'model'" />
    </div>
  </div>
</template>

<script>
import ImageMap from "./imageMap";
import ModelMap from "./modelMap";

export default {
  components: { ImageMap, ModelMap },
  data() {
    return {
      current: "image"
    };
  }
};
</script>

<style scoped>
.map-container {
  width: 100vw;
  height: 100vh;
}

.map {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>