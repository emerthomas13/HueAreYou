
import * as Dat from 'dat.gui';
import * as BABYLON from 'babylonjs';
import { Scene, Mesh, Color, Object3D, Vector3, FontLoader, TextGeometry } from 'three';
//import { helvetika } from 'three/examples/fonts/helvetiker_regular.typeface.json';
import { Land, Flower, Box, Nature } from 'objects';
import { BasicLights } from 'lights';

class SpaceScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0xFFFF00);

        // Add meshes to scene
        const land = new Land();
        const box1 = new Box();
        // const box2 = new Box();
        // const box3 = new Box();
        // const box4 = new Box();
        // const box5 = new Box();
        const nature = new Nature();
        //nature.position = new Vector3(0, 0, 0);
        const flower = new Flower(this);
        const lights = new BasicLights();

        //this.add(lights, box1, box2, box3, box4, box5);
        this.add(lights, nature);
        // var next = new Vector3(0, 0, 1);
        // var next2 = new Vector3(0, 1, 0);
        // var next3 = new Vector3(1, 0, 0);
        // box1.position.set(-5, -3, 2);
        // box2.position.set(6, 2, -1);
        // box3.position.set(-3, -2, -6);
        // box4.position.set(-4, 2, 4);

        // this.scene1Container = new Object3D();
        // this.scene1Container.add(box1);
        // this.scene1Container.visible = true;
        //console.log(box.position);

        // Populate GUI
        this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    // hslToRgb = function () {
    //     var h = this.data[0];
    //     var s = this.data[1];
    //     var l = this.data[2];

    //     var m1, m2;
    //     m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
    //     m1 = l * 2 - m2;
    //     var hueToRGB = function (m1, m2, h) {
    //         h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
    //         if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
    //         if (h * 2 < 1) return m2;
    //         if (h * 3 < 2) return m1 + (m2 - m1) * (0.66666 - h) * 6;
    //         return m1;
    //     };
    // }

    // rgbToHsl = function () {
    //     assert(this.colorSpace === "rgb", "input pixel color space must be rgb");

    //     var r = this.data[0],
    //       g = this.data[1],
    //       b = this.data[2];
    //     var max = Math.max(r, g, b),
    //       min = Math.min(r, g, b);
    //     var h,
    //       s,
    //       l = (max + min) / 2;

    //     if (max == min) {
    //       h = s = 0; // achromatic
    //     } else {
    //       var d = max - min;
    //       s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    //       switch (max) {
    //         case r:
    //           h = (g - b) / d + (g < b ? 6 : 0);
    //           break;
    //         case g:
    //           h = (b - r) / d + 2;
    //           break;
    //         case b:
    //           h = (r - g) / d + 4;
    //           break;
    //       }
    //       h /= 6;
    //     }

    //     return new Pixel(h, s, l, this.a, "hsl");
    //   };

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}


export default SpaceScene;
