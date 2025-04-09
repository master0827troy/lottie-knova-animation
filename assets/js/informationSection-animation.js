/**
 * 情報セクションのLottieアニメーションを初期化する即時関数
 * このスクリプトは既存のDOMを修正して、正しくアニメーション表示できるようにします
 */
(function () {
  // Informationセクションを取得
  const infoSection = document.querySelector(".information");
  if (!infoSection) return;

  // Lottieアイテムを取得
  const lottieItems = infoSection.querySelectorAll(".lottie__item");
  if (!lottieItems.length) return;

  console.log(
    "情報セクションのLottieアイテムを初期化します:",
    lottieItems.length
  );

  // 各アイテムを初期化
  lottieItems.forEach((item) => {
    // 既存のスタイルをリセット
    item.style.opacity = "0";
    item.style.transform = "scale(0)";
    // 問題のあるtransformプロパティをクリア
    item.style.translate = "none";
    item.style.rotate = "none";
    item.style.scale = "none";

    // dotlottie-playerを取得
    const player = item.querySelector("dotlottie-player");
    if (player) {
      // playerのスタイルを設定
      player.style.opacity = "1";
      player.style.transform = "scale(1)";
      player.style.width = "100%";
      player.style.height = "100%";

      // ソースを一度リセットして再ロード
      const src = player.getAttribute("src");
      if (src) {
        player.removeAttribute("src");
        setTimeout(() => {
          player.setAttribute("src", src);
        }, 100);
      }
    }
  });

  console.log("Lottieアイテムの初期化が完了しました");
})();

// informationSection-animation.js
// グリッド位置を維持するLottieアニメーション（Informationセクション用、ScrollTrigger使用）

// 定数の定義
const INFORMATION_LOTTIE_CONSTANTS = {
  // 固定サイズではなく関数に変更
  getGridSize: function () {
    // メディアクエリでモバイルかどうかを判断
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) {
      // SPサイズ: min(32px, 8.2vw)
      const vwSize = window.innerWidth * 0.082; // 8.2vw
      return Math.min(32, vwSize);
    } else {
      // PCサイズ: min(64px, 4.23vw)
      const vwSize = window.innerWidth * 0.0423; // 4.23vw
      return Math.min(64, vwSize);
    }
  },
  TOTAL_SHAPES: 6, // informationセクションの要素数に合わせて調整
  ANIMATION: {
    DURATION: 0.5,
    STAGGER: 0.05,
    DELAY: 0.3,
  },
  PATHS: {
    LOTTIE: "assets/img/shapes/lottie/",
  },
  SELECTORS: {
    INFORMATION_SECTION: ".information",
    LOTTIE_GRID: ".lottie-grid",
    LOTTIE_ITEM: ".lottie__item",
    TRIGGER_ELEMENT: ".information__figure", // 表示トリガーとなる要素
  },
  SCROLL_TRIGGER: {
    START: "top 70%", // トリガー開始位置
    END: "bottom 70%", // トリガー終了位置
    SCRUB: false, // スクロールに連動しない
    MARKERS: false, // マーカー非表示
  },
};

// ユーティリティ関数
class InformationLottieUtils {
  static elementExists(selector) {
    return document.querySelector(selector) !== null;
  }
}

// アニメーションマネージャークラス
class InformationLottieAnimationManager {
  constructor() {
    this.informationSection = document.querySelector(
      INFORMATION_LOTTIE_CONSTANTS.SELECTORS.INFORMATION_SECTION
    );
    this.lottieItems = document.querySelectorAll(
      `${INFORMATION_LOTTIE_CONSTANTS.SELECTORS.INFORMATION_SECTION} ${INFORMATION_LOTTIE_CONSTANTS.SELECTORS.LOTTIE_ITEM}`
    );
    this.hasAnimated = false;
    this.isAnimating = false;
    this.scrollTrigger = null;
    this.currentGridSize = INFORMATION_LOTTIE_CONSTANTS.getGridSize();

    // 各Lottieアイテムを初期化
    this.initializeLottieItems();
  }

