// アプリケーション設定
const APP_CONFIG = {
  VIEWPORT: {
    MIN_WIDTH: 360,
    DEFAULT: "width=device-width,initial-scale=1",
    FIXED: "width=360",
  },
  HEADER: {
    HEIGHT: 68,
    SPHEIGHT: 56,
  },
  SCROLL: {
    CONCEPT_MULTIPLIER: 3,
  },
  DOM: {
    HEADER: {
      HAMBURGER: ".hamburger",
      SP_NAV: ".sp-nav",
      BODY: "body",
      ACTIVE_CLASS: "is-menu-open",
    },
    TAB: {
      BUTTON: ".tab-menu__item",
      PANEL: ".tab-panel",
      ACTIVE_BUTTON: ".tab-menu__item--active",
      ACTIVE_PANEL: ".tab-panel--active",
      BACKGROUND: ".tab-menu__background",
    },
    CONTENT: {
      BOX: ".content-box",
      ACTIVE_BOX: ".content-box--active",
      BACKGROUND: ".panel-layout__background",
      IMAGE: ".panel-images__item",
      ACTIVE_IMAGE: ".panel-images__item--active",
    },
    ACCORDION: {
      TOGGLE: ".accordion__toggle",
      ANSWER: ".accordion__answer-inner",
    },
    SECTION: {
      CONCEPT: {
        WRAPPER: ".concept",
        CONTENT: ".concept__content",
        VISUAL: ".concept__visual",
      },
      POINT: {
        WRAPPER: ".point",
        VISUAL: ".point__visual",
        IMAGE: ".point__image-box",
        ITEM: ".point__item",
      },
      USE: {
        WRAPPER: ".use",
        TITLE: ".use .section-title__en, .use .section-title__ja",
      },
    },
  },
};

// ハンバーガーメニュー管理クラス
class HamburgerMenuManager {
  constructor() {
    this.hamburgerButton = document.querySelector(
      APP_CONFIG.DOM.HEADER.HAMBURGER
    );
    this.spNav = document.querySelector(APP_CONFIG.DOM.HEADER.SP_NAV);
    this.body = document.querySelector(APP_CONFIG.DOM.HEADER.BODY);
    this.scrollPosition = 0;
    this.init();
  }

  init() {
    if (this.hamburgerButton) {
      this.hamburgerButton.addEventListener("click", () => this.toggleMenu());
    }

    // SPナビゲーション内のリンクをクリックしたときにメニューを閉じる
    const navLinks = document.querySelectorAll(".sp-nav__link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMenu());
    });
  }

  toggleMenu() {
    const isExpanded =
      this.hamburgerButton.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      // メニューを閉じる場合
      this.closeMenu();
    } else {
      // メニューを開く場合
      this.openMenu();
    }
  }

  openMenu() {
    // 現在のスクロール位置を保存
    this.scrollPosition = window.pageYOffset;

    // aria属性の更新
    this.hamburgerButton.setAttribute("aria-expanded", true);
    this.spNav.setAttribute("aria-hidden", false);

    // メニュー開く前に、固定用のラッパー要素を作成
    const wrapper = document.createElement("div");
    wrapper.id = "menu-position-wrapper";
    wrapper.style.position = "fixed";
    wrapper.style.top = "0";
    wrapper.style.left = "0";
    wrapper.style.width = "100%";
    wrapper.style.height = "100%";
    wrapper.style.overflow = "auto";
    wrapper.style.zIndex = "1000"; // 必要に応じて調整

    // スクロール位置を設定
    wrapper.scrollTop = this.scrollPosition;

    // bodyの内容をラッパーに移動
    while (document.body.firstChild) {
      wrapper.appendChild(document.body.firstChild);
    }
    document.body.appendChild(wrapper);

    // クラスの追加
    this.hamburgerButton.classList.add(APP_CONFIG.DOM.HEADER.ACTIVE_CLASS);
    this.spNav.classList.add(APP_CONFIG.DOM.HEADER.ACTIVE_CLASS);
    this.body.classList.add(APP_CONFIG.DOM.HEADER.ACTIVE_CLASS);

    // bodyのスクロール無効化（positionやtopプロパティは使わない）
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }

  closeMenu() {
    // aria属性の更新
    this.hamburgerButton.setAttribute("aria-expanded", false);
    this.spNav.setAttribute("aria-hidden", true);

    // クラスの削除
    this.hamburgerButton.classList.remove(APP_CONFIG.DOM.HEADER.ACTIVE_CLASS);
    this.spNav.classList.remove(APP_CONFIG.DOM.HEADER.ACTIVE_CLASS);
    this.body.classList.remove(APP_CONFIG.DOM.HEADER.ACTIVE_CLASS);

    // ラッパー要素を取得
    const wrapper = document.getElementById("menu-position-wrapper");
    if (wrapper) {
      // bodyに内容を戻す
      while (wrapper.firstChild) {
        document.body.insertBefore(wrapper.firstChild, wrapper);
      }
      // ラッパーを削除
      wrapper.remove();
    }

    // bodyのスタイルをリセット
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    // 保存していたスクロール位置に戻る
    window.scrollTo(0, this.scrollPosition);
  }
}

