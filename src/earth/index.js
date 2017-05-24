import * as THREE from 'three';
import './index.less';

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);  

let renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);

document.body.appendChild(renderer.domElement);

//点光源
var light = new THREE.PointLight( 0xff0000, 1);
light.position.set( 20, 20, 20);
scene.add( light );

var geometry = new THREE.SphereGeometry(5, 64, 64 );
var material = new THREE.MeshLambertMaterial( { color:0xffffff} );
var mesh = new THREE.Mesh( geometry,material);

scene.add(mesh);
camera.position.z = 40;

let gap = 0.5;
let direction = 1;

render();

function render () {
    requestAnimationFrame(render);
    if (light.position.z >= 60) {
        direction = -1;
    } else if (light.position.z <= 20) {
        direction = 1;
    }
    light.position.z += gap * direction;
    renderer.render(scene, camera);
}
