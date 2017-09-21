import * as THREE from 'three';
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 300);
camera.lookAt(new THREE.Vector3(0, 0, 0));

let scene = new THREE.Scene();

let material = new THREE.LineBasicMaterial({
    color: 0xffff00
});

let geometry = new THREE.Geometry();
let line = new THREE.Line(geometry, material);
scene.add(line);
computeCircle();
function animate () {
    requestAnimationFrame(animate);
    line.rotation.y += 0.01;
    renderer.render(scene, camera);
}
/**
 * description 根据 x0, y0, r 产出对应的坐标点
 * {
 *  x0
 *  y0
 *  r
 * }
 */
function computeCircle (option) {
    let params = {
        x0: 0,
        y0: 0,
        z0: 10,
        r: 10,
        z: 10,
        ...option
    };
    let points = [];
    // (x - x0) ^2 + (y - y0) ^ 2 + (z - z0)^2 = r ^ 2
    let t = 0;
    let gap = 1 / 5000;
    // t * x0 + (1 - t) * x1
    while (t < 1) {
        let x = t * (params.x0 + params.r) + (1 - t) * (params.x0 - params.r)
        let y = Math.sqrt(Math.pow(params.r, 2) - Math.pow(params.z - params.z0, 2) - Math.pow(x - params.x0, 2));
        points.push({
            x: x,
            y: y,
            z: params.z
        });
        geometry.vertices.push(new THREE.Vector3(x, y, params.z));
        //geometry.vertices.push(new THREE.Vector3(x, y * -1, params.z));
        t += gap;
    }
    points.reverse().forEach((item) => {
        geometry.vertices.push(new THREE.Vector3(item.x, item.y * -1 , params.z));
    });
    renderer.render(scene, camera);
    animate();
}