// ビューポート管理
class ViewportManager {
  static init() {
    const viewport = document.querySelector('meta[name="viewport"]');

    const switchViewport = () => {
      const value =
        window.outerWidth > APP_CONFIG.VIEWPORT.MIN_WIDTH
          ? APP_CONFIG.VIEWPORT.DEFAULT
          : APP_CONFIG.VIEWPORT.FIXED;

      if (viewport.getAttribute("content") !== value) {
        viewport.setAttribute("content", value);
      }
    };

    addEventListener("resize", switchViewport, false);
    switchViewport();
  }
}

class ScrollFadeManager {
  constructor() {
    this.elements = document.querySelectorAll(".fade-in");
    this.init();
  }

  init() {
    const options = {
      root: null,
      rootMargin: "-10% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      options
    );

    this.elements.forEach((element) => {
      observer.observe(element);
    });
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = this.getDelay(element);

        setTimeout(() => {
          element.classList.add("is-active");
        }, delay);
      }
    });
  }

  getDelay(element) {
    const delay = element.dataset.delay;
    return delay ? parseInt(delay) : 0;
  }
}

// タブ管理
class TabManager {
  constructor() {
    this.tabButtons = document.querySelectorAll(APP_CONFIG.DOM.TAB.BUTTON);
    this.tabPanels = document.querySelectorAll(APP_CONFIG.DOM.TAB.PANEL);
    this.panelStates = new Map();
    this.isMobile = window.innerWidth <= 769;
    this.initialize();
  }

  initialize() {
    this.tabButtons.forEach((button) => {
      button.addEventListener("click", () => this.handleTabClick(button));
    });
    this.updateTabBackground();

    this.tabPanels.forEach((panel) => {
      this.savePanelState(panel.id);
    });
  }

  savePanelState(panelId) {
    const panel = document.getElementById(panelId);
    if (panel) {
      const activeBox = panel.querySelector(APP_CONFIG.DOM.CONTENT.ACTIVE_BOX);
      if (activeBox) {
        this.panelStates.set(panelId, {
          activeBoxId: activeBox.id,
          scrollPosition: window.scrollY,
        });
      }
    }
  }

  restorePanelState(panelId) {
    const state = this.panelStates.get(panelId);
    if (state && state.activeBoxId) {
      const panel = document.getElementById(panelId);
      const targetBox = panel.querySelector(`#${state.activeBoxId}`);
      if (targetBox) {
        const parentPanel = targetBox.closest(APP_CONFIG.DOM.TAB.PANEL);
        const background = parentPanel
          .querySelector(".panel-layout__content")
          ?.querySelector(APP_CONFIG.DOM.CONTENT.BACKGROUND);

        if (background) {
          const boxRect = targetBox.getBoundingClientRect();
          const containerRect = targetBox.parentElement.getBoundingClientRect();
          const topPosition = boxRect.top - containerRect.top;
          background.style.transform = `translateY(${topPosition}px)`;
          background.style.height = `${boxRect.height}px`;
        }

        parentPanel
          .querySelectorAll(APP_CONFIG.DOM.CONTENT.ACTIVE_BOX)
          .forEach((box) => box.classList.remove("content-box--active"));
        targetBox.classList.add("content-box--active");

        // PC表示時のみ画像更新処理を実行
        if (!this.isMobile) {
          this.updateImages(targetBox, parentPanel);
        }
      }
    }
  }

  updateImages(box, parentPanel) {
    // SP表示時は画像更新処理をスキップ
    if (this.isMobile) return;

    const boxId = box.id;
    parentPanel
      .querySelectorAll(APP_CONFIG.DOM.CONTENT.IMAGE)
      .forEach((img) => {
        img.classList.toggle(
          "panel-images__item--active",
          img.dataset.target === boxId
        );
      });
  }

  handleTabClick(button) {
    const currentPanel = document.querySelector(
      APP_CONFIG.DOM.TAB.ACTIVE_PANEL
    );
    if (currentPanel) {
      this.savePanelState(currentPanel.id);
    }

    this.clearActiveStates();
    this.setActiveTab(button);
    this.updateTabBackground();
    this.updateAriaAttributes(button);

    const newPanelId = button.getAttribute("aria-controls");
    this.restorePanelState(newPanelId);
  }

