// Get the height and width of the background element
const screenHeight = document.getElementById("use-background").offsetHeight;
const screenWidth = document.getElementById("use-background").offsetWidth;

let svgSize = 150; // Default size of the SVG elements
const stopTime = 500; // Time to stop between animations
const durationTme = 1; // Duration of each animation
const svgUrl = []; // Array to store SVG URLs
let svgChange = 0; // Variable to store SVG change size
let count = 0; // Counter for loaded SVGs
let n = 0; // Counter for animation sequence
let svgArray = []; // Array to store Konva image objects

// Adjust SVG size for smaller screens
if (screenWidth < 768) {
  svgSize = 70;
}

// Determine if SVG change is needed based on screen width and SVG size
if (
  (!(screenWidth % svgSize) && !(parseInt(screenWidth / svgSize) % 2)) ||
  (screenWidth % svgSize && parseInt(screenWidth / svgSize) % 2)
) {
  svgChange = svgSize;
}

// Populate the svgUrl array with SVG file paths
for (let i = 1; i <= 30; i++) {
  svgUrl.push(`assets/img/shapes/shape${i}.svg`);
}

// Calculate the number of columns and rows needed to fill the screen
const cols = Math.floor(screenWidth / svgSize + 3);
const rows = Math.floor(screenHeight / svgSize + 3);

// Create a new Konva stage and layer
const stage = new Konva.Stage({
  container: "backgroundGrid",
  width: screenWidth,
  height: screenHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

// Function to load an image and add it to the Konva layer
function loadImage(url, x, y) {
  const imageObj = new Image();
  imageObj.src = url;
  imageObj.onload = () => {
    const konvaImage = new Konva.Image({
      image: imageObj,
      x: (x - 1) * svgSize,
      y: (y - 1) * svgSize,
      width: svgSize,
      height: svgSize,
    });
    layer.add(konvaImage);
    svgArray.push(konvaImage);

    count++;
    // Start animation when all images are loaded
    if (count === cols * rows) {
      startAnimation();
    }
  };
}

// Load images for all columns and rows
for (let j = 0; j < rows; j++) {
  for (let i = 0; i < cols; i++) {
    let random = Math.floor(Math.random() * svgUrl.length);
    loadImage(svgUrl[random], i, j);
  }
}

layer.draw(); // Draw the layer

// Function to start the animation sequence
function startAnimation() {
  n++;
  if (n == 1) {
    animationHorizontal(svgArray);
  } else if (n == 2) {
    animationVertical(svgArray);
  } else if (n == 3) {
    animationCircle(svgArray);
    n = 0;
  }
}

// Function to animate SVGs horizontally
function animationHorizontal(array) {
  array.forEach((arr, index) => {
    let direction =
      (arr.y() / svgSize) % 2 === 0 ? "+=" + svgSize : "-=" + svgSize;
    gsap.to(arr, {
      x: direction, // Move right by svgSize
      duration: durationTme, // Move in 1 second
      ease: "power1.inOut",
      onComplete: () => {
        if (index == array.length - 1) {
          for (let i = 0; i < svgArray.length; i++) {
            if (svgArray[i].x() < -svgSize) {
              svgArray[i].x((cols - 2) * svgSize);
            }
            if (svgArray[i].x() > (cols - 2) * svgSize) {
              svgArray[i].x(-svgSize);
            }
          }
          setTimeout(startAnimation, stopTime); // Stop for 0.5s, then repeat
        }
      },
    });
  });
}

// Function to animate SVGs vertically
function animationVertical(array) {
  array.forEach((arr, index) => {
    let direction =
      (arr.x() / svgSize) % 2 === 0 ? "+=" + svgSize : "-=" + svgSize;
    gsap.to(arr, {
      y: direction, // Move right by svgSize
      duration: durationTme, // Move in 1 second
      ease: "power1.inOut",
      onComplete: () => {
        if (index == array.length - 1) {
          for (let i = 0; i < svgArray.length; i++) {
            if (svgArray[i].y() < -svgSize) {
              svgArray[i].y((rows - 2) * svgSize);
            }
            if (svgArray[i].y() > (rows - 2) * svgSize) {
              svgArray[i].y(-svgSize);
            }
          }
          setTimeout(startAnimation, stopTime); // Stop for 0.5s, then repeat
        }
      },
    });
  });
}

// Function to animate SVGs in a circular pattern
function animationCircle(array) {
  array.forEach((arr, index) => {
    if (arr.x() < screenWidth + svgChange) {
      let xDirection = (arr.x() / svgSize) % 2 ? svgSize : svgSize * -1;
      let yDirection = (arr.x() / svgSize) % 2 ? svgSize * -1 : svgSize;
      _animateObject(
        arr,
        arr.x() + xDirection,
        arr.y() + yDirection,
        index,
        array
      );
    } else {
      if (index == array.length - 1) {
        _animateObject(arr, arr.x(), arr.y(), index, array);
      } else {
        index++;
      }
    }
  });
}

// Function to animate an object along a path
function _animateObject(target, goalX, goalY, index, array) {
  const angle = 180;
  let clockwise = true;
  if (goalX > target.x()) {
    clockwise = false;
  }

  const startX = target.x() || 0;
  const startY = target.y() || 0;

  // Calculate the center point and radius
  const centerX = (startX + goalX) / 2;
  const centerY = (startY + goalY) / 2;
  const radius =
    Math.sqrt(Math.pow(goalX - startX, 2) + Math.pow(goalY - startY, 2)) / 2;

  // Convert angle to radians
  const angleRad = (Math.PI / 180) * angle;

  // Calculate the midpoint
  const offsetX = Math.cos(angleRad / 2) * radius * (clockwise ? 1 : -1);
  const offsetY = Math.sin(angleRad / 2) * radius;
  const midX = centerX + offsetX;
  const midY = centerY - offsetY;

  // Define the path
  const path = [
    { x: startX, y: startY },
    { x: midX, y: midY },
    { x: goalX, y: goalY },
  ];

  // Execute the animation
  const oObj = { x: startX, y: startY, rotation: 0 };
  gsap.to(oObj, {
    duration: durationTme,
    motionPath: {
      path: path,
      align: "self",
      alignOrigin: [0.5, 0.5],
    },
    rotation: 360, // Rotate 360 degrees
    ease: "power2.inOut",
    onUpdate: function () {
      target.x(oObj.x);
      target.y(oObj.y);
      target.rotation(oObj.rotation); // Update the rotation
    },
    onComplete: () => {
      if (index == array.length - 1) {
        for (let i = 0; i < svgArray.length; i++) {
          if (svgArray[i].y() < -svgSize) {
            svgArray[i].y((rows - 2) * svgSize);
          }
          if (svgArray[i].y() > (rows - 2) * svgSize) {
            svgArray[i].y(-svgSize);
          }
        }
        setTimeout(startAnimation, stopTime); // Stop for 0.5s, then repeat
      }
    },
  });
}
