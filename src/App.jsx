
import './App.css'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import Experience from './components/Experience'


function App() {


  return (
    <>
      <Canvas
        // not this fixes the tone mapping (colors look better)
        onCreated={({ gl }) => { gl.toneMapping = THREE.NoToneMapping }}
        shadows={true}
        camera={{
          fov: 25,
          near: 0.1,
          far: 100,
          position: [7, 7, 7]
        }}
      >
        <Experience />
      </Canvas>
    </>
  )
}

export default App