  clearActiveStates() {
    document
      .querySelector(APP_CONFIG.DOM.TAB.ACTIVE_BUTTON)
      ?.classList.remove("tab-menu__item--active");
    document
      .querySelector(APP_CONFIG.DOM.TAB.ACTIVE_PANEL)
      ?.classList.remove("tab-panel--active");
  }

  setActiveTab(button) {
    button.classList.add("tab-menu__item--active");
    const panelId = button.getAttribute("aria-controls");
    document.getElementById(panelId).classList.add("tab-panel--active");
  }

  updateTabBackground() {
    const activeTab = document.querySelector(APP_CONFIG.DOM.TAB.ACTIVE_BUTTON);
    const background = document.querySelector(APP_CONFIG.DOM.TAB.BACKGROUND);

    if (activeTab && background) {
      const tabRect = activeTab.getBoundingClientRect();
      const containerRect = activeTab.parentElement.getBoundingClientRect();
      const leftPosition = tabRect.left - containerRect.left - 8;

      background.style.width = `${tabRect.width}px`;
      background.style.transform = `translateX(${leftPosition}px)`;
    }
  }

  updateAriaAttributes(button) {
    this.tabButtons.forEach((btn) => {
      btn.setAttribute("aria-selected", btn === button);
    });

    this.tabPanels.forEach((panel) => {
      panel.toggleAttribute(
        "hidden",
        panel.id !== button.getAttribute("aria-controls")
      );
    });
  }
}

// SP用タブ管理を追加
class SPTabManager {
  constructor() {
    this.isSP = window.innerWidth <= 769;
    this.tabButtons = document.querySelectorAll(".tab-sp .tab-menu__item");
    this.tabPanels = document.querySelectorAll(".tab-sp .tab-panel");
    this.background = document.querySelector(".tab-sp .tab-menu__background");
    this.initialize();

    // リサイズイベントリスナーを追加
    window.addEventListener("resize", () => {
      this.isSP = window.innerWidth <= 769;
      this.updateTabBackground();
    });
  }

  initialize() {
    this.tabButtons.forEach((button) => {
      button.addEventListener("click", () => this.handleTabClick(button));
    });

    // 初期表示時に背景位置を設定
    this.updateTabBackground();
  }

  handleTabClick(button) {
    this.clearActiveStates();
    this.setActiveTab(button);
    this.updateTabBackground();
    this.updateAriaAttributes(button);
  }

  clearActiveStates() {
    document
      .querySelector(".tab-sp .tab-menu__item--active")
      ?.classList.remove("tab-menu__item--active");
    document
      .querySelector(".tab-sp .tab-panel--active")
      ?.classList.remove("tab-panel--active");
  }

  setActiveTab(button) {
    button.classList.add("tab-menu__item--active");
    const panelId = button.getAttribute("aria-controls");
    document.getElementById(panelId)?.classList.add("tab-panel--active");
  }

  updateTabBackground() {
    // 背景要素が存在しない場合は処理しない
    if (!this.background) return;

    const activeTab = document.querySelector(".tab-sp .tab-menu__item--active");

    if (activeTab) {
      const tabRect = activeTab.getBoundingClientRect();
      const containerRect = activeTab.parentElement.getBoundingClientRect();

      // スマホ表示時のタブ背景位置計算
      // CSSによると、スマホ時は .tab-menu__content のパディングが 4px 8px になっている
      // また、.tab-menu__background は left: 8px だが、スマホサイズでは left: 左パディング と同じにする必要がある

      // 左端からの相対位置を計算（ブラウザのスケールなどに影響されない計算方法）
      let leftPosition = tabRect.left - containerRect.left;

      // スマホ表示でのパディング調整（左右パディングが非対称の場合に重要）
      if (this.isSP) {
        // タブメニューのコンテンツの左パディングは8px（CSSより）
        // 背景要素の位置を正確に調整
        leftPosition = leftPosition - 8; // タブメニューの左パディングを引く
      }

      // 背景サイズと位置を設定
      this.background.style.width = `${tabRect.width}px`;
      this.background.style.transform = `translateX(${leftPosition}px)`;
    }
  }

  updateAriaAttributes(button) {
    this.tabButtons.forEach((btn) => {
      btn.setAttribute("aria-selected", btn === button);
    });

    this.tabPanels.forEach((panel) => {
      panel.toggleAttribute(
        "hidden",
        panel.id !== button.getAttribute("aria-controls")
      );
    });
  }
}

