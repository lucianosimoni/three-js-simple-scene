import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './app.css';

// TODO: CAMERA: Make the Camera bounce
// TODO: CAMERA: Give it a Initial Position
// TODO: CUBE: Remove it
// TODO: Add Skybox
// TODO: Add Light
// TODO: Create the css3drenderer in the Monitor Screen

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xd4a373 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Camera position and Lighting
camera.position.z = 10;
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// Load 3D Model
const loader = new GLTFLoader();
loader.load(
    '../src/room.glb',
    (gltf) => {
        // Called when resource is loaded
        gltf.scene.scale.set(1, 1, 1);
        scene.add(gltf.scene);
    },
    (xhr) => {
        // Called while loading is progressing
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        // Called when loaing has errors
        console.error('An error happened while loading room.glb\n', error);
    }
);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(2, 0, 3);
scene.add(directionalLight);

// Create OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Render function
function render() {
    requestAnimationFrame(render);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

export { render };
