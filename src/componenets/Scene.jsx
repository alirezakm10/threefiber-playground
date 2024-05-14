import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { useState, useTransition } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Scene = () => {
  const props = useTexture({
    map: "PavingStones092_1K_Color.jpg",
    displacementMap: "PavingStones092_1K_Displacement.jpg",
    normalMap: "PavingStones092_1K_Normal.jpg",
    roughnessMap: "PavingStones092_1K_Roughness.jpg",
    aoMap: "PavingStones092_1K_AmbientOcclusion.jpg",
  });

  return (
    <>
      <Env />
      <ambientLight intensity={0.2} />
      <spotLight intensity={1.5} position={[2, 2, 2]} />
      <mesh 
            onClick={(e) => console.log('click')}
            onContextMenu={(e) => console.log('context menu')}
            onDoubleClick={(e) => console.log('double click')}
            onWheel={(e) => console.log('wheel spins')}
            onPointerUp={(e) => console.log('up')}
            onPointerDown={(e) => console.log('down')}
            onPointerOver={(e) => console.log('over')}
            onPointerOut={(e) => console.log('out')}
            onPointerEnter={(e) => console.log('enter')} // see note 1
            onPointerLeave={(e) => console.log('leave')} // see note 1
            onPointerMove={(e) => console.log('move')}
            onPointerMissed={() => console.log('missed')}
            onUpdate={(self) => console.log('props have been updated')}
      castShadow >
        <sphereGeometry 
        args={[1, 32, 32]} />
        <meshStandardMaterial {...props} />
      </mesh>

      <OrbitControls autoRotate />
    </>
  );
};

export default Scene;


function Env() {
    const [preset, setPreset] = useState('sunset')
    // You can use the "inTransition" boolean to react to the loading in-between state,
    // For instance by showing a message
    const [inTransition, startTransition] = useTransition()
    const { blur } = useControls({
      blur: { value: 0.65, min: 0, max: 1 },
      preset: {
        value: preset,
        options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
        // If onChange is present the value will not be reactive, see https://github.com/pmndrs/leva/blob/main/docs/advanced/controlled-inputs.md#onchange
        // Instead we transition the preset value, which will prevents the suspense bound from triggering its fallback
        // That way we can hang onto the current environment until the new one has finished loading ...
        onChange: (value) => startTransition(() => setPreset(value))
      }
    })
    return <Environment preset={preset} background blur={blur} />
  }
