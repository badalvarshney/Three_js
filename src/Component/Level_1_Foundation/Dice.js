import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function Dice() {
  // scene camera renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 3;

  const ambientLight = new THREE.AmbientLight(0xffffff, 3.5);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(-2, 1, 9.9);
  scene.add(dirLight);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xb1afb2);
  document.body.appendChild(renderer.domElement);

  //  Geometry Material Mesh
  const diceBoxGeometry = new RoundedBoxGeometry(1, 1, 1, 2, 0.1, 0.3);
  const diceBoxMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0,
    metalness: 0.3,
  });
  const diceBoxMesh = new THREE.Mesh(diceBoxGeometry, diceBoxMaterial);
  diceBoxMesh.rotation.set(0.6, 0.8, 0);
  scene.add(diceBoxMesh);

  const pointGeometry = new THREE.ConeGeometry(0.1, 0.05, 64, 1);
  const pointMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 0,
    metalness: 1,
  });
  const point = new THREE.Mesh(pointGeometry, pointMaterial);
  point.position.y = 0.476;
  point.rotation.set(Math.PI, 1, 0);
  diceBoxMesh.add(point);

  const pointsGeometry = new THREE.ConeGeometry(0.07, 0.05, 64, 1);

  const pointsData = [
    {
      position: [0.476, -0.24, 0.2],
      rotation: [Math.PI / 2, 0, Math.PI / 2],
    },
    {
      position: [0.476, 0.24, -0.2],
      rotation: [Math.PI / 2, 0, Math.PI / 2],
    },
    {
      position: [0.24, -0.48, 0.2],
      rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2],
    },
    {
      position: [-0.24, -0.48, 0.2],
      rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2],
    },
    {
      position: [0, -0.48, 0.2],
      rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2],
    },
    {
      position: [0.24, -0.48, -0.2],
      rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2],
    },
    {
      position: [-0.24, -0.48, -0.2],
      rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2],
    },
    {
      position: [0, -0.48, -0.2],
      rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2],
    },
    {
      position: [-0.476, 0, 0],
      rotation: [Math.PI / 2, Math.PI * 4, -Math.PI / 2],
    },
    {
      position: [-0.476, 0.24, 0.2],
      rotation: [Math.PI / 2, Math.PI * 4, -Math.PI / 2],
    },
    {
      position: [-0.476, 0.24, -0.2],
      rotation: [Math.PI / 2, Math.PI * 4, -Math.PI / 2],
    },
    {
      position: [-0.476, -0.24, -0.2],
      rotation: [Math.PI / 2, Math.PI * 4, -Math.PI / 2],
    },
    {
      position: [-0.476, -0.24, 0.2],
      rotation: [Math.PI / 2, Math.PI * 4, -Math.PI / 2],
    },
    {
      position: [-0.2, 0.24, -0.48],
      rotation: [Math.PI / 2, 0, Math.PI * 2],
    },
    {
      position: [0.2, -0.24, -0.48],
      rotation: [Math.PI / 2, 0, Math.PI * 2],
    },
    {
      position: [0, 0, -0.48],
      rotation: [Math.PI / 2, 0, Math.PI * 2],
    },
    {
      position: [0.24, 0.24, 0.48],
      rotation: [-Math.PI / 2, 0, 0],
    },
    {
      position: [-0.24, 0.24, 0.48],
      rotation: [-Math.PI / 2, 0, 0],
    },
    {
      position: [-0.24, -0.24, 0.48],
      rotation: [-Math.PI / 2, 0, 0],
    },
    {
      position: [0.24, -0.24, 0.48],
      rotation: [-Math.PI / 2, 0, 0],
    },
  ];

  for (const data of pointsData) {
    const points = new THREE.Mesh(pointsGeometry, pointMaterial);

    points.position.set(...data.position);
    points.rotation.set(...data.rotation);

    diceBoxMesh.add(points);
  }

  const controle = new OrbitControls(camera, renderer.domElement);
  function animate() {
    requestAnimationFrame(animate);
    controle.update();
    diceBoxMesh.rotation.y += 0.02;
    diceBoxMesh.rotation.x += 0.01;
    diceBoxMesh.rotation.z += 0.02;

    renderer.render(scene, camera);
  }
  animate();
}
