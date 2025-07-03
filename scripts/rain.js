import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js";

let scene, camera, renderer, rainParticles = [];
let rainGeo;
let rainPositions;
let originalRainPositions = [];
let rainDropSpeeds = []; // Individual speeds for each raindrop

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 150, 300);
    camera.lookAt(0, 0, 0);

    const ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    const directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.body.appendChild(renderer.domElement);

    // Rain setup
    rainGeo = new THREE.BufferGeometry();
    const rainCount = 20000;
    rainPositions = new Float32Array(rainCount * 3);
    originalRainPositions = new Array(rainCount);
    rainDropSpeeds = new Float32Array(rainCount);

    // Initialize rain with varied properties
    for (let i = 0; i < rainCount; i++) {
        const x = Math.random() * 1000 - 500;
        const y = Math.random() * 700 + 100; // Start above visible area
        const z = Math.random() * 600 - 300;

        rainPositions[i * 3] = x;
        rainPositions[i * 3 + 1] = y;
        rainPositions[i * 3 + 2] = z;

        originalRainPositions[i] = { x, z };
        rainDropSpeeds[i] = 0.3 + Math.random() * 0.4; // Vary speeds between 0.3 and 0.7
    }

    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));

    const rainMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.2,
        transparent: true,
        opacity: 0.8,
        depthTest: false,
        blending: THREE.AdditiveBlending,
    });

    const rain = new THREE.Points(rainGeo, rainMaterial);
    scene.add(rain);
    rainParticles = rainGeo.attributes.position.array;

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
}

function animate() {
    // Animate rain
    for (let i = 0; i < rainParticles.length; i += 3) {
        const particleIndex = i / 3;
        const originalPos = originalRainPositions[particleIndex];
        const speed = rainDropSpeeds[particleIndex];

        // Move down at individual speed
        rainParticles[i + 1] -= speed;

        // Subtle random deviation (max 0.5 units from original position)
        rainParticles[i] = originalPos.x + (Math.random() - 0.5) * 0.5;
        rainParticles[i + 2] = originalPos.z + (Math.random() - 0.5) * 0.5;

        // Smooth reset when below threshold
        if (rainParticles[i + 1] < -200) {
            // Instead of jumping to top, reset to a random position above view
            // This creates a continuous flow without visible "pop"
            rainParticles[i + 1] = 500 + Math.random() * 200;
            // Maintain original x/z coordinates but with slight variation
            rainParticles[i] = originalPos.x + (Math.random() - 0.5) * 10;
            rainParticles[i + 2] = originalPos.z + (Math.random() - 0.5) * 10;
        }
    }

    rainGeo.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();