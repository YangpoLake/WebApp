<template>
  <div id="modelMapContainer" class="container"></div>
</template>

<script>
import * as THREE from "three";
import { DDSLoader } from "three/examples/jsm/loaders/DDSLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

export default {
  data() {
    return {
      container: null,

      camera: null,
      scene: null,
      renderer: null,

      mouseX: 0,
      mouseY: 0,

      windowHalfX: window.innerWidth / 2,
      windowHalfY: window.innerHeight / 2,
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
        45,
        window.innerWidth / window.innerHeight,
        1,
        2000
      );
      this.camera.position.z = 250;

      // scene

      this.scene = new THREE.Scene();

      const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
      this.scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 0.8);
      this.camera.add(pointLight);
      this.scene.add(this.camera);

      // model

      const onProgress = (xhr) => {
        if (xhr.lengthComputable) {
          const percentComplete = (xhr.loaded / xhr.total) * 100;
          console.log(Math.round(percentComplete, 2) + "% downloaded");
        }
      };

      const onError = () => {
        console.log("Error!!!");
      };

      const manager = new THREE.LoadingManager();
      manager.addHandler(/\.dds$/i, new DDSLoader());

      // comment in the following line and import TGALoader if your asset uses TGA textures
      // manager.addHandler( /\.tga$/i, new TGALoader() );

      new MTLLoader(manager)
        .setPath("/map_model/obj/")
        .load("20200726zhongshu.mtl", (materials) => {
          materials.preload();

          new OBJLoader(manager)
            .setMaterials(materials)
            .setPath("/map_model/obj/")
            .load(
              "20200726zhongshu.obj",
              (object) => {
                object.position.y = -95;
                this.scene.add(object);
              },
              onProgress,
              onError
            );
        });

      //

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.container.appendChild(this.renderer.domElement);

      document.addEventListener("mousemove", this.onDocumentMouseMove, false);

      //

      window.addEventListener("resize", this.onWindowResize, false);
    },
    animate() {
      requestAnimationFrame( this.animate );
      this.render();
    },
    onWindowResize() {
      this.windowHalfX = window.innerWidth / 2;
      this.windowHalfY = window.innerHeight / 2;

      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    onDocumentMouseMove(event) {
      this.mouseX = (event.clientX - this.windowHalfX) / 2;
      this.mouseY = (event.clientY - this.windowHalfY) / 2;
    },
    render() {
      this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
      this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;

      this.camera.lookAt(this.scene.position);

      this.renderer.render(this.scene, this.camera);
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