import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { triplanarTexture } from "three/tsl";

export default function Windmill() {
  const canvas = document.createElement("canvas");
  canvas.id = "wind"
  document.body.appendChild(canvas);
  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 12;
  camera.position.y = 3;
  camera.position.x = -4;

  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xf1f1f1f1, 0);

  // Group
  const windmillGroup = new THREE.Group();
  scene.add(windmillGroup);

  // AmbientLight
  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  // Direction Light
  const dirLight = new THREE.DirectionalLight(0xffffff, 3);
  dirLight.position.set(4, 8, 8);
  scene.add(dirLight);

  // Pole Material and Mesh
  const poleGeometry = new THREE.CylinderGeometry(0.1, 0.3, 7, 42, 28);
  const poleMaterial = new THREE.MeshStandardMaterial({
    color: 0xa5b7d6,
    roughness: 1,
    metalness: 0,
  });

  const pole = new THREE.Mesh(poleGeometry, poleMaterial);
  windmillGroup.add(pole);

  //  Center Base
  const centerBox = new THREE.BoxGeometry(0.4, 0.16, 0.4);

  const centerBoxMesh = new THREE.Mesh(centerBox, poleMaterial);
  centerBoxMesh.position.y = 3.5;
  centerBoxMesh.position.z = -0.16;
  windmillGroup.add(centerBoxMesh);

  // Center Base half curcle
  const centerRound = new THREE.CylinderGeometry(
    0.2,
    0.2,
    0.16,
    32,
    1,
    false,
    4.77,
    3.04,
  );

  const centerRoundMesh = new THREE.Mesh(centerRound, poleMaterial);
  centerRoundMesh.position.z = 0.18;
  centerBoxMesh.add(centerRoundMesh);

  // Top Base
  const topBase = new THREE.CapsuleGeometry(0.3, 1, 32, 42, 1);

  const topBaseMesh = new THREE.Mesh(topBase, poleMaterial);
  topBaseMesh.position.set(0, 3.81, -0.3);
  topBaseMesh.rotation.x = Math.PI / 2;
  windmillGroup.add(topBaseMesh);

  // Top Base Middle
  const topMiddleBase = new THREE.CapsuleGeometry(0.3, 1, 1, 42, 1);

  const topMiddleBaseMesh = new THREE.Mesh(topMiddleBase, poleMaterial);
  topMiddleBaseMesh.position.set(0, 0.15, 0);
  topBaseMesh.add(topMiddleBaseMesh);

  // Top Base Hub
  const topBaseHub = new THREE.CapsuleGeometry(0.23, 0.4, 32, 42, 1);

  const topBaseHubMesh = new THREE.Mesh(topBaseHub, poleMaterial);
  topBaseHubMesh.position.set(0, 3.81, 0.35);
  topBaseHubMesh.rotation.x = Math.PI / 2;
  windmillGroup.add(topBaseHubMesh);

  // hubRing
  const hubRing = new THREE.TorusGeometry(0.06, 0.02, 30, 200);

  const hubRingMesh = new THREE.Mesh(hubRing, poleMaterial);
  hubRingMesh.position.set(0, 0.17, -0.22);

  const hubSecondRingMesh = new THREE.Mesh(hubRing, poleMaterial);
  hubSecondRingMesh.rotation.set(0, 7.3, 0);
  hubSecondRingMesh.position.set(0.18, 0.16, 0.13);

  const hubThirdRingMesh = new THREE.Mesh(hubRing, poleMaterial);
  hubThirdRingMesh.rotation.set(0, 14.6, 0);
  hubThirdRingMesh.position.set(-0.2, 0.16, 0.09);

  topBaseHubMesh.add(hubRingMesh);
  topBaseHubMesh.add(hubSecondRingMesh);
  topBaseHubMesh.add(hubThirdRingMesh);

  // Blade
  const bladeGeometry = new THREE.CylinderGeometry(
    0.3,
    0.03,
    1,
    15,
    42,
    true,
    11.4,
    2,
  );
  const bladeMaterial = new THREE.MeshStandardMaterial({
    color: 0xa5b7d6,
    metalness: 0,
    roughness: 1,
    side: THREE.DoubleSide,
  });
  const bladeMesh = new THREE.Mesh(bladeGeometry, bladeMaterial);
  bladeMesh.rotation.set(-14.26, 0, 0);
  bladeMesh.position.set(0, -0.04, -0.5);
  hubRingMesh.add(bladeMesh);

  const twobladeMesh = new THREE.Mesh(bladeGeometry, bladeMaterial);
  twobladeMesh.rotation.set(-14.26, 0, 0.9);
  twobladeMesh.position.set(-0.5, -0.04, -0.6);
  hubSecondRingMesh.add(twobladeMesh);

  const threebladeMesh = new THREE.Mesh(bladeGeometry, bladeMaterial);
  threebladeMesh.rotation.set(-14.26, -0.2, 2.1);
  threebladeMesh.position.set(-0.6, -0.04, 0.55);
  hubThirdRingMesh.add(threebladeMesh);

  const secondBladeGeometry = new THREE.CylinderGeometry(
    0.03,
    0.3,
    2.5,
    15,
    42,
    true,
    11.4,
    2,
  );

  const secondBladeMesh = new THREE.Mesh(secondBladeGeometry, bladeMaterial);
  secondBladeMesh.rotation.set(0.2, 0, 0);
  secondBladeMesh.position.set(0, 1.756, 0.25);
  bladeMesh.add(secondBladeMesh);

  const secondTwoBladeMesh = new THREE.Mesh(secondBladeGeometry, bladeMaterial);
  secondTwoBladeMesh.rotation.set(0.2, 0, 0);
  secondTwoBladeMesh.position.set(0, 1.756, 0.25);
  twobladeMesh.add(secondTwoBladeMesh);

  const secondThreeBladeMesh = new THREE.Mesh(
    secondBladeGeometry,
    bladeMaterial,
  );
  secondThreeBladeMesh.rotation.set(0.2, 0, 0);
  secondThreeBladeMesh.position.set(0, 1.756, 0.25);
  threebladeMesh.add(secondThreeBladeMesh);

  // Controls
  // const controls = new OrbitControls(camera, renderer.domElement);
  function animate() {
    requestAnimationFrame(animate);
    // controls.update();
    topBaseHubMesh.rotation.y += -0.04;
    renderer.render(scene, camera);
  }
  animate();
}
