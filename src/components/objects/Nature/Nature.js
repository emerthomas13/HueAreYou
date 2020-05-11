import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './low_poly_nature.glb';

class Nature extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'nature';
        this.off = [0, -25, 0];

        loader.load(MODEL, (gltf) => {
            gltf.scene.position.set(0, -25, 10);
            this.add(gltf.scene);
        });
    }
}

export default Nature;
