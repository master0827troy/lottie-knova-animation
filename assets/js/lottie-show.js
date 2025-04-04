/**
 * Lottieアニメーションローダー
 * 指定されたコンテナにLottieアニメーションを読み込むスクリプト
 */
document.addEventListener("DOMContentLoaded", function () {
  initLottieAnimations();
});

/**
 * Lottieアニメーションを初期化する
 * data-lottie-ids属性を持つコンテナ内にlottieプレイヤーを挿入
 */
function initLottieAnimations() {
  // data-lottie-ids属性を持つ全てのコンテナを取得
  const lottieContainers = document.querySelectorAll("[data-lottie-ids]");

  // 各コンテナに対して処理
  lottieContainers.forEach((container) => {
    // data-lottie-ids属性からIDリストを取得
    const lottieIds = container.getAttribute("data-lottie-ids").split(",");

    // 各IDに対してlottieプレイヤーを作成
    lottieIds.forEach((id) => {
      const numId = parseInt(id.trim());
      // IDが1〜22の範囲内かチェック
      if (numId >= 1 && numId <= 22) {
        createLottiePlayer(container, numId);
      }
    });
  });
}

/**
 * lottieプレイヤーを作成してコンテナに追加
 * @param {HTMLElement} container - プレイヤーを追加するコンテナ要素
 * @param {number} id - lottieファイルのID (1-22)
 * @param {Object} options - オプション設定（オプショナル）
 */
function createLottiePlayer(container, id, options = {}) {
  // デフォルト設定
  const defaults = {
    autoplay: true,
    loop: true,
    baseDir: "assets/img/shapes/lottie/",
  };

  // デフォルト設定とユーザー指定のオプションをマージ
  const settings = { ...defaults, ...options };

  // IDを2桁の文字列に変換（01〜22形式）
  const paddedId = id.toString().padStart(2, "0");

  // lottieファイルのパスを作成
  const lottiePath = `${settings.baseDir}shape-${paddedId}.lottie`;

  // dotlottie-playerエレメントを作成
  const player = document.createElement("dotlottie-player");
  player.setAttribute("src", lottiePath);

  // オプション設定を適用
  if (settings.autoplay) player.setAttribute("autoplay", "");
  if (settings.loop) player.setAttribute("loop", "");

  // オプションのカスタム属性があれば追加
  if (settings.customAttributes) {
    Object.entries(settings.customAttributes).forEach(([key, value]) => {
      player.setAttribute(key, value);
    });
  }

  // コンテナに追加
  container.appendChild(player);

  return player;
}
