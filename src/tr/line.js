//场景
let scene = new THREE.Scene();
//照相机
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 80);

//渲染器
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let start = {x: -10, y: -20, z: 10};
let end = {x: 10, y: 10, z: 5};
let group = new THREE.Group();
//添加球
let box1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({color: new THREE.Color(0xff0000)})
);
box1.position.set(start.x, start.y, start.z);

let box2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({color: new THREE.Color(0xff00ff)})
);
box2.position.set(end.x, end.y, end.z);

group.add(box1);
group.add(box2);


let points = line(start, end);
let max = points.length;
let geometry = new THREE.BufferGeometry();
let positions = new Float32Array(max * 3);
geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

let material = new THREE.LineBasicMaterial({
  color: 0xff0000,
  linewidth: 10
});

let spline = new THREE.Line(geometry, material);

spline.geometry.attributes.position.needsUpdate = true

group.add(spline);
scene.add(group);
let drawCount = 0;
let x = 0;
let y = 0;
let z = 0;
let size = 2;
let index = 0;
points.forEach((item) => {
  positions[index++] = item.x;
  positions[index++] = item.y;
  positions[index++] = item.z;
});

animate();

function animate () {
  if (drawCount <= points.length) {
    spline.geometry.setDrawRange(0,  drawCount);
    drawCount ++;
  }
  //group.rotation.x += 0.01;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

/**
  * @description  已知起点终点 绘制一条二次贝塞尔曲线
  */
function line (p0, p2) {
  let t = 0;
  //50步
  let step = 0.01;
  let r = Math.sqrt(Math.pow(p0.x - p2.x, 2) + Math.pow(p0.y - p2.y, 2) + Math.pow(p0.z - p2.z, 2));
  let p1 = {
    x: p0.x,
    y: p2.y,
    z: p2.z
  };
  let points = [];
  while (t < 1) {
    points.push({
      x: Math.pow((1 - t), 2) * p0.x + 2 * t * (1 - t) * p1.x + t * t * p2.x,
      y: Math.pow((1 - t), 2) * p0.y + 2 * t * (1 - t) * p1.y + t * t * p2.y,
      z: Math.pow((1 - t), 2) * p0.z + 2 * t * (1 - t) * p1.z + t * t * p2.z
    });
    t += step;
  }
  points.push({...p2});
  return points;
}
