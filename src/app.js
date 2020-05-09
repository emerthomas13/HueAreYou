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
const EPS = 0.00005;
var update = false;
var nextPos = -1;
var dX, dY, dZ;


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

window.addEventListener("click", clicks, false);
function clicks(event) {
    if (event) {
        update = true;
        nextPos++;
        if (nextPos < scene.cameraPositions.length) {
            camUpdate(scene.cameraPositions[nextPos]);
        }
    }
}

function camUpdate(position) {
    console.log(position.x);
    dX = (position.x - camera.position.x) / 150;
    dY = (position.y - camera.position.y) / 150;
    dZ = (position.z - camera.position.z) / 150;
}

//camera update position
function camUpdatePos(position) {
    //variable camera change
    if (Math.abs(camera.position.x - position.x) > EPS) {
        camera.position.x = camera.position.x + dX;
    }
    if (Math.abs(camera.position.y - position.y) > EPS) {
        camera.position.y = camera.position.y + dY;
    }
    if (Math.abs(camera.position.z - position.z) > EPS) {
        camera.position.z = camera.position.z + dZ;
    }
    if (Math.abs(camera.position.distanceTo(position)) < EPS) {
        console.log(camera.position);
        update = false;
    }
}

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    if (update && (nextPos < scene.cameraPositions.length)) {
        camUpdatePos(scene.cameraPositions[nextPos]);
    }
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


// You hear the howl of a dangerous monster in the distance. \n What do you do?
// Take off before its too late.
// Pause and make a plan.

// Some friends meet you on the road. \n Who do you bring along for the journey?
// Friend with more resources.
// Friend with more talent.

// Along the way you must train and study. \n Which course do you select?
// Train with sword, study defensive spells.
// Train with shield, study offensive spells.

// As you grow closer, voices scream your worst nightmares. \n What do you hear?
// That you will never do good.
// That you will never have power.

// Your color is:




var val = [0, 0, 0];
// deal with color based on responses
function findColor(val) {
    var hue = Math.random() * 0.125;
    // roughly yellow [0.125 - 0.25]
    if (val[0] == 0 && val[1] == 1 && val[2] == 1) {
        hue += 0.125;
    }
    // roughly green [0.25 - 0.375]
    else if (val[0] == 1 && val[1] == 1 && val[2] == 1) {
        hue += 0.25;
    }
    // roughly aqua [0.375 - 0.5]
    else if (val[0] == 1 && val[1] == 1 && val[2] == 0) {
        hue += 0.375;
    }
    // roughly blue [0.5 - 0.625]
    else if (val[0] == 1 && val[1] == 0 && val[2] == 0) {
        hue += 0.5;
    }
    // roughly dark purple [0.625 - 0.75]
    else if (val[0] == 1 && val[1] == 0 && val[2] == 1) {
        hue += 0.625;
    }
    // roughly purple/ pink [0.75 - 0.875]
    else if (val[0] == 0 && val[1] == 0 && val[2] == 1) {
        hue += 0.75;
    }
    // roughly pink/red [0.875 - 1.0]
    else if (val[0] == 0 && val[1] == 0 && val[2] == 0) {
        hue += 0.875;
    }
    // else roughly orange [0 - 0.125]
    // if (val[0] == 0 && val[1] == 1 && val[2] == 0) {
    //     hue = Math.random() * 0.125;
    // }
    return hue;
}
var hue = findColor(val);
// TODO set based on q4 result
var lightness = 0.5;
var hslCustom = [hue, 1, lightness];
var rgbCustom = hslToRgb(hslCustom);
var customColor = new Color();
customColor.setRGB(rgbCustom[0], rgbCustom[1], rgbCustom[2]);
//console.log(customColor);



// adding text for questions

var qstr = 'You hear the howl of a \n dangerous monster in the distance. \n What do you do?|Some friends meet you \n on the road. Who do you bring \n along for the journey?|Along the way you must \ntrain and study. Which \n course do you select?|As you grow closer, voices \n scream your worst nightmares. \n What do you hear?|Your color is:';
var questionContents = qstr.split('|');

var text;
var geometry;

var color = new Color();
color.setRGB(1, 0, 0);
var textMaterial = new MeshBasicMaterial({ color: customColor });
var questionTexts = [scene.textPositions.length];

var fontLoader = new FontLoader();
fontLoader.load("./node_modules/three/examples/fonts/gentilis_regular.typeface.json", function (tex) {
    for (let i = 0; i < scene.textPositions.length; i++) {
        geometry = new TextGeometry(questionContents[i], {
            size: .2,
            height: .2,
            curveSegments: 4,
            font: tex,
        });

        questionTexts[i] = new Mesh(geometry, textMaterial);
        scene.add(questionTexts[i]);
        questionTexts[i].position.set(scene.textPositions[i].x, scene.textPositions[i].y, scene.textPositions[i].z);
        questionTexts[i].lookAt(scene.lookAtPositions[i]);
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



// helper color functions
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