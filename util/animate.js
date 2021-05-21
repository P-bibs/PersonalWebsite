const SINGLE_DURATION = 1000;
const INITIAL_DELAY = 300;
const SUBSEQUENT_DELAY = 1000;

export const SCALE = 8;
const Y_OFFSET = 25;

const easeOutQuint = function (t, b, c, d) {
  t /= d;
  t--;
  return c * (t * t * t * t * t + 1) + b;
};

function draw(data, start) {
  // initialize canvas
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "destination-over";
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.strokeStyle = "rgba(0, 153, 255, 0.4)";
  ctx.save();

  const elapsedTime = new Date().getTime() - start;
  if (elapsedTime < INITIAL_DELAY) {
  } else if (elapsedTime < INITIAL_DELAY + SUBSEQUENT_DELAY) {
    const linearProgress = (elapsedTime - INITIAL_DELAY) / SINGLE_DURATION;
    drawCircles(data, "web", linearProgress);
    drawCircles(data, "hardware", 0);
    drawCircles(data, "music", 0);
  } else if (elapsedTime < INITIAL_DELAY + SUBSEQUENT_DELAY * 2) {
    const linearProgress =
      (elapsedTime - INITIAL_DELAY - SUBSEQUENT_DELAY) / SINGLE_DURATION;
    drawCircles(data, "web", 1);
    drawCircles(data, "hardware", linearProgress);
    drawCircles(data, "music", 0);
  } else if (elapsedTime < INITIAL_DELAY + SUBSEQUENT_DELAY * 3) {
    const linearProgress =
      (elapsedTime - INITIAL_DELAY - SUBSEQUENT_DELAY * 2) / SINGLE_DURATION;
    drawCircles(data, "web", 1);
    drawCircles(data, "hardware", 1);
    drawCircles(data, "music", linearProgress);
  } else {
    drawCircles(data, "web", 1);
    drawCircles(data, "hardware", 1);
    drawCircles(data, "music", 1);
    console.log("Animation finished");
    return;
  }

  // set up call to next frame
  window.requestAnimationFrame(() => draw(data, start));
}

function drawCircles(data, iconName, linearProgress) {
  const ctx = document.getElementById("canvas").getContext("2d");

  // draw dots
  data[iconName].forEach((props, j) => {
    const calculatedX = easeOutQuint(
      linearProgress,
      props.translateX[0],
      props.translateX[1] - props.translateX[0],
      1
    );
    const calculatedY =
      easeOutQuint(
        linearProgress,
        props.translateY[0],
        props.translateY[1] - props.translateY[0],
        1
      ) + Y_OFFSET;
    const circle = new Path2D();

    circle.arc(
      calculatedX * SCALE,
      calculatedY * SCALE,
      1 * SCALE,
      0,
      Math.PI * 2
    );
    ctx.fill(circle);
  });
}

export function init(data) {
  window.requestAnimationFrame(() => draw(data, new Date().getTime()));
}
