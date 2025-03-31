class ShapeSlider {
  constructor(container, direction = "left") {
    this.container = container;
    this.direction = direction;
    this.activeShapes = new Set();
    this.shapes = [];
    this.isAnimating = false;
    this.catchBox = document.querySelector(".mainvisual__catch");
    this.catchBoxRect = this.catchBox.getBoundingClientRect();
    this.spacing = 64;
    this.totalShapes = 20;
    this.visibleShapes = 15;
    this.init();
  }

  createShape(index) {
    const shape = document.createElement("div");
    shape.className = "shape-slide";
    const img = document.createElement("img");
    const shapeNum = (index % this.totalShapes) + 1;
    img.src = `/assets/img/shapes/shape${shapeNum}.svg`;
    shape.appendChild(img);
    return shape;
  }

  async init() {
    for (let i = 0; i < this.visibleShapes; i++) {
      const shape = this.createShape(i);
      this.container.appendChild(shape);
      this.shapes.push(shape);
      this.activeShapes.add(shape);

      const centerOffset = Math.floor(this.visibleShapes / 2);
      const offset = (i - centerOffset) * this.spacing;

      if (this.direction === "right") {
        shape.style.left = `calc(50% - ${offset}px)`;
      } else {
        shape.style.left = `calc(50% + ${offset}px)`;
      }

      // 初期表示時はアニメーションなしで表示
      shape.style.transition = "none";
      shape.classList.add("active");

      // 強制的にリフロー
      shape.offsetHeight;
      shape.style.transition = "";
    }

    this.currentShapeIndex = this.visibleShapes;
    this.startAnimation();
  }

  startAnimation() {
    const animate = () => {
      if (this.isAnimating) return;
      this.isAnimating = true;

      // 最後のシェイプを即座に非表示に
      if (this.shapes.length > 0) {
        const lastShape = this.shapes[0];
        this.activeShapes.delete(lastShape);
        lastShape.classList.remove("active");
        lastShape.style.opacity = "0";
        lastShape.style.visibility = "hidden";
        this.shapes.shift();
      }

      // 新しいシェイプを追加（最初は非表示）
      const newShape = this.createShape(this.currentShapeIndex);
      this.currentShapeIndex = (this.currentShapeIndex + 1) % this.totalShapes;
      this.container.appendChild(newShape);
      this.shapes.push(newShape);
      this.activeShapes.add(newShape);

      // 既存のシェイプを1つ分移動
      this.shapes.forEach((shape, i) => {
        const centerOffset = Math.floor(this.visibleShapes / 2);
        let offset;

        if (this.direction === "right") {
          offset = (i - centerOffset) * this.spacing - this.spacing;
          shape.style.left = `calc(50% - ${offset}px)`;
        } else {
          offset = (i - centerOffset) * this.spacing + this.spacing;
          shape.style.left = `calc(50% + ${offset}px)`;
        }
      });

      // 新しいシェイプの初期位置を設定（非表示状態で）
      const centerOffset = Math.floor(this.visibleShapes / 2);
      const startOffset = centerOffset * this.spacing;

      newShape.style.transition = "none";
      newShape.style.opacity = "0";
      newShape.style.visibility = "hidden";

      if (this.direction === "right") {
        newShape.style.left = `calc(50% + ${startOffset}px)`;
      } else {
        newShape.style.left = `calc(50% - ${startOffset}px)`;
      }

      // 位置が設定された後で表示
      requestAnimationFrame(() => {
        newShape.style.transition = "";
        newShape.style.opacity = "";
        newShape.style.visibility = "";
        newShape.classList.add("active");
      });

      // 次のアニメーションの準備
      setTimeout(() => {
        this.isAnimating = false;
        animate();
      }, 1500);
    };

    animate();
  }
}

// 初期化コードは変更なし
document.addEventListener("DOMContentLoaded", () => {
  const catchBox = document.querySelector(".mainvisual__catch");
  const topContainer = document.querySelector(".catch-shapes--top");
  const bottomContainer = document.querySelector(".catch-shapes--bottom");

  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      if (topContainer.shapeSlider) {
        topContainer.shapeSlider.catchBoxRect =
          entry.target.getBoundingClientRect();
      }
      if (bottomContainer.shapeSlider) {
        bottomContainer.shapeSlider.catchBoxRect =
          entry.target.getBoundingClientRect();
      }
    });
  });

  observer.observe(catchBox);

  topContainer.shapeSlider = new ShapeSlider(topContainer, "left");
  bottomContainer.shapeSlider = new ShapeSlider(bottomContainer, "right");
});
