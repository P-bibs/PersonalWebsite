import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';



// let path_to_sdf = (path) => pathSdf(path, { width: 400, height: 400 });

// let lambda_path =
// "M 967.00000,288.00000 L 1003.0000,288.00000 C 1003.0000,182.66667 986.00000,106.00000 952.00000,58.000000 C 918.00000,10.000000 875.00000,-14.000000 823.00000,-14.000000 C 781.00000,-14.000000 740.66667,1.6666667 702.00000,33.000000 C 663.33333,64.333333 628.66667,149.33333 598.00000,288.00000 L 512.00000,676.00000 L 214.00000,0.00000000 L 25.000000,0.00000000 L 453.00000,922.00000 C 430.33333,1041.3333 403.00000,1129.6667 371.00000,1187.0000 C 339.00000,1244.3333 299.33333,1273.0000 252.00000,1273.0000 C 214.00000,1273.0000 181.00000,1258.6667 153.00000,1230.0000 C 125.00000,1201.3333 109.00000,1156.3333 105.00000,1095.0000 L 69.000000,1095.0000 C 71.000000,1193.0000 90.666667,1271.3333 128.00000,1330.0000 C 165.33333,1388.6667 212.00000,1418.3333 268.00000,1419.0000 C 304.00000,1419.0000 338.00000,1404.3333 370.00000,1375.0000 C 402.00000,1345.6667 430.00000,1295.0000 454.00000,1223.0000 C 478.00000,1151.0000 515.00000,1002.3333 565.00000,777.00000 L 636.00000,460.00000 C 664.66667,328.66667 694.66667,241.00000 726.00000,197.00000 C 757.33333,153.00000 795.33333,130.66667 840.00000,130.00000 C 914.66667,130.00000 957.00000,182.66667 967.00000,288.00000 z ";
// let lambda_sdf = path_to_sdf(lambda_path);

