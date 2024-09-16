// Set up Three.js scene
import * as THREE from 'https://cdn.skypack.dev/three@0.155.0';

// Adjust canvas based on its new container (if needed)
const canvas = document.getElementById('threeCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(canvas.clientWidth, canvas.clientHeight);
camera.position.z = 5;

// Create a rotating cube (as before)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00796b });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animate function
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();
