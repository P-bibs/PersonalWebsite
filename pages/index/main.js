function make_buffer_geometry(starting_points) {
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

  for (let i = 0; i < max_points; i++) {
    const percent_progress = i / max_points;

    const point0 = points0[Math.floor(percent_progress * points0.length)];
    verts0.push(point0[0], point0[1]);

    const point1 = points1[Math.floor(percent_progress * points1.length)];
    verts1.push(point1[0], point1[1]);

    const point2 = points2[Math.floor(percent_progress * points2.length)];
    verts2.push(point2[0], point2[1]);

    const point3 = points3[Math.floor(percent_progress * points3.length)];
    verts3.push(point3[0], point3[1]);

    const point4 = points4[Math.floor(percent_progress * points4.length)];
    verts4.push(point4[0], point4[1]);
  }

  window.verts0 = verts0;
  window.verts1 = verts1;
  window.verts2 = verts2;
  window.verts3 = verts3;
  window.verts4 = verts4;

  let verts = [];
  for (let i = 0; i < verts0.length; i += 2) {
    verts.push(verts0[i], verts0[i + 1]);
    verts.push(verts1[i], verts1[i + 1]);
    verts.push(verts2[i], verts2[i + 1]);
    verts.push(verts3[i], verts3[i + 1]);
    verts.push(verts4[i], verts4[i + 1]);
  }
  window.verts = verts;

  return new Float32Array(verts);
}

function createShader(gl, source, type) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

async function main(vertex_id, fragment_id, canvas_id) {
  let canvas = document.createElement("canvas");
  canvas.style = "width: 100%; height: 100%;";
  document.getElementById(canvas_id).appendChild(canvas);
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  let starting_points = [];
  for (let i = 0; i < 500; i++) {
    starting_points.push(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      0.0
    );
  }
  window.starting_points = starting_points;
  let verts = make_buffer_geometry(starting_points);
  console.log(verts)
  const NUM_POINTS = verts.length / (5 * 2);
  const STRIDE = 8*5;

  let vertex_src = document.getElementById(vertex_id).text;
  let fragment_src = document.getElementById(fragment_id).text;

  let gl = canvas.getContext("webgl2");

  gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);

  let program = gl.createProgram();
  gl.attachShader(program, createShader(gl, vertex_src, gl.VERTEX_SHADER));
  gl.attachShader(program, createShader(gl, fragment_src, gl.FRAGMENT_SHADER));
  gl.linkProgram(program);
  gl.useProgram(program);

  let screenQuadVBO = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, screenQuadVBO);
  gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

  let vao = gl.createVertexArray();
  gl.bindVertexArray(vao)

  gl.bindBuffer(gl.ARRAY_BUFFER, screenQuadVBO);
  gl.enableVertexAttribArray(gl.getAttribLocation(program, "position0"));
  gl.enableVertexAttribArray(gl.getAttribLocation(program, "position1"));
  gl.enableVertexAttribArray(gl.getAttribLocation(program, "position2"));
  gl.enableVertexAttribArray(gl.getAttribLocation(program, "position3"));
  gl.enableVertexAttribArray(gl.getAttribLocation(program, "position4"));
  gl.vertexAttribPointer(gl.getAttribLocation(program, "position0"),2,gl.FLOAT,false,STRIDE,8*0);
  gl.vertexAttribPointer(gl.getAttribLocation(program, "position1"),2,gl.FLOAT,false,STRIDE,8*1);
  gl.vertexAttribPointer(gl.getAttribLocation(program, "position2"),2,gl.FLOAT,false,STRIDE,8*2);
  gl.vertexAttribPointer(gl.getAttribLocation(program, "position3"),2,gl.FLOAT,false,STRIDE,8*3);
  gl.vertexAttribPointer(gl.getAttribLocation(program, "position4"),2,gl.FLOAT,false,STRIDE,8*4);

  gl.bindVertexArray(null)

  gl.uniform2f(
    gl.getUniformLocation(program, "u_resolution"),
    canvas.clientWidth * window.devicePixelRatio,
    canvas.clientHeight * window.devicePixelRatio
  );

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const start = Date.now() / 1000;
  function animate() {
    requestAnimationFrame(animate);

    gl.uniform1f(
      gl.getUniformLocation(program, "u_time"),
      Date.now() / 1000 - start
    );
    
    gl.bindVertexArray(vao);
    gl.drawArrays(gl.POINTS, 0, NUM_POINTS);
    // Cleanup:
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }
  animate();
}

export default main;
