/**
 */

import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';


export default class Square extends React.Component {
    constructor(props, context) {
        super(props, context);
    };

    componentDidMount(){
        console.log(this.refs['box'].computeLineDistances);
    };

    getVertices(){
        return this.refs['box'].vertices[1];
    }

    render (){
        return(
                <boxGeometry
                    width={1}
                    height={1}
                    depth={1}
                    ref="box"
                />
        )
    }
}