// let gpu_path =
// "M0,38.413h36.121v144.713H20.416v-13.012h-6.418v-37.155h6.418v-27.013h-6.418V68.792h6.418V54.118H0V38.413z M233.039,87.687V169.6c0,6.938-5.624,12.566-12.563,12.566h-0.013v12.46h-80.221v-12.46h-7.612v12.46H52.409v-12.46h-7.034V75.125 h175.101C227.415,75.125,233.039,80.749,233.039,87.687z M62.52,181.542h-4v9h4V181.542z M70.52,181.542h-4v9h4V181.542z M78.52,181.542h-4v9h4V181.542z M86.52,181.542h-4v9h4V181.542z M88.986,128.805h-9.988v3.925h5.559v1.943 c-2.151,2.514-4.56,3.77-7.229,3.77c-1.166,0-2.248-0.239-3.245-0.72c-0.998-0.479-1.859-1.133-2.584-1.962 c-0.726-0.829-1.297-1.808-1.711-2.935c-0.414-1.127-0.621-2.338-0.621-3.634c0-1.244,0.188-2.423,0.563-3.537 c0.376-1.113,0.907-2.099,1.594-2.954c0.687-0.854,1.516-1.528,2.488-2.021c0.971-0.492,2.04-0.738,3.206-0.738 c1.476,0,2.843,0.362,4.101,1.088c1.256,0.726,2.234,1.775,2.934,3.148l4.004-2.954c-0.934-1.84-2.326-3.304-4.179-4.392 c-1.853-1.089-4.075-1.633-6.665-1.633c-1.918,0-3.692,0.369-5.324,1.107c-1.633,0.739-3.052,1.736-4.256,2.993 c-1.205,1.257-2.151,2.721-2.838,4.392c-0.687,1.671-1.029,3.453-1.029,5.344c0,1.996,0.343,3.854,1.029,5.577 c0.687,1.724,1.619,3.221,2.799,4.489c1.178,1.27,2.564,2.268,4.158,2.993c1.594,0.726,3.297,1.088,5.111,1.088 c2.928,0,5.492-1.101,7.695-3.304v3.109h4.43V128.805z M94.52,181.542h-4v9h4V181.542z M102.52,181.542h-4v9h4V181.542z M110.52,181.542h-4v9h4V181.542z M112.111,115.396H93.572v27.595h5.363v-11.427h10.961v-4.353H98.936v-7.112h13.176V115.396z M118.52,181.542h-4v9h4V181.542z M126.52,181.542h-4v9h4V181.542z M128.396,129.388l9.833-13.992h-5.791l-6.84,10.261l-6.88-10.261 h-5.829l9.833,13.992l-9.522,13.602h5.83l6.568-9.872l6.529,9.872h5.791L128.396,129.388z M150.354,181.542h-4v9h4V181.542z M158.354,181.542h-4v9h4V181.542z M166.354,181.542h-4v9h4V181.542z M174.354,181.542h-4v9h4V181.542z M182.354,181.542h-4v9h4 V181.542z M190.354,181.542h-4v9h4V181.542z M198.354,181.542h-4v9h4V181.542z M206.354,181.542h-4v9h4V181.542z M214.354,181.542 h-4v9h4V181.542z M217.727,130.695c0-19.328-15.67-35-35-35c-19.33,0-35,15.672-35,35c0,19.327,15.67,35,35,35 C202.057,165.695,217.727,150.022,217.727,130.695z M201.575,131.252c0.861-0.464,1.723-0.924,2.57-1.381 c0.841-0.479,1.67-0.951,2.471-1.408c0.804-0.46,1.583-0.902,2.313-1.36c0.057-0.034,0.111-0.068,0.167-0.104 c-0.928-6.684-4.335-12.578-9.268-16.713c-0.068,0.092-0.14,0.192-0.212,0.288c-0.307,0.424-0.652,0.896-1.028,1.413 c-0.402,0.52-0.835,1.082-1.296,1.679c-0.452,0.6-0.964,1.22-1.493,1.864c-0.53,0.647-1.078,1.314-1.634,1.996 c-0.581,0.664-1.17,1.342-1.761,2.023c-0.002,0-0.004,0.003-0.007,0.007c0.041-0.658,0.082-1.326,0.125-2.003 c0.057-0.957,0.072-1.93,0.109-2.903c0.031-0.977,0.063-1.953,0.093-2.914c0.005-0.971,0.008-1.923,0.012-2.847 c0.006-0.927,0.01-1.824-0.021-2.684c0-0.07-0.003-0.13-0.005-0.198c-3.085-1.251-6.452-1.941-9.984-1.941 c-3.208,0-6.281,0.567-9.13,1.604c0.049,0.109,0.099,0.224,0.15,0.337c0.211,0.478,0.45,1.013,0.71,1.6 c0.249,0.606,0.52,1.263,0.805,1.96c0.294,0.692,0.576,1.444,0.868,2.224c0.295,0.786,0.6,1.591,0.908,2.411 c0.288,0.838,0.58,1.688,0.873,2.538c0.001,0.004,0.002,0.005,0.005,0.012c-0.551-0.366-1.107-0.735-1.675-1.112 c-0.798-0.526-1.631-1.027-2.458-1.547c-0.83-0.513-1.661-1.029-2.478-1.536c-0.838-0.487-1.661-0.969-2.459-1.434 c-0.799-0.467-1.573-0.918-2.333-1.323c-0.059-0.032-0.112-0.06-0.17-0.094c-5.087,3.977-8.688,9.76-9.843,16.386 c0.115,0.012,0.235,0.025,0.356,0.035c0.517,0.056,1.102,0.119,1.739,0.187c0.65,0.086,1.354,0.182,2.1,0.284 c0.745,0.089,1.538,0.224,2.361,0.36c0.824,0.137,1.678,0.275,2.543,0.419c0.868,0.169,1.75,0.341,2.632,0.513 c0.004,0,0.007,0,0.012,0c-0.59,0.294-1.188,0.592-1.799,0.896c-0.855,0.428-1.703,0.899-2.567,1.354 c-0.861,0.463-1.723,0.923-2.57,1.38c-0.842,0.479-1.671,0.951-2.471,1.411c-0.804,0.457-1.583,0.902-2.312,1.358 c-0.058,0.034-0.112,0.066-0.169,0.102c0.929,6.686,4.336,12.578,9.269,16.714c0.068-0.092,0.141-0.191,0.212-0.289 c0.307-0.422,0.652-0.895,1.028-1.413c0.401-0.52,0.836-1.081,1.296-1.677c0.452-0.602,0.964-1.222,1.493-1.864 c0.53-0.648,1.077-1.315,1.634-1.994c0.581-0.665,1.17-1.345,1.761-2.023c0.001-0.002,0.004-0.007,0.007-0.009 c-0.041,0.657-0.082,1.324-0.124,2.003c-0.058,0.957-0.074,1.928-0.11,2.903c-0.032,0.976-0.063,1.954-0.094,2.914 c-0.004,0.969-0.007,1.924-0.011,2.846c-0.006,0.928-0.01,1.823,0.02,2.684c0.001,0.069,0.004,0.131,0.004,0.197 c3.085,1.252,6.453,1.942,9.985,1.942c3.208,0,6.281-0.566,9.129-1.605c-0.049-0.108-0.097-0.223-0.149-0.337 c-0.211-0.476-0.45-1.012-0.71-1.598c-0.249-0.607-0.52-1.265-0.804-1.959c-0.294-0.693-0.577-1.447-0.868-2.225 c-0.295-0.784-0.601-1.593-0.908-2.413c-0.289-0.837-0.581-1.688-0.874-2.536c-0.001-0.003-0.002-0.007-0.004-0.013 c0.55,0.368,1.106,0.735,1.674,1.113c0.797,0.524,1.631,1.025,2.458,1.545c0.83,0.514,1.661,1.03,2.478,1.538 c0.838,0.487,1.661,0.969,2.458,1.434c0.8,0.465,1.573,0.918,2.333,1.321c0.06,0.034,0.113,0.062,0.17,0.095 c5.088-3.978,8.688-9.758,9.844-16.385c-0.115-0.013-0.235-0.026-0.356-0.036c-0.518-0.056-1.101-0.117-1.739-0.185 c-0.65-0.088-1.355-0.183-2.1-0.287c-0.746-0.087-1.538-0.221-2.361-0.357c-0.824-0.137-1.678-0.276-2.543-0.42 c-0.868-0.169-1.75-0.342-2.632-0.513c-0.004,0-0.007,0-0.012,0c0.59-0.296,1.188-0.593,1.798-0.898 C199.862,132.179,200.711,131.706,201.575,131.252z";
// let gpu_sdf = path_to_sdf(gpu_path);

