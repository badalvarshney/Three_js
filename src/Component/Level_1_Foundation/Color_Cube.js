import * as THREE from 'three';

export default function ColorCube() {
	// Scene, Camera, Renderer 
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.z = 3;
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x000000);
	document.body.appendChild(renderer.domElement)

	// Light
	const ambientLight = new THREE.AmbientLight(0xffffff, 2);
	scene.add(ambientLight);
	const dirLight = new THREE.DirectionalLight(0xffffff, 3);
	scene.add(dirLight);


	// Geomatry
	const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
	const cubeMaterial = new THREE.MeshStandardMaterial();
	const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	scene.add(cube);

	let hue = 0;


	function animate() {
		requestAnimationFrame(animate)
		hue += 0.001
		// Cube Rotation X,Y,Z 
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.02;
		cube.rotation.z += 0.01;

		// Cube Color 
		console.log(hue);
		
		if (hue >= 1) {
			hue = 0;
		}
		cubeMaterial.color.setHSL(hue, 1, 0.5);

		// Render Render
		renderer.render(scene, camera);
	}
	animate();
}