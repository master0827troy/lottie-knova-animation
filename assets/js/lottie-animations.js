import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";

let lottieFiles = [];
let lottieSize = 0;
if (window.innerWidth <= 768) {
  lottieSize = (innerWidth / 100) * 8.2;
  lottieSize = lottieSize < 32 ? 32 : lottieSize;
} else {
  lottieSize = (innerWidth / 100) * 4.23;
  lottieSize = lottieSize > 64 ? 64 : lottieSize;
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

if (window.innerWidth < 768) CONFIG.animationSpeed = 0.5;

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
    for (let i = 1; i < 57; i++) {
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
    if (
      window.innerWidth < 550 &&
      (gridId === "mainvisual_shapes_bottom3" ||
        gridId === "mainvisual_shapes_bottom2")
    ) {
      this.config.totalCells = 16;
      this.config.maxVisible = 2;
    }
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
  new AnimationGrid("mainvisual_shapes_bottom2", CONFIG),
];
if (window.innerWidth > 768) {
  grids.push(new AnimationGrid("mainvisual_shapes_bottom1", CONFIG));
} else {
  grids.push(new AnimationGrid("mainvisual_shapes_bottom3", CONFIG));
}
// Start all grids
grids.forEach((grid) => grid.start());

class pointAnimation {
  constructor(gridId, pointMTotalLottie, pointColLottie, pointMaxLottie) {
    this.animations = [];
    this.visibleAnimations = [];
    this.pointColLottie = pointColLottie;
    this.numAnimations = pointMTotalLottie;
    this.initLottieFiles();
    this.gridId = gridId;
    this.animationFiles = CONFIG.animationFiles;
    this.delayBetweenAnimations = CONFIG.delayBetweenAnimations;
    this.maxVisible = pointMaxLottie;
    this.initialize();
  }

  initLottieFiles() {
    for (let i = 1; i < 57; i++) {
      const fileName = `shape-${i < 10 ? "0" + i : i}.lottie`;
      lottieFiles.push(`${CONFIG.basePath}${fileName}`);
    }
  }

  initialize() {
    const container = document.getElementById(this.gridId);
    if (!container) return;
    this.createAnimations(container);
  }

  createAnimations(container) {
    for (let i = 0; i < this.numAnimations; i++) {
      const canvasDiv = this.createDiv(i);
      canvasDiv.className = "cell";
      container.appendChild(canvasDiv);
      this.animations.push(canvasDiv);
    }
  }

  createDiv(index) {
    const canvasDiv = document.createElement("div");
    canvasDiv.width = CONFIG.baseSize;
    canvasDiv.height = CONFIG.baseSize;
    canvasDiv.style.position = "absolute";
    canvasDiv.style.left =
      (index % this.pointColLottie) * CONFIG.baseSize + "px";
    canvasDiv.style.top =
      Math.floor(index / this.pointColLottie) * CONFIG.baseSize + "px";
    canvasDiv.style.opacity = (100 < canvasDiv.style.left < 200)
    return canvasDiv;
  }

  async placeRandomAnimation(excludeLottieIndex = null) {
    const unusedAnimations = this.animationFiles.filter(
      (src) => !this.visibleAnimations.some((anim) => anim.src === src)
    );
    if (unusedAnimations.length === 0) return;

    const freeLotties = this.animations
      .map((_, idx) => idx)
      .filter(
        (idx) =>
          !this.visibleAnimations.some((anim) => anim.LottieIndex === idx)
      );
      
    if (freeLotties.length === 0) return;

    const validLottes =
      excludeLottieIndex !== null
        ? freeLotties.filter((idx) => idx !== excludeLottieIndex)
        : freeLotties;
    const newLottieIndex = this.getRandomItem(
      validLottes.length ? validLottes : freeLotties
    );

    const animationItem = this.animations[newLottieIndex];
    const newSrc = this.getRandomItem(unusedAnimations);

    try {
      const canvas = document.createElement("canvas");
      animationItem.appendChild(canvas);
      const anim = new DotLottie({
        canvas,
        src: newSrc,
        autoplay: true,
        loop: false,
      });

      anim.addEventListener("complete", () => {
        animationItem.removeChild(canvas);
        this.visibleAnimations = this.visibleAnimations.filter(
          (a) => a.LottieIndex !== newLottieIndex
        );
        anim.destroy();

        setTimeout(() => {
          this.placeRandomAnimation(newLottieIndex);
        }, this.delayBetweenAnimations);
      });

      this.visibleAnimations.push({
        LottieIndex: newLottieIndex,
        src: newSrc,
        instance: anim,
      });
    } catch (error) {
      console.error("Failed to create animation:", error);
    }
  }

  start() {
    for (let i = 0; i < this.maxVisible; i++) {
      this.placeRandomAnimation();
    }
  }

  getRandomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
  }
}

const elementPoint1 = document.getElementById("point-top");
// const elementPoint2 = document.getElementById("point__item__02");
// const elementPoint3 = document.getElementById("point__item__03");

let lastPointTop1 = elementPoint1.getBoundingClientRect().top;
// let lastPointTop2 = elementPoint2.getBoundingClientRect().top;
// let lastPointTop3 = elementPoint3.getBoundingClientRect().top;
lastPointTop1 = Math.floor(lastPointTop1 - window.innerHeight / 2);
let pointTriggered1 = false;
// let pointTriggered2 = false;
// let pointTriggered3 = false;
let pointColCell =
  window.innerWidth > 768
    ? Math.floor(window.innerWidth / 2 / lottieSize)
    : Math.floor(window.innerWidth / lottieSize);

let pointRowCell = Math.floor(window.innerHeight / lottieSize);
let pointMTotalCell = pointColCell * pointRowCell;
let pointMaxCell = pointMTotalCell / 10;

document.addEventListener("scroll", () => {
  if (window.scrollY > lastPointTop1 && !pointTriggered1) {
    pointTriggered1 = true;
    new pointAnimation(
      "point-Aniamtion",
      pointMTotalCell,
      pointColCell,
      pointMaxCell
    ).start();
    setTimeout(function () {
      document
        .getElementById("point-Aniamtion")
        .classList.add("point-shape-cell");
    }, 100);
  }
  if (window.scrollY < lastPointTop1) {
    pointTriggered1 = false;
  }

  // if (window.scrollY > lastPointTop2 && !pointTriggered2) {
  //   pointTriggered2 = true;
  //   document.getElementById("point-Aniamtion").classList.remove('show')
  //   setTimeout(function () {
  //     document.getElementById("point-Aniamtion").classList.add('show');
  //   }, 100)
  //   new AnimationGridConcept("point-Aniamtion", CONFIG, pointMaxCell, pointMTotalCell).start();
  // }
  // if (window.scrollY < lastPointTop2) {
  //   pointTriggered2 = false;
  // }

  // if (window.scrollY > lastPointTop3 && !pointTriggered3) {
  //   document.getElementById("point-Aniamtion").classList.remove('show')
  //   pointTriggered3 = true;
  //   setTimeout(function () {
  //     document.getElementById("point-Aniamtion").classList.add('show');
  //   }, 100)
  //   new AnimationGridConcept("point-Aniamtion", CONFIG, pointMaxCell, pointMTotalCell).start();
  // }
  // if (window.scrollY < lastPointTop3) {
  //   pointTriggered3 = false;
  // }
});
