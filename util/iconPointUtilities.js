// Icon arrangement parameters
const iconAngularDifference = (2 * Math.PI) / 3;

// animation parameters
const iconAnimInitialDelay = 300;
const iconAnimSubsequentDelay = 500;
const iconAnimDuration = 1000;

function preprocessIconData(rawIconDatas) {
  const iconDatas = {};

  // Remove half of coordinates and scale down
  for (const key in rawIconDatas) {
    // const iconData = iconDatas[key];
    iconDatas[key] = {};
    iconDatas[key].coordinates = rawIconDatas[key].coordinates.filter(
      (v, i) => i % rawIconDatas[key].sparsify_factor === 0
    );
    iconDatas[key].coordinates = iconDatas[key].coordinates.map((x) => [
      x[0] * rawIconDatas[key].scale_factor,
      x[1] * rawIconDatas[key].scale_factor,
    ]);
  }

  // Normalize Coordinates to be centered at 0
  for (const iconName in iconDatas) {
    const iconData = iconDatas[iconName];

    const xCoords = iconData.coordinates.map((x) => x[0]);
    const yCoords = iconData.coordinates.map((x) => x[1]);
    const xRange = [Math.min(...xCoords), Math.max(...xCoords)];
    const yRange = [Math.min(...yCoords), Math.max(...yCoords)];
    const width = xRange[1] - xRange[0];
    const height = yRange[1] - yRange[0];

    // Ensure minimum value on both axis is 0
    iconData.coordinates = iconData.coordinates.map((coordinate) => {
      return [coordinate[0] - xRange[0], coordinate[1] - yRange[0]];
    });

    // Center on 0
    iconData.coordinates = iconData.coordinates.map((coordinate) => {
      return [coordinate[0] - width / 2, coordinate[1] - height / 2];
    });
  }

  return iconDatas;
}

function animateIcons(iconDatas, canvasWidth, canvasHeight) {
  if (!(iconDatas && canvasWidth && canvasHeight)) {
    return;
  }
  const iconSpreadRadius = canvasHeight * (1 / 2.68);

  // Define random cluster of starting points
  const startingRadius = 50;
  const numPointInCluster = 400;
  const startingCoordinates = [];
  for (let i = 0; i < numPointInCluster; i++) {
    const r = Math.random() * startingRadius;
    const t = Math.random() * 2 * Math.PI;
    startingCoordinates.push([
      r * Math.cos(t) + canvasWidth / 2,
      r * Math.sin(t) + canvasHeight / 2,
    ]);
  }

  let j = 0;
  const animeProps = {};
  for (const iconName in iconDatas) {
    const iconData = iconDatas[iconName];
    animeProps[iconName] = [];

    const angle = (Math.PI * 7) / 6 - j * iconAngularDifference;
    const canvasLoc = [
      iconSpreadRadius * Math.cos(angle),
      iconSpreadRadius * -Math.sin(angle),
    ];

    for (let i = 0; i < iconData.coordinates.length; i++) {
      const [startX, startY] = startingCoordinates[
        Math.floor(Math.random() * startingCoordinates.length)
      ];

      const fromX = startX;
      const toX = iconData.coordinates[i][0] + canvasWidth / 2 + canvasLoc[0];
      const fromy = startY;
      const toY = iconData.coordinates[i][1] + canvasHeight / 2 + canvasLoc[1];

      animeProps[iconName].push({
        translateX: [fromX, toX],
        translateY: [fromy, toY],
        width: [2, 2],
        easing: "easeOutQuint",
        delay: iconAnimInitialDelay + j * iconAnimSubsequentDelay,
        duration: iconAnimDuration,
      });
    }
    j++;
  }
  return animeProps;
}

export { preprocessIconData, animateIcons };
