import * as THREE from 'https://cdn.skypack.dev/three@0.155.0';

// Target the specific container for the Three.js canvas
const container = document.getElementById('canvasContainer');
const canvas = document.getElementById('threeCanvas');

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });

// Set the size of the renderer to match the container
renderer.setSize(container.clientWidth, container.clientHeight);
camera.position.z = 5;

// Create a rotating cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00796b });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animation function
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// Call the animate function
animate();

// Adjust the canvas size on window resize
window.addEventListener('resize', () => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
