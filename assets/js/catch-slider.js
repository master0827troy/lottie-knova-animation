// シェイプ画像の生成関数
function createShapeSlides() {
  const slides = [];
  for (let i = 1; i <= 30; i++) {
    const randomNum = Math.floor(Math.random() * 30) + 1;
    slides.push(`/assets/img/shapes/shape${randomNum}.svg`);
  }
  return slides;
}

// スライドの HTML 生成
function createSlideHTML(shape) {
  return `<div class="swiper-slide">
      <img src="${shape}" class="shape-image" alt="shape">
  </div>`;
}

function getPairElements(currentSlide, isTopRow, isFirstRow) {
  // 上下で接している要素を取得するため、位置を計算
  const currentRect = currentSlide.getBoundingClientRect();
  const container = currentSlide.closest(
    isTopRow
      ? ".mainvisual__catch-shapes--top"
      : ".mainvisual__catch-shapes--bottom"
  );
  const pairRow = container.querySelector(
    isFirstRow
      ? ".mainvisual__catch-shapes-row--2"
      : ".mainvisual__catch-shapes-row--1"
  );

  // 接している要素を探す
  const pairSlides = pairRow.querySelectorAll(".swiper-slide");
  let pairSlide = null;

  pairSlides.forEach((slide) => {
    const rect = slide.getBoundingClientRect();
    // X座標が重なっているスライドを探す
    if (Math.abs(rect.left - currentRect.left) < 10) {
      // 若干の誤差を許容
      pairSlide = slide;
    }
  });

  return pairSlide;
}

