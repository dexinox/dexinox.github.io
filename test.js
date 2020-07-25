// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [],
  pixelsPerInch: 300,
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl"
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("#0000", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(80, 1, 0.01, 100);
  camera.position.set(5, 2, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  const loader = new THREE.TextureLoader();
  const texture = loader.load("brick-diffuse.jpg");
  const earthTexture = loader. load("earth.jpg");
  const moonTexture = loader.load("moon.jpg");


  // Setup a material

  



  const material = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: texture
  });

  

  // Setup a mesh with geometry + material
  
  //this is sun
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);


  const sunLight = new THREE.PointLight("white", 2);
  sunLight.position.set(2, 2, 0);
  mesh.add(sunLight);
  //end sun



  //this is earth
  const earthGroup = new THREE.Group();

  const earthMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: earthTexture
  });
  const earthMesh = new THREE.Mesh(geometry, earthMaterial);
  earthMesh.position.set(3, 0, 2);
  earthMesh.scale.setScalar(0.5);
  earthGroup.add(earthMesh);

  scene.add(earthGroup);


  //end earth








  //this is moon
  const moonGroup = new THREE.Group();

  const moonMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: moonTexture
  });
  const moonMesh = new THREE.Mesh(geometry, moonMaterial);
  moonMesh.position.set(4, 0, 2);
  moonMesh.scale.setScalar(0.25);
  moonGroup.add(moonMesh);

  scene.add(moonGroup);


  const light = new THREE.PointLight("white", 2);
  //light.position.set(2, 2, 0);
  //moonGroup.add(light);
  //end moon



  //scene.add(new THREE.GridHelper(5, 50));
  scene.add(new THREE.PointLightHelper(light, 0.15));


  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      mesh.rotation.y = time * 0.1;
      earthMesh.rotation.y = time * 0.1;
      earthGroup.rotation.y = time * 0.1;
      moonMesh.rotation.y = time * 0.1;
      moonGroup.rotation.y = time * 0.1;
      

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
