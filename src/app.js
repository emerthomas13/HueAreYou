/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, Object3D, MeshPhongMaterial, BoxGeometry, PerspectiveCamera, Vector3, Mesh, Color, MeshBasicMaterial, Font, FontLoader, TextGeometry, Vector2, Raycaster } from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { SpaceScene } from 'scenes';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'

// Initialize core ThreeJS components
const scene = new SpaceScene();
//console.log(scene);
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });
const EPS = 0.00005;
var time = 4000;
var updateA, updateB, updateC, updateD, updateE, updateF = false;
var mouse = new Vector2();
var hemiColor = scene.children[1].children[1].color;
var ambiColor = scene.children[1].children[0].color;
var spotColor = scene.children[1].children[2].color;
var bg = scene.background;
var raycaster = new Raycaster();
var groupA = new TWEEN.Group();
var groupB = new TWEEN.Group();
var groupC = new TWEEN.Group();
var groupD = new TWEEN.Group();
var groupE = new TWEEN.Group();
var groupF = new TWEEN.Group();
var prevTime = Date.now();
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var velocity = new Vector3();
var direction = new Vector3();
var vertex = new Vector3();
var colorVals = [0, 0, 0];
var colorLight = Math.random() * 0.25;

// Set up camera
camera.position.set(6, 3, 15);
camera.lookAt(new Vector3(3, 0, 5));
//console.log(camera);

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new PointerLockControls(camera, canvas);
controls.addEventListener('locked', function () {

});
var onKeyDown = function (event) {

    switch (event.keyCode) {

        case 38: // up
        case 87: // w
            moveForward = true;
            break;

        case 37: // left
        case 65: // a
            moveLeft = true;
            break;

        case 40: // down
        case 83: // s
            moveBackward = true;
            break;

        case 39: // right
        case 68: // d
            moveRight = true;
            break;
    }
};
var onKeyUp = function (event) {

    switch (event.keyCode) {

        case 38: // up
        case 87: // w
            moveForward = false;
            break;

        case 37: // left
        case 65: // a
            moveLeft = false;
            break;

        case 40: // down
        case 83: // s
            moveBackward = false;
            break;

        case 39: // right
        case 68: // d
            moveRight = false;
            break;

    }
};
window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

window.addEventListener("click", clicks, false);
var j = 0;
function clicks(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    var object;
    if (event && intersects.length > 0) {
        for (var i = 0; i < intersects.length; i++) {
            object = intersects[i].object.id;
            if (object == 21 && !tweenA.isPlaying()) {
                //addText(2);
                intersects[i].object.material = ansMaterial;
                makeVisible(1, true);
                updateA = false;
                hemiB.start();
                spotB.start();
                ambiB.start();
                bgB.start();
                tweenB.start();
                lookB.start();
                updateB = true;
                i++
            }
            else if (object == 22 && !tweenA.isPlaying()) {
                //addText(2);
                // console.log(questionTexts[2]);
                intersects[i].object.material = bansMaterial;
                makeVisible(1, true);
                colorVals[0] = 1;
                updateA = false;
                hemiB.start();
                spotB.start();
                ambiB.start();
                bgB.start();
                tweenB.start();
                lookB.start();
                updateB = true;
                i++
            }
            else if (object == 24 && !tweenB.isPlaying()) {
                //console.log(questionTexts[3]);

                intersects[i].object.material = ansMaterial;
                makeVisible(2, true);
                updateB = false;
                hemiC.start();
                spotC.start();
                ambiC.start();
                bgC.start();
                tweenC.start();
                lookC.start();
                updateC = true;
            }
            else if (object == 25 && !tweenB.isPlaying()) {

                intersects[i].object.material = bansMaterial;
                makeVisible(2, true);
                colorVals[1] = 1;
                updateB = false;
                hemiC.start();
                spotC.start();
                ambiC.start();
                bgC.start();
                tweenC.start();
                lookC.start();
                updateC = true;
            }
            else if (object == 27 && !tweenC.isPlaying()) {
                intersects[i].object.material = ansMaterial;
                makeVisible(3, true);
                updateC = false;
                hemiD.start();
                spotD.start();
                ambiD.start();
                bgD.start();
                tweenD.start();
                lookD.start();
                updateD = true;
                i++
            }
            else if (object == 28 && !tweenC.isPlaying()) {
                intersects[i].object.material = bansMaterial;
                makeVisible(3, true);
                updateC = false;
                hemiD.start();
                spotD.start();
                ambiD.start();
                bgD.start();
                tweenD.start();
                lookD.start();
                colorVals[2] = 1;
                console.log('3b', colorVals);
                updateD = true;
                i++
            }
            else if (object == 30 && !tweenD.isPlaying()) {
                intersects[i].object.material = ansMaterial;
                colorLight = Math.random() * 0.25 + 0.25;
                makeShape(colorVals, colorLight);
                updateD = false;
                hemiE.start();
                spotE.start();
                ambiE.start();
                bgE.start();
                tweenE.start();
                lookE.start();
                updateE = true;
                i++
            }
            else if (object == 31 && !tweenD.isPlaying()) {
                intersects[i].object.material = bansMaterial;
                colorLight = Math.random() * 0.25 + 0.5;
                makeShape(colorVals, colorLight);
                updateD = false;
                hemiE.start();
                spotE.start();
                ambiE.start();
                bgE.start();
                tweenE.start();
                lookE.start();
                updateE = true;
            }
            else if (object == 80 && !tweenE.isPlaying()) {
                updateE = false;
                hemiF.start();
                spotF.start();
                ambiF.start();
                bgF.start();
                tweenF.start();
                lookF.start();
                updateF = true;
                scene.remove(scene.children[0]);
                i++
            }
        }
    }
    else {
        if (j == 0) {
            controls.unlock();
            hemiA.start();
            spotA.start();
            ambiA.start();
            bgA.start();
            tweenA.start();
            lookA.start();
            updateA = true;
            j++;
            makeVisible(0, true);
        }
    }
}
// set up Camera
var currentCam = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
var currentLook = { x: 3, y: 0, z: 5 };

