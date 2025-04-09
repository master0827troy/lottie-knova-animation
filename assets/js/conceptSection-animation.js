const LOTTIE_CONSTANTS = {
  // グリッドサイズの計算を整数に丸める処理を追加
  getGridSize: function () {
    // メディアクエリでモバイルかどうかを判断
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) {
      // SPサイズ: min(32px, 8.2vw)
      const vwSize = Math.floor(window.innerWidth * 0.082);
      return Math.min(32, vwSize);
    } else {
      // PCサイズ: min(64px, 4.23vw)
      const vwSize = Math.floor(window.innerWidth * 0.0423);
      return Math.min(64, vwSize);
    }
  },
  // デバイスタイプに応じたシェイプ数を取得するメソッドを追加
  getTotalShapes: function () {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    return isMobile ? this.MOBILE_TOTAL_SHAPES : this.PC_TOTAL_SHAPES;
  },
  PC_TOTAL_SHAPES: 20, // PC版の表示数
  MOBILE_TOTAL_SHAPES: 12, // スマホ版の表示数
  DISTRIBUTION: {
    LEFT_TOP: 0.1, // 左上: 2個 (20 * 0.1 = 2)
    RIGHT_TOP: 0.35, // 右上: 7個 (20 * 0.35 = 7)
    RIGHT_BOTTOM: 0.15, // 右下: 3個 (20 * 0.15 = 3)
    LEFT_BOTTOM: 0.25,
  },
  ANIMATION: {
    DURATION: 0.5,
    STAGGER: 0.05,
    DELAY: 0.3,
  },
  PATHS: {
    LOTTIE: "assets/img/shapes/lottie/",
  },
  SELECTORS: {
    CONCEPT_SECTION: ".concept",
    CONCEPT_VISUAL: ".concept__visual",
    CONCEPT_CONTENT: ".concept__content",
    CONCEPT_ITEMS: [
      ".concept__image--phone",
      ".concept__image--item-1",
      ".concept__image--item-2",
      ".concept__image--item-3",
      ".concept__image--item-4",
      ".concept__image--item-5",
    ],
    TRIGGER_IMAGE: ".concept__image--item-5",
  },
};

// ユーティリティ関数
class LottieUtils {
  static shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  static isInLShape(row, col, rows, cols) {
    const isInVertical = col < 3 && row < 8;
    const isInHorizontal = row >= 5 && row < 8 && col < 8;
    return isInVertical || isInHorizontal;
  }

  static createGridPattern({
    startX,
    startY,
    cols,
    rows,
    totalShapes,
    isLShape = false,
    gridSize,
  }) {
    const availableCells = [];
    // 現在のグリッドサイズを使用（引数から取得）
    const currentGridSize = gridSize || LOTTIE_CONSTANTS.getGridSize();

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (isLShape && !this.isInLShape(row, col, rows, cols)) continue;

        // 整数にするために小数点以下を切り捨て
        const cellX = Math.floor(startX + col * currentGridSize);
        const cellY = Math.floor(startY + row * currentGridSize);

        availableCells.push({
          x: cellX,
          y: cellY,
          row,
          col,
        });
      }
    }

    return this.shuffleArray(availableCells).slice(0, totalShapes);
  }

  // 他のメソッドは変更なし
  static isElementVisible(element) {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0 &&
      rect.left <=
        (window.innerWidth || document.documentElement.clientWidth) &&
      rect.right >= 0
    );
  }

  static elementExists(selector) {
    return document.querySelector(selector) !== null;
  }
}

// レイアウト計算クラス
class LottieLayoutManager {
  constructor(windowWidth, sectionHeight) {
    this.windowWidth = windowWidth;
    this.sectionHeight = sectionHeight;
    this.gridSize = LOTTIE_CONSTANTS.getGridSize();
    this.totalShapes = LOTTIE_CONSTANTS.getTotalShapes(); // 現在のデバイスに応じたシェイプ数
  }

