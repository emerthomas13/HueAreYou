

import { Scene, FBXLoader, Mesh, Geometry, Points, PointsMaterial, Color, Object3D, Vector3 } from 'three';
import { Box, Nature, Forest } from 'objects';
import { BasicLights } from 'lights';

class SpaceScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();


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
        this.textPositions = [];
        this.cameraPositions = [];
        this.lookAtPositions = [];

        const lights = new BasicLights();
        // add handler here
        // https://stackoverflow.com/questions/52689932/can-the-three-js-eventdispatcher-be-used-to-communicate-between-classes
        // https://threejs.org/docs/#api/en/core/EventDispatcher

        this.add(lights, nature);

        var landPos = new Vector3(0, -25, 10);
        this.textPositions.push(new Vector3(landPos.x - 2, landPos.y + 26.5, landPos.z - 5));
        //this.textPositions.push(new Vector3(5.5, -1.2, 11));
        this.textPositions.push(new Vector3(landPos.x + 6, landPos.y + 26.5, landPos.z - 3));
        // this.textPositions.push(new Vector3(3.8, -0.5, 0.3));
        // this.textPositions.push(new Vector3(3, 4, 3));
        // this.textPositions.push(new Vector3(-0.8, 7.8, 3));
        this.textPositions.push(new Vector3(landPos.x + 5.5, landPos.y + 26.0, landPos.z - 12));
        this.textPositions.push(new Vector3(landPos.x + 5.3, landPos.y + 30.5, landPos.z - 12.9));
        this.textPositions.push(new Vector3(landPos.x - 4, landPos.y + 32.5, landPos.z - 12.5));


        this.lookAtPositions.push(new Vector3(-15, -1, 55));
        this.lookAtPositions.push(new Vector3(12, -0.5, 15));
        this.lookAtPositions.push(new Vector3(12, -0.3, -5));
        this.lookAtPositions.push(new Vector3(8, 5.5, -5.4));
        this.lookAtPositions.push(new Vector3(-10, 6.0, -6));

        // this.scene1Container = new Object3D();
        // this.scene1Container.add(box1);
        // this.scene1Container.visible = true;
        //console.log(box.position);

    }


}


export default SpaceScene;