// コンテンツボックス管理
class ContentBoxManager {
  constructor() {
    this.contentBoxes = document.querySelectorAll(APP_CONFIG.DOM.CONTENT.BOX);
    this.isMobile = window.innerWidth <= 769;
    this.initialize();
  }

  initialize() {
    // PC表示時のみボックスクリックイベントを設定
    if (!this.isMobile) {
      this.contentBoxes.forEach((box) => {
        if (!box.closest(".tab-sp")) {
          // SP用タブ内のボックスは除外
          box.addEventListener("click", (e) => this.handleBoxClick(box, e));
        }
      });
    }

    this.initBackgroundHeight();

    // リサイズ時のイベントリスナーを追加
    window.addEventListener("resize", () => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 769;

      // モバイル/PC間の切り替えが発生した場合
      if (wasMobile !== this.isMobile) {
        this.reinitialize();
      }
    });
  }

  // 表示モード切替時に再初期化
  reinitialize() {
    // 既存のイベントリスナーを削除
    this.contentBoxes.forEach((box) => {
      box.removeEventListener("click", (e) => this.handleBoxClick(box, e));
    });

    // PC表示時のみイベントリスナーを再設定
    if (!this.isMobile) {
      this.contentBoxes.forEach((box) => {
        if (!box.closest(".tab-sp")) {
          // SP用タブ内のボックスは除外
          box.addEventListener("click", (e) => this.handleBoxClick(box, e));
        }
      });
    }
  }

  initBackgroundHeight() {
    document.querySelectorAll(APP_CONFIG.DOM.TAB.PANEL).forEach((panel) => {
      // SP用タブ内のパネルは除外
      if (panel.closest(".tab-sp")) return;

      const activeBox = panel.querySelector(APP_CONFIG.DOM.CONTENT.ACTIVE_BOX);
      if (activeBox) {
        const background = panel
          .querySelector(".panel-layout__content")
          ?.querySelector(APP_CONFIG.DOM.CONTENT.BACKGROUND);

        if (background) {
          const boxRect = activeBox.getBoundingClientRect();
          background.style.height = `${boxRect.height}px`;
          background.style.transform = `translateY(0)`;
        }
      }
    });
  }

  handleBoxClick(box, event) {
    // SP表示時は処理をスキップ
    if (this.isMobile || box.closest(".tab-sp")) return;

    const parentPanel = box.closest(APP_CONFIG.DOM.TAB.PANEL);
    this.updateActiveStates(box, parentPanel);
    this.updateContentBackground(box);

    // PC表示時のみ画像更新処理を実行
    if (!this.isMobile) {
      this.updateImages(box, parentPanel);
    }

    if (window.tabManager) {
      window.tabManager.savePanelState(parentPanel.id);
    }
  }

  updateActiveStates(box, parentPanel) {
    parentPanel
      .querySelectorAll(APP_CONFIG.DOM.CONTENT.ACTIVE_BOX)
      .forEach((activeBox) =>
        activeBox.classList.remove("content-box--active")
      );
    box.classList.add("content-box--active");
  }

  updateContentBackground(activeBox) {
    const background = activeBox
      .closest(".panel-layout__content")
      .querySelector(APP_CONFIG.DOM.CONTENT.BACKGROUND);

    if (background) {
      const boxRect = activeBox.getBoundingClientRect();
      const containerRect = activeBox.parentElement.getBoundingClientRect();
      const topPosition = boxRect.top - containerRect.top;

      background.style.transform = `translateY(${topPosition}px)`;
      background.style.height = `${boxRect.height}px`;
    }
  }

  updateImages(box, parentPanel) {
    // SP表示時は画像更新処理をスキップ
    if (this.isMobile) return;

    const boxId = box.id;
    parentPanel
      .querySelectorAll(APP_CONFIG.DOM.CONTENT.IMAGE)
      .forEach((img) => {
        img.classList.toggle(
          "panel-images__item--active",
          img.dataset.target === boxId
        );
      });
  }
}

// レスポンシブ対応クラス
class ResponsiveManager {
  constructor() {
    this.breakpoint = 769;
    this.pcTab = document.querySelector(".tab:not(.tab-sp)");
    this.spTab = document.querySelector(".tab-sp");
    this.currentMode = window.innerWidth > this.breakpoint ? "pc" : "sp";

    this.init();
  }

  init() {
    this.handleResize();
    window.addEventListener("resize", () => this.handleResize());
  }

  handleResize() {
    const newMode = window.innerWidth > this.breakpoint ? "pc" : "sp";

    if (newMode !== this.currentMode) {
      this.currentMode = newMode;
      this.switchDisplay();
    }
  }

