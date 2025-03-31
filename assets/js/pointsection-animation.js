class PointAnimationManager {
  constructor() {
    this.config = APP_CONFIG;
    this.shapeGrid = [];
    this.totalShapes = 30;
    this.debug = false;
    this.horizontalCells = 6;
    this.verticalCells = 12;
    this.shapePatterns = [
      { start: 1, end: 10 },
      { start: 11, end: 20 },
      { start: 21, end: 30 }
    ];
    this.currentPattern = 0;
    this.shapesVisible = false; // シェイプの表示状態を管理
        // シェイプを配置する確率を設定
        this.shapeProbability = {
          min: 0.2, // 最小40%
          max: 0.2  // 最大60%
        };
        // 各パターンのグリッドに配置するシェイプの数を管理
        this.shapeCountPerPattern = [];
    if (this.debug) {
      this.createDebugDisplay();
    }
      // リサイズイベントの設定
    window.addEventListener('resize', () => {
      this.initShapeGrid();
    });
  }


  createDebugDisplay() {
    const debugDisplay = document.createElement('div');
    debugDisplay.className = 'shape-pattern-debug';
    debugDisplay.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      font-size: 12px;
      font-family: monospace;
      z-index: 9999;
      border-radius: 4px;
    `;
    document.body.appendChild(debugDisplay);
    this.debugDisplay = debugDisplay;
    this.updateDebugDisplay();
  }

  updateDebugDisplay() {
    if (this.debug && this.debugDisplay) {
      this.debugDisplay.innerHTML = `
        Shape Pattern: ${this.currentPattern + 1}/3<br>
        Shapes Visible: ${this.shapesVisible ? 'Yes' : 'No'}<br>
        Active Range: ${this.shapePatterns[this.currentPattern].start} - ${this.shapePatterns[this.currentPattern].end}
      `;
    }
  }

  // Pin機能の初期化を追加
  initPointPin() {
    gsap.set(this.config.DOM.SECTION.POINT.IMAGE, { opacity: 0 });
    gsap.set(`${this.config.DOM.SECTION.POINT.IMAGE}:first-child`, {
      opacity: 1,
    });

    ScrollTrigger.create({
      trigger: this.config.DOM.SECTION.POINT.WRAPPER,
      start: `top ${this.config.HEADER.HEIGHT}`,
      endTrigger: this.config.DOM.SECTION.POINT.WRAPPER,
      end: "bottom bottom",
      pin: this.config.DOM.SECTION.POINT.VISUAL,
      pinSpacing: true,
    });
  }

  shouldCreateShape() {
    return Math.random() < 0.5;
  }

  createShape() {
    const pattern = this.shapePatterns[this.currentPattern];
    const shapeNumber = Math.floor(Math.random() * (pattern.end - pattern.start + 1)) + pattern.start;
    const img = document.createElement('img');
    img.src = `/assets/img/shapes/shape${shapeNumber}.svg`;
    img.className = 'point-shape';
    
    img.style.cssText = `
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      transform: scale(0);
      will-change: transform, opacity;
    `;
    return img;
  }

  initShapeGrid() {
    const pointVisual = document.querySelector('.point__visual');
    const pointImages = document.querySelector('.point__images');
    if (!pointVisual || !pointImages) return;
  
    const existingGrid = document.querySelector('.point-shape-grid');
    if (existingGrid) {
      existingGrid.remove();
      this.shapeGrid = [];
    }
  
    const gridContainer = document.createElement('div');
    gridContainer.className = 'point-shape-grid';
  
    // セルサイズを動的に計算
    const calculateCellSize = () => {
      const vwSize = window.innerWidth * 0.0423; // 4.23vw
      return Math.min(64, vwSize);
    };
  
    const cellSize = calculateCellSize();
    const gapFromImages = cellSize / 2;
  
    // サイズを取得
    const visualRect = pointVisual.getBoundingClientRect();
    const imagesRect = pointImages.getBoundingClientRect();
  
    // point__visual内でのpoint__imagesの相対位置を計算
    const imagesPosition = {
      top: imagesRect.top - visualRect.top,
      left: imagesRect.left - visualRect.left,
      width: imagesRect.width,
      height: imagesRect.height
    };
  
    gridContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    `;
  
    pointVisual.appendChild(gridContainer);
  
    // グリッドセルを作成する関数
    const createCell = (x, y) => {
      const cell = document.createElement('div');
      cell.className = 'point-shape-cell';
  
      const debugStyle = this.debug ? `
        border: 1px dashed rgba(0, 0, 0, 0.2);
        background-color: rgba(255, 255, 255, 0.1);
      ` : '';
  
      cell.style.cssText = `
        position: absolute;
        width: ${cellSize}px;
        height: ${cellSize}px;
        top: ${y}px;
        left: ${x}px;
        ${debugStyle}
      `;
  
      if (this.shouldCreateShape()) {
        const shape = this.createShape();
        if (!this.shapesVisible) {
          shape.style.opacity = '0';
          shape.style.transform = 'scale(0) translateY(-50px)';
        }
        cell.appendChild(shape);
        this.shapeGrid.push({ cell, shape });
      }
  
      gridContainer.appendChild(cell);
    };

    const isOverlappingWithImages = (x, y) => {
      const buffer = 10; // 余裕を持たせる
      return (
        x + cellSize > imagesPosition.left - buffer &&
        x < imagesPosition.left + imagesPosition.width + buffer &&
        y + cellSize > imagesPosition.top - buffer &&
        y < imagesPosition.top + imagesPosition.height + buffer
      );
    };
    
  // ジグザグのずれ量を計算して、imagesとの重なりをチェックする関数
  const getValidZigzagOffset = (index, basePosition, isHorizontal = true, maxAttempts = 5) => {
    for (let i = 0; i < maxAttempts; i++) {
      const direction = index % 2;
      const amount = 0.2 + (Math.random() * 0.6);
      const offset = direction ? cellSize * amount : -cellSize * amount;

      if (isHorizontal) {
        // 水平方向のジグザグ（左右）
        const newX = basePosition.x + offset;
        if (!isOverlappingWithImages(newX, basePosition.y)) {
          return offset;
        }
      } else {
        // 垂直方向のジグザグ（上下）
        const newY = basePosition.y + offset;
        if (!isOverlappingWithImages(basePosition.x, newY)) {
          return offset;
        }
      }
    }
    return 0; // 有効な位置が見つからない場合は、ずらさない
  };
  
    // グリッドの配置位置を計算
    const gridLayout = {
      top: imagesPosition.top - cellSize - gapFromImages,
      bottom: imagesPosition.top + imagesPosition.height + gapFromImages,
      left: imagesPosition.left - cellSize - gapFromImages,
      right: imagesPosition.left + imagesPosition.width + gapFromImages
    };
  
    // 必要なセル数を計算
    const horizontalCells = Math.ceil((gridLayout.right - gridLayout.left) / cellSize);
    const verticalCells = Math.ceil((gridLayout.bottom - gridLayout.top) / cellSize);
  
  // 上部のグリッド配置（左右にジグザグ）
  // 上部のグリッド配置（上下にジグザグ）
  for (let col = 0; col < horizontalCells; col++) {
    const xPos = gridLayout.left + (col * cellSize);
    const yOffset = getValidZigzagOffset(
      col,
      { x: xPos, y: gridLayout.top },
      false
    );
    if (!isOverlappingWithImages(xPos, gridLayout.top + yOffset)) {
      createCell(xPos, gridLayout.top + yOffset);
    }
  }

  // 下部のグリッド配置（上下にジグザグ）
  for (let col = 0; col < horizontalCells; col++) {
    const xPos = gridLayout.left + (col * cellSize);
    const yOffset = getValidZigzagOffset(
      col + 1,
      { x: xPos, y: gridLayout.bottom },
      false
    );
    if (!isOverlappingWithImages(xPos, gridLayout.bottom + yOffset)) {
      createCell(xPos, gridLayout.bottom + yOffset);
    }
  }

  // 左側のグリッド配置（左右にジグザグ）
  for (let row = 1; row < verticalCells - 1; row++) {
    const yPos = gridLayout.top + (row * cellSize);
    const xOffset = getValidZigzagOffset(
      row,
      { x: gridLayout.left, y: yPos },
      true
    );
    if (!isOverlappingWithImages(gridLayout.left + xOffset, yPos)) {
      createCell(gridLayout.left + xOffset, yPos);
    }
  }

  // 右側のグリッド配置（左右にジグザグ）
  for (let row = 1; row < verticalCells - 1; row++) {
    const yPos = gridLayout.top + (row * cellSize);
    const xOffset = getValidZigzagOffset(
      row + 1,
      { x: gridLayout.right, y: yPos },
      true
    );
    if (!isOverlappingWithImages(gridLayout.right + xOffset, yPos)) {
      createCell(gridLayout.right + xOffset, yPos);
    }
  }
}

  animateShapes(isEntering, direction = 'forward') {
    this.shapesVisible = isEntering;
    this.updateDebugDisplay();
    this.shapeGrid.forEach(({ shape }, i) => {
      const delay = Math.random() * 0.5;
      const yOffset = direction === 'forward' ? -50 : 50;

      if (isEntering) {
        gsap.fromTo(shape,
          {
            opacity: 0,
            scale: 0,
            y: yOffset
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            delay: delay,
            ease: "back.out(1.7)"
          }
        );
      } else {
        gsap.to(shape, {
          opacity: 0,
          scale: 0,
          y: -yOffset,
          duration: 0.4,
          delay: delay,
          ease: "power2.in"
        });
      }
    });
  }

  switchShapePattern(newPattern, direction) {
    this.currentPattern = newPattern;
    this.updateDebugDisplay(); // デバッグ表示がある場合は更新
  
    this.shapeGrid.forEach(({ cell, shape }, i) => {
      if (!cell || !shape) return;
  
      // 現在のシェイプを消しながら次のシェイプを表示
      gsap.to(shape, {
        opacity: 0,
        scale: 0,
        y: direction === 'forward' ? 50 : -50,
        duration: 0.4, // より短い時間で消える
        ease: "power2.out",
        onComplete: () => {
          if (!cell) return;
  
          const newShape = this.createShape();
          cell.innerHTML = '';
          cell.appendChild(newShape);
  
          // 新しいシェイプをすぐに表示開始
          gsap.fromTo(newShape,
            {
              opacity: 0,
              scale: 0,
              y: direction === 'forward' ? -50 : 50
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.4, // より短い時間で表示
              ease: "back.out(1.7)"
            }
          );
  
          this.shapeGrid[i].shape = newShape;
        }
      });
    });
  }

  initImageTransitions() {
    // pointセクション自体の表示トリガー（最初のシェイプパターン用）
    ScrollTrigger.create({
      trigger: this.config.DOM.SECTION.POINT.WRAPPER,
      start: "top 60%",
      onEnter: () => {
        this.shapesVisible = true;
        this.currentPattern = 0;
        this.animateShapes(true, 'forward');
      },
      onLeaveBack: () => {
        this.shapesVisible = false;
        this.animateShapes(false, 'backward');
      }
    });
  
    // 各itemの切り替わりトリガー
    document
      .querySelectorAll(this.config.DOM.SECTION.POINT.ITEM)
      .forEach((item, index) => {
        // 最後のitem以外にトリガーを設定
        if (index < 2) { // 0,1のitemに対して
          ScrollTrigger.create({
            trigger: item,
            start: "bottom 40%", // このポイントで現在のパターンが消え、次のパターンが表示される
            onEnter: () => {
              // 次のパターンに切り替え
              const nextPattern = index + 1;
              this.currentPattern = nextPattern;
              this.switchShapePattern(nextPattern, 'forward');
            },
            onLeaveBack: () => {
              // 前のパターンに戻す
              this.currentPattern = index;
              this.switchShapePattern(index, 'backward');
            }
          });
        }
      });
  }
  init() {
    this.initPointPin();
    this.initShapeGrid(); // 最初からグリッドを作成
    this.initImageTransitions();
  }
}