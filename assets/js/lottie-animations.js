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

const selectedFiles1 = getRandomLottieFiles(24);
const selectedFiles2 = getRandomLottieFiles(24);
const selectedFiles3 = getRandomLottieFiles(24);

// Render the animations in a grid
function renderLottieGrid() {
  const gridContainer = document.getElementById("mainvisual_shapes_top");

  selectedFiles1.forEach((url, index) => {
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

function renderLottieGridBottom1() {
  const gridContainer = document.getElementById("mainvisual_shapes_bottom1");

  selectedFiles2.forEach((url, index) => {
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

function renderLottieGridBottom2() {
  const gridContainer = document.getElementById("mainvisual_shapes_bottom2");
  gridContainer.innerHTML = ""; // Clear previous animations

  selectedFiles3.forEach((url, index) => {
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

function renderLottieGridDraw() {  
  const gridContainer = document.getElementById("mainvisual_shapes_top");
  const dotlottieItems = gridContainer.getElementsByTagName("dotlottie-player");
  for(let i = 0; i < dotlottieItems.length; i++) {
    i % Math.floor(Math.random() * 10) == 0
        ? (dotlottieItems[i].style.opacity = 100)
        : (dotlottieItems[i].style.opacity = 0);
    if(i > 21) {dotlottieItems[i].style.opacity = 0;}
    if ((i + 1) % 8 == 0) {dotlottieItems[i].style.opacity = 0;}
  };
}

function renderLottieGridBottomDraw1() {
  const gridContainer = document.getElementById("mainvisual_shapes_bottom1");
  const dotlottieItems = gridContainer.getElementsByTagName("dotlottie-player");
  console.log(dotlottieItems);
  
  for(let i = 0; i < dotlottieItems.length; i++) {
    i % Math.floor(Math.random() * 10) == 0
        ? (dotlottieItems[i].style.opacity = 100)
        : (dotlottieItems[i].style.opacity = 0);
  };
}

function renderLottieGridBottomDraw2() {
  const gridContainer = document.getElementById("mainvisual_shapes_bottom2");
  const dotlottieItems = gridContainer.getElementsByTagName("dotlottie-player");
  for(let i = 0; i < dotlottieItems.length; i++) {
    i % Math.floor(Math.random() * 10) == 0
        ? (dotlottieItems[i].style.opacity = 100)
        : (dotlottieItems[i].style.opacity = 0);
  };
}

renderLottieGrid();
renderLottieGridBottom1();
renderLottieGridBottom2();

setInterval(() => {
  renderLottieGridBottomDraw1();
  setTimeout(() => {
    renderLottieGridBottomDraw2();
    setTimeout(() => {
      renderLottieGridDraw();
    }, 2000);
  }, 2000);
}, 6000);

// ---------------------------

// Lottie Animation URLs

let lottieObjects = [];

// Create Grid of Animations
function getRandomLottie() {
  return lottieFiles[Math.floor(Math.random() * lottieFiles.length)];
}

function createLottieGrid(k) {
  let container = document.getElementById("mainvisual_shapes_center-top");
  if (k) {
    container = document.getElementById("mainvisual_shapes_center-bottom");
  }
  for (let i = 0; i < 20; i++) {
    const player = document.createElement("dotlottie-player");
    player.src = getRandomLottie();
    player.loop = true;
    player.autoplay = true;
    container.appendChild(player);
  }
}

createLottieGrid(0);
createLottieGrid(1);

const lottieContainer = document.getElementById("mainvisual_shapes_center-top");
const lottieClone = lottieContainer.cloneNode(true);
lottieClone.style.position = "absolute";
lottieClone.style.left = `${lottieContainer.offsetWidth}px`; // Place it right after the first set
document
  .getElementById("mainvisual_shapes_center-top")
  .appendChild(lottieClone);

let posX = 0;
let speed = 2;

function slideAnimation() {
  posX += speed;
  if (posX >= 300) {
    posX = 0;
  }
  lottieContainer.style.transform = `translateX(${posX}px)`;
}
setInterval(() => {
  slideAnimation();
}, 100);

slideAnimation();

const lottieContainerDown = document.getElementById(
  "mainvisual_shapes_center-bottom"
);
const lottieCloneDown = lottieContainerDown.cloneNode(true);
lottieCloneDown.style.position = "absolute";
lottieCloneDown.style.left = `${lottieContainerDown.offsetWidth}px`; // Place it right after the first set
document
  .getElementById("mainvisual_shapes_center-bottom")
  .appendChild(lottieCloneDown);
let posXDown = 0;
function slideAnimationDown() {
  posXDown -= speed;
  if (posXDown <= -300) {
    posXDown = 0;
  }
  lottieContainerDown.style.transform = `translateX(${posXDown}px)`;
}

setInterval(() => {
  slideAnimationDown();
}, 100);

slideAnimationDown();