  // 各Lottieアイテムを初期化
  initializeLottieItems() {
    this.lottieItems.forEach((item) => {
      // 既存のdotlottie-playerがあるか確認
      const existingPlayer = item.querySelector("dotlottie-player");

      // 既存のプレイヤーがある場合は初期状態を設定
      if (existingPlayer) {
        existingPlayer.style.opacity = "1";
        existingPlayer.style.transform = "scale(1)";
        existingPlayer.style.transformOrigin = "center center";
        existingPlayer.style.willChange = "transform, opacity";
      } else {
        // 新規作成の場合（通常はこちらは実行されないはず）
        // Lottie IDを取得
        const lottieIds = item.getAttribute("data-lottie-ids");
        if (!lottieIds) return;

        // IDを取得して2桁の文字列に変換
        const lottieId = parseInt(lottieIds);
        const paddedId = lottieId.toString().padStart(2, "0");
        const lottiePath = `${INFORMATION_LOTTIE_CONSTANTS.PATHS.LOTTIE}shape-${paddedId}.lottie`;

        // dotlottie-playerエレメントを作成
        const player = document.createElement("dotlottie-player");

        // プレイヤーのスタイル設定
        player.style.cssText = `
            width: 100%;
            height: 100%;
            opacity: 1;
            transform: scale(1);
            transform-origin: center center;
            will-change: transform, opacity;
          `;

        player.setAttribute("autoplay", "");
        player.setAttribute("loop", "");
        player.setAttribute("src", lottiePath);

        // アイテムの子要素としてプレイヤーを追加
        item.appendChild(player);
      }

      // 親要素（lottie__item）の初期状態を設定
      // opacity:1 になっているので0に戻す
      item.style.opacity = "0";
      // transformが複雑になっているので、シンプルなscale(0)に
      item.style.transform = "scale(0)";
      // その他のtransformプロパティを削除
      item.style.translate = "";
      item.style.rotate = "";
      item.style.scale = "";
      item.style.transformOrigin = "center center";
    });
  }

  // ScrollTriggerを設定
  setupScrollTrigger() {
    if (this.scrollTrigger) return;

    // GSAPとScrollTriggerが読み込まれているか確認
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.warn(
        "GSAPまたはScrollTriggerが見つかりません。1秒後に再試行します。"
      );
      setTimeout(() => this.setupScrollTrigger(), 1000);
      return;
    }

    const triggerElement = this.informationSection;
    if (!triggerElement) {
      console.warn(
        "トリガーとなるセクションが見つかりません。1秒後に再試行します。"
      );
      setTimeout(() => this.setupScrollTrigger(), 1000);
      return;
    }

    // デバッグ情報を出力
    console.log(
      "設定前のlottie__item状態:",
      this.lottieItems[0].style.opacity,
      this.lottieItems[0].style.transform
    );

    // ScrollTriggerの設定
    this.scrollTrigger = ScrollTrigger.create({
      trigger: triggerElement,
      start: INFORMATION_LOTTIE_CONSTANTS.SCROLL_TRIGGER.START,
      end: INFORMATION_LOTTIE_CONSTANTS.SCROLL_TRIGGER.END,
      markers: INFORMATION_LOTTIE_CONSTANTS.SCROLL_TRIGGER.MARKERS,
      onEnter: () => {
        if (!this.hasAnimated) {
          console.log("ScrollTrigger onEnter 発火");
          // ScrollTriggerが発火したときにアニメーションを開始
          setTimeout(() => {
            this.playAnimation();
          }, INFORMATION_LOTTIE_CONSTANTS.ANIMATION.DELAY * 1000);
        }
      },
      onEnterBack: () => {
        // 上からスクロールバックして再表示された場合にも対応
        if (!this.hasAnimated) {
          console.log("ScrollTrigger onEnterBack 発火");
          setTimeout(() => {
            this.playAnimation();
          }, INFORMATION_LOTTIE_CONSTANTS.ANIMATION.DELAY * 1000);
        }
      },
    });

    console.log(
      "ScrollTriggerを設定しました:",
      INFORMATION_LOTTIE_CONSTANTS.SELECTORS.INFORMATION_SECTION
    );
  }

  // アニメーションを再生
  playAnimation() {
    if (this.hasAnimated || this.isAnimating) return;

    this.isAnimating = true;
    console.log("Information Lottieアニメーションを開始します");

    // エリアごとに順番にアニメーション
    const items = Array.from(this.lottieItems);

    // メインのタイムライン作成
    const mainTimeline = gsap.timeline({
      onComplete: () => {
        this.hasAnimated = true;
        this.isAnimating = false;
        console.log("Information Lottieアニメーション完了");
      },
    });

    // すべてのアイテムを一斉にアニメーション
    mainTimeline.to(items, {
      opacity: 1,
      scale: 1,
      clearProps: "translate,rotate",
      duration: INFORMATION_LOTTIE_CONSTANTS.ANIMATION.DURATION,
      ease: "back.out(1.7)",
      // 遅延やスタガー（時間差）を削除
    });

    // タイムラインを再生
    mainTimeline.play();
  }

  resetAnimation() {
    this.hasAnimated = false;
    this.isAnimating = false;

    // ScrollTriggerを再設定
    if (this.scrollTrigger) {
      this.scrollTrigger.kill();
      this.scrollTrigger = null;
    }
    this.setupScrollTrigger();

    // すべてのアイテムを非表示に
    this.lottieItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "scale(0)";
      // 問題となっている可能性のある他のtransformプロパティをリセット
      item.style.translate = "";
      item.style.rotate = "";
      item.style.scale = "";

      // dotlottie-playerの表示状態をリセット
      const player = item.querySelector("dotlottie-player");
      if (player) {
        player.style.opacity = "1";
        player.style.transform = "scale(1)";
      }
    });
  }

  updateGridSize() {
    const newGridSize = INFORMATION_LOTTIE_CONSTANTS.getGridSize();

    // グリッドサイズに変更があった場合
    if (this.currentGridSize !== newGridSize) {
      this.currentGridSize = newGridSize;

      // 必要に応じてスタイルを更新
      // 既存のCSSでサイズが管理されている場合は不要
    }

    return newGridSize;
  }
}

