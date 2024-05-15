import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useState, useTransition } from "react";
import { color } from "three/examples/jsm/nodes/Nodes.js";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Scene = () => {
  const colorMap = useLoader(TextureLoader,'planet-one.jpg');

  return (
    <>
      <Env />
      <ambientLight intensity={0.7} />
      <spotLight  intensity={0.2} position={[10,10,3]} decay={3} />
      <directionalLight position={[10,10,5]} intensity={0.2} />
      <mesh 
        castShadow >
        <sphereGeometry 
        args={[1, 32, 32]} />
        <meshBasicMaterial map={'#f00'} reflectivity={1} />
        <meshStandardMaterial attach='material' map={colorMap} />
      </mesh>
      <OrbitControls />
    </>
  );
};

export default Scene;


function Env() {
    const [preset, setPreset] = useState('sunset')
    const [inTransition, startTransition] = useTransition()
    const { blur } = useControls({
      blur: { value: 0.65, min: 0, max: 1 },
      color:'green',
      preset: {
        value: preset,
        options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
        onChange: (value) => startTransition(() => setPreset(value))
      }
    })

    useEffect(() => {
      console.log("im leva controls: ", preset);
    } ,[inTransition])

    return <Environment 
    background={true} // Whether to affect scene.background
    files={'earthlike_planet.hdr'}
    path={'/'}
    />
  }
