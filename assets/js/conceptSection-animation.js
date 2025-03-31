// 定数の定義
const CONSTANTS = {
  GRID_SIZE: 64,
  TOTAL_SHAPES: 30,
  DISTRIBUTION: {
    RIGHT_TOP: 0.4,
    LEFT_TOP: 0.1,
    LEFT_BOTTOM: 0.35,
    // RIGHT_BOTTOMは残りの0.15になる
  },
  ANIMATION: {
    DURATION: 2,
    DELAY_PER_SHAPE: 0.08,
  },
};

// シェイプの位置計算に関するユーティリティクラス
class ShapePositionCalculator {
  static isInLShape(row, col, rows, cols) {
    const isInVertical = col < 3 && row < 8;
    const isInHorizontal = row >= 5 && row < 8 && col < 8;
    return isInVertical || isInHorizontal;
  }

  static shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  static createGridPattern({
    startX,
    startY,
    cols,
    rows,
    totalShapes,
    isLShape = false,
  }) {
    const availableCells = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (isLShape && !this.isInLShape(row, col, rows, cols)) continue;

        availableCells.push({
          x: startX + col * CONSTANTS.GRID_SIZE,
          y: startY + row * CONSTANTS.GRID_SIZE,
          row,
          col,
        });
      }
    }

    return this.shuffleArray(availableCells).slice(0, totalShapes);
  }
}

// レイアウトマネージャークラス
class LayoutManager {
  constructor(windowWidth, sectionHeight) {
    this.windowWidth = windowWidth;
    this.sectionHeight = sectionHeight;
  }

  calculateAllPositions() {
    const { GRID_SIZE, TOTAL_SHAPES, DISTRIBUTION } = CONSTANTS;

    const shapeCounts = {
      rightTop: Math.ceil(TOTAL_SHAPES * DISTRIBUTION.RIGHT_TOP),
      leftTop: Math.floor(TOTAL_SHAPES * DISTRIBUTION.LEFT_TOP),
      leftBottom: Math.ceil(TOTAL_SHAPES * DISTRIBUTION.LEFT_BOTTOM),
    };
    shapeCounts.rightBottom =
      TOTAL_SHAPES -
      (shapeCounts.rightTop + shapeCounts.leftTop + shapeCounts.leftBottom);

    return [
      ...this._getRightTopPositions(shapeCounts.rightTop),
      ...this._getLeftTopPositions(shapeCounts.leftTop),
      ...this._getLeftBottomPositions(shapeCounts.leftBottom),
      ...this._getRightBottomPositions(shapeCounts.rightBottom),
    ];
  }

  _getRightTopPositions(count) {
    return ShapePositionCalculator.createGridPattern({
      startX: this.windowWidth - CONSTANTS.GRID_SIZE * 8,
      startY: 0,
      cols: 8,
      rows: 6,
      totalShapes: count,
    });
  }

  _getLeftTopPositions(count) {
    return ShapePositionCalculator.createGridPattern({
      startX: 0,
      startY: 0,
      cols: 5,
      rows: 3,
      totalShapes: count,
    });
  }

  _getLeftBottomPositions(count) {
    return ShapePositionCalculator.createGridPattern({
      startX: 0,
      startY: this.sectionHeight - CONSTANTS.GRID_SIZE * 8,
      cols: 8,
      rows: 8,
      totalShapes: count,
      isLShape: true,
    });
  }

  _getRightBottomPositions(count) {
    return ShapePositionCalculator.createGridPattern({
      startX: this.windowWidth - CONSTANTS.GRID_SIZE * 3,
      startY: this.sectionHeight - CONSTANTS.GRID_SIZE * 3,
      cols: 3,
      rows: 3,
      totalShapes: count,
    });
  }
}

// アニメーションマネージャークラス
class AnimationManager {
  constructor(shapes, shapeLayer) {
    this.shapes = shapes;
    this.shapeLayer = shapeLayer;
    this.layoutManager = new LayoutManager(
      window.innerWidth,
      document.querySelector(".concept").offsetHeight
    );
    this.hasAnimated = false;
  }

