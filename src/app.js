/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, Object3D, PerspectiveCamera, Vector3, Mesh, Color, MeshBasicMaterial, Font, FontLoader, TextGeometry, Vector2, Raycaster } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SpaceScene } from 'scenes';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'

// Initialize core ThreeJS components
const scene = new SpaceScene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });
const EPS = 0.00005;
var updateA, updateB, updateC, updateD, updateE, updateF = false;
var mouse = new Vector2();
var raycaster = new Raycaster();
var groupA = new TWEEN.Group();
var groupB = new TWEEN.Group();
var groupC = new TWEEN.Group();
var groupD = new TWEEN.Group();
var groupE = new TWEEN.Group();
var groupF = new TWEEN.Group();


// Set up camera
camera.position.set(6, 3, -10);
camera.lookAt(new Vector3(-5, 0, -5));
//console.log(camera);

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
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    var object;
    if (event) {
        for (var i = 0; i < intersects.length; i++) {
            object = intersects[i].object.id;
            if (object == 45) {
                updateA = true;
                i++
            }
            else if (object == 40 && !updateA) {
                updateB = true;
                i++
            }
            else if (object == 41 && !updateB) {
                updateC = true;
                i++
            }
            else if (object == 42 && !updateC) {
                updateD = true;
                i++
            }
            else if (object == 43 && !updateD) {
                updateE = true;
                i++
            }
            else if (object == 44 && !updateE) {
                updateF = true;
                i++
            }
        }
    }
}
// set up transitions
var currentCam = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
};

var pos1 = { x: -2.2, y: -0.8, z: 9.1 };
var pos2 = { x: 7.1, y: -1.2, z: 12.4 };
var pos3 = { x: 5.7, y: -0.4, z: -0.9 };
var pos4 = { x: 6.7, y: 7, z: 4 };
var pos5 = { x: 0.6, y: 11.8, z: 4.7 };
var pos6 = { x: -5.0, y: -1.3, z: 9.1 };

var tweenA = new TWEEN.Tween(currentCam, groupA)
    .to(pos1, 6000)
    .onUpdate(function () {
        camera.position.set(currentCam.x, currentCam.y, currentCam.z);
        //console.log(currentCam.x);
    })
    .onComplete(function () {
        updateA = false;
        console.log("A complete");
    })
    .easing(TWEEN.Easing.Elastic.InOut)
    .delay(10000)
    .start();

var tweenB = new TWEEN.Tween(pos1, groupB)
    .to(pos2, 6000)
    .onUpdate(function () {
        camera.position.set(pos1.x, pos1.y, pos1.z);
    })
    .onComplete(function () {
        updateB = false;
        console.log("B complete");
    })
    .easing(TWEEN.Easing.Elastic.InOut)
    .delay(10000)
    .start();


var tweenC = new TWEEN.Tween(pos2, groupC)
    .to(pos3, 6000)
    .onUpdate(function () {
        camera.position.set(pos2.x, pos2.y, pos2.z);
    })
    .onComplete(function () {
        updateC = false;
        console.log("C complete");
    })
    .easing(TWEEN.Easing.Elastic.InOut)
    .delay(10000)
    .start();

var tweenD = new TWEEN.Tween(pos3, groupD)
    .to(pos4, 6000)
    .onUpdate(function () {
        camera.position.set(pos3.x, pos3.y, pos3.z);
    })
    .onComplete(function () {
        console.log("D complete");
        updateD = false;
    })
    .easing(TWEEN.Easing.Elastic.InOut)
    .delay(10000)
    .start();

var tweenE = new TWEEN.Tween(pos4, groupE)
    .to(pos5, 6000)
    .onUpdate(function () {
        camera.position.set(pos4.x, pos4.y, pos4.z);
    })
    .onComplete(function () {
        console.log("E complete");
        updateE = false;
    })
    .easing(TWEEN.Easing.Elastic.InOut)
    .delay(10000)
    .start();
