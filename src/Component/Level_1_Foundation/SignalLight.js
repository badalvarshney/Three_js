import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function createRealisticHood() {
  const hood = new THREE.Group();

  const material = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.85,
    metalness: 0.2,
    side: THREE.DoubleSide
  });

  // ==========================
  // Top Half Cylinder
  // ==========================
  const top = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 0.78, 48, 1, false, 0.3, Math.PI),
    material,
  );

  top.rotation.z = Math.PI / 2;
  top.position.z = 0.24;
  hood.add(top);

  // ==========================
  // Left Plate
  // ==========================
  const leftPlate = new THREE.Mesh(
    new THREE.BoxGeometry(0.03, 0.38, 0.48),
    material,
  );

  leftPlate.position.set(-0.38, 0, 0.24);

  hood.add(leftPlate);

  // ==========================
  // Right Plate
  // ==========================
  const rightPlate = leftPlate.clone();
  rightPlate.position.x = 0.38;

  hood.add(rightPlate);

  // ==========================
  // Back Plate
  // ==========================
  const backPlate = new THREE.Mesh(
    new THREE.BoxGeometry(0.76, 0.38, 0.03),
    material,
  );

  backPlate.position.z = 0;

  hood.add(backPlate);

  // ==========================
  // Front Ring
  // ==========================
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(0.34, 0.025, 16, 64),
    material,
  );

  rim.rotation.x = Math.PI / 2;
  rim.position.z = 0.47;

  // hood.add(rim);

  return hood;
}

function createLens(color, emissive) {
  const group = new THREE.Group();

  // Main Convex Lens
  const lensGeometry = new THREE.SphereGeometry(
    0.33,
    64,
    64,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2.4,
  );

  lensGeometry.rotateX(Math.PI / 2);

  const lensMaterial = new THREE.MeshPhysicalMaterial({
    color,
    emissive,
    emissiveIntensity: 2,
    transmission: 0.2,
    clearcoat: 1,
    roughness: 0.05,
  });

  const lens = new THREE.Mesh(lensGeometry, lensMaterial);

  group.add(lens);

  // Fresnel Rings
  for (let r = 0.04; r < 0.31; r += 0.025) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.003, 8, 64),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.15,
      }),
    );

    ring.rotation.x = Math.PI / 2;
    ring.position.z = 0.11;

    group.add(ring);
  }

  group.userData.material = lensMaterial;

  return group;
}

function createBezel() {
  const geometry = new THREE.TorusGeometry(0.34, 0.03, 19, 80);

  const material = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.8,
  });

  const bezel = new THREE.Mesh(geometry, material);

  bezel.position.y = -0.14;
  bezel.position.z = 0.08;

  return bezel;
}

export default function SignalLight() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 5;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);
  document.body.appendChild(renderer.domElement);

  // Pole
  const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4);
  const poleMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
  const pole = new THREE.Mesh(poleGeometry, poleMaterial);
  pole.position.y = -1.6;

  // Signal Box
  const signalBoxGeometry = new THREE.BoxGeometry(
    1, // width
    3, // height
    0.5, // depth
  );
  const signalBoxMaterial = new THREE.MeshStandardMaterial({
    color: 0x3f4a43,
    roughness: 0.9,
    metalness: 0.15,
  });

  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 3);

  dirLight.position.set(4, 8, 8);

  scene.add(dirLight);
  const signalBox = new THREE.Mesh(signalBoxGeometry, signalBoxMaterial);
  signalBox.position.y = 1.35;

  // Traffic Signal Group
  const trafficSignal = new THREE.Group();

  trafficSignal.add(pole);
  trafficSignal.add(signalBox);

  scene.add(trafficSignal);

  const redHood = createRealisticHood();
  const yellowHood = createRealisticHood();
  const greenHood = createRealisticHood();

  redHood.position.set(0, 1, 0.22);
  yellowHood.position.set(0, 0.1, 0.22);
  greenHood.position.set(0, -0.8, 0.22);

  const redLight = createLens(0x383838, 0xff0000);
  const yellowLight = createLens(0x383838, 0xffff00);
  const greenLight = createLens(0x383838, 0x00ff00);

  // Positioning the lights and borders
  redLight.position.set(0, -0.14, -0.01);
  yellowLight.position.set(0, -0.14, -0.01);
  greenLight.position.set(0, -0.14, -0.01);

  redHood.add(redLight);
  yellowHood.add(yellowLight);
  greenHood.add(greenLight);

  redHood.add(createBezel());
  yellowHood.add(createBezel());
  greenHood.add(createBezel());

  signalBox.add(redHood);
  signalBox.add(yellowHood);
  signalBox.add(greenHood);

  const controls = new OrbitControls(camera, renderer.domElement);

  controls.update();
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  const redMaterial = redLight.userData.material;
  const yellowMaterial = yellowLight.userData.material;
  const greenMaterial = greenLight.userData.material;

  function turnOffAll() {
    redMaterial.emissiveIntensity = 0;
    yellowMaterial.emissiveIntensity = 0;
    greenMaterial.emissiveIntensity = 0;
  }

  function startTrafficSignal() {
    function cycle() {
      // RED
      turnOffAll();
      redMaterial.emissiveIntensity = 2;

      setTimeout(() => {
        // YELLOW
        turnOffAll();
        yellowMaterial.emissiveIntensity = 2;

        setTimeout(() => {
          // GREEN
          turnOffAll();
          greenMaterial.emissiveIntensity = 2;

          setTimeout(() => {
            cycle();
          }, 10000); // Green 10 sec
        }, 4000); // Yellow 4 sec
      }, 10000); // Red 10 sec
    }

    cycle();
  }
  startTrafficSignal();

  animate();
}
