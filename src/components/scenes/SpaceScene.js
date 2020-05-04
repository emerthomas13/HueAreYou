
import * as Dat from 'dat.gui';
import { Scene, Mesh, Color, Object3D, Vector3, FontLoader, TextGeometry } from 'three';
//import { helvetika } from 'three/examples/fonts/helvetiker_regular.typeface.json';
import { Land, Flower, Box } from 'objects';
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
        this.box1 = box1;
        const box2 = new Box();
        const box3 = new Box();
        const box4 = new Box();
        const box5 = new Box();
        const flower = new Flower(this);
        const lights = new BasicLights();

        this.add(lights, box1, box2, box3, box4, box5);
        // var next = new Vector3(0, 0, 1);
        // var next2 = new Vector3(0, 1, 0);
        // var next3 = new Vector3(1, 0, 0);
        box1.position.set(-5, -3, 2);
        box2.position.set(6, 2, -1);
        box3.position.set(-3, -2, -6);
        box4.position.set(-4, 2, 4);

        // this.scene1Container = new Object3D();
        // this.scene1Container.add(box1);
        // this.scene1Container.visible = true;
        //console.log(box.position);

        // Populate GUI
        this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
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
