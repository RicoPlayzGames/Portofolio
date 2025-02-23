// Scroll to Projects section when button is clicked
document.getElementById("viewWorkBtn").addEventListener("click", function () {
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
});

// Add mouse enter and leave events for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)'; // Slightly enlarge the card
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)'; // Reset the card size
    });
});

// Three.js setup
import * as THREE from 'three';

const canvas = document.getElementById('threejs-canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();