import Stats from '../../common/js/stats.js';
import * as THREE from 'three';
let scene, camera, renderer, stats;
let sphere;
let controls = new function () {
    this.r = 10; 
};

let gui = new dat.GUI();
gui.add(controls, 'r', 0, 20);

init();
//render();
requestAnimationFrame(animate);
function init () {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        antialias: true         
    });
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    document.querySelector('#webgl-output').appendChild(renderer.domElement);
    
    let axes = new THREE.AxisHelper(30);
    scene.add(axes);

    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(60, 20, 32, 32),
        new THREE.MeshLambertMaterial({ color: 0xffffff})
    );
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 0, 0); 

    scene.add(plane);

    let cube = new THREE.Mesh(
        new THREE.BoxGeometry(4, 4, 4),         
        new THREE.MeshLambertMaterial({
            color: 0xff0000
        })
    );
    cube.castShadow = true;
    cube.position.set(4, 2, 2);
    scene.add(cube);


    sphere = new THREE.Mesh(
        new THREE.SphereGeometry(4, 32, 32),
        new THREE.MeshLambertMaterial({color: 0x7777ff})     
    );

    sphere.position.set(0, 4, 0);
    sphere.castShadow = true;
    scene.add(sphere);

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    camera.position.set(50, 50, 50);
    camera.lookAt(scene.position);

    stats = new Stats();
    document.querySelector('body').appendChild(stats.dom);
}
let step = 0;
function animate () {
    requestAnimationFrame(animate);
    render();
    stats.update();
}
function render () {
    step += 0.04;
    sphere.position.x = 0 + (controls.r * Math.cos(step));
    sphere.position.y =  4 + (controls.r * Math.sin(step));
    renderer.render(scene, camera);
}
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
