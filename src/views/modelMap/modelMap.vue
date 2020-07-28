<template>
  <div id="modelMapContainer" class="container">
  </div>
</template>

<script>
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { TDSLoader } from "three/examples/jsm/loaders/TDSLoader";

export default {
  data() {
    return {
      container: null,
      controls: null,
      camera: null,
      scene: null,
      renderer: null,
    };
  },
  mounted() {
    this.initMap();
    this.animate();
  },
  methods: {
    initMap() {
      this.container = document.getElementById("modelMapContainer");

      this.camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        10
      );
      this.camera.position.z = 2;

      this.scene = new THREE.Scene();
      this.scene.add(new THREE.HemisphereLight());

      const directionalLight = new THREE.DirectionalLight(0xffeedd);
      directionalLight.position.set(0, 0, 2);
      this.scene.add(directionalLight);

      //3ds files dont store normal maps
      const textureLoader = new THREE.TextureLoader();
      const normal = textureLoader.load("/map_model/Asphalt_.jpg");

      const loader = new TDSLoader();
      loader.setResourcePath("/map_model/");
      loader.load("/map_model/20200726zhongshu.3ds", (object) => {
        object.traverse(function (child) {
          if (child.isMesh) {
            child.material.normalMap = normal;
          }
        });

        this.scene.add(object);
      });

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.container.appendChild(this.renderer.domElement);

      this.controls = new TrackballControls(this.camera, this.renderer.domElement);

      window.addEventListener("resize", this.resize, false);
    },
    animate() {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);

      requestAnimationFrame(this.animate);
    },
    resize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 0px;
  position: relative;
}
.container canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>