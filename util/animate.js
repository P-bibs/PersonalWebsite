const SINGLE_DURATION = 1000;
const INITIAL_DELAY = 600;
const ANIMATION_DURATION = 2000;

export const SCALE = 8;
const Y_OFFSET = 25;

const easeOutQuint = function (t, b, c, d) {
  t /= d;
  t--;
  return c * (t * t * t * t * t + 1) + b;
};

const startUnderlineAnimation = (index) => {
  document
    .querySelectorAll("#welcome-subtitle > a")
    [index].setAttribute("data-animation", "running");
};
const stopUnderlineAnimation = (index) => {
  document
    .querySelectorAll("#welcome-subtitle > a")
    [index].setAttribute("data-animation", "stopped");
};

function draw(startCoordinates, iconData, start) {
  // initialize canvas
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "destination-over";
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.strokeStyle = "rgba(0, 153, 255, 0.4)";
  ctx.save();

  let elapsedTime = new Date().getTime() - start;
  elapsedTime = elapsedTime % (ANIMATION_DURATION * 4);

  if (elapsedTime < 0 - ANIMATION_DURATION) {
    // Start by showing static patch of random dots
    drawCircles(startCoordinates, startCoordinates, 1);
  } else if (elapsedTime < 0) {
    // Then animate from static patch to first icon (lambda)
    const linearProgress = scaleLinear(
      -ANIMATION_DURATION,
      -SINGLE_DURATION,
      0,
      1,
      elapsedTime
    );
    drawCircles(
      startCoordinates,
      iconData["programmingLanguages"].coordinates,
      linearProgress
    );
    startUnderlineAnimation(0);
  } else if (elapsedTime < ANIMATION_DURATION) {
    // Animate from first icon to second icon
    const linearProgress = scaleLinear(0, SINGLE_DURATION, 0, 1, elapsedTime);
    drawCircles(
      iconData["programmingLanguages"].coordinates,
      iconData["music"].coordinates,
      linearProgress
    );
    stopUnderlineAnimation(0);
    startUnderlineAnimation(1);
  } else if (elapsedTime < ANIMATION_DURATION * 2) {
    // Animate from second icon to third icon
    const linearProgress = scaleLinear(
      ANIMATION_DURATION,
      ANIMATION_DURATION + SINGLE_DURATION,
      0,
      1,
      elapsedTime
    );
    drawCircles(
      iconData["music"].coordinates,
      iconData["hardware"].coordinates,
      linearProgress
    );
    stopUnderlineAnimation(1);
    startUnderlineAnimation(2);
  } else if (elapsedTime < ANIMATION_DURATION * 3) {
    // Animate from third icon to fourth icon
    const linearProgress = scaleLinear(
      ANIMATION_DURATION * 2,
      ANIMATION_DURATION * 2 + SINGLE_DURATION,
      0,
      1,
      elapsedTime
    );
    drawCircles(
      iconData["hardware"].coordinates,
      iconData["web"].coordinates,
      linearProgress
    );
    stopUnderlineAnimation(2);
    startUnderlineAnimation(3);
  } else if (elapsedTime < ANIMATION_DURATION * 4) {
    // Animate from fourth icon to first icon
    const linearProgress = scaleLinear(
      ANIMATION_DURATION * 3,
      ANIMATION_DURATION * 3 + SINGLE_DURATION,
      0,
      1,
      elapsedTime
    );
    drawCircles(
      iconData["web"].coordinates,
      iconData["programmingLanguages"].coordinates,
      linearProgress
    );
    stopUnderlineAnimation(3);
    startUnderlineAnimation(0);
  }

  // set up call to next frame
  window.requestAnimationFrame(() => draw(startCoordinates, iconData, start));
}

function drawCircles(startData, endData, linearProgress) {
  // Cap linear progress to 1
  linearProgress = Math.min(1, linearProgress);

  const ctx = document.getElementById("canvas").getContext("2d");

  // draw dots
  for (let i = 0; i < endData.length; i++) {
    let [startCoordX, startCoordY] =
      startData[i] || startData[startData.length - 1];
    const [endCoordX, endCoordY] = endData[i];

    const calculatedX = easeOutQuint(
      linearProgress,
      startCoordX,
      endCoordX - startCoordX,
      1
    );
    const calculatedY =
      easeOutQuint(linearProgress, startCoordY, endCoordY - startCoordY, 1) +
      Y_OFFSET;
    const circle = new Path2D();

    circle.arc(
      calculatedX * SCALE,
      calculatedY * SCALE,
      1 * SCALE,
      0,
      Math.PI * 2
    );
    ctx.fill(circle);
  }
}

export function initializeAnimation(startCoordinates, iconData) {
  window.requestAnimationFrame(() =>
    draw(
      startCoordinates,
      iconData,
      new Date().getTime() + INITIAL_DELAY + ANIMATION_DURATION
    )
  );
}

/**
 * Linearly scales a value from an input range to an output range
 */
function scaleLinear(inputFloor, inputCeil, outputFloor, outputCeil, value) {
  const slope = (outputCeil - outputFloor) / (inputCeil - inputFloor);
  const output = slope * (value - inputFloor) + outputFloor;
  return output;
}
