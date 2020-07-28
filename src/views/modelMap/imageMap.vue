<template>
  <div>
    <canvas
      id="canvas" class="canvas" ref="canvas" :width="canvasWidth" :height="canvasHeight"
      @mousedown="changeCanvasCanMove(true)" @mouseup="changeCanvasCanMove(false)"
      @mousemove="changeCanvasCenter"
    ></canvas>
    <el-button icon="el-icon-menu" circle class="canvas-contrl menu" @click="toDashboardPage"></el-button>
    <el-button type="primary" icon="el-icon-minus" circle @click="changeImageScaling(imageScaling/2)" class="canvas-contrl scaling-minus"></el-button>
    <el-button type="primary" icon="el-icon-plus" circle @click="changeImageScaling(imageScaling*2)" class="canvas-contrl scaling-plus"></el-button>
    <el-button icon="el-icon-office-building" circle class="canvas-contrl model"></el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvasCenter: [0, 0],
      canvasWidth: window.innerWidth * 2,
      canvasHeight: window.innerHeight * 2,
      canvasContext: {},
      canvasCanMove: false,
      imageSize: [583, 231],
      imageScaling: 1,
      imageList: [
      ],
      drawList: [],
      drawInterval: 0
    };
  },
  mounted() {
    this.initImageList();
    this.initDraw();
    this.drawMachine();
  },
  destroyed() {
    clearInterval(this.drawInterval);
  },
  methods: {
    initImageList() {
      let count = 0;
      for (let i = 12; i > 0; i --) {
        for (let j = 0; j < 12; j ++) {
          count += 1
          this.imageList.push({
            x: (this.imageSize[0] * j) - (6 * this.imageSize[0]),
            y: (this.imageSize[1] * i) - (6 * this.imageSize[1]),
            url: "/map_images/images/image_map_" + count + ".jpg"
          });
        }
      }
    },
    initDraw() {
      var canvas = document.getElementById("canvas");
      this.canvasContext = canvas.getContext("2d");
      this.canvasContext.translate(0.5, 0.5);

      this.drawList.push(
        this.drawImages
      );
    },
    drawMachine() {
      requestAnimationFrame( this.drawMachine );
      this.drawList.forEach((draw) => {
        draw();
      });
      this.drawList = [];
    },
    drawImages() {
      // this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.imageList.forEach(img => {
        if (Math.abs((this.imageScaling / 0.5 * img.x) - (this.imageScaling / 0.5 * this.canvasCenter[0])) > (6 * this.imageSize[0]) * this.imageScaling / 0.5 && 
        Math.abs((this.imageScaling / 0.5 * img.y) - (this.imageScaling / 0.5 * this.canvasCenter[1])) > (6 * this.imageSize[1]) * this.imageScaling / 0.5) {
          return;
        }
        const image = new Image();
        image.src = img.url;

        const scalingX = img.x * this.imageScaling;
        const scalingY = img.y * this.imageScaling;

        const canvasX = scalingX + window.innerWidth + this.canvasCenter[0];
        const canvasY = (0 - scalingY) + window.innerHeight - this.canvasCenter[1];

        image.onload = () => {
          this.canvasContext.drawImage(
            image,
            canvasX,
            canvasY,
            this.imageSize[0] * this.imageScaling,
            this.imageSize[1] * this.imageScaling
          );
        }
      });
    },
    changeImageScaling(value) {
      if(value <= 0.1) {
        value = 0.125;
        this.$message.warning("已到最小缩放");
      }
      this.imageScaling = value;
      this.drawList.push(
        this.drawImages
      );
    },
    changeCanvasCanMove(flag) {
      this.canvasCanMove = flag;
    },
    changeCanvasCenter(event) {
      if (this.canvasCanMove) {
        this.canvasCenter = [
          this.canvasCenter[0] + event.movementX,
          this.canvasCenter[1] - event.movementY
        ];
        this.drawList.push(
          this.drawImages
        );
      }
    },
    toDashboardPage() {
      this.$router.push("dashboard/home");
    }
  }
};
</script>

<style scoped>
.canvas {
  width: 100%;
  height: 100%;
  cursor: move;
}

.canvas-contrl {
  position: absolute;
}

.menu {
  top: 15px;
  left: 15px;
}

.scaling-minus {
  top: 15px;
  left: 60px;
}

.scaling-plus {
  top: 15px;
  left: 115px;
}

.model {
  top: 15px;
  left: 170px;
}
</style>