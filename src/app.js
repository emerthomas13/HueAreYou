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
camera.lookAt(new Vector3(-5, 0, -5));
console.log(camera);

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


// deal with color
var hue = Math.random();
var lightness = 0.5;
var hslCustom = [hue, 1, lightness];
var rgbCustom = hslToRgb(hslCustom);
var customColor = new Color();
customColor.setRGB(rgbCustom[0], rgbCustom[1], rgbCustom[2]);
console.log(customColor);



// adding text for question
var text;
var geometry;

var color = new Color();
color.setRGB(1, 0, 0);
var textMaterial = new MeshBasicMaterial({ color: customColor });
var texts = [scene.textPositions.length];

var fontLoader = new FontLoader();
fontLoader.load("./node_modules/three/examples/fonts/helvetiker_regular.typeface.json", function (tex) {
    geometry = new TextGeometry('Question', {
        size: .3,
        height: .2,
        curveSegments: 6,
        font: tex,
    });
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



// helper color functions;
function hslToRgb(data) {

    var h = data[0];
    var s = data[1];
    var l = data[2];

    var m1, m2;
    m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
    m1 = l * 2 - m2;
    var hueToRGB = function (m1, m2, h) {
        h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
        if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
        if (h * 2 < 1) return m2;
        if (h * 3 < 2) return m1 + (m2 - m1) * (0.66666 - h) * 6;
        return m1;
    };

    return [hueToRGB(m1, m2, h + 1 / 3), hueToRGB(m1, m2, h), hueToRGB(m1, m2, h - 1 / 3)]
};

function rgbToHsl(data) {
    var r = data[0],
        g = data[1],
        b = data[2];
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h,
        s,
        l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [h, s, l];
};