  initAnimation(mainTimeline = null) {
    if (this.hasAnimated) {
      return null;
    }
    
    const allCalculatedPositions = this.layoutManager.calculateAllPositions();
    const shapesTimeline = gsap.timeline({
      paused: true,          // 追加: 初期状態で一時停止
      reverseOnScroll: false, // 追加: スクロールでの逆再生を防止
      onComplete: () => {     // 追加: 完了時のコールバック
        this.hasAnimated = true;
      }
    });

    // シェイプをエリアごとにグループ化
    const { TOTAL_SHAPES, DISTRIBUTION } = CONSTANTS;
    const rightTopCount = Math.ceil(TOTAL_SHAPES * DISTRIBUTION.RIGHT_TOP);
    const leftTopCount = Math.floor(TOTAL_SHAPES * DISTRIBUTION.LEFT_TOP);
    const leftBottomCount = Math.ceil(TOTAL_SHAPES * DISTRIBUTION.LEFT_BOTTOM);

    // エリアごとのインデックス範囲を計算
    const areas = [
      {
        name: "rightTop",
        start: 0,
        count: rightTopCount,
      },
      {
        name: "leftTop",
        start: rightTopCount,
        count: leftTopCount,
      },
      {
        name: "leftBottom",
        start: rightTopCount + leftTopCount,
        count: leftBottomCount,
      },
      {
        name: "rightBottom",
        start: rightTopCount + leftTopCount + leftBottomCount,
        count: TOTAL_SHAPES - (rightTopCount + leftTopCount + leftBottomCount),
      },
    ];

    // エリアごとに同時アニメーション
    areas.forEach((area, areaIndex) => {
      const areaShapes = this.shapes.slice(area.start, area.start + area.count);
      const areaPositions = allCalculatedPositions.slice(
        area.start,
        area.start + area.count
      );

      // エリア内のシェイプを同時にアニメーション
      areaShapes.forEach((shape, index) => {
        const finalPos = areaPositions[index] || this._getFallbackPosition();
        const initialPos = this._calculateInitialPosition(area.name);

        shapesTimeline.fromTo(
          shape,
          {
            x: initialPos.x || 0,
            y: initialPos.y || 0,
            opacity: 0,
            rotation: 0,
          },
          {
            x: finalPos.x,
            y: finalPos.y,
            opacity: 1,
            rotation: 360,
            duration: CONSTANTS.ANIMATION.DURATION,
            ease: "power2.out",
            onUpdate: () => this.shapeLayer.batchDraw(),
          },
          areaIndex * 0.3
        );
      });
    });

    if (mainTimeline) {
      mainTimeline.add(shapesTimeline);
    }

    shapesTimeline.play();

    return shapesTimeline;
  }

  resetAnimation() {
    this.hasAnimated = false;
  }

  _calculateInitialPosition(areaName) {
    const offset = 300;

    switch (areaName) {
      case "rightTop":
        return {
          x: window.innerWidth + offset,
          y: -offset,
        };
      case "leftTop":
        return {
          x: -offset,
          y: -offset,
        };
      case "leftBottom":
        return {
          x: -offset,
          y: document.querySelector(".concept").offsetHeight + offset,
        };
      case "rightBottom":
        return {
          x: window.innerWidth + offset,
          y: document.querySelector(".concept").offsetHeight + offset,
        };
      default:
        return this._getFallbackPosition();
    }
  }

  _getFallbackPosition() {
    return {
      x: window.innerWidth * 0.5,
      y: document.querySelector(".concept").offsetHeight * 0.5,
    };
  }
}

