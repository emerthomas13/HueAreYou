import { Group, LoadingManager } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './low_poly_nature.glb';

class Nature extends Group {
    constructor() {
        // Call parent Group() constructor
        super();
        var manager = new LoadingManager();

        manager.onStart = function (url, itemsLoaded, itemsTotal) {
            //   console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
        };
        manager.onLoad = function () {

            //  console.log('Loading complete!');
        };
        manager.onProgress = function (url, itemsLoaded, itemsTotal) {
            // console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
        };

        const loader = new GLTFLoader(manager);

        this.name = 'nature';
        this.off = [0, -25, 0];

        loader.load(MODEL, (gltf) => {
            gltf.scene.position.set(0, -25, 10);
            this.add(gltf.scene);
        });
    }
}

export default Nature;
