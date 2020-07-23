const settings = {
  // Make the loop animated unless ?static is passed to URL
  animate: !/static/i.test(window.location.search),
  // Get a WebGL canvas rather than 2D
  context: "webgl"
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor("#fff", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
  camera.position.set(2, 2, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);
  controls.enableZoom = false;

  // Setup your scene
  const scene = new THREE.Scene();

  const gridScale = 10;
  scene.add(new THREE.GridHelper(gridScale, 10, "hsl(0, 0%, 50%)", "hsl(0, 0%, 70%)"));

  const objects = new THREE.Group();

  const sphere = new THREE.SphereGeometry(1, 64, 32);
  const centerObject = new THREE.Mesh(
    sphere,
    new THREE.MeshBasicMaterial({ color: '#FF4136' })
  );
  objects.add(centerObject);
  
  const moonAnchor = new THREE.Group();
  
  const moons = new THREE.Group();
  const moon0 = new THREE.Mesh(
    sphere,
    new THREE.MeshBasicMaterial({ color: '#3D9970' })
  );
  
  const moon1 = new THREE.Mesh(
    sphere,
    new THREE.MeshBasicMaterial({ color: '#39CCCC' })
  );
  moon1.scale.setScalar(0.35);
  moon1.position.x = 1.5;
  moon1.position.y = 0.5;
  
  moons.add(moon0);
  moons.add(moon1);

  moons.scale.setScalar(0.25);
  moons.position.x = 1.65;
  
  moonAnchor.add(moons);
  objects.add(moonAnchor);
  
  objects.position.y = 1;
  scene.add(objects);
  
  // target the center of the objects for orbit controls
  controls.target.copy(objects.position);
  
  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ deltaTime }) {
      moons.rotateY(deltaTime * 0.75);
      moonAnchor.rotateY(deltaTime * 0.25);
      
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