  switchDisplay() {
    if (this.currentMode === "pc") {
      if (this.pcTab) this.pcTab.style.display = "";
      if (this.spTab) this.spTab.style.display = "none";

      // PC用タブの初期化が必要であれば
      if (window.tabManager) {
        window.tabManager.updateTabBackground();
      }
    } else {
      if (this.pcTab) this.pcTab.style.display = "none";
      if (this.spTab) this.spTab.style.display = "";

      // SP用タブマネージャーの初期化または更新
      if (!window.spTabManager && document.querySelector(".tab-sp")) {
        window.spTabManager = new SPTabManager();
      } else if (window.spTabManager) {
        window.spTabManager.updateTabBackground();
      }
    }
  }
}

// アコーディオン管理
class AccordionManager {
  constructor() {
    this.toggleButtons = document.querySelectorAll(
      APP_CONFIG.DOM.ACCORDION.TOGGLE
    );
    this.init();
  }

  init() {
    this.toggleButtons.forEach((button) => {
      button.addEventListener("click", () => this.toggleAccordion(button));
    });
  }

  toggleAccordion(button) {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    const answer = button.closest(".accordion__dt").nextElementSibling;

    button.setAttribute("aria-expanded", !isExpanded);
    this.animateAccordion(answer, !isExpanded);
  }

  animateAccordion(answer, isOpening) {
    if (isOpening) {
      answer.style.height = "auto";
      const height = answer.offsetHeight;
      answer.style.height = "0";
      requestAnimationFrame(() => {
        answer.style.height = `${height}px`;
      });
    } else {
      requestAnimationFrame(() => {
        answer.style.height = `${answer.scrollHeight}px`;
        requestAnimationFrame(() => {
          answer.style.height = "0";
        });
      });
    }
  }
}

// セクションアニメーション管理
class SectionAnimationManager {
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
    this.isMobile = window.innerWidth <= 767; // スマホかどうかの判定
    this.scrollTriggers = []; // ScrollTriggerインスタンスを保存する配列

