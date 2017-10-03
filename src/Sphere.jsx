/**
 */

import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

export default class Sphere extends React.Component {

    render (){
        return(
             <sphereGeometry
                resourceId="particleGeometry"
                radius={0.3}
                widthSegments={8}
                heightSegments={8}
            />
        )
    }
}