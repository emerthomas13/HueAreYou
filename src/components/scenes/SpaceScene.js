
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
            rotationSpeed: 0,
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0x0000FF);

        // Add meshes to scene
        //const land = new Land();
        const box1 = new Box();
        const box2 = new Box();
        const box3 = new Box();
        const box4 = new Box();
        const box5 = new Box();
        const nature = new Nature();
        this.nature = nature;
        this.textPositions = [];
        //console.log(nature.position);

        //nature.position = new BABYLON.Vector3(0, -10, 0);
        //const flower = new Flower(this);
        const lights = new BasicLights();
        //this.add(box1, box2, box3, box4, box5);
        this.add(lights, nature);
        //box1.position.set(7, -1, -4);
        //box5.position.set(-0.8, -1, -5);
        //box2.position.set(3, 4, -12);
        //box3.position.set(5, -1, -10);
        //box4.position.set(-0.8, 7.8, -12);
        this.textPositions.push(new Vector3(-2.4, -1, -5));
        this.textPositions.push(new Vector3(7, -1, -4));
        this.textPositions.push(new Vector3(5, -1, -10));
        this.textPositions.push(new Vector3(3, 4, -12));
        this.textPositions.push(new Vector3(-0.8, 7.8, -12));

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
