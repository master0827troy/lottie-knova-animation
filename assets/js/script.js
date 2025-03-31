// アプリケーション設定
const APP_CONFIG = {
  VIEWPORT: {
    MIN_WIDTH: 360,
    DEFAULT: "width=device-width,initial-scale=1",
    FIXED: "width=360",
  },
  HEADER: {
    HEIGHT: 68,
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
    // スクロール位置を保存
    this.scrollPosition = window.pageYOffset;

    // aria属性の更新
    this.hamburgerButton.setAttribute("aria-expanded", true);
    this.spNav.setAttribute("aria-hidden", false);

    // クラスの追加
    this.hamburgerButton.classList.add(APP_CONFIG.DOM.HEADER.ACTIVE_CLASS);
    this.spNav.classList.add(APP_CONFIG.DOM.HEADER.ACTIVE_CLASS);
    this.body.classList.add(APP_CONFIG.DOM.HEADER.ACTIVE_CLASS);

    // bodyの位置を固定し、現在のスクロール位置を維持
    this.body.style.position = "fixed";
    this.body.style.top = `-${this.scrollPosition}px`;
    this.body.style.width = "100%";
  }

  closeMenu() {
    // aria属性の更新
    this.hamburgerButton.setAttribute("aria-expanded", false);
    this.spNav.setAttribute("aria-hidden", true);

    // クラスの削除
    this.hamburgerButton.classList.remove(APP_CONFIG.DOM.HEADER.ACTIVE_CLASS);
    this.spNav.classList.remove(APP_CONFIG.DOM.HEADER.ACTIVE_CLASS);
    this.body.classList.remove(APP_CONFIG.DOM.HEADER.ACTIVE_CLASS);

    // bodyのスタイルをリセット
    this.body.style.position = "";
    this.body.style.top = "";
    this.body.style.width = "";

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
    this.initialize();
  }

  initialize() {
    if (!this.isSP) return;

    this.tabButtons.forEach((button) => {
      button.addEventListener("click", () => this.handleTabClick(button));
    });
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
    document.getElementById(panelId).classList.add("tab-panel--active");
  }

  updateTabBackground() {
    const activeTab = document.querySelector(".tab-sp .tab-menu__item--active");
    const background = document.querySelector(".tab-sp .tab-menu__background");

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

      // SP用タブの初期化
      if (window.spTabManager) {
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
  }

  initAll() {
    this.initConceptPin();
    this.initConceptAnimation();
    this.initBackgroundAnimation();
    ScrollTrigger.refresh();
  }

  initConceptPin() {
    gsap.set(APP_CONFIG.DOM.SECTION.CONCEPT.WRAPPER, {
      zIndex: -1,
    });

    ScrollTrigger.create({
      trigger: APP_CONFIG.DOM.SECTION.CONCEPT.WRAPPER,
      start: `top ${APP_CONFIG.HEADER.HEIGHT}`,
      end: "max",
      pin: true,
      pinSpacing: false,
    });

    gsap.to(APP_CONFIG.DOM.SECTION.CONCEPT.CONTENT, {
      scrollTrigger: {
        trigger: APP_CONFIG.DOM.SECTION.CONCEPT.WRAPPER,
        start: `top ${APP_CONFIG.HEADER.HEIGHT}`,
        end: "+=100%",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(APP_CONFIG.DOM.SECTION.CONCEPT.CONTENT, {
            opacity: 1 - self.progress,
          });
        },
      },
    });
  }

  initConceptAnimation() {
    // メインのタイムラインを作成
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: APP_CONFIG.DOM.SECTION.CONCEPT.VISUAL,
        start: "top center",
        toggleActions: "play none none reverse",
      },
    });

    // コンセプトセクションのアニメーション
    mainTimeline
      // 1. phone
      .fromTo(
        ".concept__image--phone",
        {
          scale: 0.5,
          opacity: 0,
          z: -300,
          visibility: "visible",
        },
        {
          scale: 1,
          opacity: 1,
          z: 0,
          duration: 1.2,
          ease: "power2.out",
        }
      )
      .fromTo(
        ".concept__image--person",
        {
          scale: 0,
          opacity: 0,
          visibility: "visible",
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        }
      )
      .fromTo(
        ".concept__image--item-1",
        {
          scale: 0,
          opacity: 0,
          visibility: "visible",
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(2)",
        }
      )
      .fromTo(
        ".concept__image--item-2",
        {
          scale: 0,
          opacity: 0,
          visibility: "visible",
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(2)",
        },
        "-=0.2"
      )
      .fromTo(
        ".concept__image--item-3",
        {
          scale: 0,
          opacity: 0,
          visibility: "visible",
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(2)",
        },
        "-=0.2"
      )
      .fromTo(
        ".concept__image--item-4",
        {
          scale: 0,
          opacity: 0,
          visibility: "visible",
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(2)",
        },
        "-=0.2"
      )
      .fromTo(
        ".concept__image--item-5",
        {
          scale: 0,
          opacity: 0,
          visibility: "visible",
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(2)",
        },
        "-=0.2"
      )
      // shapeアニメーションの開始
      .call(() => {
        if (window.shapeAnimationManager) {
          window.shapeAnimationManager.initAnimation(mainTimeline);
        }
      });

    return mainTimeline;
  }

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
  ViewportManager.init();

  // ハンバーガーメニュー初期化
  new HamburgerMenuManager();

  // PC用タブ初期化
  window.tabManager = new TabManager();
  new ContentBoxManager();

  // SP用タブ初期化
  window.spTabManager = new SPTabManager();

  // レスポンシブ管理
  new ResponsiveManager();

  new AccordionManager();

  // アニメーション初期化
  const sectionAnimations = new SectionAnimationManager();
  sectionAnimations.initAll();

  // POINTアニメーション初期化
  const pointAnimation = new PointAnimationManager();
  pointAnimation.init();

  // ScrollTriggerの更新
  ScrollTrigger.refresh();
});

// リサイズイベント設定を修正
window.addEventListener("resize", () => {
  // PC用タブの更新
  if (window.innerWidth > 769) {
    if (window.tabManager) {
      window.tabManager.updateTabBackground();
    }

    const contentBoxManager = new ContentBoxManager();
    const activeBox = document.querySelector(APP_CONFIG.DOM.CONTENT.ACTIVE_BOX);
    if (activeBox) {
      contentBoxManager.updateContentBackground(activeBox);
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
  const sortButton = document.querySelector(".sort-selector__button");
  const sortLinks = document.querySelectorAll(".sort-selector__link");

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
      document
        .querySelector(".sort-selector__link--active")
        ?.classList.remove("sort-selector__link--active");
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
    sortSelector.classList.remove("sort-selector--open");
  });

  // タッチデバイス対応
  document.addEventListener(
    "touchstart",
    function (e) {
      if (!sortSelector.contains(e.target)) {
        sortSelector.classList.remove("sort-selector--open");
      }
    },
    { passive: true }
  );
});