    // リサイズイベントで表示モードの切り替えを検知
    this._setupResizeListener();
  }

  _setupResizeListener() {
    // デバウンス処理用の変数
    let resizeTimeout;

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 767;

        // モバイル/PC間の切り替えが発生した場合
        if (wasMobile !== this.isMobile) {
          // 既存のScrollTriggerをすべて削除
          this._killAllScrollTriggers();

          // アニメーションを再初期化
          this.initAll();
        }
      }, 250);
    });
  }

  _killAllScrollTriggers() {
    // 登録済みのScrollTriggerをすべて削除
    this.scrollTriggers.forEach((trigger) => {
      if (trigger) {
        trigger.kill();
      }
    });

    // 配列をクリア
    this.scrollTriggers = [];

    // GSAPによって自動作成されたScrollTriggerも削除
    ScrollTrigger.getAll().forEach((st) => st.kill());

    // アニメーション関連のスタイルをリセット
    gsap.set(
      [
        APP_CONFIG.DOM.SECTION.CONCEPT.WRAPPER,
        APP_CONFIG.DOM.SECTION.CONCEPT.VISUAL,
        ".concept__image--phone",
        ".concept__image--item-1",
        ".concept__image--item-2",
        ".concept__image--item-3",
        ".concept__image--item-4",
        ".concept__image--item-5",
        APP_CONFIG.DOM.SECTION.CONCEPT.CONTENT,
      ],
      { clearProps: "all" }
    );
  }

  initAll() {
    // スマホかPCかで初期化処理を分岐
    if (this.isMobile) {
      this.initMobileConceptAnimation();
    } else {
      // PC版はピン止め後にアニメーションを開始する統合版を使用
      this.initConceptPinWithAnimation();
    }

    // 共通のアニメーション初期化
    this.initBackgroundAnimation();

    // ScrollTriggerの更新
    ScrollTrigger.refresh();
  }

  // PC用のピン止めとアニメーションを統合したメソッド
  initConceptPinWithAnimation() {
    // 要素を最初は非表示に
    gsap.set(
      [
        ".concept__image--phone",
        ".concept__image--item-1",
        ".concept__image--item-2",
        ".concept__image--item-3",
        ".concept__image--item-4",
        ".concept__image--item-5",
      ],
      {
        autoAlpha: 0,
        scale: 0.5,
        y: 30,
      }
    );

    // ピン止め用のScrollTrigger
    const pinTrigger = ScrollTrigger.create({
      trigger: APP_CONFIG.DOM.SECTION.CONCEPT.WRAPPER,
      start: `top ${APP_CONFIG.HEADER.HEIGHT}`,
      end: "max",
      pin: true,
      pinSpacing: false,
      onEnter: () => {
        // ピン止めされた直後にアニメーションを開始
        this._playConceptAnimation();
      },
    });

    this.scrollTriggers.push(pinTrigger);

    // コンテンツフェードアウト処理（スクロールに応じて）
    const fadeOutTrigger = ScrollTrigger.create({
      trigger: APP_CONFIG.DOM.SECTION.CONCEPT.WRAPPER,
      start: "top top", // ピン止め後からスタート
      end: "+=30%", // その後のスクロールで完全に透明に
      scrub: true,
      onUpdate: (self) => {
        gsap.set(APP_CONFIG.DOM.SECTION.CONCEPT.CONTENT, {
          opacity: 1 - self.progress,
        });
      },
    });

    this.scrollTriggers.push(fadeOutTrigger);
  }

  // 分離したアニメーション再生メソッド
  _playConceptAnimation() {
    const timeline = gsap.timeline();

    // 電話を最初に表示
    timeline.to(".concept__image--phone", {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
    });

    // 各アイテムを順番に表示
    const items = [
      ".concept__image--item-1",
      ".concept__image--item-2",
      ".concept__image--item-3",
      ".concept__image--item-4",
      ".concept__image--item-5",
    ];

    items.forEach((item, index) => {
      timeline.to(
        item,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.05,
          ease: "back.out(1.7)",
        },
        ">=0.1" // 少し間隔を空ける
      );
    });

    // すべてのアイテムが表示された後、Lottieアニメーションを開始
    timeline.call(() => {
      if (window.lottieAnimationManager) {
        window.lottieAnimationManager.playAnimation();
      }
    });

    return timeline;
  }

  // スマホ用のシンプルなアニメーション（ピン止めなし）
  initMobileConceptAnimation() {
    // すべての要素を最初は非表示に
    gsap.set(
      [
        ".concept__image--phone",
        ".concept__image--item-1",
        ".concept__image--item-2",
        ".concept__image--item-3",
        ".concept__image--item-4",
        ".concept__image--item-5",
      ],
      {
        autoAlpha: 0,
        scale: 0.5,
        y: 20,
      }
    );

    // スクロールトリガーを使用して、ビジュアルが画面内に入ったらアニメーション開始
    const animationTrigger = ScrollTrigger.create({
      trigger: APP_CONFIG.DOM.SECTION.CONCEPT.VISUAL,
      start: "top 80%", // ビジュアルの上部が画面の下から20%の位置に入ったら
      once: true, // 一度だけ実行
      onEnter: () => {
        // アイテムを順番に表示するアニメーション
        const itemsTimeline = gsap.timeline();

        // 電話を最初に表示
        itemsTimeline.to(".concept__image--phone", {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        });

        // 各アイテムを順番に表示
        const items = [
          ".concept__image--item-1",
          ".concept__image--item-2",
          ".concept__image--item-3",
          ".concept__image--item-4",
          ".concept__image--item-5",
        ];

        items.forEach((item, index) => {
          itemsTimeline.to(
            item,
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 0.5,
              ease: "back.out(1.7)",
            },
            `>-0.3`
          ); // 少し重ねて表示
        });

        // すべてのアイテムが表示された後、Lottieアニメーションを開始
        itemsTimeline.call(() => {
          if (window.lottieAnimationManager) {
            window.lottieAnimationManager.playAnimation();
          }
        });
      },
    });

    this.scrollTriggers.push(animationTrigger);

    // 追加のスクロールトリガー: ビジュアルが画面から出ようとする時にLottieアニメーションを確実に開始
    const exitTrigger = ScrollTrigger.create({
      trigger: APP_CONFIG.DOM.SECTION.CONCEPT.VISUAL,
      start: "bottom 30%", // ビジュアルの下部が画面の上から30%の位置を通過する時
      once: true,
      onEnter: () => {
        // すべての要素が表示されていることを確認
        gsap.set(
          [
            ".concept__image--phone",
            ".concept__image--item-1",
            ".concept__image--item-2",
            ".concept__image--item-3",
            ".concept__image--item-4",
            ".concept__image--item-5",
          ],
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
          }
        );

        // Lottieアニメーションを開始（まだ開始していない場合）
        if (
          window.lottieAnimationManager &&
          !window.lottieAnimationManager.hasAnimated
        ) {
          window.lottieAnimationManager.playAnimation();
        }
      },
    });

    this.scrollTriggers.push(exitTrigger);
  }

  // 背景アニメーション
  initBackgroundAnimation() {
    gsap.set(APP_CONFIG.DOM.SECTION.USE.WRAPPER, { position: "relative" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: APP_CONFIG.DOM.SECTION.USE.WRAPPER,
        start: "top center",
        toggleActions: "play none none reverse",
        onEnter: () => {
          // USE セクションにクラスを追加
          document
            .querySelector(APP_CONFIG.DOM.SECTION.USE.WRAPPER)
            ?.classList.add("is-background");

          // TAB セクションにクラスを追加
          document.querySelector(".tab")?.classList.add("is-background");
        },
        onLeaveBack: () => {
          // USE セクションからクラスを削除
          document
            .querySelector(APP_CONFIG.DOM.SECTION.USE.WRAPPER)
            ?.classList.remove("is-background");

          // TAB セクションからクラスを削除
          document.querySelector(".tab")?.classList.remove("is-background");
        },
      },
    });

    this.scrollTriggers.push(tl.scrollTrigger);

    tl.to(
      APP_CONFIG.DOM.SECTION.USE.WRAPPER,
      {
        "--pseudo-opacity": 0.95,
        duration: 1,
        ease: "power1.inOut",
      },
      0
    ).to(
      APP_CONFIG.DOM.SECTION.USE.TITLE,
      {
        color: "#fff",
        duration: 1,
        ease: "power1.inOut",
      },
      0
    );
  }
}

