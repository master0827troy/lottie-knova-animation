import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";

const CONFIG = {
  animationSpeed: 1,
  baseSize: innerWidth / 22 > 64 ? 64 : innerWidth / 22,
  basePath: "../assets/img/shapes/lottie/",
};

class LottieAnimationManager {
  constructor() {
    this.lottieFiles = [];
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
      this.lottieFiles.push(`${CONFIG.basePath}${fileName}`);
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
    return this.lottieFiles[
      Math.floor(Math.random() * this.lottieFiles.length)
    ];
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
