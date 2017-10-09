/**
 * // <Square rotation={this.state.cubeRotation}/>
 */

import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import Square from './Square';
import Sphere from './Sphere';

const d = 20;

export default class Scene extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.cameraPosition = new THREE.Vector3(5, 5, 5);
        this.worldPosition = new THREE.Vector3(0, 0, 0);

        this.state = {
            cubeRotation: new THREE.Euler()
        };

        this.lightPosition = new THREE.Vector3(0, 5, 5);
        this.lightTarget = new THREE.Vector3(0, 0, 0);

        this.boxPosition = new THREE.Vector3(0, 2, 2);

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

        // Setup event handling
        document.addEventListener('mouseup', this._onMouseUp, false);
        document.addEventListener('mousedown', this._onMouseDown, false);
        document.addEventListener('mousemove', this._onMouseMove, false);
    }

    _onMouseUp() {
        console.log("mouse up");
    };

    _onMouseDown() {
        console.log("mouse down");
    };

    _onMouseMove() {
        console.log("mouse move");
    };

    componentDidMount (){
        var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        hemiLight.color.setHSL( 0.6, 1, 0.6 );
        hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
        hemiLight.position.set( 0, 50, 0 );
        this.refs.scene.add( hemiLight );
        console.log(this.refs);
    }

    render() {
        const width = window.innerWidth; // canvas width
        const height = window.innerHeight; // canvas height

        return (<React3
            mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
            width={width}
            height={height}
            alpha
            antialias
            gammaInput
            gammaOutput
            shadowMapEnabled
            pixelRatio={window.devicePixelRatio}
            clearColor={0x333333}

            onAnimate={this._onAnimate}>
                <resources>
                    <Sphere resourceId="particleGeometry" />
                </resources>
                <scene
                    ref="scene">
                    <orthographicCamera
                        name="camera"
                        ref="camera"

                        left={width / -200}
                        right={width / 200}
                        top={height / 200}
                        bottom={height / -200}


                        position={this.cameraPosition}
                        lookAt={this.worldPosition}
                    />



                    <ambientLight
                        color={0x666666}
                    />

                    <directionalLight
                        color={0xffffff}
                        intensity={1.75}

                        castShadow

                        shadowMapWidth={1024}
                        shadowMapHeight={1024}

                        shadowCameraLeft={-d}
                        shadowCameraRight={d}
                        shadowCameraTop={d}
                        shadowCameraBottom={-d}

                        shadowCameraFar={3 * d}
                        shadowCameraNear={d}

                        position={this.lightPosition}
                        lookAt={this.lightTarget}
                    />

                    <group rotation ={new THREE.Euler(0.8,0,1.57)}>
                        <mesh castShadow
                              receiveShadow
                              position={this.boxPosition}>
                            <Square />
                            <meshLambertMaterial
                                color={0x00ff00}
                            />
                        </mesh>
                        <mesh
                            scale={new THREE.Vector3(0.5, 0.5, 1)}
                            position={new THREE.Vector3(0.2, 0.3, 0.2)}
                        >
                            <Square />
                            <meshLambertMaterial
                                color={0xfafa00}
                            />
                        </mesh>
                    </group>
                </scene>

        </React3>);
    }
};