// DOMContentLoaded イベントリスナーを修正
document.addEventListener("DOMContentLoaded", () => {
  // Viewportの初期化
  if (typeof ViewportManager !== "undefined") {
    ViewportManager.init();
  }

  // ハンバーガーメニュー初期化
  const hamburgerButton = document.querySelector(
    APP_CONFIG.DOM.HEADER.HAMBURGER
  );
  if (hamburgerButton) {
    new HamburgerMenuManager();
  }

  // PC用タブ初期化
  const tabButtons = document.querySelectorAll(APP_CONFIG.DOM.TAB.BUTTON);
  if (tabButtons.length > 0) {
    window.tabManager = new TabManager();
  }

  // コンテンツボックス初期化
  const contentBoxes = document.querySelectorAll(APP_CONFIG.DOM.CONTENT.BOX);
  if (contentBoxes.length > 0) {
    new ContentBoxManager();
  }

  // SP用タブ初期化
  const spTab = document.querySelector(".tab-sp");
  if (spTab) {
    window.spTabManager = new SPTabManager();
  }

  // レスポンシブ管理
  if (typeof ResponsiveManager !== "undefined") {
    new ResponsiveManager();
  }

  // アコーディオン初期化
  const accordionElements = document.querySelectorAll(
    APP_CONFIG.DOM.ACCORDION.TOGGLE
  );
  if (accordionElements.length > 0 && typeof AccordionManager !== "undefined") {
    new AccordionManager();
  }

  // アニメーション初期化
  if (typeof SectionAnimationManager !== "undefined") {
    // グローバル変数として保存（リサイズ時に再利用するため）
    window.sectionAnimations = new SectionAnimationManager();
    window.sectionAnimations.initAll();
  }

  // POINTアニメーション初期化
  const pointElements = document.querySelector(
    APP_CONFIG.DOM.SECTION.POINT.WRAPPER
  );
  if (pointElements && typeof PointAnimationManager !== "undefined") {
    const pointAnimation = new PointAnimationManager();
    pointAnimation.init();
  }

  // ScrollTriggerの更新
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }
});

// リサイズイベント設定を修正
window.addEventListener("resize", () => {
  // PC用タブの更新
  if (window.innerWidth > 769) {
    if (window.tabManager) {
      window.tabManager.updateTabBackground();
    }

    const contentBoxes = document.querySelectorAll(APP_CONFIG.DOM.CONTENT.BOX);
    if (contentBoxes.length > 0) {
      const contentBoxManager = new ContentBoxManager();
      const activeBox = document.querySelector(
        APP_CONFIG.DOM.CONTENT.ACTIVE_BOX
      );
      if (activeBox) {
        contentBoxManager.updateContentBackground(activeBox);
      }
    }
  }
  // SP用タブの更新
  else {
    if (window.spTabManager) {
      window.spTabManager.updateTabBackground();
    }
  }
});

