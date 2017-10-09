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

var Scene = function (_React$Component) {
    _inherits(Scene, _React$Component);

    function Scene(props, context) {
        _classCallCheck(this, Scene);

        var _this = _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this, props, context));

        _this.cameraPosition = new THREE.Vector3(0, 0, 5);

        _this.state = {
            cubeRotation: new THREE.Euler()
        };

        _this._onAnimate = function () {
            // we will get this callback every frame

            // pretend cubeRotation is immutable.
            // this helps with updates and pure rendering.
            // React will be sure that the rotation has now updated.
            _this.setState({
                cubeRotation: new THREE.Euler(_this.state.cubeRotation.x + 0.1, _this.state.cubeRotation.y + 0.1, 0)
            });
        };

        // Setup event handling
        document.addEventListener('mouseup', _this._onMouseUp, false);
        document.addEventListener('mousedown', _this._onMouseDown, false);
        document.addEventListener('mousemove', _this._onMouseMove, false);
        return _this;
    }

    _createClass(Scene, [{
        key: '_onMouseUp',
        value: function _onMouseUp() {
            console.log("mouse up");
        }
    }, {
        key: '_onMouseDown',
        value: function _onMouseDown() {
            console.log("mouse down");
        }
    }, {
        key: '_onMouseMove',
        value: function _onMouseMove() {
            console.log("mouse move");
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
            hemiLight.color.setHSL(0.6, 1, 0.6);
            hemiLight.groundColor.setHSL(0.095, 1, 0.75);
            hemiLight.position.set(0, 50, 0);
            scene.add(hemiLight);
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

                    onAnimate: this._onAnimate },
                _react2.default.createElement(
                    'resources',
                    null,
                    _react2.default.createElement(_Sphere2.default, { resourceId: 'particleGeometry' })
                ),
                _react2.default.createElement(
                    'scene',
                    { ref: 'scene' },
                    _react2.default.createElement(
                        'perspectiveCamera',
                        {
                            name: 'camera',
                            fov: 100,
                            aspect: width / height,
                            near: 0.1,
                            far: 1000,

                            position: this.cameraPosition
                        },
                        _react2.default.createElement('pointLight', {
                            color: 0xffffff,
                            intensity: 0.8
                        }),
                        _react2.default.createElement('directionalLight', {
                            name: 'sun',
                            position: new THREE.Vector3(0, 0, 5)
                        })
                    ),
                    _react2.default.createElement(
                        'group',
                        { rotation: new THREE.Euler(0.8, 0, 1.57) },
                        _react2.default.createElement(
                            'mesh',
                            null,
                            _react2.default.createElement(_Square2.default, null),
                            _react2.default.createElement('meshBasicMaterial', {
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
                            _react2.default.createElement('meshBasicMaterial', {
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