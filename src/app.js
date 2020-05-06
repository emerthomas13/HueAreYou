/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, Object3D, PerspectiveCamera, Vector3, Mesh, Color, MeshBasicMaterial, Font, FontLoader, TextGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SpaceScene } from 'scenes';

// Initialize core ThreeJS components
const scene = new SpaceScene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });



// Set up camera
camera.position.set(6, 3, -10);
camera.lookAt(new Vector3(5, -1, -10));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);


var text;
var geometry;


var color = new Color();
color.setRGB(1, 0, 0);
var textMaterial = new MeshBasicMaterial({ color: color });
var texts = [scene.textPositions.length];

var fontLoader = new FontLoader();
fontLoader.load("./node_modules/three/examples/fonts/helvetiker_regular.typeface.json", function (tex) {
    geometry = new TextGeometry('Question', {
        size: .3,
        height: .2,
        curveSegments: 6,
        font: tex,
    });
    //console.log("meep", scene.textPositions.length);


    //console.log("meep", scene.textPositions.length());
    for (let i = 0; i < scene.textPositions.length; i++) {
        texts[i] = new Mesh(geometry, textMaterial);
        scene.add(texts[i]);
        texts[i].position.set(scene.textPositions[i].x, scene.textPositions[i].y, scene.textPositions[i].z);
    }

    geometry = new TextGeometry('center', {
        size: .3,
        height: .2,
        curveSegments: 6,
        font: tex,
    });

    text = new Mesh(geometry, textMaterial);
    scene.add(text);

})


