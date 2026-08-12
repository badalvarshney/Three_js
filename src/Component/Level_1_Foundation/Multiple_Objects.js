import * as THREE from 'three';

export default function MultipleObjects() {
	// Scene, Camera, Renderer
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.z = 5;
	camera.position.y = 3;
	camera.position.x = 2;
	camera.rotation.x = -0.3
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xb1afb2);
	document.body.appendChild(renderer.domElement);

	// Light 
	const ambientLight = new THREE.AmbientLight(0xffffff, 2);
	scene.add(ambientLight);
	const dirLight = new THREE.DirectionalLight(0xffffff, 4);
	dirLight.position.set(8, 8, 8)

	scene.add(dirLight)



	// Box Geometry 
	const boxGeometry = new THREE.BoxGeometry();
	const boxMaterial = new THREE.MeshStandardMaterial();
	// const redMaterial = new THREE.MeshStandardMaterial({
	// 	color: 0xff0000,
	// });

	// const greenMaterial = new THREE.MeshStandardMaterial({
	// 	color: 0x00ff00,
	// });

	// const blueMaterial = new THREE.MeshStandardMaterial({
	// 	color: 0x0000ff,
	// });

	// 	const boxData = [
	// 		{ position: [0, 0, 0], rotation: [0, 0, 0],     material: redMaterial,
	//  },
	// 		{ position: [3, 0, 0], rotation: [0, 0, 0],     material: greenMaterial,
	//  },
	// 		{ position: [-3, 0, 0], rotation: [0, 0, 0],     material: blueMaterial,
	//  },
	// 	];

	const getBox = []


	// for (const data of boxData) {
	// 	const box = new THREE.Mesh(boxGeometry, data.material);
	// 	box.position.set(...data.position);
	// 	box.rotation.set(...data.rotation);
	// 	scene.add(box);
	// 	getBox.push(box)
	// }



	for (let i = 0; i < 10; i++) {
		const box = new THREE.Mesh(boxGeometry, boxMaterial);
		box.position.x = (i % 5) * 1.2
		box.position.y = Math.floor(i / 5)  * 1.2
		// box.position.x = (Math.random() - 0.5) * 6;
		// box.position.y = (Math.random() - 0.5) * 4;
		scene.add(box);
		getBox.push(box)
	}


	function animate() {
		requestAnimationFrame(animate);
		for (const box of getBox) {
			box.rotation.x += 0.01;
			box.rotation.y += 0.01;
		}
		// getBox[0].rotation.x += 0.01;
		// getBox[1].rotation.y += 0.01;
		// getBox[2].rotation.z += 0.01;
		renderer.render(scene, camera);
	}

	animate()




}