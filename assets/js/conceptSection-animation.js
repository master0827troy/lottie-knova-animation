// conceptSection-animation.js
// グリッド位置を維持するLottieアニメーション

// 定数の定義
const LOTTIE_CONSTANTS = {
  GRID_SIZE: 64,
  TOTAL_SHAPES: 30,
  DISTRIBUTION: {
    RIGHT_TOP: 0.4,
    LEFT_TOP: 0.1,
    LEFT_BOTTOM: 0.35,
    // RIGHT_BOTTOMは残りの0.15になる
  },
  ANIMATION: {
    DURATION: 0.5, // 個々のアニメーション時間
    STAGGER: 0.05, // 連続表示の間隔
    DELAY: 0.3, // 画像検出後の遅延
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
      ".concept__image--person",
      ".concept__image--item-1",
      ".concept__image--item-2",
      ".concept__image--item-3",
      ".concept__image--item-4",
      ".concept__image--item-5", // 最後の画像（トリガー）
    ],
    TRIGGER_IMAGE: ".concept__image--item-5", // 表示検知する画像
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
  }) {
    const availableCells = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (isLShape && !this.isInLShape(row, col, rows, cols)) continue;

        availableCells.push({
          x: startX + col * LOTTIE_CONSTANTS.GRID_SIZE,
          y: startY + row * LOTTIE_CONSTANTS.GRID_SIZE,
          row,
          col,
        });
      }
    }

    return this.shuffleArray(availableCells).slice(0, totalShapes);
  }

  // 要素が表示されているか確認
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

  // 要素が存在するか確認
  static elementExists(selector) {
    return document.querySelector(selector) !== null;
  }
}

// レイアウト計算クラス
class LottieLayoutManager {
  constructor(windowWidth, sectionHeight) {
    this.windowWidth = windowWidth;
    this.sectionHeight = sectionHeight;
  }

  calculateAllPositions() {
    const { GRID_SIZE, TOTAL_SHAPES, DISTRIBUTION } = LOTTIE_CONSTANTS;

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
    return LottieUtils.createGridPattern({
      startX: this.windowWidth - LOTTIE_CONSTANTS.GRID_SIZE * 8,
      startY: 0,
      cols: 8,
      rows: 6,
      totalShapes: count,
    });
  }

  _getLeftTopPositions(count) {
    return LottieUtils.createGridPattern({
      startX: 0,
      startY: 0,
      cols: 5,
      rows: 3,
      totalShapes: count,
    });
  }

  _getLeftBottomPositions(count) {
    return LottieUtils.createGridPattern({
      startX: 0,
      startY: this.sectionHeight - LOTTIE_CONSTANTS.GRID_SIZE * 8,
      cols: 8,
      rows: 8,
      totalShapes: count,
      isLShape: true,
    });
  }

  _getRightBottomPositions(count) {
    return LottieUtils.createGridPattern({
      startX: this.windowWidth - LOTTIE_CONSTANTS.GRID_SIZE * 3,
      startY: this.sectionHeight - LOTTIE_CONSTANTS.GRID_SIZE * 3,
      cols: 3,
      rows: 3,
      totalShapes: count,
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
    this.positions = []; // 各シェイプの位置情報を保存
  }

  // 表示検知用のIntersectionObserverを設定
  setupTriggerObserver() {
    if (this.observer) return;

    const triggerImage = document.querySelector(
      LOTTIE_CONSTANTS.SELECTORS.TRIGGER_IMAGE
    );
    if (!triggerImage) {
      console.warn("トリガーとなる画像が見つかりません。1秒後に再試行します。");
      setTimeout(() => this.setupTriggerObserver(), 1000);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 画像が表示され、まだアニメーションが実行されていなければ実行
          if (entry.isIntersecting && !this.hasAnimated) {
            // 少し遅延を入れてアニメーション開始
            setTimeout(() => {
              this.playAnimation();
            }, LOTTIE_CONSTANTS.ANIMATION.DELAY * 1000);

            // 監視を終了
            this.observer.disconnect();
            this.observer = null;
          }
        });
      },
      {
        threshold: 0.5, // 50%以上表示されたら検知
        rootMargin: "0px", // マージンなし
      }
    );

    // 監視開始
    this.observer.observe(triggerImage);
    console.log(
      "トリガー画像の監視を開始しました:",
      LOTTIE_CONSTANTS.SELECTORS.TRIGGER_IMAGE
    );