var currentHemi = { r: hemiColor.r, g: hemiColor.g, b: hemiColor.b };
var currentSpot = { r: spotColor.r, g: spotColor.g, b: spotColor.b };
var currentAmbi = { r: ambiColor.r, g: ambiColor.g, b: ambiColor.b };
var currentBG = { r: bg.r, g: bg.g, b: bg.b };

var pos = [{ x: -1.99, y: 1.0, z: 8.7 },
{ x: 8.48, y: 0.9, z: 8.5 },
{ x: 7.4, y: 0.4, z: -3.9 },
{ x: 6.82, y: 5, z: -5.23 },
{ x: -8.1, y: 6.1, z: -5.88 },
{ x: 14.84, y: -0.9, z: 7.97 }];

var look = [{ x: 4, y: 1, z: -11 },
{ x: -3.7, y: 0.9, z: -11 },
{ x: -4.9, y: 0.4, z: 1.9 },
{ x: -0.1, y: 5, z: 0.1 },
{ x: 6.1, y: 6.1, z: 5.88 },
{ x: -13.84, y: 0.5, z: -7.97 }];

var hemi = [{ r: 53 / 255, g: 64 / 255, b: 100 / 255 },
{ r: 65 / 255, g: 56 / 255, b: 107 / 255 },
{ r: 107 / 255, g: 56 / 255, b: 56 / 255 },
{ r: 107 / 255, g: 68 / 255, b: 56 / 255 },
{ r: 107 / 255, g: 93 / 255, b: 56 / 255 },
{ r: 56 / 255, g: 103 / 255, b: 107 / 255 }];

var ambi = [{ r: 102 / 255, g: 100 / 255, b: 169 / 255 },
{ r: 86 / 255, g: 107 / 255, b: 225 / 255 },
{ r: 224 / 255, g: 103 / 255, b: 103 / 255 },
{ r: 222 / 255, g: 147 / 255, b: 94 / 255 },
{ r: 223 / 255, g: 172 / 255, b: 78 / 255 },
{ r: 178 / 255, g: 168 / 255, b: 133 / 255 }];

var spot = [{ r: 43 / 255, g: 49 / 255, b: 171 / 255 },
{ r: 109 / 255, g: 39 / 255, b: 206 / 255 },
{ r: 203 / 255, g: 52 / 255, b: 52 / 255 },
{ r: 174 / 255, g: 97 / 255, b: 45 / 255 },
{ r: 173 / 255, g: 128 / 255, b: 31 / 255 },
{ r: 236 / 255, g: 210 / 255, b: 156 / 255 }];

var bgs = [{ r: 5 / 255, g: 17 / 255, b: 102 / 255 },
{ r: 27 / 255, g: 5 / 255, b: 92 / 255 },
{ r: 92 / 255, g: 10 / 255, b: 92 / 255 },
{ r: 232 / 255, g: 131 / 255, b: 84 / 255 },,
{ r: 158 / 255, g: 209 / 255, b: 250 / 255 },
{ r: 78 / 255, g: 217 / 255, b: 239 / 255 }];

// For camera changes
function TweenCam(current, group, next, update) {
    return new TWEEN.Tween(current, group)
        .to(next, time)
        .onUpdate(function () {
            camera.position.set(current.x, current.y, current.z);
        })
        .onComplete(function () {
            update = false;
            //console.log("done");
        });
}
// For color changes
function TweenColor(current, group, next, set) {
    return new TWEEN.Tween(current, group)
        .to(next, time)
        .onUpdate(function () {
            set.setRGB(current.r, current.g, current.b);
        });
}

