import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import MODEL from './out.glb';

class Forest extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'forest';

        //var dracoLoader = new DRACOLoader();

        loader.load(MODEL, (gltf) => {
            gltf.scene.position.set(0, 0, 10);
            this.add(gltf.scene);


        });
    }
}

export default Forest;
