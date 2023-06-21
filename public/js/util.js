import * as THREE from "https://cdn.skypack.dev/three@0.129.0";

export async function full_screen_quad(fragment_url, canvas_id) {
  let fragment_text = await (await fetch(fragment_url)).text();

  let canvas = document.getElementById(canvas_id);
  let width = canvas.clientWidth;
  let height = canvas.clientHeight;

  let geometry = new THREE.PlaneGeometry();

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
    fragmentShader: fragment_text,

    blending: THREE.NormalBlending,
  });

  var scene = new THREE.Scene();
  let geometry_object = new THREE.Mesh(geometry, material);
  geometry_object.scale.set(window.innerWidth/window.innerHeight, 1, 1);
  scene.add(geometry_object);

  // renderer and camera
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.001, 1000);
  camera.position.set(0, 0, 1);
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

