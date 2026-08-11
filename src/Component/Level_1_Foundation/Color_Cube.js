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
	camera.position.z = 5;
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x000555);
	document.body.appendChild(renderer.domElement)
	
	// Light
	const ambientLight = new THREE.AmbientLight(0xffffff, 2);
	scene.add(ambientLight);
	const dirLight = new THREE.DirectionalLight(0xffffff, 3);
	scene.add(dirLight);
	
	
	// Geomatry
	const cubeGeometry = new THREE.BoxGeometry(2,2);
	const cubeMaterial = new THREE.MeshStandardMaterial();
	const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	scene.add(cube)
	renderer.render(scene, camera);
}