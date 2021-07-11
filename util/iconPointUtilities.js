// // Icon arrangement parameters
// const iconAngularDifference = (2 * Math.PI) / 3;

// // animation parameters
// const iconAnimInitialDelay = 300;
// const iconAnimSubsequentDelay = 500;
// const iconAnimDuration = 1000;

export function preprocessIconData(rawIconDatas) {
  const iconDatas = {};

  // Remove some `sparsify_factor` of coordinates and scale down by `scale_factor`
  for (const key in rawIconDatas) {
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

export function makeCoordinateSpread(
  radius,
  pointCount,
  canvasWidth,
  canvasHeight
) {
  const coordinates = [];
  for (let i = 0; i < pointCount; i++) {
    const r = Math.random() * radius;
    const t = Math.random() * 2 * Math.PI;
    coordinates.push([
      r * Math.cos(t) + canvasWidth / 2,
      r * Math.sin(t) + canvasHeight / 2,
    ]);
  }
  return coordinates;
}

export function centerIconData(iconDatas, canvasWidth, canvasHeight) {
  for (const iconName of Object.keys(iconDatas)) {
    iconDatas[iconName]["coordinates"] = iconDatas[iconName][
      "coordinates"
    ].map(([x, y]) => [x + canvasWidth / 2, y + canvasHeight / 2]);
  }
}

// function animateIcons(iconDatas, canvasWidth, canvasHeight) {
//   if (!(iconDatas && canvasWidth && canvasHeight)) {
//     return;
//   }

//   let j = 0;
//   const animeProps = {};
//   for (const iconName in iconDatas) {
//     const iconData = iconDatas[iconName];
//     animeProps[iconName] = [];

//     for (let i = 0; i < iconData.coordinates.length; i++) {
//       const [startX, startY] = startingCoordinates[
//         Math.floor(Math.random() * startingCoordinates.length)
//       ];

//       const fromX = startX;
//       const toX = iconData.coordinates[i][0] + canvasWidth / 2;
//       const fromy = startY;
//       const toY = iconData.coordinates[i][1] + canvasHeight / 2;

//       animeProps[iconName].push({
//         translateX: [fromX, toX],
//         translateY: [fromy, toY],
//         width: [2, 2],
//         easing: "easeOutQuint",
//         delay: iconAnimInitialDelay + j * iconAnimSubsequentDelay,
//         duration: iconAnimDuration,
//       });
//     }
//     j++;
//   }
//   return animeProps;
// }
