// Make sure DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Register the ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // 背景要素の取得
  const backgroundElement = document.querySelector(".liver-background");

  // First, remove any inline styles that might be making the text invisible
  document.querySelector(".liver__scroll-first").removeAttribute("style");

  // Initial setup - hide second content and make first content visible
  gsap.set(".second", { autoAlpha: 0 });
  gsap.set(".liver__scroll-first", {
    autoAlpha: 1,
    visibility: "visible",
    y: 0, // 中央配置はCSSで定義済み
    clearProps: "translate,rotate,scale",
  });

  // 初期背景設定 - mainvisualのfirstでは透明
  if (backgroundElement) {
    backgroundElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    backgroundElement.style.backdropFilter = "none";
  }

  // Set initial state for first items
  const firstItems = [
    ".liver-mainvisual__image--phone",
    ".liver-mainvisual__image--person.first",
    ".liver-mainvisual__image--item-1",
    ".liver-mainvisual__image--item-2",
    ".liver-mainvisual__image--item-3",
    ".liver-mainvisual__image--item-4",
    ".liver-mainvisual__image--item-5",
  ];

  gsap.set(firstItems, {
    autoAlpha: 0,
    scale: 0,
    visibility: "visible",
  });

  // Load animation timeline for items only (not text content)
  const loadTimeline = gsap.timeline();

  // Item animations only
  loadTimeline
    // 1. Phone animation
    .fromTo(
      ".liver-mainvisual__image--phone",
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
    // 2. Person animation
    .fromTo(
      ".liver-mainvisual__image--person.first",
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
    // 3. Item 1 animation
    .fromTo(
      ".liver-mainvisual__image--item-1",
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
    // 4. Item 2 animation
    .fromTo(
      ".liver-mainvisual__image--item-2",
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
    // 5. Item 3 animation
    .fromTo(
      ".liver-mainvisual__image--item-3",
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
    // 6. Item 4 animation
    .fromTo(
      ".liver-mainvisual__image--item-4",
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
    // 7. Item 5 animation
    .fromTo(
      ".liver-mainvisual__image--item-5",
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
    );

  // Force restore initial visibility
  const restoreFirstItems = () => {
    // Restore images
    gsap.to(
      [
        ".liver-mainvisual__image--person.first",
        ".liver-mainvisual__image--item-1",
        ".liver-mainvisual__image--item-2",
        ".liver-mainvisual__image--item-3",
        ".liver-mainvisual__image--item-4",
        ".liver-mainvisual__image--item-5",
      ],
      {
        autoAlpha: 1,
        scale: 1,
        visibility: "visible",
        clearProps: "all", // This clears all inline styles after the animation
        duration: 0.3,
        stagger: 0.05,
      }
    );

    // Restore first content section - use set instead of to for immediate effect
    gsap.set(".liver__scroll-first", {
      autoAlpha: 1,
      y: 0, // 中央位置をCSSで定義
      visibility: "visible",
      clearProps: "translate,rotate,scale",
      overwrite: "auto",
    });

    // Restore first background (transparent)
    if (backgroundElement) {
      backgroundElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
      backgroundElement.style.backdropFilter = "none";
    }
  };

  // Add additional safety: force show first section after everything is loaded
  window.addEventListener("load", () => {
    // Force remove any inline styles and make visible
    const firstScroll = document.querySelector(".liver__scroll-first");
    if (firstScroll) {
      firstScroll.removeAttribute("style");
      firstScroll.style.visibility = "visible";
      firstScroll.style.opacity = "1";
    }
  });

  // Add scroll event listener to restore items when at top
  window.addEventListener("scroll", () => {
    if (window.scrollY === 0) {
      restoreFirstItems();

      // Additional direct DOM manipulation for stubborn elements
      const firstScroll = document.querySelector(".liver__scroll-first");
      if (firstScroll) {
        firstScroll.style.visibility = "visible";
        firstScroll.style.opacity = "1";

        // CSSで定義した位置を保持するため、transformは変更しない
        // 必要なら下記のように個別にy位置だけ調整
        // firstScroll.style.transform = 'translateY(-50%)';
      }
    }
  });

  // Create the scrolling animation
  const scrollTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".liver-mainvisual",
      start: "top top",
      end: "+=100%", // The animation will complete after scrolling 100% of the section height
      pin: true, // Pin the section during the animation
      scrub: true, // Smooth scrubbing effect tied to scroll position
      markers: false, // Set to true for debugging
      onLeaveBack: () => {
        // When scrolling all the way back to the top, ensure first items are visible
        restoreFirstItems();
      },
      onUpdate: (self) => {
        // スクロール進行度に基づいて背景を変更
        if (backgroundElement) {
          if (self.progress >= 0.5) {
            // secondビューの背景
            backgroundElement.style.backgroundColor =
              "rgba(255, 255, 255, 0.5)";
            backgroundElement.style.backdropFilter = "blur(20px)";
          } else {
            // firstビューの背景（透明）
            backgroundElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
            backgroundElement.style.backdropFilter = "none";
          }
        }
      },
    },
  });

  // Timeline animation sequence for scrolling
  scrollTimeline
    // Fade out first content
    .to(".liver__scroll-first", {
      autoAlpha: 0,
      y: -30, // 中央からやや上に移動
      duration: 0.5,
    })

    // Fade out first items
    .to(
      [
        ".liver-mainvisual__image--person.first",
        ".liver-mainvisual__image--item-1",
        ".liver-mainvisual__image--item-2",
        ".liver-mainvisual__image--item-3",
        ".liver-mainvisual__image--item-4",
        ".liver-mainvisual__image--item-5",
      ],
      {
        autoAlpha: 0,
        scale: 0,
        visibility: "hidden",
        stagger: 0.05,
        duration: 0.3,
      },
      "<"
    )

    // Fade in second content
    .to(".liver__scroll-second", {
      autoAlpha: 1,
      y: 0, // 中央配置を維持
      duration: 0.5,
    })

    // Fade in second items
    .to(
      [
        ".concept-person.second",
        ".liver-concept__item-6.second",
        ".liver-concept__item-7.second",
        ".liver-concept__item-8.second",
        ".liver-concept__item-9.second",
      ],
      {
        autoAlpha: 1,
        scale: 1,
        stagger: 0.05,
        duration: 0.3,
      },
      "<"
    );

  // Additional setup for second content
  gsap.set(".liver__scroll-second", {
    autoAlpha: 0,
    y: 30, // 中央からやや下にセット（初期位置）
  });

  // Set initial state for second items
  const secondItems = [
    ".concept-person.second",
    ".liver-concept__item-6.second",
    ".liver-concept__item-7.second",
    ".liver-concept__item-8.second",
    ".liver-concept__item-9.second",
  ];

  gsap.set(secondItems, {
    autoAlpha: 0,
    scale: 0,
  });

  // セクションごとの背景設定
  const sectionBackgrounds = {
    point: {
      backgroundColor: "rgba(243, 255, 246, 1)",
      backdropFilter: "none",
    },
    passion: {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      backdropFilter: "blur(20px)",
    },
    use: {
      backgroundColor: "rgba(236, 255, 252, 0.7)",
      backdropFilter: "blur(20px)",
    },
    faq: {
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(20px)",
    },
    news: {
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(30px)",
    },
  };

  // 各セクションにScrollTriggerを設定
  Object.keys(sectionBackgrounds).forEach((sectionId) => {
    const section = document.querySelector(`.liver-${sectionId}`);
    if (!section) return;

    const bgSettings = sectionBackgrounds[sectionId];

    // ScrollTriggerの作成
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        if (backgroundElement) {
          backgroundElement.style.backgroundColor = bgSettings.backgroundColor;
          backgroundElement.style.backdropFilter = bgSettings.backdropFilter;
        }
      },
      onEnterBack: () => {
        if (backgroundElement) {
          backgroundElement.style.backgroundColor = bgSettings.backgroundColor;
          backgroundElement.style.backdropFilter = bgSettings.backdropFilter;
        }
      },
    });
  });

  // Make sure ScrollTrigger properly handles reverse animation
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
  });
});
