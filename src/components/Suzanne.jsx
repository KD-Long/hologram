/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 ./public/suzanne.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { forwardRef } from 'react';


// Note we are forwarding the reference from parent and capturing it here

export default forwardRef(function Suzanne(props,ref) {
  const { nodes, materials } = useGLTF('/suzanne.glb')
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.Suzanne.geometry} material={nodes.Suzanne.material} />
    </group>
  )
})

useGLTF.preload('/suzanne.glb')