  // グリッドサイズを更新するメソッドを追加
  updateGridSize() {
    const oldSize = this.gridSize;
    this.gridSize = LOTTIE_CONSTANTS.getGridSize();
    console.log(`グリッドサイズ更新: ${oldSize} -> ${this.gridSize}`);
    return this.gridSize;
  }

  calculateAllPositions() {
    const { DISTRIBUTION } = LOTTIE_CONSTANTS;
    this.updateGridSize();
    // トータルシェイプ数も最新化
    this.totalShapes = LOTTIE_CONSTANTS.getTotalShapes();

    // モバイルかどうかを判定
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    // モバイルの場合は異なる位置計算を行う
    if (isMobile) {
      return this._getMobilePositions(this.totalShapes);
    }

    const shapeCounts = {
      rightTop: Math.ceil(this.totalShapes * DISTRIBUTION.RIGHT_TOP),
      leftTop: Math.floor(this.totalShapes * DISTRIBUTION.LEFT_TOP),
      leftBottom: Math.ceil(this.totalShapes * DISTRIBUTION.LEFT_BOTTOM),
    };
    shapeCounts.rightBottom =
      this.totalShapes -
      (shapeCounts.rightTop + shapeCounts.leftTop + shapeCounts.leftBottom);

    return [
      ...this._getRightTopPositions(shapeCounts.rightTop),
      ...this._getLeftTopPositions(shapeCounts.leftTop),
      ...this._getLeftBottomPositions(shapeCounts.leftBottom),
      ...this._getRightBottomPositions(shapeCounts.rightBottom),
    ];
  }

  _getRightTopPositions(count) {
    const cols = 8;
    return LottieUtils.createGridPattern({
      startX: Math.floor(this.windowWidth - cols * this.gridSize),
      startY: 0,
      cols: cols,
      rows: 2,
      totalShapes: count,
      gridSize: this.gridSize,
    });
  }

  _getLeftTopPositions(count) {
    return LottieUtils.createGridPattern({
      startX: 0,
      startY: 0,
      cols: 5,
      rows: 3,
      totalShapes: count,
      gridSize: this.gridSize,
    });
  }

  _getLeftBottomPositions(count) {
    return LottieUtils.createGridPattern({
      startX: 0,
      startY: Math.floor(this.sectionHeight - this.gridSize * 8),
      cols: 8,
      rows: 8,
      totalShapes: count,
      isLShape: true,
      gridSize: this.gridSize,
    });
  }

  _getRightBottomPositions(count) {
    const cols = 3;
    const rows = 3;
    return LottieUtils.createGridPattern({
      startX: Math.floor(this.windowWidth - cols * this.gridSize),
      startY: Math.floor(this.sectionHeight - rows * this.gridSize),
      cols: cols,
      rows: rows,
      totalShapes: count,
      gridSize: this.gridSize,
    });
  }

  // モバイル用の位置計算を調整
  _getMobilePositions(totalShapes) {
    // モバイル用の配分を設定
    const shapeCounts = {
      mobileRightTop: Math.ceil(totalShapes * 0.25),
      mobileRightBottom: Math.ceil(totalShapes * 0.25),
      mobileLeftBottom: Math.ceil(totalShapes * 0.25),
      mobileLeftTopFixed: Math.floor(totalShapes * 0.25), // 名前を変更：mobileCenterBottom → mobileLeftTopFixed
    };

    // 合計数の調整
    let total = Object.values(shapeCounts).reduce((a, b) => a + b, 0);
    if (total > totalShapes) {
      shapeCounts.mobileLeftTopFixed -= total - totalShapes;
    }

    // 左上エリアのアイテム位置を計算（z-index: 10を追加）
    const mobileLeftTopPositions = this._getMobileLeftTopPositions(
      shapeCounts.mobileRightTop
    );

    // 他のエリアの位置も計算
    const mobileRightBottomPositions = this._getMobileRightBottomPositions(
      shapeCounts.mobileRightBottom
    );
    const mobileLeftBottomPositions = this._getMobileLeftBottomPositions(
      shapeCounts.mobileLeftBottom
    );
    const mobileLeftTopFixedPositions = this._getMobileLeftTopFixedPositions(
      shapeCounts.mobileLeftTopFixed
    );

    // 全ての位置を結合して返す
    return [
      ...mobileLeftTopPositions,
      ...mobileRightBottomPositions,
      ...mobileLeftBottomPositions,
      ...mobileLeftTopFixedPositions,
    ];
  }

