<template>
  <div>
    <canvas
      id="canvas" class="canvas" ref="canvas" :width="canvasWidth" :height="canvasHeight"
      @mousedown="changeCanvasCanMove(true)" @mouseup="changeCanvasCanMove(false)"
      @mousemove="changeCanvasCenter"
    ></canvas>
    <el-button icon="el-icon-menu" circle class="canvas-contrl menu" @click="toDashboardPage"></el-button>
    <el-button type="primary" icon="el-icon-minus" circle @click="changeImageScaling(imageScaling - 1)" class="canvas-contrl scaling-minus"></el-button>
    <el-button type="primary" icon="el-icon-plus" circle @click="changeImageScaling(imageScaling + 1)" class="canvas-contrl scaling-plus"></el-button>
    <el-button icon="el-icon-office-building" circle class="canvas-contrl model"></el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvasCenter: [100, 100],
      canvasWidth: window.innerWidth * 2,
      canvasHeight: window.innerHeight * 2,
      canvasContext: {},
      canvasCanMove: false,
      imageSize: [336, 194],
      imageScaling: 1,
      imageList: [
        {
          x: -336,
          y: -194,
          url: "http://localhost:10233/testMap.png"
        },
        {
          x: -336,
          y: 0,
          url: "http://localhost:10233/testMap.png"
        },
        {
          x: 0,
          y: -194,
          url: "http://localhost:10233/testMap.png"
        },
        {
          x: 0,
          y: 0,
          url: "http://localhost:10233/testMap.png"
        },
        {
          x: 0,
          y: 194,
          url: "http://localhost:10233/testMap.png"
        },
        {
          x: 336,
          y: 0,
          url: "http://localhost:10233/testMap.png"
        },
        {
          x: 336,
          y: 194,
          url: "http://localhost:10233/testMap.png"
        },
        {
          x: -336,
          y: 194,
          url: "http://localhost:10233/testMap.png"
        },
        {
          x: 336,
          y: -194,
          url: "http://localhost:10233/testMap.png"
        }
      ],
      drawList: [],
      drawInterval: 0
    };
  },
  mounted() {
    this.initDraw();
    this.drawMachine();
  },
  destroyed() {
    clearInterval(this.drawInterval);
  },
  methods: {
    initDraw() {
      var canvas = document.getElementById("canvas");
      this.canvasContext = canvas.getContext("2d");
      this.canvasContext.translate(0.5, 0.5);

      this.drawList.push(
        this.drawImages
      );
    },
    drawMachine() {
      this.drawInterval = setInterval(() => {
        this.drawList.forEach((draw) => {
          draw();
        });
        this.drawList = [];
      }, .5);
    },
    drawImages() {
      this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.imageList.forEach(img => {
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
      if(value <= 0) {
        value = 1;
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