var tweenF = new TWEEN.Tween(pos5, groupF)
    .to(pos6, 6000)
    .onUpdate(function () {
        camera.position.set(pos5.x, pos5.y, pos5.z);
    })
    .onComplete(function () {
        console.log("F complete");
        updateF = false;
    })
    .easing(TWEEN.Easing.Back.InOut)
    .delay(10000)
    .start();
tweenA.chain(tweenB);
tweenB.chain(tweenC);
tweenC.chain(tweenD);
tweenD.chain(tweenE);
tweenE.chain(tweenF);

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    if (updateA) groupA.update();
    else if (updateB) {
        tweenA.stop();
        groupB.update();
    }
    else if (updateC) {
        tweenB.stop();
        groupC.update();
    }
    else if (updateD) {
        tweenC.stop();
        groupD.update();
    }
    else if (updateE) {
        tweenD.stop();
        groupE.update();
    }
    else if (updateF) {
        tweenE.stop();
        groupF.update();
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

const qstr = 'You hear the howl of a \n dangerous monster in the distance. \n What do you do?|Some friends meet you \n on the road. Who do you bring \n along for the journey?|Along the way you must \ntrain and study. Which \n course do you select?|As you grow closer, voices \n scream your worst nightmares. \n What do you hear?|Your color is:';
var questionContents = qstr.split('|');

const astr = 'a) Take off before its too late | a) Friend with more resources | a) Carry sword, study defensive spells | a) That you will never do good';
var answerContents = astr.split('|');
const bstr = 'b) Pause and make a plan | b) Friend with more talent | b) Carry shield, study offensive spells | b) That you will never have power ';
var banswerContents = bstr.split('|');
answerContents.push(hue.toString());
banswerContents.push(lightness.toString());

var text;
var geometry;
var ageometry;
var bgeometry;

var place = 0;
var color = new Color();
color.setRGB(1, 1, 1);
var textMaterial = new MeshBasicMaterial({ color: customColor });
var textMaterial2 = new MeshBasicMaterial({ color: color });
//var textMaterial3 = new MeshBasicMaterial({ color: customColor });
var questionTexts = [scene.textPositions.length];
var answerTexts = [scene.textPositions.length];
var banswerTexts = [scene.textPositions.length];

var fontLoader = new FontLoader();
fontLoader.load("./node_modules/three/examples/fonts/gentilis_regular.typeface.json", function (tex) {
    for (let i = 0; i < scene.textPositions.length; i++) {
        geometry = new TextGeometry(questionContents[i], {
            size: 0.1,
            height: 0.1,
            curveSegments: 4,
            font: tex,
        });
        ageometry = new TextGeometry(answerContents[i], {
            size: 0.1,
            height: 0.1,
            curveSegments: 4,
            font: tex,
        });
        bgeometry = new TextGeometry(banswerContents[i], {
            size: 0.1,
            height: 0.1,
            curveSegments: 4,
            font: tex,
        });
        questionTexts[i] = new Mesh(geometry, textMaterial);

        answerTexts[i] = new Mesh(ageometry, textMaterial2);
        banswerTexts[i] = new Mesh(bgeometry, textMaterial2);


        scene.add(questionTexts[i], answerTexts[i], banswerTexts[i]);

        questionTexts[i].position.set(scene.textPositions[i].x, scene.textPositions[i].y, scene.textPositions[i].z);
        answerTexts[i].position.set(scene.textPositions[i].x, scene.textPositions[i].y - 0.75, scene.textPositions[i].z);
        banswerTexts[i].position.set(scene.textPositions[i].x, scene.textPositions[i].y - 1, scene.textPositions[i].z);
        questionTexts[i].lookAt(scene.lookAtPositions[i]);
    }

    // geometry = new TextGeometry('center', {
    //     size: .3,
    //     height: .2,
    //     curveSegments: 6,
    //     font: tex,
    // });

    // text = new Mesh(geometry, textMaterial);
    // text.position.set(5.6, -1, 4);
    // scene.add(text);

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