// For lookAt
function TweenLook(current, group, next) {
    return new TWEEN.Tween(current, group)
        .to(next, time)
        .onUpdate(function () {
            camera.lookAt(new Vector3(current.x, current.y, current.z));
        });
}


// Group A
var tweenA = TweenCam(currentCam, groupA, pos[0]);
tweenA.easing(TWEEN.Easing.Back.In);
var lookA = TweenLook(currentLook, groupA, look[0]);
var spotA = TweenColor(currentSpot, groupA, spot[0], spotColor);
var ambiA = TweenColor(currentAmbi, groupA, ambi[0], ambiColor);
var hemiA = TweenColor(currentHemi, groupA, hemi[0], hemiColor);
var bgA = TweenColor(currentBG, groupA, bgs[0], bg);

// Group B
var tweenB = TweenCam(pos[0], groupB, pos[1], updateB);
tweenB.easing(TWEEN.Easing.Back.Out);
var lookB = TweenLook(look[0], groupB, look[1]);
var spotB = TweenColor(spot[0], groupB, spot[1], spotColor);
var ambiB = TweenColor(ambi[0], groupB, ambi[1], ambiColor);
var hemiB = TweenColor(hemi[0], groupB, hemi[1], hemiColor);
var bgB = TweenColor(bgs[0], groupB, bgs[1], bg);

// Group C
var tweenC = TweenCam(pos[1], groupC, pos[2], updateC);
tweenC.easing(TWEEN.Easing.Elastic.Out);
var lookC = TweenLook(look[1], groupC, look[2]);
var spotC = TweenColor(spot[1], groupC, spot[2], spotColor);
var ambiC = TweenColor(ambi[1], groupC, ambi[2], ambiColor);
var hemiC = TweenColor(hemi[1], groupC, hemi[2], hemiColor);
var bgC = TweenColor(bgs[1], groupC, bgs[2], bg);

// Group D
var tweenD = TweenCam(pos[2], groupD, pos[3], updateD);
tweenD.easing(TWEEN.Easing.Back.InOut);
var lookD = TweenLook(look[2], groupD, look[3]);
var spotD = TweenColor(spot[2], groupD, spot[3], spotColor);
var ambiD = TweenColor(ambi[2], groupD, ambi[3], ambiColor);
var hemiD = TweenColor(hemi[2], groupD, hemi[3], hemiColor);
var bgD = TweenColor(bgs[2], groupD, bgs[3], bg);

// Group E
var tweenE = TweenCam(pos[3], groupE, pos[4], updateE);
tweenD.easing(TWEEN.Easing.Circular.In);
var lookE = TweenLook(look[3], groupE, look[4]);
var spotE = TweenColor(spot[3], groupE, spot[4], spotColor);
var ambiE = TweenColor(ambi[3], groupE, ambi[4], ambiColor);
var hemiE = TweenColor(hemi[3], groupE, hemi[4], hemiColor);
var bgE = TweenColor(bgs[3], groupE, bgs[4], bg);

//Group F
var tweenF = TweenCam(pos[4], groupF, pos[5], updateF);
tweenF.onComplete(function () {
    controls.lock();
})
tweenF.easing(TWEEN.Easing.Quintic.In);
var lookF = TweenLook(look[4], groupF, look[5]);
var spotF = TweenColor(spot[4], groupF, spot[5], spotColor);
var ambiF = TweenColor(ambi[4], groupF, ambi[5], ambiColor);
var hemiF = TweenColor(hemi[4], groupF, hemi[5], hemiColor);
var bgF = TweenColor(bgs[4], groupF, bgs[5], bg);

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
    if (controls.isLocked === true) {
        var time = Date.now();
        var delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 100.0 * delta;
        velocity.z -= velocity.z * 100.0 * delta;

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize(); // this ensures consistent movements in all directions

        if (moveForward || moveBackward) velocity.z -= direction.z * 500.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 500.0 * delta;


        controls.moveRight(- velocity.x * delta);
        controls.moveForward(- velocity.z * delta);
        prevTime = time;
    }
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

