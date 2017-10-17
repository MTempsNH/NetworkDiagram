/**
 * // <Square rotation={this.state.cubeRotation}/>
 */

import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import Square from './Square';
import Sphere from './Sphere';

var OrbitControls = require('three-orbit-controls')(THREE)

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

        // this.groupRotation = new THREE.Euler(0, 0, 0);

        this.boxPosition = new THREE.Vector3(0, 2, 2);

        // this.state.groupRotation = new THREE.Euler(0, 0, 0);

        // Setup event handling
        document.addEventListener('mouseup', this._onMouseUp.bind(this), false);
        document.addEventListener('mousedown', this._onMouseDown.bind(this), false);
        document.addEventListener('mousemove', this._onMouseMove.bind(this), false);

        /*
        this.state._mouseDown = false;
        this.state._groupPositionX = 0;
        this.state._groupPositionY = 0;
        */
    }

    _onAnimate() {};

    _onMouseUp() {};

    _onMouseDown() {};

    _onMouseMove() {};

    componentWillUnmount() {
        this.controls.dispose();
        delete this.controls;
    };

    componentDidMount() {
        this.controls = new OrbitControls(this.refs.camera);


        console.log("REFS: ", this.refs['box1'].getVertices());
        this.square1 = this.refs['box1'];
        console.log("square1: ", this.square1);
    };

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
            onAnimate={this._onAnimate.bind(this)}>
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

                    />

                    <ambientLight
                        color={0x666666}
                    />

                    <directionalLight
                        color={0xffffff}
                        intensity={1.75}

                        castShadow

                        position={this.lightPosition}
                        lookAt={this.lightTarget}
                    />

                    <group>
                        <mesh
                            position={this.boxPosition}
                        >
                            <Square ref="box1" />
                            <meshLambertMaterial
                                color={0x00ff00}
                            />
                        </mesh>
                        <mesh
                            scale={new THREE.Vector3(1, 1, 1)}
                            position={new THREE.Vector3(0.2, 0.3, 0.2)}
                        >
                            <Square ref="box2" />
                            <meshLambertMaterial
                                color={0xfafa00}
                            />
                        </mesh>
                    </group>
                </scene>
        </React3>);
    }
};