// let music_path =
// "m 74.45,8 v 39.19 c 0,0 -1.06,-0.1 -1.84,-0.1 -5.93,-0.36 -12.41,4 -13,10.21 -0.7,5 4.51,9.05 9.16,8.28 C 74.6,64.91 79,59 78.2,53.09 c 0,-10.34 0,-20.69 0,-31 0.4,-0.46 1.21,0.52 1.63,0.57 4.71,2.8 8.88,7.43 9.16,13.19 0.31,4.5 -1,8.91 -2.57,13.08 5.11,-6.32 6.74,-15.55 3.19,-23 -1.81,-4.34 -5.91,-7 -8.2,-11 A 22.09,22.09 0 0 1 78.06,6 C 77.73,5.34 76.9,5.26 76.25,5.26 v 0 C 74.18,5.23 74.45,6.58 74.45,8 Z";
// let music_sdf = path_to_sdf(music_path);

// let sdfs = {
//     sdf1: lambda_sdf,
//     sdf2: gpu_sdf,
//     sdf3: music_sdf,
// }
// let sdf1 = sdfs.sdf1;
// let sdf2 = sdfs.sdf2;
// let sdf3 = sdfs.sdf3;

let sdf1 = JSON.parse(document.getElementById("sdf1").innerText);
let sdf2 = JSON.parse(document.getElementById("sdf2").innerText);
let sdf3 = JSON.parse(document.getElementById("sdf3").innerText);

sdf1 = new Uint8Array(sdf1.data);
sdf2 = new Uint8Array(sdf2.data);
sdf3 = new Uint8Array(sdf3.data);

const renderer = new THREE.WebGLRenderer();

let canvas = document.getElementById("hero-canvas")
let width = canvas.clientWidth;
let height = canvas.clientHeight;
renderer.setSize(width, height, window.devicePixelRatio);
canvas.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const plane_geometry = new THREE.PlaneGeometry();
const plane_material = new THREE.ShaderMaterial( {
    uniforms: {
        u_time: {value: 1},
        u_mouse_velocity: {value: 0.},
        u_resolution: { value: new THREE.Vector2(width * window.devicePixelRatio, height * window.devicePixelRatio) },
        u_sdf1: new THREE.Uniform(new THREE.DataTexture(sdf1, 128, 128, THREE.LuminanceFormat, THREE.UnsignedByteType, THREE.UVMapping, THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping, THREE.LinearFilter, THREE.LinearFilter)),
        u_sdf2: new THREE.Uniform(new THREE.DataTexture(sdf2, 128, 128, THREE.LuminanceFormat, THREE.UnsignedByteType, THREE.UVMapping, THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping, THREE.LinearFilter, THREE.LinearFilter)),
        u_sdf3: new THREE.Uniform(new THREE.DataTexture(sdf3, 128, 128, THREE.LuminanceFormat, THREE.UnsignedByteType, THREE.UVMapping, THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping, THREE.LinearFilter, THREE.NearestFilter)),
    },
    fragmentShader: resolveLygia(document.getElementById( 'fragmentShader' ).textContent)
} );
const plane_mesh = new THREE.Mesh(plane_geometry, plane_material);
plane_mesh.scale.set(window.innerWidth/window.innerHeight, 1, 1);
scene.add(plane_mesh);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.001, 1000);
camera.position.set(0, 0, 1);
scene.add(camera);

window.onresize = () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, window.devicePixelRatio);
    plane_mesh.scale.set(window.innerWidth/window.innerHeight, 1, 1);
    plane_material.uniforms.u_resolution.value = new THREE.Vector2(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
}
const start = Date.now()/1000;
let last_mouse = [...Array(10).keys()].map(x => [0, 0]);
let current_mouse = [0, 0];
let magnitude = 0.

function animate() {
    requestAnimationFrame(animate);
    plane_material.uniforms.u_mouse_velocity.value = magnitude;
    plane_material.uniforms.u_time.value = (Date.now()/1000) - start;
    renderer.render(scene, camera);
}

function update() {
    last_mouse.shift();
    last_mouse.push(current_mouse);
    magnitude = 0.
    for (let i = 0; i < last_mouse.length - 1; i++) {
        magnitude += Math.abs(last_mouse[i][0] - last_mouse[i+1][0]);
        magnitude += Math.abs(last_mouse[i][1] - last_mouse[i+1][1]);
    }
    magnitude /= last_mouse.length;
}

setInterval(update, 10);

(function() {
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var eventDoc, doc, body;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
    
        current_mouse = [event.pageX, event.pageY];
    }
})();

animate();