    // 位置を計算して保存
    this.calculateAndSetPositions();
  }

  // 位置を計算して保存
  calculateAndSetPositions() {
    const allCalculatedPositions = this.layoutManager.calculateAllPositions();

    // 位置情報を保存
    this.positions = allCalculatedPositions;

    // 各シェイプに位置を設定
    this.shapes.forEach((shape, index) => {
      const position =
        allCalculatedPositions[index] || this._getFallbackPosition();

      // 位置を設定（left/topプロパティを使用）
      shape.style.left = `${position.x}px`;
      shape.style.top = `${position.y}px`;

      // 非表示状態で初期化
      shape.style.opacity = "0";
      shape.style.transform = "scale(0)";
      shape.style.transformOrigin = "center center";
    });
  }

  // アニメーションを再生
  playAnimation() {
    if (this.hasAnimated || this.isAnimating) return;

    this.isAnimating = true;
    console.log("Lottieアニメーションを開始します");

    // シェイプをエリアごとにグループ化
    const { TOTAL_SHAPES, DISTRIBUTION } = LOTTIE_CONSTANTS;
    const rightTopCount = Math.ceil(TOTAL_SHAPES * DISTRIBUTION.RIGHT_TOP);
    const leftTopCount = Math.floor(TOTAL_SHAPES * DISTRIBUTION.LEFT_TOP);
    const leftBottomCount = Math.ceil(TOTAL_SHAPES * DISTRIBUTION.LEFT_BOTTOM);

    // エリアごとのインデックス範囲を計算
    const areas = [
      {
        name: "rightTop",
        start: 0,
        count: rightTopCount,
        delay: 0, // 最初のエリア
      },
      {
        name: "leftTop",
        start: rightTopCount,
        count: leftTopCount,
        delay: 0.2, // 少し遅れて
      },
      {
        name: "leftBottom",
        start: rightTopCount + leftTopCount,
        count: leftBottomCount,
        delay: 0.4, // さらに遅れて
      },
      {
        name: "rightBottom",
        start: rightTopCount + leftTopCount + leftBottomCount,
        count: TOTAL_SHAPES - (rightTopCount + leftTopCount + leftBottomCount),
        delay: 0.6, // 最後に
      },
    ];

    // メインのタイムライン作成
    const mainTimeline = gsap.timeline({
      onComplete: () => {
        this.hasAnimated = true;
        this.isAnimating = false;
        console.log("Lottieアニメーション完了");
      },
    });

    // エリアごとに順番にアニメーション
    areas.forEach((area) => {
      const areaShapes = this.shapes.slice(area.start, area.start + area.count);

      // エリア内の各シェイプをアニメーション
      areaShapes.forEach((shape, index) => {
        // アニメーション設定 - transformだけを変更し、位置は変えない
        mainTimeline.to(
          shape,
          {
            opacity: 1,
            transform: "scale(1)",
            duration: LOTTIE_CONSTANTS.ANIMATION.DURATION,
            ease: "back.out(1.7)",
            delay: index * LOTTIE_CONSTANTS.ANIMATION.STAGGER, // 各シェイプをずらして表示
          },
          area.delay // エリアごとの開始タイミング
        );
      });
    });

    // タイムラインを再生
    mainTimeline.play();
  }

  resetAnimation() {
    this.hasAnimated = false;
    this.isAnimating = false;

    // 監視を再開
    this.setupTriggerObserver();

    // すべてのシェイプを非表示に
    this.shapes.forEach((shape) => {
      shape.style.opacity = "0";
      shape.style.transform = "scale(0)";
    });
  }

  // 位置計算用のフォールバックメソッド
  _getFallbackPosition() {
    const conceptHeight = this.conceptSection
      ? this.conceptSection.offsetHeight
      : 0;
    return {
      x: window.innerWidth * 0.5,
      y: conceptHeight * 0.5,
    };
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
  }

  init() {
    // すでに初期化済みであれば処理しない
    if (this.isInitialized) return;

    // ライブラリのロードを確認
    if (typeof gsap === "undefined") {
      console.warn("GSAPが見つかりません。後で再試行します。");
      this._retryInitAfterDelay();
      return;
    }

    // コンセプトセクションの検索
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
      console.warn("コンセプトセクションが見つかりません。後で再試行します。");
      this._retryInitAfterDelay();
      return;
    }

    // コンテナを作成
    this._createContainer(conceptSection);

    // 正常に初期化できた場合
    if (this.container) {
      this._initShapes();
      this._setupResizeHandler();
      this.isInitialized = true;
      console.log("Lottieアニメーション初期化完了");
    } else {
      this._retryInitAfterDelay();
    }
  }

  // 初期化リトライ処理
  _retryInitAfterDelay() {
    this.initAttempts++;
    if (this.initAttempts <= this.maxInitAttempts) {
      const delay = this.initAttempts * 1000;
      setTimeout(() => this.init(), delay);
    }
  }

  // コンテナ作成メソッド
  _createContainer(conceptSection) {
    try {
      if (!conceptSection) {
        throw new Error("コンセプトセクションが無効です");
      }

      // 既存のコンテナがあれば削除
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

      // 親要素のスタイルを設定
      conceptSection.style.position = "relative";
      conceptSection.style.overflow = "visible";

      // 先頭に追加
      conceptSection.insertBefore(shapesContainer, conceptSection.firstChild);

      this.container = shapesContainer;
    } catch (error) {
      console.error("コンテナ作成エラー:", error);
      this.container = null;
    }
  }

  _initShapes() {
    // ランダムなIDの使用を制限し、連続した値を使う
    for (let i = 1; i <= LOTTIE_CONSTANTS.TOTAL_SHAPES; i++) {
      const lottieId = (i % 22) + 1; // 1-22を使用
      this._loadLottieShape(i, lottieId);
    }
  }

  _loadLottieShape(index, lottieId) {
    try {
      // IDを2桁の文字列に変換
      const paddedId = lottieId.toString().padStart(2, "0");
      const lottiePath = `${LOTTIE_CONSTANTS.PATHS.LOTTIE}shape-${paddedId}.lottie`;

      // dotlottie-playerが定義されていることを確認
      if (!customElements.get("dotlottie-player")) {
        console.warn(
          "dotlottie-playerが登録されていません。遅延処理を試みます。"
        );
        setTimeout(() => this._loadLottieShape(index, lottieId), 1000);
        return;
      }

      // dotlottie-playerエレメントを作成
      const player = document.createElement("dotlottie-player");

      // 絶対位置指定でスタイルを設定（left/topは後で設定）
      player.style.cssText = `
        position: absolute;
        width: ${LOTTIE_CONSTANTS.GRID_SIZE}px;
        height: ${LOTTIE_CONSTANTS.GRID_SIZE}px;
        opacity: 0;
        transform: scale(0);
        transform-origin: center center;
        will-change: transform, opacity;
        pointer-events: none;
        z-index: 10;
      `;

      // ready イベントを先に設定
      player.addEventListener("ready", () => {
        // 読み込み完了してもアニメーション開始まで非表示
        player.style.opacity = "0";
      });

      // エラーハンドリング
      player.addEventListener("error", (e) => {
        console.error(`Lottieファイルの読み込みエラー:`, e);
        // エラー時は再読み込み
        setTimeout(() => {
          player.load(lottiePath);
        }, 5000);
      });

      // 属性を設定
      player.setAttribute("autoplay", "");
      player.setAttribute("loop", "");
      player.setAttribute("src", lottiePath);

      this.container.appendChild(player);
      this.shapes.push(player);
      this.loadedShapes++;

      // 最後のシェイプが読み込まれたら処理
      if (this.loadedShapes === LOTTIE_CONSTANTS.TOTAL_SHAPES) {
        // アニメーションマネージャーを初期化
        setTimeout(() => {
          this.animationManager = new LottieAnimationManager(
            this.shapes,
            this.container
          );
          window.lottieAnimationManager = this.animationManager;

          // 画像の表示を監視
          this.animationManager.setupTriggerObserver();
        }, 1000);
      }
    } catch (error) {
      console.error(`Lottieシェイプの作成エラー:`, error);
    }
  }

  _setupResizeHandler() {
    let resizeTimeout;

    window.addEventListener("resize", () => {
      // 連続したリサイズイベントを防ぐためにタイムアウトを使用
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        if (this.animationManager && !this.animationManager.hasAnimated) {
          // アニメーション前であれば位置を再計算
          this.animationManager.calculateAndSetPositions();
        }
      }, 250);
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
    console.log("Lottieアニメーション初期化開始");
    initializeLottieAnimation();

    // ページ遷移やSPAの場合に備えて、URLの変更を監視
    let lastUrl = location.href;
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        console.log("URL変更を検知しました。アニメーションを再初期化します。");
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
