import * as THREE from 'three.js';
//import light from './img/light.png';
import light from './img/light_alpha.png';
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('#webgl-output').appendChild(renderer.domElement);
const depth = 300;
camera.position.set(0, 0, depth);
let geom = new THREE.Geometry();
let range = depth;
let cloud;
createParticles(10);
animate();
function createParticles (size) {
  let texture = THREE.ImageUtils.loadTexture(light); 
  var material = new THREE.PointCloudMaterial({
    size: 10,
    //vertexColors: true,
    transparent: true,
    opacity: .8,
    map: texture,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
    color: 0xffffff 
  });
  for (let i = 0; i < 10000; i++) {
    let particle = new THREE.Vector3((Math.random() - .5) * range, (Math.random() - 0.5) * range, (Math.random() - 0.5) * depth); 
    geom.vertices.push(particle);
    let color = new THREE.Color(0x00ffff);
    color.setHSL(Math.random() * color.getHSL().h, Math.random() * color.getHSL().s, color.getHSL().l * Math.random());
    geom.colors.push(color);
  }
  cloud = new THREE.PointCloud(geom, material);
  console.log(cloud);
  cloud.sortParticles = true;
  cloud.name = 'cloud';
  scene.add(cloud);
}
function animate() {
  requestAnimationFrame(animate);
  scene.children.forEach((item, index) => {
    if (item.name == 'cloud') {
      item.geometry.vertices.forEach((tmp) => {
        tmp.z += Math.random() * 50 * (Math.random() > 0.5 ? 1 : -1); 
      }); 
      geom.verticesNeedUpdate = true;
    } 
  });
  renderer.render(scene, camera);
}
