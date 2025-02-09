// THREE.js Scene Setup
let scene, camera, renderer, teddy;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
    document.getElementById("scene-container").appendChild(renderer.domElement);

    // Add Light
    const light = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(light);

    // Load 3D Teddy Model
    const loader = new THREE.GLTFLoader();
    loader.load('https://modelviewer.dev/shared-assets/models/Panda.glb', function(gltf) {
        teddy = gltf.scene;
        teddy.scale.set(1.5, 1.5, 1.5);
        scene.add(teddy);
        animateTeddy();
    });

    animate();
}

// Teddy Dancing Animation
function animateTeddy() {
    function dance() {
        if (teddy) {
            teddy.rotation.y += 0.05;
            teddy.position.y = Math.sin(Date.now() * 0.002) * 0.5;
        }
        requestAnimationFrame(dance);
    }
    dance();
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Floating Hearts Effect
function showHearts() {
    const heartsContainer = document.getElementById("hearts");

    for (let i = 0; i < 20; i++) {
        let heart = document.createElement("div");
        heart.innerHTML = "❤️";
        heart.classList.add("heart");
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 2 + 3 + "s";
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
}

// Initialize 3D Scene
init();