  // モバイルの左上エリア位置計算
  _getMobileLeftTopPositions(count) {
    const cols = 4;
    const rows = 2;
    // startXを変更して右側に配置
    const positions = LottieUtils.createGridPattern({
      startX: Math.floor(this.windowWidth - cols * this.gridSize), // 右端から開始
      startY: 0,
      cols: cols,
      rows: rows,
      totalShapes: count,
      gridSize: this.gridSize,
    });

    return positions;
  }

  // モバイルの右上エリア位置計算
  _getMobileRightTopPositions(count) {
    const cols = 4;
    const rows = 2;
    return LottieUtils.createGridPattern({
      startX: Math.floor(this.windowWidth - cols * this.gridSize),
      startY: 0,
      cols: cols,
      rows: rows,
      totalShapes: count,
      gridSize: this.gridSize,
    });
  }

  _getMobileRightBottomPositions(count) {
    const cols = 2;
    const rows = 2;
    return LottieUtils.createGridPattern({
      startX: Math.floor(this.windowWidth - cols * this.gridSize),
      startY: Math.floor(this.sectionHeight - rows * this.gridSize),
      cols: cols,
      rows: rows,
      totalShapes: count,
      gridSize: this.gridSize,
    });
  }

  // 左下のグリッドを横2縦3に変更
  _getMobileLeftBottomPositions(count) {
    const cols = 3;
    const rows = 3; // 縦3に変更
    return LottieUtils.createGridPattern({
      startX: 0,
      startY: Math.floor(this.sectionHeight - rows * this.gridSize),
      cols: cols,
      rows: rows,
      totalShapes: count,
      gridSize: this.gridSize,
    });
  }

  // - 横1縦5、下から100px固定
  _getMobileLeftTopFixedPositions(count) {
    const cols = 1; // 横1列
    const rows = 5; // 縦5行

    // 下から100pxの位置を計算
    const bottomOffset = 150;
    const startY = Math.floor(
      this.sectionHeight - bottomOffset - rows * this.gridSize
    );

    return LottieUtils.createGridPattern({
      startX: 0, // 左端に固定
      startY: Math.max(0, startY), // 負の値にならないように制御
      cols: cols,
      rows: rows,
      totalShapes: count,
      gridSize: this.gridSize,
    });
  }
}

// アニメーションマネージャークラス
class LottieAnimationManager {
  constructor(shapes, container) {
    this.shapes = shapes;
    this.container = container;
    this.conceptSection = document.querySelector(
      LOTTIE_CONSTANTS.SELECTORS.CONCEPT_SECTION
    );
    this.layoutManager = new LottieLayoutManager(
      window.innerWidth,
      this.conceptSection ? this.conceptSection.offsetHeight : 0
    );
    this.hasAnimated = false;
    this.observer = null;
    this.isAnimating = false;
    this.positions = [];
    this.currentGridSize = LOTTIE_CONSTANTS.getGridSize();
    this.areaObservers = {};
    this.totalShapes = LOTTIE_CONSTANTS.getTotalShapes(); // 現在のデバイスに応じたシェイプ数
    this.animatedAreas = {
      rightTop: false,
      leftTop: false,
      leftBottom: false,
      rightBottom: false,
      mobileCenterBottom: false,
      mobileRightTop: false,
      mobileRightBottom: false,
      mobileLeftBottom: false,
    };
  }

