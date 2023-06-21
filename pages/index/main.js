import * as THREE from "https://cdn.skypack.dev/three@0.129.0";

function maker_buffer_geometry(starting_points) {
  let points1 = JSON.parse(document.getElementById("points1").innerText);
  let points2 = JSON.parse(document.getElementById("points2").innerText);
  let points3 = JSON.parse(document.getElementById("points3").innerText);
  let points4 = JSON.parse(document.getElementById("points4").innerText);

  let verts0 = [];
  let verts1 = [];
  let verts2 = [];
  let verts3 = [];
  let verts4 = [];

  let points0 = [];
  for (let i = 0; i < starting_points.length; i += 3) {
    points0.push([starting_points[i], starting_points[i + 1]]);
  }

  const max_points = Math.max(
    points0.length,
    points1.length,
    points2.length,
    points3.length,
    points4.length
  );
  console.log(max_points);

  for (let i = 0; i < max_points; i++) {
    const percent_progress = i / max_points;

    const point0 = points0[Math.floor(percent_progress * points0.length)];
    verts0.push(point0[0], point0[1], 0.0);

    const point1 = points1[Math.floor(percent_progress * points1.length)];
    verts1.push(point1[0], point1[1], 0.0);

    const point2 = points2[Math.floor(percent_progress * points2.length)];
    verts2.push(point2[0], point2[1], 0.0);

    const point3 = points3[Math.floor(percent_progress * points3.length)];
    verts3.push(point3[0], point3[1], 0.0);

    const point4 = points4[Math.floor(percent_progress * points4.length)];
    verts4.push(point4[0], point4[1], 0.0);
  }
  window.point0 = verts0;
  window.point1 = verts1;
  window.point2 = verts2;
  window.point3 = verts3;

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

function delay(t, val) {
    return new Promise(resolve => setTimeout(resolve, t, val));
}

async function main(vertex_id, fragment_id, canvas_id) {
  let canvas = document.getElementById(canvas_id);
  let width = canvas.clientWidth;
  let height = canvas.clientHeight;

  let starting_points = [];
  for (let i = 0; i < 500; i++) {
    starting_points.push(
      THREE.MathUtils.randFloatSpread(2),
      THREE.MathUtils.randFloatSpread(2),
      0.0
    );
  }
  window.starting_points = starting_points;

  let geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starting_points, 3)
  );

  window.starting_points = starting_points;

  let material = new THREE.ShaderMaterial({
    uniforms: {
      u_resolution: {
        value: new THREE.Vector2(
          width * window.devicePixelRatio,
          height * window.devicePixelRatio
        ),
      },
    },
    vertexShader: `
    void main() {
    gl_Position = vec4(position, 1.);
    gl_PointSize = 2.0;
    }`,
    fragmentShader: `void main() { gl_FragColor = vec4(vec3(0.),1.0); }`,
    blending: THREE.NormalBlending,
    vertexColors: true,
  });

  var scene = new THREE.Scene();
  let geometry_object = new THREE.Points(geometry, material);
  scene.add(geometry_object);

  // renderer and camera
  var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
  camera.position.set(0, 0, 3);
  camera.lookAt(0, 0, 0);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height, window.devicePixelRatio);
  renderer.setClearColor(0xffffff, 1);
  canvas.appendChild(renderer.domElement);

  renderer.render(scene, camera)

  let vertex_src = await (await fetch(vertex_id)).text()
  let fragment_src = await (await fetch(fragment_id)).text()
  await delay(10)
  shader_init(renderer, starting_points, vertex_src, fragment_src, canvas)
}

function shader_init(renderer, starting_points, vertex_src, fragment_src, canvas) {
  let width = canvas.clientWidth;
  let height = canvas.clientHeight;

  let geometry = maker_buffer_geometry(starting_points);

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
    vertexShader: vertex_src,
    fragmentShader: fragment_src,

    blending: THREE.NormalBlending,
    vertexColors: true,
  });

  var scene = new THREE.Scene();
  let geometry_object = new THREE.Points(geometry, material);
  scene.add(geometry_object);

  // renderer and camera
  var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
  camera.position.set(0, 0, 3);
  camera.lookAt(0, 0, 0);

  const start = Date.now() / 1000;
  function animate() {
    requestAnimationFrame(animate);
    material.uniforms.u_time.value = Date.now() / 1000 - start;
    renderer.render(scene, camera);
  }
  animate();
}

export default main
