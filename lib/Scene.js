'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactThreeRenderer = require('react-three-renderer');

var _reactThreeRenderer2 = _interopRequireDefault(_reactThreeRenderer);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _Square = require('./Square');

var _Square2 = _interopRequireDefault(_Square);

var _Sphere = require('./Sphere');

var _Sphere2 = _interopRequireDefault(_Sphere);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * // <Square rotation={this.state.cubeRotation}/>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var OrbitControls = require('three-orbit-controls')(THREE);

var d = 20;

var Scene = function (_React$Component) {
    _inherits(Scene, _React$Component);

    function Scene(props, context) {
        _classCallCheck(this, Scene);

        var _this = _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this, props, context));

        _this.cameraPosition = new THREE.Vector3(5, 5, 5);
        _this.worldPosition = new THREE.Vector3(0, 0, 0);

        _this.state = {
            cubeRotation: new THREE.Euler()
        };

        _this.lightPosition = new THREE.Vector3(0, 5, 5);
        _this.lightTarget = new THREE.Vector3(0, 0, 0);

        // this.groupRotation = new THREE.Euler(0, 0, 0);

        _this.boxPosition = new THREE.Vector3(0, 2, 2);

        _this.state.groupRotation = new THREE.Euler(0, 0, 0);

        // Setup event handling
        document.addEventListener('mouseup', _this._onMouseUp.bind(_this), false);
        document.addEventListener('mousedown', _this._onMouseDown.bind(_this), false);
        document.addEventListener('mousemove', _this._onMouseMove.bind(_this), false);

        _this.state._mouseDown = false;
        _this.state._groupPositionX = 0;
        _this.state._groupPositionY = 0;
        return _this;
    }

    _createClass(Scene, [{
        key: '_onAnimate',
        value: function _onAnimate(ref) {
            // we will get this callback every frame

            // console.log("this.state: ", this);
            if (this.state._mouseDown) {
                console.log("Update position");
                this._updateGroupPosition();
            }
            this._myAnimate.bind(this);
        }
    }, {
        key: '_updateGroupPosition',
        value: function _updateGroupPosition() {
            // console.log("Group THIS: ", this);

            this.setState({
                groupRotation: new THREE.Euler(this.state._groupPositionY * 0.05, this.state._groupPositionX * 0.05, 0)
            });
        }
    }, {
        key: '_myAnimate',
        value: function _myAnimate() {
            // console.log("THIS: ", this);
        }
    }, {
        key: '_onMouseUp',
        value: function _onMouseUp() {
            this.setState({
                _mouseDown: false
            });
            console.log("mouse up");
        }
    }, {
        key: '_onMouseDown',
        value: function _onMouseDown(event) {

            this.setState({
                _mouseDown: true
            });

            console.log("mouse down: ", event.clientX);
        }
    }, {
        key: '_onMouseMove',
        value: function _onMouseMove() {
            if (this.state._mouseDown) {
                this.setState({
                    _groupPositionX: event.clientX,
                    _groupPositionY: event.clientY
                });
            }
            console.log("mouse move");
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.controls.dispose();
            delete this.controls;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var controls = new OrbitControls(this.refs.camera);
            this.controls = controls;
        }
    }, {
        key: 'render',
        value: function render() {
            var width = window.innerWidth; // canvas width
            var height = window.innerHeight; // canvas height

            return _react2.default.createElement(
                _reactThreeRenderer2.default,
                {
                    mainCamera: 'camera' // this points to the perspectiveCamera which has the name set to "camera" below
                    , width: width,
                    height: height,
                    alpha: true,
                    antialias: true,
                    gammaInput: true,
                    gammaOutput: true,
                    shadowMapEnabled: true,
                    pixelRatio: window.devicePixelRatio,
                    clearColor: 0x333333,
                    onAnimate: this._onAnimate.bind(this) },
                _react2.default.createElement(
                    'resources',
                    null,
                    _react2.default.createElement(_Sphere2.default, { resourceId: 'particleGeometry' })
                ),
                _react2.default.createElement(
                    'scene',
                    {
                        ref: 'scene' },
                    _react2.default.createElement('orthographicCamera', {
                        name: 'camera',
                        ref: 'camera',

                        left: width / -200,
                        right: width / 200,
                        top: height / 200,
                        bottom: height / -200,

                        position: this.cameraPosition,
                        lookAt: this.worldPosition
                    }),
                    _react2.default.createElement('ambientLight', {
                        color: 0x666666
                    }),
                    _react2.default.createElement('directionalLight', {
                        color: 0xffffff,
                        intensity: 1.75,

                        castShadow: true,

                        shadowMapWidth: 1024,
                        shadowMapHeight: 1024,

                        shadowCameraLeft: -d,
                        shadowCameraRight: d,
                        shadowCameraTop: d,
                        shadowCameraBottom: -d,

                        shadowCameraFar: 3 * d,
                        shadowCameraNear: d,

                        position: this.lightPosition,
                        lookAt: this.lightTarget
                    }),
                    _react2.default.createElement(
                        'group',
                        { rotation: this.state.groupRotation },
                        _react2.default.createElement(
                            'mesh',
                            { castShadow: true,
                                receiveShadow: true,
                                position: this.boxPosition },
                            _react2.default.createElement(_Square2.default, null),
                            _react2.default.createElement('meshLambertMaterial', {
                                color: 0x00ff00
                            })
                        ),
                        _react2.default.createElement(
                            'mesh',
                            {
                                scale: new THREE.Vector3(0.5, 0.5, 1),
                                position: new THREE.Vector3(0.2, 0.3, 0.2)
                            },
                            _react2.default.createElement(_Square2.default, null),
                            _react2.default.createElement('meshLambertMaterial', {
                                color: 0xfafa00
                            })
                        )
                    )
                )
            );
        }
    }]);

    return Scene;
}(_react2.default.Component);

exports.default = Scene;
;