  setupTriggerObserver() {
    if (this.observer) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) {
      // SPモードの場合は各エリアごとに監視
      this.setupMobileAreaObservers();
    } else {
      // PCモードは従来通り
      const triggerImage = document.querySelector(
        LOTTIE_CONSTANTS.SELECTORS.TRIGGER_IMAGE
      );
      if (!triggerImage) {
        setTimeout(() => this.setupTriggerObserver(), 1000);
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.hasAnimated) {
              setTimeout(() => {
                this.playAnimation();
              }, LOTTIE_CONSTANTS.ANIMATION.DELAY * 1000);

              this.observer.disconnect();
              this.observer = null;
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: "0px",
        }
      );

      this.observer.observe(triggerImage);
    }

    // 位置を計算
    this.calculateAndSetPositions();
  }

  // SPモード用の各エリア監視
  setupMobileAreaObservers() {
    // エリアごとのシェイプ数を計算
    const shapeCounts = {
      mobileRightTop: Math.ceil(this.totalShapes * 0.25),
      mobileRightBottom: Math.ceil(this.totalShapes * 0.25),
      mobileLeftBottom: Math.ceil(this.totalShapes * 0.25),
      mobileLeftTopFixed: Math.floor(this.totalShapes * 0.25), // 名前を更新
    };

    // 合計数の調整
    let total = Object.values(shapeCounts).reduce((a, b) => a + b, 0);
    if (total > this.totalShapes) {
      shapeCounts.mobileLeftTopFixed -= total - this.totalShapes;
    }

    // 各エリアの配置インデックス
    let startIndex = 0;
    const areaIndices = {};

    // 各エリアのインデックス範囲を計算
    for (const area in shapeCounts) {
      areaIndices[area] = {
        start: startIndex,
        count: shapeCounts[area],
      };
      startIndex += shapeCounts[area];
    }

    // エリアに対応する要素を作成
    if (!this.conceptSection) return;

    // 監視対象エリアの設定
    const areas = [
      {
        id: "mobileRightTop",
        element: this.createAreaElement(
          "mobile-right-top",
          "0",
          "0",
          "40%",
          "30%",
          "right: 0;" // 右上に配置
        ),
      },
      {
        id: "mobileLeftTopFixed", // 縦長エリア
        element: this.createAreaElement(
          "mobile-left-fixed",
          "40%",
          "0",
          "30%",
          "30%",
          "left: 0;"
        ),
      },
      {
        id: "mobileLeftBottom",
        element: this.createAreaElement(
          "mobile-left-bottom",
          "0",
          "70%",
          "30%",
          "30%",
          "left: 0;"
        ),
      },
      {
        id: "mobileRightBottom",
        element: this.createAreaElement(
          "mobile-right-bottom",
          "70%",
          "70%",
          "30%",
          "30%",
          "right: 0;"
        ),
      },
    ];

    // 各エリアに対してIntersectionObserverを設定
    areas.forEach((area) => {
      if (!area.element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.animatedAreas[area.id]) {
              // このエリアをアニメーション
              const indices = areaIndices[area.id];
              if (indices) {
                this.playAreaAnimation(area.id, indices.start, indices.count);
                this.animatedAreas[area.id] = true;
              }
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: "0px",
        }
      );

      observer.observe(area.element);
      this.areaObservers[area.id] = observer;
    });
  }

  // エリア監視用の要素を作成
  createAreaElement(id, top, left, width, height, extraStyles = "") {
    const existingElement = document.getElementById(`lottie-observer-${id}`);
    if (existingElement) {
      return existingElement;
    }

    const element = document.createElement("div");
    element.id = `lottie-observer-${id}`;
    element.style.cssText = `
      position: absolute;
      top: ${top};
      left: ${left};
      width: ${width};
      height: ${height};
      pointer-events: none;
      z-index: -1;
      ${extraStyles}
    `;

    this.conceptSection.appendChild(element);
    return element;
  }

  // 特定エリアのアニメーションを再生
  playAreaAnimation(areaId, startIndex, count) {
    const areaShapes = this.shapes.slice(startIndex, startIndex + count);

    if (areaShapes.length === 0) return;

    const timeline = gsap.timeline();

    areaShapes.forEach((shape, index) => {
      timeline.to(
        shape,
        {
          opacity: 1,
          transform: "scale(1)",
          duration: LOTTIE_CONSTANTS.ANIMATION.DURATION,
          ease: "back.out(1.7)",
          delay: index * LOTTIE_CONSTANTS.ANIMATION.STAGGER,
        },
        0
      );
    });

    timeline.play();
  }

  calculateAndSetPositions() {
    const allCalculatedPositions = this.layoutManager.calculateAllPositions();
    this.positions = allCalculatedPositions;

    this.shapes.forEach((shape, index) => {
      const position =
        allCalculatedPositions[index] || this._getFallbackPosition();

      const posX = Math.round(position.x);
      const posY = Math.round(position.y);

      shape.style.left = `${posX}px`;
      shape.style.top = `${posY}px`;

      shape.style.opacity = "0";
      shape.style.transform = "scale(0)";
      shape.style.transformOrigin = "center center";
    });
  }

  playAnimation() {
    if (this.hasAnimated || this.isAnimating) return;

    this.isAnimating = true;

    const { DISTRIBUTION } = LOTTIE_CONSTANTS;
    const rightTopCount = Math.ceil(this.totalShapes * DISTRIBUTION.RIGHT_TOP);
    const leftTopCount = Math.floor(this.totalShapes * DISTRIBUTION.LEFT_TOP);
    const leftBottomCount = Math.ceil(
      this.totalShapes * DISTRIBUTION.LEFT_BOTTOM
    );

    const areas = [
      {
        name: "rightTop",
        start: 0,
        count: rightTopCount,
        delay: 0,
      },
      {
        name: "leftTop",
        start: rightTopCount,
        count: leftTopCount,
        delay: 0.2,
      },
      {
        name: "leftBottom",
        start: rightTopCount + leftTopCount,
        count: leftBottomCount,
        delay: 0.4,
      },
      {
        name: "rightBottom",
        start: rightTopCount + leftTopCount + leftBottomCount,
        count:
          this.totalShapes - (rightTopCount + leftTopCount + leftBottomCount),
        delay: 0.6,
      },
    ];

    const mainTimeline = gsap.timeline({
      onComplete: () => {
        this.hasAnimated = true;
        this.isAnimating = false;
      },
    });

    areas.forEach((area) => {
      const areaShapes = this.shapes.slice(area.start, area.start + area.count);

      areaShapes.forEach((shape, index) => {
        mainTimeline.to(
          shape,
          {
            opacity: 1,
            transform: "scale(1)",
            duration: LOTTIE_CONSTANTS.ANIMATION.DURATION,
            ease: "back.out(1.7)",
            delay: index * LOTTIE_CONSTANTS.ANIMATION.STAGGER,
          },
          area.delay
        );
      });
    });

    mainTimeline.play();
  }

  resetAnimation() {
    this.hasAnimated = false;
    this.isAnimating = false;

    // エリア監視をリセット
    for (const key in this.areaObservers) {
      if (this.areaObservers[key]) {
        this.areaObservers[key].disconnect();
      }
    }
    this.areaObservers = {};

    // アニメーション状態をリセット
    for (const key in this.animatedAreas) {
      this.animatedAreas[key] = false;
    }

    // 監視エリア要素を削除
    const observerElements = document.querySelectorAll(
      '[id^="lottie-observer-"]'
    );
    observerElements.forEach((element) => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });

    this.setupTriggerObserver();

    this.shapes.forEach((shape) => {
      shape.style.opacity = "0";
      shape.style.transform = "scale(0)";
    });
  }

  _getFallbackPosition() {
    const conceptHeight = this.conceptSection
      ? this.conceptSection.offsetHeight
      : 0;
    return {
      x: Math.floor(window.innerWidth * 0.5),
      y: Math.floor(conceptHeight * 0.5),
    };
  }

  updateGridSize() {
    const newGridSize = LOTTIE_CONSTANTS.getGridSize();

    if (this.currentGridSize !== newGridSize) {
      this.currentGridSize = newGridSize;

      this.shapes.forEach((shape) => {
        shape.style.width = `${newGridSize}px`;
        shape.style.height = `${newGridSize}px`;
      });

      if (!this.hasAnimated) {
        this.calculateAndSetPositions();
      }
    }

    return newGridSize;
  }

  // メディアクエリ変更時に呼ばれる
  handleMediaQueryChange() {
    this.totalShapes = LOTTIE_CONSTANTS.getTotalShapes();
    // リセットして再初期化
    this.resetAnimation();
  }
}