// メインの初期化クラス
class InformationLottieInitializer {
  constructor() {
    this.animationManager = null;
    this.initAttempts = 0;
    this.maxInitAttempts = 5;
    this.isInitialized = false;
  }

  init() {
    // すでに初期化済みであれば処理しない
    if (this.isInitialized) return;

    // GSAPとScrollTriggerのロードを確認
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.warn(
        "GSAPまたはScrollTriggerが見つかりません。後で再試行します。"
      );
      this._retryInitAfterDelay();
      return;
    }

    // informationセクションの検索
    const informationSection = document.querySelector(
      INFORMATION_LOTTIE_CONSTANTS.SELECTORS.INFORMATION_SECTION
    );

    if (!informationSection) {
      console.warn("informationセクションが見つかりません。後で再試行します。");
      this._retryInitAfterDelay();
      return;
    }

    // Lottieアイテムがあるか確認
    const lottieItems = document.querySelectorAll(
      `${INFORMATION_LOTTIE_CONSTANTS.SELECTORS.INFORMATION_SECTION} ${INFORMATION_LOTTIE_CONSTANTS.SELECTORS.LOTTIE_ITEM}`
    );

    if (!lottieItems || lottieItems.length === 0) {
      console.warn("Lottieアイテムが見つかりません。後で再試行します。");
      this._retryInitAfterDelay();
      return;
    }

    // アニメーションマネージャーを作成
    this.animationManager = new InformationLottieAnimationManager();
    window.informationLottieAnimationManager = this.animationManager;

    // ScrollTriggerを設定
    this.animationManager.setupScrollTrigger();

    // リサイズハンドラーを設定
    this._setupResizeHandler();

    this.isInitialized = true;
    console.log("Information Lottieアニメーション初期化完了");
  }

  // 初期化リトライ処理
  _retryInitAfterDelay() {
    this.initAttempts++;
    if (this.initAttempts <= this.maxInitAttempts) {
      const delay = this.initAttempts * 1000;
      setTimeout(() => this.init(), delay);
    }
  }

  _setupResizeHandler() {
    let resizeTimeout;

    // リサイズイベントとメディアクエリの変更を監視
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        if (this.animationManager) {
          // グリッドサイズを更新
          this.animationManager.updateGridSize();

          // ScrollTriggerの更新
          ScrollTrigger.refresh();
        }
      }, 250);
    });

    // メディアクエリの変更を監視
    const mediaQueryList = window.matchMedia("(max-width: 767px)");

    // MediaQueryListのchangeイベントを監視
    mediaQueryList.addEventListener("change", () => {
      if (this.animationManager) {
        // グリッドサイズを更新
        this.animationManager.updateGridSize();

        // ScrollTriggerの更新
        ScrollTrigger.refresh();
      }
    });
  }
}

// 初期化関数
function initializeInformationLottieAnimation() {
  // 既存のインスタンスがあれば再利用
  if (window.informationLottieInitializer) {
    window.informationLottieInitializer.init();
  } else {
    // 新しいインスタンスを作成
    const initializer = new InformationLottieInitializer();
    window.informationLottieInitializer = initializer;
    initializer.init();
  }
}

// 全てのlottieプレイヤーを再ロードする関数
function reloadAllInformationLottiePlayers() {
  const players = document.querySelectorAll(
    `${INFORMATION_LOTTIE_CONSTANTS.SELECTORS.INFORMATION_SECTION} dotlottie-player`
  );
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
    console.log("Information Lottieアニメーション初期化開始");
    initializeInformationLottieAnimation();
  }, 800); // conceptSectionより少し遅らせる
});

// ロードイベント時にも初期化を試みる
window.addEventListener("load", () => {
  setTimeout(() => {
    // プレイヤーの状態をチェック
    reloadAllInformationLottiePlayers();

    // アニメーションマネージャーが既に存在する場合は確認
    if (window.informationLottieAnimationManager) {
      if (!window.informationLottieAnimationManager.hasAnimated) {
        // ScrollTriggerを再設定
        window.informationLottieAnimationManager.setupScrollTrigger();
      }
    } else {
      // まだ初期化されていない場合は初期化
      initializeInformationLottieAnimation();
    }
  }, 1500); // concept初期化より少し遅らせる
});
