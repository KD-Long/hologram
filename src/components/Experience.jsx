import React, { useRef } from 'react'
import { Environment, OrbitControls } from '@react-three/drei'
// import { Environment, OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber';
import { Perf } from 'r3f-perf'


import { shaderMaterial, useTexture } from '@react-three/drei';
import { useControls } from 'leva'
import * as THREE from 'three'

import vertexShader from '../shaders/vertexShader.glsl'
import fragmentShader from '../shaders/fragmentShader.glsl'
import Suzanne from './Suzanne.jsx'
import { useEffect } from 'react';


const Experience = () => {

    const suzRef = useRef()
    const sphereRef = useRef()
    const torusRef = useRef()

    const { bgColor,holoColor } = useControls({
        bgColor: { value: '#1d1f2a', label: 'Background Color' },
        holoColor: { value: '#0070ff', label: 'holo Color' },
    });

    const MyShaderMaterial = shaderMaterial({
        uTime: 0,
        uColor: new THREE.Color(holoColor),
    },
        vertexShader,
        fragmentShader
    )
    //this exent allows it to be used a a component below
    // Note: When using "extend" which register custom components with the JSX reconciler, 
    // use lowercase names for those components, regardless of how they are initially defined.
    extend({ MyShaderMaterial: MyShaderMaterial })



    useFrame((state, delta) => {
        
        const elapsedTime = state.clock.elapsedTime

        if (suzRef.current) {
           
            suzRef.current.material.uniforms.uTime.value = elapsedTime
            suzRef.current.material.uniforms.uColor.value= new THREE.Color(holoColor)
            suzRef.current.rotation.x = - elapsedTime * 0.1
            suzRef.current.rotation.y = - elapsedTime * 0.2

        }

        sphereRef.current.rotation.x = - elapsedTime * 0.1
        sphereRef.current.rotation.y = elapsedTime * 0.2

        torusRef.current.rotation.x = - elapsedTime * 0.1
        torusRef.current.rotation.y = elapsedTime * 0.2

        // update utime
        
        sphereRef.current.material.uniforms.uTime.value = elapsedTime
        torusRef.current.material.uniforms.uTime.value = elapsedTime

        // update color shader with color picker from useControls

        sphereRef.current.material.uniforms.uColor.value= new THREE.Color(holoColor)
        torusRef.current.material.uniforms.uColor.value= new THREE.Color(holoColor)
   
        // state.camera.lookAt(0, 0, 0);
    })

    return (
        <>
        <Perf position="top-left" />
         <OrbitControls  makeDefault />

            {/* Sets background */}
            <color args={[bgColor]} attach='background' />

            {/* Sets lighting env map */}
            {/* <Environment
                // background
                preset="sunset"
            /> */}

            {/* <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
            </GizmoHelper> */}


            <mesh position={[-3, 0, 0]} ref={sphereRef} >
                <sphereGeometry />
                <myShaderMaterial transparent side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
                {/* <meshBasicMaterial color={"#FF0000"} /> */}
            </mesh>

            <Suzanne
                ref={suzRef}
                shader={MyShaderMaterial}
            />

            <mesh position={[3, 0, 0]} ref={torusRef}>
                <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
                <myShaderMaterial side={THREE.DoubleSide} depthWrite={false} transparent blending={THREE.AdditiveBlending} />
                {/* <meshBasicMaterial color="orange" /> */}
            </mesh>

        </>
    )
}

export default Experience