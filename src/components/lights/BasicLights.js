import { Group, SpotLight, AmbientLight, HemisphereLight } from 'three';

class BasicLights extends Group {
    constructor(...args) {
        // Invoke parent Group() constructor with our args
        super(...args);

        const dir = new SpotLight(0x3a7382, 3.6, 40, Math.PI/2, 1, 0.7);
        const ambi = new AmbientLight(0x2e4a52, 1);
        const hemi = new HemisphereLight(0x000000, 0x080820, 0.3);

        dir.position.set(0.3, 30, -10);
        dir.target.position.set(0, 0, 0);

        this.add(ambi, hemi, dir);
    }
}

export default BasicLights;
