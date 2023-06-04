var fs = require("fs");
var png = require("upng-js");

function preprocessIconData(rawIconDatas) {
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

    console.log(iconName, xRange, yRange, width, height);

    // Ensure minimum value on both axis is 0
    iconData.coordinates = iconData.coordinates.map((coordinate) => {
      return [coordinate[0] - xRange[0], coordinate[1] - yRange[0]];
    });

    // Center on 0
    iconData.coordinates = iconData.coordinates.map((coordinate) => {
      return [coordinate[0] - width / 2, coordinate[1] - height / 2];
    });

    // Scale down to 1
    let diagonal_length = Math.sqrt(width * width + height * height);
    diagonal_length /= 2;
    iconData.coordinates = iconData.coordinates.map((coordinate) => {
      return [coordinate[0] / diagonal_length, coordinate[1] / diagonal_length];
    })

    // flip y axis
    iconData.coordinates = iconData.coordinates.map((coordinate) => {
      return [coordinate[0], -coordinate[1]];
    })
  }

  return iconDatas;
}

module.exports = async function () {
  points = fs.readFileSync("./assets/points.json");
  points = JSON.parse(points);
  points = preprocessIconData(points);

  for (const iconName in points) {
    const iconData = points[iconName];
    points[iconName] = points[iconName].coordinates.map((coordinate) => {
      return [Number(coordinate[0].toFixed(4)), Number(coordinate[1].toFixed(4))];
    });
  }

  return {
    points1: JSON.stringify(points.programmingLanguages),
    points2: JSON.stringify(points.graphics),
    points3: JSON.stringify(points.hardware),
    points4: JSON.stringify(points.music),
  };
};
