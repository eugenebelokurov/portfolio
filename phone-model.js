// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1200);
const renderer = new THREE.WebGLRenderer();

// Set the size to the container's size
const container = document.getElementById('three-container');
console.log(container.clientHeight);
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Create iPhone dimensions (adjust as needed)
const width = 2.8;
const height = 7;
const depth = 0.3;

// Create materials
const materials = [
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('new-covers/app-case/right-side-short.png'),
        transparent: true, opacity: 1
    }),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('new-covers/app-case/left-side-short.png'),
        transparent: true, opacity: 1
    }),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('new-covers/app-case/top.png')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('new-covers/app-case/bottom.png')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('new-covers/app-case/front-black.png'),
        transparent: true, opacity: 1
    }),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('new-covers/app-case/back.png'),
        transparent: true, opacity: 1
    })
];

// Create a BoxGeometry for the main iPhone body
const geometry = new THREE.BoxGeometry(width, height, depth);
const iphone = new THREE.Mesh(geometry, materials);

// Create a cylinder for the rounded corner
const cornerRadius = 0.49;
const cornerSegments = 8;
const cornerGeometry = new THREE.CylinderGeometry(cornerRadius, cornerRadius, depth, cornerSegments, 1, true, 0, Math.PI / 3);

// Create materials for the cylinder
const cylinderMaterials = [
    new THREE.MeshBasicMaterial({ color: 0x37393A }), // Side face
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }), // Top face
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })  // Bottom face
];

// Create the cylinder mesh with the specified materials
const cornerTopLeft = new THREE.Mesh(cornerGeometry, cylinderMaterials);
const cornerTopRight = new THREE.Mesh(cornerGeometry, cylinderMaterials);
const cornerBottomLeft = new THREE.Mesh(cornerGeometry, cylinderMaterials);
const cornerBottomRight = new THREE.Mesh(cornerGeometry, cylinderMaterials);

// Position and rotate the corner cylinder
cornerTopLeft.position.set(-width / 2 + cornerRadius, height / 2 - cornerRadius, 0);
cornerTopLeft.rotation.z = Math.PI / 2;
cornerTopLeft.rotation.y = -1 * Math.PI / 2;

cornerTopRight.position.set(width / 2 - cornerRadius, height / 2 - cornerRadius, 0);
cornerTopRight.rotation.z = Math.PI / 2;
cornerTopRight.rotation.y = 1 * Math.PI / 2;

cornerBottomLeft.position.set(-width / 2 + cornerRadius, -height / 2 + cornerRadius, 0);
cornerBottomLeft.rotation.z = -1 * Math.PI / 2;
cornerBottomLeft.rotation.y = -1 * Math.PI / 2;

cornerBottomRight.position.set(width / 2 - cornerRadius, -height / 2 + cornerRadius, 0);
cornerBottomRight.rotation.z = -1 * Math.PI / 2;
cornerBottomRight.rotation.y = 1 * Math.PI / 2;

// Set rendering order
iphone.renderOrder = 1;
cornerTopLeft.renderOrder = 2;
cornerTopRight.renderOrder = 2;
cornerBottomLeft.renderOrder = 2;
cornerBottomRight.renderOrder = 2;

// Create a group to hold the iPhone and corner
const iphoneGroup = new THREE.Group();
iphoneGroup.add(iphone);
iphoneGroup.add(cornerTopLeft);
iphoneGroup.add(cornerTopRight);
iphoneGroup.add(cornerBottomLeft);
iphoneGroup.add(cornerBottomRight);

scene.add(iphoneGroup);

const scaleFactor = 2; // Adjust this value to change the size
iphoneGroup.scale.set(scaleFactor, scaleFactor, scaleFactor);

// Position the camera
camera.position.z = 12;

// Position the camera
// camera.position.z = 10;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the iPhone group only around the Y axis
    iphoneGroup.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener('resize', function() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}, false);