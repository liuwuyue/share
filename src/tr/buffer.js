let container, stats;
let camera, scene, renderer;
let mesh;

function init () {
    container = document.querySelector('body');
    camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 1, 3500);
    camera.position.z = 2750;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050505, 2000, 3500);

    scene.add(new THREE.AmbientLight(0x444444));

    let light1 = new THREE.DirectionalLight(0xffffff, 0.5);

    light1.position.set(1, 1, 1);

    scene.add(light1);
    
    let light2 = new THREE.DirectionalLight(0xffffff, 1.5);

    light2.position.set(1, 1, 1);

    scene.add(light2);

    let triangles = 16 * 10000;
    let geometry = new THREE.BufferGeometry();
}

function animate () {

}
