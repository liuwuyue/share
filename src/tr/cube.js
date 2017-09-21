import Stats from '../../common/js/stats.js';
import * as THREE from 'three.js';
let container, stats;
let camera, scene, renderer;
let mesh;

init();
animate();

function init() {
    container = document.querySelector('body');
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 3000;

    scene = new THREE.Scene();

    let segments = 1000;

    let geometry = new THREE.BufferGeometry();

    let material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });

    var positions = new Float32Array(segments * 3);

    let colors = new Float32Array(segments * 3);

    let r = 800;

    for (let i = 0; i < segments; i ++) {
        let x = Math.random() * r - r / 2;
        let y = Math.random() * r - r / 2;
        let z = Math.random() * r - r / 2;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        colors[i * 3] = x / r + 0.5;
        colors[i * 3 + 1] = y / r + 0.5;
        colors[i * 3 + 2] = z / r + 0.5;
    }
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.computeBoundingSphere();

    mesh = new THREE.Line(geometry, material);
    mesh.rotation.x = 0;
    mesh.rotation.y = 0;
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    container.appendChild(renderer.domElement);
    stats = new Stats();
    container.appendChild(stats.dom);
    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate () {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
    stats.update();
}
