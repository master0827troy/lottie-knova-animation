class MainvisualShapeManager {
  constructor() {
    this.GRID_SIZE = 64;
    this.GRID_COLS = 8;
    this.GRID_ROWS = 4;
    this.TOTAL_CELLS = this.GRID_COLS * this.GRID_ROWS;
    this.PATTERNS = 3;
    this.ANIMATION_INTERVAL = 1200;

    // シェイプの表示数を制御（40%～60%）
    this.MIN_SHAPES = Math.floor(this.TOTAL_CELLS * 0.4);
    this.MAX_SHAPES = Math.floor(this.TOTAL_CELLS * 0.6);

    // パターン用の表示位置を管理
    this.currentPositions = new Set();

    this.addStyles();
    this.initialize(); // この行は constructor の最後に移動
  }

  initialize() {
    const mainvisual = document.querySelector(".mainvisual");
    if (!mainvisual) return;

    // 左上のグリッド
    const topLeftContainer = document.createElement("div");
    topLeftContainer.className =
      "mainvisual__shapes mainvisual__shapes--top-left";
    mainvisual.appendChild(topLeftContainer);
    this.createShapeGrid(topLeftContainer, "top-left");

    // 右下のグリッド
    const bottomRightContainer = document.createElement("div");
    bottomRightContainer.className =
      "mainvisual__shapes mainvisual__shapes--bottom-right";
    mainvisual.appendChild(bottomRightContainer);
    this.createShapeGrid(bottomRightContainer, "bottom-right");

    this.startPatternChange();
  }

  createShapeGrid(container, position) {
    const gridWidth = this.GRID_SIZE * this.GRID_COLS;
    const gridHeight = this.GRID_SIZE * this.GRID_ROWS;

    container.style.cssText = `
        position: absolute;
        width: ${gridWidth}px;
        height: ${gridHeight}px;
        display: grid;
        grid-template-columns: repeat(${this.GRID_COLS}, ${this.GRID_SIZE}px);
        grid-template-rows: repeat(${this.GRID_ROWS}, ${this.GRID_SIZE}px);
        pointer-events: none;
        z-index: 1;
        ${position === "top-left" ? "top: 0; left: 0;" : "bottom: 0; right: 0;"}
      `;

    // グリッドの各セルを作成
    for (let i = 0; i < this.TOTAL_CELLS; i++) {
      const cell = document.createElement("div");
      cell.className = "mainvisual__cell";
      container.appendChild(cell);
    }

    // シェイプを配置する位置を計算
    const numShapes = Math.floor(
      Math.random() * (this.MAX_SHAPES - this.MIN_SHAPES + 1) + this.MIN_SHAPES
    );

    const positions = Array.from({ length: this.TOTAL_CELLS }, (_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, numShapes);

    // シェイプを配置
    positions.forEach((pos) => {
      const cell = container.children[pos];
      const shapeWrapper = document.createElement("div");
      shapeWrapper.className = "mainvisual__shape-wrapper";

      const shapeNumber = Math.floor(Math.random() * 30) + 1;

      const shape = document.createElement("img");
      shape.src = `/assets/img/shapes/shape${shapeNumber}.svg`;
      shape.className = "mainvisual__shape";

      shapeWrapper.appendChild(shape);
      cell.appendChild(shapeWrapper);
      shapeWrapper.classList.add("is-visible");
    });

    return positions;
  }

  calculateNewPositions() {
    const numShapes = Math.floor(
      Math.random() * (this.MAX_SHAPES - this.MIN_SHAPES + 1) + this.MIN_SHAPES
    );

    return new Set(
      Array.from({ length: this.TOTAL_CELLS }, (_, i) => i)
        .sort(() => Math.random() - 0.5)
        .slice(0, numShapes)
    );
  }

  startPatternChange() {
    // 初期パターンを設定
    this.currentPositions = this.calculateNewPositions();
    this.applyCurrentPattern();

    this.intervalId = setInterval(() => {
      this.currentPositions = this.calculateNewPositions();
      this.applyCurrentPattern();
    }, this.ANIMATION_INTERVAL);
  }

  applyCurrentPattern() {
    const allShapes = document.querySelectorAll(".mainvisual__shape-wrapper");

    allShapes.forEach((shape, index) => {
      shape.classList.toggle("is-visible", this.currentPositions.has(index));
    });
  }

  addStyles() {
    const style = document.createElement("style");
    style.textContent = `
        .mainvisual__cell {
          position: relative;
        }
  
        .mainvisual__shape-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
        }
  
        .mainvisual__shape-wrapper.is-visible {
          opacity: 1;
        }
  
        .mainvisual__shape {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      `;
    document.head.appendChild(style);
  }

  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

// 初期化
new MainvisualShapeManager();