// ソート選択機能のJavaScript
document.addEventListener("DOMContentLoaded", function () {
  const sortSelector = document.querySelector(".sort-selector");
  if (!sortSelector) return; // ソートセレクタがない場合は処理しない

  const sortButton = document.querySelector(".sort-selector__button");
  if (!sortButton) return; // ソートボタンがない場合は処理しない

  const sortLinks = document.querySelectorAll(".sort-selector__link");
  if (sortLinks.length === 0) return; // ソートリンクがない場合は処理しない

  // ボタンクリックでドロップダウンの表示/非表示を切り替える
  sortButton.addEventListener("click", function (e) {
    e.stopPropagation(); // イベントの伝播を停止
    sortSelector.classList.toggle("sort-selector--open"); // クラスの切り替え
  });

  // ソートオプションのクリックイベント
  sortLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation(); // イベントの伝播を停止

      // アクティブクラスの切り替え
      const activeLink = document.querySelector(".sort-selector__link--active");
      if (activeLink) {
        activeLink.classList.remove("sort-selector__link--active");
      }
      this.classList.add("sort-selector__link--active");

      // ここにソート処理を追加
      // 実際の実装では、WordPressプラグインがこの部分を処理します
      console.log("Sort by:", this.textContent.trim());

      // 選択後にドロップダウンを閉じる
      sortSelector.classList.remove("sort-selector--open");
    });
  });

  // ドキュメント上でのクリックでドロップダウンを閉じる
  document.addEventListener("click", function () {
    if (sortSelector) {
      sortSelector.classList.remove("sort-selector--open");
    }
  });

  // タッチデバイス対応
  document.addEventListener(
    "touchstart",
    function (e) {
      if (sortSelector && !sortSelector.contains(e.target)) {
        sortSelector.classList.remove("sort-selector--open");
      }
    },
    { passive: true }
  );
});

// スクロール位置をリセットする関数
function resetScroll() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant", // 'auto'でも可
  });
}

// history API を使用してスクロール復元を無効化
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

// DOMContentLoadedの段階でスクロールをリセット
document.addEventListener("DOMContentLoaded", function () {
  resetScroll();
});

// ページが完全に読み込まれた後にもスクロールをリセット
window.addEventListener("load", function () {
  // 少し遅延させることでより確実にスクロール位置をリセット
  setTimeout(resetScroll, 0);
});

// beforeunloadではスクロール制御はせず、フラグだけ設定
window.addEventListener("beforeunload", function () {
  sessionStorage.setItem("pageIsReloading", "true");
});

// ページロード時にフラグをチェック
if (
  sessionStorage.getItem("pageIsReloading") === "true" ||
  performance.navigation.type === 1
) {
  // リロードされた場合
  resetScroll();

  // 100ms後にもう一度スクロールリセット（より確実に）
  setTimeout(resetScroll, 100);

  // フラグをクリア
  sessionStorage.removeItem("pageIsReloading");
}

document.addEventListener("DOMContentLoaded", function () {
  // 要素の取得
  const fixedButton = document.querySelector(".fixed-button");
  const closeButton = document.querySelector(".fixed-button__close");
  const mainVisual = document.querySelector(".mainvisual");
  const footer = document.querySelector("footer"); // フッター要素を取得

  // ボタンの初期状態を設定（最初は非表示）
  fixedButton.style.opacity = "0";
  fixedButton.style.visibility = "hidden";
  fixedButton.style.transition = "opacity 0.5s ease, visibility 0.5s ease";

  // 表示状態を管理する変数（クローズボタンが押されたかどうか）
  let isButtonClosed = false;

  // スクロールイベントのリスナー追加
  window.addEventListener("scroll", function () {
    // mainvisualまたはfooterがない場合はエラー防止のためリターン
    if (!mainVisual || !footer) return;

    // mainvisualの底辺位置を取得
    const mainVisualBottom = mainVisual.offsetTop + mainVisual.offsetHeight;

    // フッターの上端位置を取得
    const footerTop = footer.offsetTop;

    // 現在のスクロール位置
    const scrollPosition = window.scrollY + window.innerHeight / 2; // 画面の半分の位置で判定
    const scrollBottom = window.scrollY + window.innerHeight; // 画面の下端位置

    if (
      scrollPosition > mainVisualBottom &&
      scrollBottom < footerTop &&
      !isButtonClosed
    ) {
      fixedButton.style.opacity = "1";
      fixedButton.style.visibility = "visible";
    } else {
      // 条件を満たさない場合は非表示
      fixedButton.style.opacity = "0";
      fixedButton.style.visibility = "hidden";
    }
  });

  // クローズボタンのクリックイベント
  closeButton.addEventListener("click", function () {
    // ボタンを非表示にする
    fixedButton.style.opacity = "0";
    fixedButton.style.visibility = "hidden";

    // クローズ状態にする
    isButtonClosed = true;
  });

  // ページロード時にスクロールイベントを一度トリガーして初期状態を設定
  window.dispatchEvent(new Event("scroll"));
});
