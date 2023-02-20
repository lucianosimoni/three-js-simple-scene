import * as THREE from 'three';
import './app.css';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//   Add cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xd4a373 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//   Camera position and Lighting
camera.position.z = 5;
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// Render function
function render() {
    requestAnimationFrame(render);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

render();
