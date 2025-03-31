// アニメーション状態を定義
const ANIMATION_STATES = {
  HORIZONTAL_SLIDE: 'horizontal_slide',
  VERTICAL_SLIDE: 'vertical_slide',
  VERTICAL_SLIDE_WITH_SWAP: 'vertical_slide_with_swap'
};

// 新しい状態管理オブジェクト
const state = {
  currentStep: 0,  // 現在のステップ（0-2）
  verticalOffset: 0,  // 垂直方向のオフセット
};

const initGridAnimation = () => {
  const useSection = document.querySelector("section.use");
  if (!useSection) return;

  const backgroundContainer = document.createElement("div");
  backgroundContainer.className = "konva-background";
  useSection.insertBefore(backgroundContainer, useSection.firstChild);

  const width = useSection.offsetWidth;
  const height = useSection.offsetHeight;

  const stage = new Konva.Stage({
    container: backgroundContainer,
    width: width,
    height: height,
  });

  const layer = new Konva.Layer({
    listening: false,
    hitGraphEnabled: false,
  });
  stage.add(layer);

  // 定数
  const GRID_SIZE = 70;
  const ANIMATION_DURATION = 0.5;
  const PAUSE_DURATION = 1;
  const TOTAL_DURATION = ANIMATION_DURATION + PAUSE_DURATION;
  const FRAME_LIMIT = 1000 / 30;

  // グリッドサイズの計算
  const cols = Math.ceil(width / GRID_SIZE) + 1;
  const rows = Math.ceil(height / GRID_SIZE);

  let animations = [];
  let rowGroups = [];
  let allShapeStates = [];

  // アニメーション状態の管理
  const state = {
    currentStep: 0,  // 0: 水平スライド, 1: 垂直スライド, 2: 垂直スライド + スワップ
    verticalOffsets: [], // 各行の垂直オフセットを保持
  };

  const processAnimation = (shapeStates, rowGroup, rowIndex, startTime, currentTime) => {
    const isEven = rowIndex % 2 === 0;
    const direction = isEven ? -1 : 1;
    const moveElapsed = (currentTime - startTime) / 1000;
  
    if (moveElapsed < ANIMATION_DURATION) {
      const progress = moveElapsed / ANIMATION_DURATION;
  
      switch (state.currentStep) {
        case 0: // 水平スライド
          rowGroup.x(direction * GRID_SIZE * progress);
          return false;
  
          case 1: // 上下移動してから左右移動
          shapeStates.forEach((state) => {
            const isColumnEven = state.position % 2 === 0;
            // progressを2段階に分ける（0-0.5で上下移動、0.5-1で左右移動）
            if (progress < 0.5) {
              // 最初の0.5秒で上下移動
              const verticalProgress = progress * 2; // 0-0.5を0-1にスケール
              if (isColumnEven) {
                // 偶数列は上に移動
                state.shape.y(state.y + (-GRID_SIZE * verticalProgress));
              } else {
                // 奇数列は下に移動
                state.shape.y(state.y + (GRID_SIZE * verticalProgress));
              }
            } else {
              // 次の0.5秒で左右移動
              const horizontalProgress = (progress - 0.5) * 2; // 0.5-1を0-1にスケール
              if (isColumnEven) {
                // 偶数列は上に移動した状態で右に移動
                state.shape.y(state.y + (-GRID_SIZE));
                state.shape.x(state.x + (GRID_SIZE * horizontalProgress));
              } else {
                // 奇数列は下に移動した状態で左に移動
                state.shape.y(state.y + GRID_SIZE);
                state.shape.x(state.x + (-GRID_SIZE * horizontalProgress));
              }
            }
          });
          return false;
        
        case 2: // 垂直スライド（列ごとに上下）
          shapeStates.forEach((state) => {
            const isColumnEven = state.position % 2 === 0;
            const verticalMove = isColumnEven ? -GRID_SIZE : GRID_SIZE;
            state.shape.y(state.y + verticalMove * progress);
          });
          return false;
      }
    } else {
      // アニメーション完了時の処理
      switch (state.currentStep) {
        case 0: // 水平スライド完了
          rowGroup.x(0);
          shapeStates.forEach(state => {
            let newPosition;
            if (direction === -1) {
              newPosition = state.position === 0 ? cols - 1 : state.position - 1;
            } else {
              newPosition = state.position === cols - 1 ? 0 : state.position + 1;
            }
            state.position = newPosition;
            state.x = newPosition * GRID_SIZE;
            state.shape.x(state.x);
          });
          break;
  
          case 1: // 上下+左右移動完了
          shapeStates.forEach(state => {
            const isColumnEven = state.position % 2 === 0;
            if (isColumnEven) {
              // 偶数列の最終位置更新
              state.y += -GRID_SIZE;  // 上に1マス
              state.x += GRID_SIZE;   // 右に1マス
              state.position += 1;    // 位置を1つ右に
            } else {
              // 奇数列の最終位置更新
              state.y += GRID_SIZE;   // 下に1マス
              state.x += -GRID_SIZE;  // 左に1マス
              state.position -= 1;    // 位置を1つ左に
            }
            // 新しい位置を適用
            state.shape.y(state.y);
            state.shape.x(state.x);
          });
          break;
        
        case 2: // 垂直スライド完了
          shapeStates.forEach(state => {
            const isColumnEven = state.position % 2 === 0;
            const verticalMove = isColumnEven ? -GRID_SIZE : GRID_SIZE;
            state.y += verticalMove;
            state.shape.y(state.y);
          });
          break;
      }
  
      if (rowIndex === rows - 1) {
        state.currentStep = (state.currentStep + 1) % 3;
      }
      return true;
    }
};

  const loadImages = async () => {
    try {
      const imagePromises = Array.from({ length: 30 }, (_, i) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load shape${i + 1}.svg`));
          img.src = `/assets/img/shapes/shape${i + 1}.svg`;
        });
      });
      return await Promise.all(imagePromises);
    } catch (error) {
      console.error("Error loading images:", error);
      return [];
    }
  };

  const createGrid = (images) => {
    if (!images.length) return;

    animations.forEach(anim => anim.stop());
    animations = [];
    layer.destroyChildren();
    rowGroups = [];
    allShapeStates = [];
    state.verticalOffsets = [];

    // 各行の生成
    for (let row = 0; row < rows; row++) {
      const rowGroup = new Konva.Group({
        y: row * GRID_SIZE,
        x: 0
      });

      const shapeStates = Array(cols)
      .fill(null)
      .map((_, index) => ({
        shape: new Konva.Image({
          x: index * GRID_SIZE,
          width: GRID_SIZE,
          height: GRID_SIZE,
          image: images[Math.floor(Math.random() * images.length)],
          opacity: 0.15,
          listening: false,
        }),
        position: index,  // グリッド内での位置
        x: index * GRID_SIZE,  // 現在のX座標
        y: 0,  // 現在のY座標
      }));

      shapeStates.forEach(state => rowGroup.add(state.shape));
      layer.add(rowGroup);

      rowGroups.push(rowGroup);
      allShapeStates.push(shapeStates);

      let startTime = Date.now();
      let isMoving = false;
      let lastFrameTime = 0;

      const anim = new Konva.Animation(frame => {
        const currentTime = Date.now();
        if (currentTime - lastFrameTime < FRAME_LIMIT) return;
        lastFrameTime = currentTime;
      
        const elapsedTime = (currentTime - startTime) / 1000;
      
        if (elapsedTime >= TOTAL_DURATION) {
          startTime = currentTime;
          isMoving = true;
        }
      
        if (isMoving) {
          if (processAnimation(shapeStates, rowGroup, row, startTime, currentTime)) {
            isMoving = false;
            // rowIndex を使用
            if (row === rows - 1) {
              state.currentStep = (state.currentStep + 1) % 3;
              if (state.currentStep === 0) {
                state.verticalOffsets = state.verticalOffsets.map(() => 0);
                rowGroups.forEach((group, idx) => {
                  group.y(idx * GRID_SIZE);
                });
              }
            }
          }
        }
      }, layer);

      animations.push(anim);
      anim.start();
    }
  };

  // リサイズ対応
  let resizeTimeout;
  const handleResize = () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      stage.width(useSection.offsetWidth);
      stage.height(useSection.offsetHeight);
      loadImages().then(images => {
        if (images.length > 0) {
          createGrid(images);
        }
      });
    }, 250);
  };

  window.addEventListener("resize", handleResize, { passive: true });

  // 初期化
  loadImages().then(images => {
    if (images.length > 0) {
      createGrid(images);
    }
  });

  return () => {
    window.removeEventListener("resize", handleResize);
    animations.forEach(anim => anim.stop());
    stage.destroy();
  };
};

// CSSスタイル
const style = document.createElement("style");
style.textContent = `
  section.use {
    position: relative !important;
    overflow: hidden !important;
  }
  
  .konva-background {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  
  .konva-background .konvajs-content {
    position: absolute !important;
    top: 0;
    left: 0;
  }
`;
document.head.appendChild(style);

// 初期化と後始末
let cleanup = null;
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    cleanup = initGridAnimation();
  });
} else {
  cleanup = initGridAnimation();
}

window.addEventListener("unload", () => {
  if (cleanup) cleanup();
});