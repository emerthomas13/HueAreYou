import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './out.glb';

class Box extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();
        this.name = 'box';

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });
        // const url = './out.glb';

        // Here, 'gltf' is the object that the loader returns to us
        // const onLoad = (gltf) => {
        //     console.log(gltf);
        //     this.add(gltf.scene);
        // };

        // loader.load(url, onLoad);
    }
}

export default Box;
