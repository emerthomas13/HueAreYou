
import * as Dat from 'dat.gui';
import * as BABYLON from 'babylonjs';
import { Scene, Mesh, Geometry, Points, PointsMaterial, Color, Object3D, Vector3, FontLoader, TextGeometry } from 'three';
//import { helvetika } from 'three/examples/fonts/helvetiker_regular.typeface.json';
import { Land, Flower, Box, Nature, Forest } from 'objects';
import { BasicLights } from 'lights';

class SpaceScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 0,
            updateList: [],
        };

        // star background
        var starGeo = new Geometry();
        for (let i = 0; i < 6000; i++) {
            let star = new Vector3(
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300
            );
            starGeo.vertices.push(star);
        }
        let starMaterial = new PointsMaterial({
            color: 0xFFFFFF,
            size: 0.7
        });

        var stars = new Points(starGeo, starMaterial);
        // Set background to a nice color
        this.background = new Color(0x001933);
        this.add(stars);

        const nature = new Nature();
        //const forest = new Forest();
        this.nature = nature;
        console.log(nature.pos);
        this.textPositions = [];
        this.cameraPositions = [];
        this.lookAtPositions = [];

        const lights = new BasicLights();
        this.add(lights, nature);

        this.textPositions.push(new Vector3(-2, 1, -5));
        //this.textPositions.push(new Vector3(5.5, -1.2, 11));
        this.textPositions.push(new Vector3(4, 2, -3));
        // this.textPositions.push(new Vector3(3.8, -0.5, 0.3));
        // this.textPositions.push(new Vector3(3, 4, 3));
        // this.textPositions.push(new Vector3(-0.8, 7.8, 3));
        this.textPositions.push(new Vector3(7, 2, -8));
        this.textPositions.push(new Vector3(5, 2, -12));
        this.textPositions.push(new Vector3(-2, 7.8, -12));

        this.cameraPositions.push(new Vector3(-2.2, -0.8, 9.1));
        this.cameraPositions.push(new Vector3(7.1, -1.2, 12.4));
        this.cameraPositions.push(new Vector3(5.7, -0.4, -0.9));
        this.cameraPositions.push(new Vector3(6.7, 7, 4));
        this.cameraPositions.push(new Vector3(0.6, 11.8, 4.7));
        this.cameraPositions.push(new Vector3(-5.0, -1.3, 9.1));

        this.lookAtPositions.push(new Vector3(-15, -1, 55));
        this.lookAtPositions.push(new Vector3(15.7, -1, 30));
        this.lookAtPositions.push(new Vector3(36, 1, -10));
        this.lookAtPositions.push(new Vector3(7, 6, 5));
        this.lookAtPositions.push(new Vector3(1, 20, 10));

        // this.scene1Container = new Object3D();
        // this.scene1Container.add(box1);
        // this.scene1Container.visible = true;
        //console.log(box.position);

        // Populate GUI
        //this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

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