// メインの初期化クラス
class LottieAnimationInitializer {
  constructor() {
    this.shapes = [];
    this.loadedShapes = 0;
    this.animationManager = null;
    this.container = null;
    this.initAttempts = 0;
    this.maxInitAttempts = 5;
    this.isInitialized = false;
    // 現在のデバイスに応じたシェイプ数を取得
    this.totalShapes = LOTTIE_CONSTANTS.getTotalShapes();
  }

  init() {
    if (this.isInitialized) return;

    if (typeof gsap === "undefined") {
      this._retryInitAfterDelay();
      return;
    }

    const possibleSelectors = [
      LOTTIE_CONSTANTS.SELECTORS.CONCEPT_SECTION,
      ".concept",
      "#concept",
      '[data-section="concept"]',
    ];

    let conceptSection = null;
    for (const selector of possibleSelectors) {
      conceptSection = document.querySelector(selector);
      if (conceptSection) break;
    }

    if (!conceptSection) {
      this._retryInitAfterDelay();
      return;
    }

    this._createContainer(conceptSection);

    if (this.container) {
      this._initShapes();
      this._setupResizeHandler();
      this.isInitialized = true;
    } else {
      this._retryInitAfterDelay();
    }
  }

  _retryInitAfterDelay() {
    this.initAttempts++;
    if (this.initAttempts <= this.maxInitAttempts) {
      const delay = this.initAttempts * 1000;
      setTimeout(() => this.init(), delay);
    }
  }

