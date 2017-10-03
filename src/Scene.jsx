/**
 * // <Square rotation={this.state.cubeRotation}/>
 */

import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import Square from './Square';
import Sphere from './Sphere';


export default class Scene extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.cameraPosition = new THREE.Vector3(0,0,1);

        this.state = {
            cubeRotation: new THREE.Euler()
        };

        this._onAnimate = () => {
            // we will get this callback every frame

            // pretend cubeRotation is immutable.
            // this helps with updates and pure rendering.
            // React will be sure that the rotation has now updated.
            this.setState({
                cubeRotation: new THREE.Euler(
                    this.state.cubeRotation.x + 0.1,
                    this.state.cubeRotation.y + 0.1,
                    0
                ),
            });
        };
    }

    render() {
        const width = window.innerWidth; // canvas width
        const height = window.innerHeight; // canvas height

        return (<React3
            mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
            width={width}
            height={height}

            onAnimate={this._onAnimate}>
                <resources>
                    <Sphere resourceId="particleGeometry" />
                </resources>
                <scene>
                    <perspectiveCamera
                        name="camera"
                        fov={75}
                        aspect={width / height}
                        near={0.1}
                        far={1000}

                        position={this.cameraPosition}
                    />
                    <mesh>
                        <Sphere />
                        <meshBasicMaterial
                            color={0x00ff00}
                        />
                    </mesh>
                    <mesh
                        scale={new THREE.Vector3(0.5, 0.5, 1)}
                        position={new THREE.Vector3(0.2, 0.3, 0.2)}
                    >
                        <Sphere />
                        <meshBasicMaterial
                            color={0xfafa00}
                        />
                    </mesh>
                </scene>

        </React3>);
    }
};