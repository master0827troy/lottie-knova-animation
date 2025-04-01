let lottieFiles = [];

const itemSize = innerWidth / 22;

for (let i = 1; i < 23; i++) {
  i < 10
    ? lottieFiles.push("../assets/img/shapes/lottie/shape-0" + i + ".lottie")
    : lottieFiles.push("../assets/img/shapes/lottie/shape-" + i + ".lottie");
}

// Select 10 random animations
function getRandomLottieFiles(num) {
  let shuffled = [];
  for (let i = 1; i < 33; i++) {
    const urlID = Math.floor(Math.random() * lottieFiles.length);
    shuffled.push(lottieFiles[urlID]);
  }

  return shuffled.slice(0, num);
}

// Render the animations in a grid
function renderLottieGrid() {
  const gridContainer = document.getElementById("mainvisual_shapes_top");
  gridContainer.innerHTML = ""; // Clear previous animations
  const selectedFiles = getRandomLottieFiles(24);

  selectedFiles.forEach((url, index) => {
    if (itemSize > 64) {
      if (index > 21) {
        const player = document.createElement("dotlottie-player");
        player.src = url;
        player.loop = true;
        player.autoplay = true;
        player.speed = 1;
        player.background = "transparent";
        player.style.opacity = 0;
        gridContainer.appendChild(player);
      }
    }
    if ((index + 1) % 8 == 0) {
      const player = document.createElement("dotlottie-player");
      player.src = url;
      player.loop = true;
      player.autoplay = true;
      player.speed = 1;
      player.background = "transparent";
      player.style.opacity = 0;
      gridContainer.appendChild(player);
    } else {
      const player = document.createElement("dotlottie-player");
      player.src = url;
      player.loop = true;
      player.autoplay = true;
      player.speed = 1;
      index % Math.floor(Math.random() * 10) == 0
        ? (player.style.opacity = 100)
        : (player.style.opacity = 0);
      player.background = "transparent";
      gridContainer.appendChild(player);
    }
  });
}

renderLottieGrid();

function renderLottieGridBottom1() {
  const gridContainer = document.getElementById("mainvisual_shapes_bottom1");
  gridContainer.innerHTML = ""; // Clear previous animations
  const selectedFiles = getRandomLottieFiles(24);

  selectedFiles.forEach((url, index) => {
    const player = document.createElement("dotlottie-player");
    player.src = url;
    player.loop = true;
    player.autoplay = true;
    player.speed = 1;
    index % Math.floor(Math.random() * 10) == 0
      ? (player.style.opacity = 100)
      : (player.style.opacity = 0);
    player.background = "transparent";
    gridContainer.appendChild(player);
  });
}

renderLottieGridBottom1();

function renderLottieGridBottom2() {
  const gridContainer = document.getElementById("mainvisual_shapes_bottom2");
  gridContainer.innerHTML = ""; // Clear previous animations
  const selectedFiles = getRandomLottieFiles(24);

  selectedFiles.forEach((url, index) => {
    const player = document.createElement("dotlottie-player");
    player.src = url;
    player.loop = true;
    player.autoplay = true;
    player.speed = 1;
    index % Math.floor(Math.random() * 10) == 0
      ? (player.style.opacity = 100)
      : (player.style.opacity = 0);
    player.background = "transparent";
    gridContainer.appendChild(player);
  });
}

renderLottieGridBottom2();

function getRandomLottieFilesCenter(num) {
  let shuffled = [];
  for (let i = 1; i < 46; i++) {
    const urlID = Math.floor(Math.random() * lottieFiles.length);
    shuffled.push(lottieFiles[urlID]);
  }

  return shuffled.slice(0, num);
}

function renderLottieGridCenter() {
  const gridContainer = document.getElementById("mainvisual_shapes_center");
  gridContainer.innerHTML = ""; // Clear previous animations
  const selectedFiles = getRandomLottieFilesCenter(45);

  selectedFiles.forEach((url, index) => {
    const player = document.createElement("dotlottie-player");
    player.src = url;
    player.loop = true;
    player.autoplay = true;
    player.speed = 1;
    (index > 14 && index < 30)
      ? (player.style.opacity = 0)
      : (player.style.opacity = 100);
    player.background = "transparent";
    gridContainer.appendChild(player);
  });
}

renderLottieGridCenter();

// ---------------------------

stage.find('Layer').forEach(layer => layer.destroy());

const layer = new Konva.Layer();
stage.add(layer);