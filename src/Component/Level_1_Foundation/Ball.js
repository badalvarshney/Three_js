import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default function Ball() {
  // scene camera renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 6;
  camera.position.y = 3 
  camera.rotation.x = -0.5 
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xb1afb2);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  const white = 0xffffff;
  const black = 0x000000;

  let velocityY = 0;
  let velocityX = 0.012;
  const gravity = -0.001;

  const ambientLight = new THREE.AmbientLight(white, 2);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(white, 3);
  dirLight.position.set(8, 8, 8);
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 20;
  dirLight.castShadow = true;
  scene.add(dirLight);

  const groundGeometry = new THREE.PlaneGeometry(6, 9);

  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0xb1afb2,
  });

  const ground = new THREE.Mesh(groundGeometry, groundMaterial);

  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1;

  ground.receiveShadow = true;

  scene.add(ground);

  const loader = new THREE.TextureLoader()
  const ballTexture = loader.load("/WhiteHexagonalTiles01_4K_AO.png")
  const ballGeometry = new THREE.SphereGeometry();
  const ballMaterial = new THREE.MeshStandardMaterial({ map: ballTexture });
  const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
  ballMesh.castShadow = true;
  scene.add(ballMesh);

  const patchGeometry = new THREE.SphereGeometry(
    1.021,
    5,
    3,
    0,
    Math.PI * 2,
    0,
    0.35,
  );

  const patchMaterial = new THREE.MeshStandardMaterial({
    color: black,
    roughness: 0.4,
    metalness: 0,
    side: THREE.DoubleSide,
  });

  const patchDirections = [
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, -1, 0),
    new THREE.Vector3(0, 0, -1),
  ];

  for (const direction of patchDirections) {
    const patch = new THREE.Mesh(patchGeometry, patchMaterial);

    const defaultDirection = new THREE.Vector3(0, 1, 0);

    patch.quaternion.setFromUnitVectors(defaultDirection, direction);

    // ballMesh.add(patch);
  }

  //   const control = new OrbitControls(camera, renderer.domElement);
  function animate() {
    requestAnimationFrame(animate);

    velocityY += gravity;

    ballMesh.position.y += velocityY;
    ballMesh.position.x += velocityX;
    ballMesh.rotation.x += velocityX;
    ballMesh.rotation.y += velocityX;

    if (ballMesh.position.x >= 2 || ballMesh.position.x <= -2) {
      velocityX = -velocityX;
    }

    // Ground
    if (ballMesh.position.y <= 0) {
      ballMesh.position.y = 0;
      velocityY = 0.06;
    }

    renderer.render(scene, camera);
  }
  animate();
}
