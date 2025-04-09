class PointAnimationManager {
  constructor() {
    this.config = APP_CONFIG;
    this.isMobile = window.innerWidth <= 768;

    // DOM要素の設定
    this.DOM = {
      point: document.querySelector(".point"),
      container: document.querySelector(".point__container"),
      visual: document.querySelector(".point__visual"),
      content: document.querySelector(".point__content"),
      images: document.querySelectorAll(".point__image-box"),
      items: document.querySelectorAll(".point__item"),
    };

    // リサイズイベントの設定
    window.addEventListener("resize", () => {
      this.isMobile = window.innerWidth <= 768;
      this.updatePinSettings();
      this.setupImageTransitionTriggers();
    });
  }

  // Pin機能の初期化
  initPointPin() {
    // 画像の初期設定
    gsap.set(".point__image-box", { opacity: 0, force3D: true });
    gsap.set(".point__image-box:first-child", { opacity: 1 });

    // SPの場合は各itemも初期非表示に
    if (this.isMobile) {
      gsap.set(".point__item", { opacity: 0, force3D: true });
      gsap.set(".point__item:first-child", { opacity: 1 });

      // SPの場合はページ読み込み時にスクロール位置をリセット
      window.scrollTo(0, 0);
    }

    // PCとSP用のpin設定を分けて初期化
    this.updatePinSettings();
  }

  // PCとSP用のpin設定を更新する関数
  updatePinSettings() {
    // 既存のScrollTriggerインスタンスがあれば破棄
    if (this.pinScrollTrigger) {
      this.pinScrollTrigger.kill();
    }

    if (this.isMobile) {
      // SPレイアウト用のpin設定
      // セクション全体をピン止め
      this.pinScrollTrigger = ScrollTrigger.create({
        trigger: this.DOM.point,
        start: `top ${APP_CONFIG.HEADER.SPHEIGHT}px`, // SPヘッダーの高さを考慮
        end: () => `+=${this.DOM.items.length * window.innerHeight * 1.5}`, // 各item分の高さを増やして十分なスクロール領域を確保
        pin: true, // セクション全体をピン止め
        pinSpacing: true,
        anticipatePin: 1, // スムーズなピン止め効果のため
      });
    } else {
      // PC向けの元のpin設定
      this.pinScrollTrigger = ScrollTrigger.create({
        trigger: this.config.DOM.SECTION.POINT.WRAPPER,
        start: `top ${this.config.HEADER.HEIGHT}`,
        endTrigger: this.config.DOM.SECTION.POINT.WRAPPER,
        end: "bottom bottom",
        pin: this.config.DOM.SECTION.POINT.VISUAL,
        pinSpacing: true,
      });
    }
  }

  initImageTransitions() {
    // SPとPCで画像切り替えのトリガーを分ける
    this.setupImageTransitionTriggers();
  }

  // 画像切り替えトリガーをセットアップ
  setupImageTransitionTriggers() {
    // 既存のScrollTriggerを破棄（リサイズ時の再設定のため）
    if (this.imageTriggers && this.imageTriggers.length) {
      this.imageTriggers.forEach((trigger) => trigger.kill());
    }
    this.imageTriggers = [];

    if (this.isMobile) {
      // SP用のタイムライン作成 - スクロールに連動するメインのタイムライン
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.DOM.point,
          start: `top ${APP_CONFIG.HEADER.SPHEIGHT}px`, // SPヘッダーの高さを考慮
          end: () => `+=${this.DOM.items.length * window.innerHeight * 1.2}`, // タイムラインの長さもピン止めに合わせて調整
          scrub: 1, // スクロールとのつながりをより滑らかに
        },
      });

      // アイテムの数に基づいたアニメーションの設定
      const itemCount = Math.min(this.DOM.items.length, this.DOM.images.length);

      // スクロールの進行度を等分して、アイテムの切り替えを均等に配置
      const totalDuration = 1; // タイムラインの総時間を1とした場合
      const segmentDuration = totalDuration / itemCount;

      // 各アイテムと画像のタイムラインへの追加
      for (let i = 0; i < itemCount; i++) {
        const item = this.DOM.items[i];
        const image = this.DOM.images[i];

        // アニメーションの開始位置を計算（均等配分）
        const startPos = i * segmentDuration;

        // 前のアイテムをフェードアウト (最初のアイテム以外)
        if (i > 0) {
          const prevItem = this.DOM.items[i - 1];
          const prevImage = this.DOM.images[i - 1];

          tl.to(
            prevItem,
            {
              opacity: 0,
              duration: segmentDuration * 0.3,
              ease: "power1.out",
            },
            startPos
          );

          tl.to(
            prevImage,
            {
              opacity: 0,
              duration: segmentDuration * 0.3,
              ease: "power1.out",
            },
            startPos
          );
        }

        // 現在のアイテムをフェードイン
        tl.to(
          item,
          {
            opacity: 1,
            duration: segmentDuration * 0.4,
            ease: "power1.in",
          },
          startPos + segmentDuration * 0.1
        );

        // 現在の画像をフェードイン
        tl.to(
          image,
          {
            opacity: 1,
            duration: segmentDuration * 0.4,
            ease: "power1.in",
          },
          startPos + segmentDuration * 0.1
        );
      }

      // 最後のアイテムがしっかり表示されるように、タイムラインの最後に少し余裕を持たせる
      tl.to({}, { duration: 0.3 });

      this.imageTriggers.push(tl.scrollTrigger);
    } else {
      // PC用はそのまま元の設定を使用
      const containers = document.querySelectorAll(
        this.config.DOM.SECTION.POINT.ITEM
      );

      containers.forEach((item, index) => {
        if (index < 2) {
          // 最初の2つのitemにのみトリガーを設定
          const trigger = ScrollTrigger.create({
            trigger: item,
            start: "bottom 40%",
            onEnter: () => {
              // 次のパターンに切り替え
              const nextPattern = index + 1;

              // 画像切り替え
              gsap.to(`${this.config.DOM.SECTION.POINT.IMAGE}`, {
                opacity: 0,
                duration: 0.3,
              });
              gsap.to(
                `${this.config.DOM.SECTION.POINT.IMAGE}:nth-child(${
                  nextPattern + 1
                })`,
                {
                  opacity: 1,
                  duration: 0.3,
                }
              );
            },
            onLeaveBack: () => {
              // 前のパターンに戻す
              const prevPattern = index;

              // 画像切り替え
              gsap.to(`${this.config.DOM.SECTION.POINT.IMAGE}`, {
                opacity: 0,
                duration: 0.3,
              });
              gsap.to(
                `${this.config.DOM.SECTION.POINT.IMAGE}:nth-child(${
                  prevPattern + 1
                })`,
                {
                  opacity: 1,
                  duration: 0.3,
                }
              );
            },
          });
          this.imageTriggers.push(trigger);
        }
      });
    }
  }

  init() {
    this.isMobile = window.innerWidth <= 768;
    this.initPointPin();
    this.initImageTransitions();
  }
}
