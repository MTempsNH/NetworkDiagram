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

        // this.groupRotation = new THREE.Euler(0, 0, 0);

        this.boxPosition = new THREE.Vector3(0, 2, 2);

        this.state.groupRotation = new THREE.Euler(0, 0, 0);

        // Setup event handling
        document.addEventListener('mouseup', this._onMouseUp.bind(this), false);
        document.addEventListener('mousedown', this._onMouseDown.bind(this), false);
        document.addEventListener('mousemove', this._onMouseMove.bind(this), false);

        this.state._mouseDown = false;
        this.state._groupPositionX = 0;
        this.state._groupPositionY = 0;
    }

    _onAnimate(ref) {
        // we will get this callback every frame

        // console.log("this.state: ", this);
        if(this.state._mouseDown){
            console.log("Update position");
            this._updateGroupPosition();
        }
        this._myAnimate.bind(this);
    };

    _updateGroupPosition() {
        // console.log("Group THIS: ", this);

        this.setState({
            groupRotation: new THREE.Euler(this.state._groupPositionX * 0.05, this.state._groupPositionY * 0.05, 0)
        });
    };

    _myAnimate(){
        // console.log("THIS: ", this);
    }

    _onMouseUp() {
        this.setState({
            _mouseDown : false
        });
        console.log("mouse up");
    };

    _onMouseDown(event) {

        this.setState({
            _mouseDown : true
        });

        console.log("mouse down: ", event.clientX);

    };

    _onMouseMove() {
        if(this.state._mouseDown){
            this.setState({
                _groupPositionX : event.clientX,
                _groupPositionY : event.clientY
            });
        }
        console.log("mouse move");
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

                    <group rotation={this.state.groupRotation}>
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