function makeShape(val, colorLight) {
    var hue = findColor(val);
    var hslCustom = [hue, 1, colorLight];
    var rgbCustom = hslToRgb(hslCustom);
    var customColor = new Color();
    customColor.setRGB(rgbCustom[0], rgbCustom[1], rgbCustom[2]);
    //console.log(customColor);
    var geo = new BoxGeometry(0.5, 0.5, 0.5);

    var mat = new MeshPhongMaterial({ color: customColor, specular: 50 });
    var cube = new Mesh(geo, mat);
    scene.add(cube);
    var last = scene.textPositions[scene.textPositions.length - 1];
    //questionTexts[4].material.color.setRGB(customColor);
    addText(scene.textPositions.length - 1);

    cube.position.set(last.x, last.y - 1, last.z);
    cube.lookAt(scene.lookAtPositions[scene.textPositions.length - 1]);
    //var colorString = customColor.r.toString() + " " + customColor.g.toString() + " " + customColor.b.toString();
    var resultText;
    var p = Math.round(hue * 1000) / 1000;
    //console.log(p);

    var fontLoader = new FontLoader();
    fontLoader.load("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/gentilis_bold.typeface.json", function (tex) {
        var geometry = new TextGeometry(p.toString(), {
            size: 0.2,
            height: 0.08,
            curveSegments: 4,
            font: tex,
        });
        resultText = new Mesh(geometry, mat);
        scene.add(resultText);
        resultText.position.set(last.x, last.y - 0.35, last.z);
        resultText.lookAt(scene.lookAtPositions[scene.textPositions.length - 1]);
    })
}


// adding text for questions

const qstr = 'You hear the howl of a \n dangerous monster in the distance. \n What do you do?|Some friends meet you \n on the road. Who do you bring \n along for the journey?|Along the way you must \ntrain and study. Which \n course do you select?|As you grow closer, voices \n scream your worst nightmares. \n What do you hear?|Your color is:';
var questionContents = qstr.split('|');

const astr = 'a) Take off before its too late | a) Friend with more resources | a) Carry sword, study defensive spells | a) That you will never have power';
var answerContents = astr.split('|');
const bstr = 'b) Pause and make a plan | b) Friend with more talent | b) Carry shield, study offensive spells | b) That you will never do good ';
var banswerContents = bstr.split('|');
answerContents.push("");
banswerContents.push("");

var text;
var geometry;
var ageometry;
var bgeometry;

var place = 0;
var color = new Color();
var color2 = new Color();
var color3 = new Color();
var color4 = new Color();
color4.setRGB(0, 0, 0);
color.setRGB(1, 1, 1);
color2.setRGB(1, 0, 1);
color3.setRGB(0, 1, 1);
var textMaterial = new MeshBasicMaterial({ color: color });
var textMaterial2 = new MeshBasicMaterial({ color: color2 });
var textMaterial3 = new MeshBasicMaterial({ color: color3 });
var ansMaterial = new MeshPhongMaterial({ color: color2, specular: 50 });
var bansMaterial = new MeshPhongMaterial({ color: color3, specular: 50 });
var questionTexts = [scene.textPositions.length];
var answerTexts = [scene.textPositions.length];
var banswerTexts = [scene.textPositions.length];

var fontLoader = new FontLoader();
//https://github.com/mrdoob/three.js/blob/master/examples/fonts/gentilis_bold.typeface.json
//./node_modules/three/examples/fonts/gentilis_bold.typeface.json
fontLoader.load("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/gentilis_bold.typeface.json", function (tex) {
    for (let i = 0; i < scene.textPositions.length; i++) {
        geometry = new TextGeometry(questionContents[i], {
            size: 0.11,
            height: 0.04,
            curveSegments: 4,
            font: tex,
            //bevelThickness: 1,
            //bevelSize: 0.1,
            //bevelSegments: 5,
        });
        ageometry = new TextGeometry(answerContents[i], {
            size: 0.1,
            height: 0.04,
            curveSegments: 4,
            font: tex,
        });
        bgeometry = new TextGeometry(banswerContents[i], {
            size: 0.1,
            height: 0.04,
            curveSegments: 4,
            font: tex,
        });
        questionTexts[i] = new Mesh(geometry, textMaterial);
        answerTexts[i] = new Mesh(ageometry, textMaterial2);
        banswerTexts[i] = new Mesh(bgeometry, textMaterial3);

        if (i < 4) {
            addText(i);
            makeVisible(i, false);
        }
    }
})
function addText(i) {
    scene.add(questionTexts[i], answerTexts[i], banswerTexts[i]);
    questionTexts[i].position.set(scene.textPositions[i].x, scene.textPositions[i].y, scene.textPositions[i].z);
    answerTexts[i].position.set(scene.textPositions[i].x, scene.textPositions[i].y - 0.75, scene.textPositions[i].z);
    banswerTexts[i].position.set(scene.textPositions[i].x, scene.textPositions[i].y - 1, scene.textPositions[i].z);
    questionTexts[i].lookAt(scene.lookAtPositions[i]);
    answerTexts[i].lookAt(scene.lookAtPositions[i]);
    banswerTexts[i].lookAt(scene.lookAtPositions[i]);


}

function makeVisible(i, b) {
    questionTexts[i].visible = b;
    answerTexts[i].visible = b;
    banswerTexts[i].visible = b;
}


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