// Swiper の初期化
function initializeSwiper(
  element,
  className,
  startPosition = 0,
  isTopRow = true,
  isFirstRow = true
) {
  if (!element) return null;

  const swiperWrapper = element.querySelector(".swiper-wrapper");
  if (!swiperWrapper) return null;

  // 共有状態の管理
  if (!window.sliderState) {
    window.sliderState = {
      isAnimating: false,
      isSwapped: false,
      swapCount: 0,
    };
  }

  // 最初の1回だけスライドを生成し、それを共有
  if (!window.sharedSlides) {
    window.sharedSlides = createShapeSlides();
  }

  // スライドを追加
  window.sharedSlides.forEach((shape) => {
    swiperWrapper.innerHTML += createSlideHTML(shape);
  });

  // ペアとなるスライダーの要素を取得
  function getPairSlides(currentSlides) {
    const container = element.closest(
      isTopRow
        ? ".mainvisual__catch-shapes--top"
        : ".mainvisual__catch-shapes--bottom"
    );
    const pairRow = container.querySelector(
      isFirstRow
        ? ".mainvisual__catch-shapes-row--2"
        : ".mainvisual__catch-shapes-row--1"
    );
    const pairWrapper = pairRow.querySelector(".swiper-wrapper");
    return pairWrapper ? pairWrapper.querySelectorAll(".swiper-slide") : [];
  }

  const swiper = new Swiper(`.${className}`, {
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 500,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    spaceBetween: 0,
    centeredSlides: false,
    allowTouchMove: false,
    initialSlide: startPosition,
    on: {
      slideChangeTransitionEnd: function () {
        if (window.sliderState.isAnimating) return;

        const random = Math.random();
        if (random < 0.2) {
          const slides = this.slides;
          const visibleSlides = [];

          slides.forEach((slide, index) => {
            if (slide.offsetParent !== null) {
              visibleSlides.push({ slide, index });
            }
          });

          const pairSlides = getPairSlides(visibleSlides);

          if (!window.sliderState.isSwapped) {
            window.sliderState.isAnimating = true;
            visibleSlides.forEach((item, i) => {
              if (i % 2 === 0 && pairSlides[i]) {
                const currentSlide = item.slide;
                const pairSlide = pairSlides[i];

                if (isTopRow) {
                  if (isFirstRow) {
                    currentSlide.classList.add("slide-up-fixed");
                    pairSlide.classList.add("slide-down-fixed");
                  } else {
                    currentSlide.classList.add("slide-down-fixed");
                    pairSlide.classList.add("slide-up-fixed");
                  }
                } else {
                  if (isFirstRow) {
                    currentSlide.classList.add("slide-down-fixed");
                    pairSlide.classList.add("slide-up-fixed");
                  } else {
                    currentSlide.classList.add("slide-up-fixed");
                    pairSlide.classList.add("slide-down-fixed");
                  }
                }
              }
            });

            window.sliderState.isSwapped = true;
            window.sliderState.swapCount = 0;
            setTimeout(() => {
              window.sliderState.isAnimating = false;
            }, 600);
          } else {
            window.sliderState.swapCount++;
            if (window.sliderState.swapCount >= 1) {
              window.sliderState.isAnimating = true;
              visibleSlides.forEach((item, i) => {
                if (i % 2 === 0 && pairSlides[i]) {
                  const currentSlide = item.slide;
                  const pairSlide = pairSlides[i];

                  if (isTopRow) {
                    if (isFirstRow) {
                      currentSlide.classList.remove("slide-up-fixed");
                      pairSlide.classList.remove("slide-down-fixed");
                      currentSlide.classList.add("slide-reset-from-up");
                      pairSlide.classList.add("slide-reset-from-down");
                    } else {
                      currentSlide.classList.remove("slide-down-fixed");
                      pairSlide.classList.remove("slide-up-fixed");
                      currentSlide.classList.add("slide-reset-from-down");
                      pairSlide.classList.add("slide-reset-from-up");
                    }
                  } else {
                    if (isFirstRow) {
                      currentSlide.classList.remove("slide-down-fixed");
                      pairSlide.classList.remove("slide-up-fixed");
                      currentSlide.classList.add("slide-reset-from-down");
                      pairSlide.classList.add("slide-reset-from-up");
                    } else {
                      currentSlide.classList.remove("slide-up-fixed");
                      pairSlide.classList.remove("slide-down-fixed");
                      currentSlide.classList.add("slide-reset-from-up");
                      pairSlide.classList.add("slide-reset-from-down");
                    }
                  }

                  setTimeout(() => {
                    currentSlide.classList.remove(
                      "slide-reset-from-up",
                      "slide-reset-from-down"
                    );
                    pairSlide.classList.remove(
                      "slide-reset-from-up",
                      "slide-reset-from-down"
                    );
                  }, 600);
                }
              });

              window.sliderState.isSwapped = false;
              window.sliderState.swapCount = 0;
              setTimeout(() => {
                window.sliderState.isAnimating = false;
              }, 600);
            }
          }
        }
        this.update();
      },
    },
  });

  return swiper;
}

// DOM読み込み完了後に初期化
document.addEventListener("DOMContentLoaded", function () {
  const topContainer = document.querySelector(".mainvisual__catch-shapes--top");
  const bottomContainer = document.querySelector(
    ".mainvisual__catch-shapes--bottom"
  );

  if (topContainer && bottomContainer) {
    const swiperTop1 = initializeSwiper(
      topContainer.querySelector(".mainvisual__catch-shapes-row--1"),
      "swiper-top-1",
      0,
      true,
      true
    );
    const swiperTop2 = initializeSwiper(
      topContainer.querySelector(".mainvisual__catch-shapes-row--2"),
      "swiper-top-2",
      Math.floor(window.sharedSlides.length / 4),
      true,
      false
    );
    const swiperBottom1 = initializeSwiper(
      bottomContainer.querySelector(".mainvisual__catch-shapes-row--1"),
      "swiper-bottom-1",
      Math.floor(window.sharedSlides.length / 2),
      false,
      true
    );
    const swiperBottom2 = initializeSwiper(
      bottomContainer.querySelector(".mainvisual__catch-shapes-row--2"),
      "swiper-bottom-2",
      Math.floor((window.sharedSlides.length * 3) / 4),
      false,
      false
    );
  }
});
