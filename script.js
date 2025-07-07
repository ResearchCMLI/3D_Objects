import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.155.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient light for better lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// Add hemisphere light as before
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(hemiLight);

// Add axes helper to visualize axes
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const loader = new GLTFLoader();
loader.load('scene.gltf', function (gltf) {
  scene.add(gltf.scene);
  gltf.scene.position.set(0, 0, 0);
  console.log('Model loaded:', gltf);
}, undefined, function (error) {
  console.error('Error loading model:', error);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
