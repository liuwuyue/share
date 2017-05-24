import * as THREE from 'three';
import './index.less';

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

let renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);

document.body.appendChild(renderer.domElement);

let type = /2/.test(location.href) ? 2 : 1; //纯粹为了演示 1  球， 2 带贴图
switch (type) {
    case 1:
        {
            //点光源
            let light = new THREE.PointLight( 0xff0000, 1);
            light.position.set(20, 20, 20);
            scene.add(light);

            let geometry = new THREE.SphereGeometry(5, 64, 64 );
            let material = new THREE.MeshLambertMaterial({
                color: 0xffffff
            });
            let mesh = new THREE.Mesh(geometry,material);
            scene.add(mesh);

            let gap = 0.5;
            let direction = 1;
            render();
            function render () {
                requestAnimationFrame(render);
                let z = light.position.z;
                if (z >= 60) {
                    direction = -1;
                } else if (z <= 20) {
                    direction = 1;
                }
                light.position.z += gap * direction;
                renderer.render(scene, camera);
            }
        }
        break;
    case 2:
        new THREE.TextureLoader().load(
            '/dist/img/earth/earth.jpg',
            (texture) => {
                let geometry = new THREE.SphereGeometry(5, 64, 64 );
                let material = new THREE.MeshBasicMaterial({
                    map: texture
                });
                let mesh = new THREE.Mesh(geometry,material);
                scene.add(mesh);
                let gap = 0.5;
                let direction = 1;
                render();
                function render () {
                    requestAnimationFrame(render);
                    mesh.rotation.x += 1 / 180 * Math.PI;
                    mesh.rotation.y += 1 / 180 * Math.PI;
                    let z = camera.position.z;
                    if (camera.position.z >= 60) {
                        direction = -1;
                    } else if (camera.position.z <= 20) {
                        direction = 1;
                    }
                camera.position.z += gap * direction;
                    renderer.render(scene, camera);
                }
            }
        );
        break;
}