// シェイプコンテナ管理クラス
class ShapeContainer {
  static add() {
    const conceptSection = document.querySelector(".concept");
    const shapesContainer = document.createElement("div");
    shapesContainer.id = "concept-shapes";

    shapesContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100vw;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: visible;
    `;

    conceptSection.style.position = "relative";
    conceptSection.style.overflow = "visible";
    conceptSection.insertBefore(shapesContainer, conceptSection.firstChild);
  }
}

// メインの初期化クラス
// デバッググリッド管理クラス
class DebugGridManager {
  constructor(stage) {
    this.stage = stage;
    this.backgroundLayer = new Konva.Layer();
    this.stage.add(this.backgroundLayer);
  }

  initDebugGrid() {
    const debugGridGroup = new Konva.Group();
    const windowWidth = window.innerWidth;
    const conceptHeight = document.querySelector(".concept").offsetHeight;

    // 各エリアのグリッドを作成
    const grids = [
      {
        startX: windowWidth - CONSTANTS.GRID_SIZE * 8,
        startY: 0,
        cols: 8,
        rows: 6,
        color: "rgba(255, 192, 203, 0.2)", // Pink
        areaType: "normal",
      },
      {
        startX: 0,
        startY: 0,
        cols: 5,
        rows: 3,
        color: "rgba(173, 216, 230, 0.2)", // Light Blue
        areaType: "normal",
      },
      {
        startX: 0,
        startY: conceptHeight - CONSTANTS.GRID_SIZE * 8,
        cols: 8,
        rows: 8,
        color: "rgba(144, 238, 144, 0.2)", // Light Green
        areaType: "L",
      },
      {
        startX: windowWidth - CONSTANTS.GRID_SIZE * 3,
        startY: conceptHeight - CONSTANTS.GRID_SIZE * 3,
        cols: 3,
        rows: 3,
        color: "rgba(255, 165, 0, 0.2)", // Orange
        areaType: "normal",
      },
    ];

    grids.forEach((grid) => {
      debugGridGroup.add(this._createDebugGrid(grid));
    });

    this.backgroundLayer.add(debugGridGroup);
    this.backgroundLayer.draw();
  }

  _createDebugGrid({ startX, startY, cols, rows, color, areaType }) {
    const group = new Konva.Group();

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (
          areaType === "L" &&
          !ShapePositionCalculator.isInLShape(row, col, rows, cols)
        ) {
          continue;
        }

        const rect = new Konva.Rect({
          x: startX + col * CONSTANTS.GRID_SIZE,
          y: startY + row * CONSTANTS.GRID_SIZE,
          width: CONSTANTS.GRID_SIZE,
          height: CONSTANTS.GRID_SIZE,
          fill: color,
          stroke: "rgba(0, 0, 0, 0.1)",
          strokeWidth: 1,
        });
        group.add(rect);
      }
    }
    return group;
  }

  updateGridPositions() {
    const windowWidth = window.innerWidth;
    const conceptHeight = document.querySelector(".concept").offsetHeight;
    // グリッドの位置を更新する処理を実装
    this.backgroundLayer.draw();
  }
}

class ShapeAnimationInitializer {
  constructor() {
    this.shapes = [];
    this.loadedShapes = 0;
    this.stage = null;
    this.shapeLayer = null;
    this.debugGridManager = null;
    this.animationManager = null;
  }

  init() {
    const conceptSection = document.querySelector(".concept");
    this.stage = new Konva.Stage({
      container: "concept-shapes",
      width: window.innerWidth + CONSTANTS.GRID_SIZE,
      height: conceptSection.offsetHeight,
    });

    this.debugGridManager = new DebugGridManager(this.stage);
    this.debugGridManager.initDebugGrid();

    this.shapeLayer = new Konva.Layer();
    this.stage.add(this.shapeLayer);

    this._initShapes();
    this._setupResizeHandler();
  }

  _initShapes() {
    for (let i = 1; i <= CONSTANTS.TOTAL_SHAPES; i++) {
      this._loadShape(i);
    }
  }

  _loadShape(index) {
    Konva.Image.fromURL(
      `assets/img/shapes/shape${index}.svg`,
      (image) => {
        image.setAttrs({
          width: CONSTANTS.GRID_SIZE,
          height: CONSTANTS.GRID_SIZE,
          opacity: 0,
        });

        this.shapeLayer.add(image);
        this.shapes.push(image);
        this.loadedShapes++;

        if (this.loadedShapes === CONSTANTS.TOTAL_SHAPES) {
          // AnimationManagerのインスタンスを保持
          this.animationManager = new AnimationManager(
            this.shapes,
            this.shapeLayer
          );
          // グローバルに公開（必要な場合）
          window.shapeAnimationManager = this.animationManager;
        }

        this.shapeLayer.batchDraw();
      },
      (error) => console.error(`Error loading shape ${index}:`, error)
    );
  }

  _setupResizeHandler() {
    window.addEventListener("resize", () => {
      const conceptHeight = document.querySelector(".concept").offsetHeight;
      this.stage.width(window.innerWidth + CONSTANTS.GRID_SIZE);
      this.stage.height(conceptHeight);
      this.debugGridManager.updateGridPositions();
      this.shapeLayer.draw();
    });
  }
}

// 初期化
document.addEventListener("DOMContentLoaded", () => {
  ShapeContainer.add();
  const initializer = new ShapeAnimationInitializer();
  initializer.init();
});
