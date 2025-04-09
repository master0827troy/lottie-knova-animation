import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";

let lottieFiles = [];
let lottieSize = 0;
if (window.innerWidth < 768) {
  lottieSize = (innerWidth / 100) * 8.2;
  lottieSize < 32 ? 32 : lottieSize;
} else {
  lottieSize = (innerWidth / 100) * 4.23;
  lottieSize > 64 ? 64 : lottieSize;
}

const CONFIG = {
  animationSpeed: 1,
  baseSize: lottieSize,
  basePath: "../assets/img/shapes/lottie/",
  maxVisible: 3,
  totalCells: 9,
  animationFiles: lottieFiles,
  delayBetweenAnimations: 300,
};

class LottieAnimationManager {
  constructor() {
    this.animations = [];
    this.widthTop = 0;
    this.numAnimations = 0;
    this.isRunning = false;
    this.rafId = null;

    this.initLottieFiles();
    this.bindEvents();
  }

  initLottieFiles() {
    for (let i = 1; i < 26; i++) {
      const fileName = `shape-${i < 10 ? "0" + i : i}.lottie`;
      lottieFiles.push(`${CONFIG.basePath}${fileName}`);
    }
  }

  bindEvents() {
    document.addEventListener("DOMContentLoaded", () => this.initialize());
    window.addEventListener("unload", () => this.destroy());
  }

  initialize() {
    const container = document.getElementById(
      "mainvisual_shapes_center_animation"
    );
    const element = document.querySelector(".mainvisual__catch");

    if (!container || !element) return;

    this.widthTop = element.offsetWidth;
    this.numAnimations = Math.floor(this.widthTop / CONFIG.baseSize) + 2;

    this.createAnimations(container);
    this.startAnimation();
  }

  createAnimations(container) {
    for (let i = 0; i < this.numAnimations * 2; i++) {
      const canvas = this.createCanvas(i);
      container.appendChild(canvas);

      try {
        const anim = new DotLottie({
          canvas,
          src: this.getRandomAnimationUrl(),
          autoplay: true,
          loop: true,
        });

        this.animations.push({
          canvas,
          x:
            i >= this.numAnimations
              ? parseFloat(canvas.style.right)
              : parseFloat(canvas.style.left),
          y: parseFloat(canvas.style.top) || 0,
          instance: anim,
        });
      } catch (error) {
        console.error("Failed to create animation:", error);
      }
    }
  }

  createCanvas(index) {
    const canvas = document.createElement("canvas");
    canvas.width = CONFIG.baseSize;
    canvas.height = CONFIG.baseSize;
    canvas.style.position = "absolute";

    if (index >= this.numAnimations) {
      canvas.style.right =
        (index - this.numAnimations) * CONFIG.baseSize + "px";
      canvas.style.bottom = "0";
    } else {
      canvas.style.left = index * CONFIG.baseSize + "px";
      canvas.style.top = "0";
    }

    return canvas;
  }

  getRandomAnimationUrl() {
    return lottieFiles[Math.floor(Math.random() * lottieFiles.length)];
  }

  animate() {
    this.animations.forEach((obj, index) => {
      if (index < this.numAnimations) {
        obj.x -= CONFIG.animationSpeed;
        if (obj.x < -CONFIG.baseSize) {
          obj.x = (this.numAnimations - 1) * CONFIG.baseSize;
        }
        obj.canvas.style.left = `${obj.x}px`;
      } else {
        obj.x -= CONFIG.animationSpeed;
        if (obj.x < -CONFIG.baseSize) {
          obj.x = (this.numAnimations - 1) * CONFIG.baseSize;
        }
        obj.canvas.style.right = `${obj.x}px`;
      }
    });

    if (this.isRunning) {
      this.rafId = requestAnimationFrame(() => this.animate());
    }
  }

  startAnimation() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.animate();
    }
  }

  destroy() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.animations.forEach((anim) => {
      anim.instance?.destroy?.();
    });
    this.animations = [];
  }
}

// Initialize
const manager = new LottieAnimationManager();

class AnimationGrid {
  constructor(gridId, config) {
    this.cells = [];
    this.visibleAnimations = [];
    this.grid = document.getElementById(gridId);
    this.config = {
      maxVisible: config.maxVisible || 3,
      totalCells: config.totalCells || 9,
      animationFiles: config.animationFiles || [],
      delayBetweenAnimations: config.delayBetweenAnimations || 300,
    };

    this.initGrid();
  }

  initGrid() {
    for (let i = 0; i < this.config.totalCells; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      this.grid.appendChild(cell);
      this.cells.push(cell);
    }
  }

  async placeRandomAnimation(excludeCellIndex = null) {
    const unusedAnimations = this.config.animationFiles.filter(
      (src) => !this.visibleAnimations.some((anim) => anim.src === src)
    );
    if (unusedAnimations.length === 0) return;

    const freeCells = this.cells
      .map((_, idx) => idx)
      .filter(
        (idx) => !this.visibleAnimations.some((anim) => anim.cellIndex === idx)
      );
    if (freeCells.length === 0) return;

    const validCells =
      excludeCellIndex !== null
        ? freeCells.filter((idx) => idx !== excludeCellIndex)
        : freeCells;

    const newCellIndex = this.getRandomItem(
      validCells.length ? validCells : freeCells
    );
    const cell = this.cells[newCellIndex];
    const newSrc = this.getRandomItem(unusedAnimations);

    try {
      const canvas = document.createElement("canvas");
      cell.appendChild(canvas);

      const anim = new DotLottie({
        canvas,
        src: newSrc,
        autoplay: true,
        loop: false,
      });

      anim.addEventListener("complete", () => {
        cell.removeChild(canvas);
        this.visibleAnimations = this.visibleAnimations.filter(
          (a) => a.cellIndex !== newCellIndex
        );
        anim.destroy();

        setTimeout(() => {
          this.placeRandomAnimation(newCellIndex);
        }, this.config.delayBetweenAnimations);
      });

      this.visibleAnimations.push({
        cellIndex: newCellIndex,
        src: newSrc,
        instance: anim,
      });
    } catch (error) {
      console.error("Failed to create animation:", error);
    }
  }

  start() {
    for (let i = 0; i < this.config.maxVisible; i++) {
      this.placeRandomAnimation();
    }
  }

  getRandomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
  }
}

// Create and start animation grids
const grids = [
  new AnimationGrid("mainvisual_shapes_top", CONFIG),
  new AnimationGrid("mainvisual_shapes_bottom1", CONFIG),
  new AnimationGrid("mainvisual_shapes_bottom2", CONFIG),
];

// Start all grids
grids.forEach((grid) => grid.start());
