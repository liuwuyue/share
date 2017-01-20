import * as THREE from 'three';
class Earth {
	constructor (option) {
		option = {
			el: 'body',
			...option
		};
		this.el = document.querySelector(option.el);
		this.render();
	}
	render () {
		let scene = new THREE.Scene();
		let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		let renderer = new THREE.WebGLRenderer({alpha: true});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.clearColor('transparent');
		this.el.appendChild(renderer.domElement);
		new THREE.TextureLoader().load('./img/earth.jpg', texture => {
			let earth = new THREE.Mesh( 
				new THREE.SphereGeometry(5, 32, 32), 
				new THREE.MeshBasicMaterial({map: texture})
			);
			scene.add(earth);
			camera.position.z = 10;
			render();
			function render () {
				requestAnimationFrame(render);	
				earth.rotation.x += 0.005;
				earth.rotation.y += 0.005;
				renderer.render(scene, camera);
			}
		});
	}
}
export default Earth;
