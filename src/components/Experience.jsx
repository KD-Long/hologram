import React, { useRef } from 'react'
import { Environment, OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import Suzanne from './Suzanne.jsx'


const Experience = () => {

    const suzRef = useRef()
    const sphereRef = useRef()
    const torusRef = useRef()

    useFrame((state, delta) => {

        const elapsedTime = state.clock.elapsedTime

        if (suzRef.current) {
            console.log(suzRef)
            suzRef.current.rotation.x = - elapsedTime * 0.1
            suzRef.current.rotation.y = - elapsedTime * 0.2
        }

        sphereRef.current.rotation.x = - elapsedTime * 0.1
        sphereRef.current.rotation.y = elapsedTime * 0.2
    
        torusRef.current.rotation.x = - elapsedTime * 0.1
        torusRef.current.rotation.y = elapsedTime * 0.2

        state.camera.lookAt(0, 0, 0);
    })

    return (
        <>
            <OrbitControls makeDefault />

            {/* Sets background */}
            <color args={['#1d1f2a']} attach='background' />

            {/* Sets lighting env map */}
            {/* We probs dont need this because the model has lights baked and out shaders are probs mesh basic */}
            {/* <Environment
                // background
                preset="sunset"
            /> */}
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
            </GizmoHelper>



            <mesh position={[-3, 0, 0]} ref={sphereRef} >
                <sphereGeometry />
                <meshBasicMaterial color="blue" />
            </mesh>

            <Suzanne
                ref={suzRef}
            />

            <mesh position={[3, 0, 0]} ref={torusRef}>
                <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
                <meshBasicMaterial color="orange" />
            </mesh>

            {/* <Smoke /> */}

        </>
    )
}

export default Experience