/**
 */

import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';


export default class Scene extends React.Component {

    render (){
        return(
                <boxGeometry
                    width={1}
                    height={1}
                    depth={1}
                />
        )
    }
}