  _createContainer(conceptSection) {
    try {
      if (!conceptSection) {
        throw new Error("コンセプトセクションが無効です");
      }

      const existingContainer = document.getElementById("concept-shapes");
      if (existingContainer) {
        existingContainer.parentNode.removeChild(existingContainer);
      }

      const shapesContainer = document.createElement("div");
      shapesContainer.id = "concept-shapes";

      shapesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: visible;
      `;

      conceptSection.style.position = "relative";
      conceptSection.style.overflow = "visible";

      conceptSection.insertBefore(shapesContainer, conceptSection.firstChild);

      this.container = shapesContainer;
    } catch (error) {
      this.container = null;
    }
  }

  _initShapes() {
    // 1から56までの数値の配列を作成
    const availableLottieIds = Array.from({ length: 56 }, (_, i) => i + 1);

    // Fisherーゲーツのシャッフルアルゴリズムを使用してランダムに並べ替え
    const shuffledIds = this._shuffleArray(availableLottieIds);

    // 必要な数だけシェイプを生成
    for (let i = 0; i < this.totalShapes; i++) {
      // シャッフルされた配列から順番に取得（この順番はランダム）
      // 必要なシェイプ数がLottieファイル数より多い場合は循環使用
      const lottieId = shuffledIds[i % shuffledIds.length];
      this._loadLottieShape(i + 1, lottieId);
    }
  }

  _shuffleArray(array) {
    // 配列のコピーを作成して元の配列を変更しないようにする
    const newArray = [...array];

    // Fisher-Yatesシャッフルアルゴリズム
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // 要素を交換
    }

    return newArray;
  }

  _loadLottieShape(index, lottieId) {
    try {
      const paddedId = lottieId.toString().padStart(2, "0");
      const lottiePath = `${LOTTIE_CONSTANTS.PATHS.LOTTIE}shape-${paddedId}.lottie`;

      if (!customElements.get("dotlottie-player")) {
        setTimeout(() => this._loadLottieShape(index, lottieId), 1000);
        return;
      }

      const currentGridSize = LOTTIE_CONSTANTS.getGridSize();

      const player = document.createElement("dotlottie-player");

      player.style.cssText = `
        position: absolute;
        width: ${currentGridSize}px;
        height: ${currentGridSize}px;
        opacity: 0;
        transform: scale(0);
        transform-origin: center center;
        will-change: transform, opacity;
        pointer-events: none;
        z-index: 10;
      `;

      player.addEventListener("ready", () => {
        player.style.opacity = "0";
      });

      player.addEventListener("error", (e) => {
        setTimeout(() => {
          player.load(lottiePath);
        }, 5000);
      });

      player.setAttribute("autoplay", "");
      player.setAttribute("loop", "");
      player.setAttribute("src", lottiePath);

      this.container.appendChild(player);
      this.shapes.push(player);
      this.loadedShapes++;

      if (this.loadedShapes === this.totalShapes) {
        setTimeout(() => {
          this.animationManager = new LottieAnimationManager(
            this.shapes,
            this.container
          );
          window.lottieAnimationManager = this.animationManager;
          this.animationManager.setupTriggerObserver();
        }, 1000);
      }
    } catch (error) {
      // エラー処理
    }
  }

  _setupResizeHandler() {
    let resizeTimeout;

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        if (this.animationManager) {
          this.animationManager.updateGridSize();

          if (!this.animationManager.hasAnimated) {
            this.animationManager.calculateAndSetPositions();
          }
        }
      }, 250);
    });

    // メディアクエリの変更を監視（SP⇔PC切り替え）
    const mediaQueryList = window.matchMedia("(max-width: 767px)");

    // MediaQueryListのchangeイベントを監視
    mediaQueryList.addEventListener("change", () => {
      if (this.animationManager) {
        // アニメーション状態をリセットして再構築
        this.animationManager.handleMediaQueryChange();
      }
    });
  }
}

// 複数回のコンテンツ読み込みに対応するための初期化処理
function initializeLottieAnimation() {
  // 既存のインスタンスがあれば再利用
  if (window.lottieAnimationInitializer) {
    window.lottieAnimationInitializer.init();
  } else {
    // 新しいインスタンスを作成
    const initializer = new LottieAnimationInitializer();
    window.lottieAnimationInitializer = initializer;
    initializer.init();
  }
}

// 全てのlottieプレイヤーを再ロードする関数
function reloadAllLottiePlayers() {
  const players = document.querySelectorAll("dotlottie-player");
  players.forEach((player) => {
    const src = player.getAttribute("src");
    if (src) {
      // 一度srcを削除して再設定
      player.removeAttribute("src");
      setTimeout(() => {
        player.setAttribute("src", src);
      }, 100);
    }
  });
}

// 初期化 - ページ表示後少し遅延させて実行
document.addEventListener("DOMContentLoaded", () => {
  // ページ読み込み直後ではなく、少し遅延させて初期化を開始
  setTimeout(() => {
    initializeLottieAnimation();

    // ページ遷移やSPAの場合に備えて、URLの変更を監視
    let lastUrl = location.href;
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        initializeLottieAnimation();
      }
    }).observe(document, { subtree: true, childList: true });
  }, 500);
});

// ロードイベント時にも初期化を試みる
window.addEventListener("load", () => {
  setTimeout(() => {
    // 最初はプレイヤーの状態をチェック
    reloadAllLottiePlayers();

    // アニメーションマネージャーが既に存在する場合は確認
    if (window.lottieAnimationManager) {
      if (!window.lottieAnimationManager.hasAnimated) {
        // まだアニメーションしていない場合は位置を再計算
        window.lottieAnimationManager.calculateAndSetPositions();
        // 監視を再設定
        window.lottieAnimationManager.setupTriggerObserver();
      }
    } else {
      // まだ初期化されていない場合は初期化
      initializeLottieAnimation();
    }
  }, 1000);
});
