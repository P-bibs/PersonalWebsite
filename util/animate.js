const duration = 1000;

export const SCALE = 4;

const easeOutQuint = function (t, b, c, d) {
  t /= d;
  t--;
  return c * (t * t * t * t * t + 1) + b;
};

function draw(data, start) {
  const linearProgress = (new Date().getTime() - start) / duration;
  if (Math.random() > 0.9) {
    console.log(`Animation progress: ${linearProgress}`);
  }

  if (linearProgress > 1) {
    console.log("Animation finished");
    return;
  }
  // initialize canvas
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "destination-over";
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.strokeStyle = "rgba(0, 153, 255, 0.4)";
  ctx.save();

  // draw dots
  Object.keys(data).forEach((iconName, i) =>
    data[iconName].forEach((props, j) => {
      const calculatedX = easeOutQuint(
        linearProgress,
        props.translateX[0],
        props.translateX[1] - props.translateX[0],
        1
      );
      const calculatedY = easeOutQuint(
        linearProgress,
        props.translateY[0],
        props.translateY[1] - props.translateY[0],
        1
      );
      const circle = new Path2D();

      circle.arc(
        calculatedX * SCALE,
        calculatedY * SCALE,
        1 * SCALE,
        0,
        Math.PI * 2
      );
      ctx.fill(circle);
    })
  );

  // set up call to next frame
  window.requestAnimationFrame(() => draw(data, start));
}

export function init(data) {
  window.requestAnimationFrame(() => draw(data, new Date().getTime()));
}
