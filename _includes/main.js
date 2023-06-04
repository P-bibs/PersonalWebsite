import * as THREE from "https://cdn.skypack.dev/three@0.129.0";

function maker_buffer_geometry() {
  let points1 = JSON.parse(document.getElementById("points1").innerText);
  let points2 = JSON.parse(document.getElementById("points2").innerText);
  let points3 = JSON.parse(document.getElementById("points3").innerText);
  let points4 = JSON.parse(document.getElementById("points4").innerText);

  console.log(points1.length, points2.length, points3.length, points4.length);
  let verts0 = [];
  let verts1 = [];
  let verts2 = [];
  let verts3 = [];
  let verts4 = [];

  const max_points = Math.max(
    points1.length,
    points2.length,
    points3.length,
    points4.length
  );

  for (let i = 0; i < max_points; i++) {
    const percent_progress = i / max_points;

    verts0.push(
      THREE.MathUtils.randFloatSpread(2),
      THREE.MathUtils.randFloatSpread(2),
      0.0
    );

    const point1 = points1[Math.floor(percent_progress * points1.length)];
    verts1.push(point1[0], point1[1], 0.0);

    const point2 = points2[Math.floor(percent_progress * points2.length)];
    verts2.push(point2[0], point2[1], 0.0);

    const point3 = points3[Math.floor(percent_progress * points3.length)];
    verts3.push(point3[0], point3[1], 0.0);

    const point4 = points4[Math.floor(percent_progress * points4.length)];
    verts4.push(point4[0], point4[1], 0.0);
  }
  let geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position0",
    new THREE.Float32BufferAttribute(verts0, 3)
  );
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(verts1, 3)
  );
  geometry.setAttribute(
    "position2",
    new THREE.Float32BufferAttribute(verts2, 3)
  );
  geometry.setAttribute(
    "position3",
    new THREE.Float32BufferAttribute(verts3, 3)
  );
  geometry.setAttribute(
    "position4",
    new THREE.Float32BufferAttribute(verts4, 3)
  );

  return geometry;
}

function main() {
  window.THREE = THREE;
  let canvas = document.getElementById("hero-canvas");
  let width = canvas.clientWidth;
  let height = canvas.clientHeight;

  let geometry = maker_buffer_geometry();

  let material = new THREE.ShaderMaterial({
    uniforms: {
      u_time: { value: 0 },
      u_resolution: {
        value: new THREE.Vector2(
          width * window.devicePixelRatio,
          height * window.devicePixelRatio
        ),
      },
    },
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,

    blending: THREE.NormalBlending,
    vertexColors: true,
  });

  var scene = new THREE.Scene();
  let geometry_object = new THREE.Points(geometry, material);
  //geometry_object.drawMode = THREE.TriangleStripDrawMode;
  scene.add(geometry_object);

  // renderer and camera
  var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
  camera.position.set(0, 0, 3);
  camera.lookAt(0, 0, 0);


  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height, window.devicePixelRatio);
  renderer.setClearColor(0xffffff, 1);
  canvas.appendChild(renderer.domElement);

  const start = Date.now() / 1000;
  function animate() {
    requestAnimationFrame(animate);
    material.uniforms.u_time.value = Date.now() / 1000 - start;
    renderer.render(scene, camera);
  }
  animate();
}

main();
