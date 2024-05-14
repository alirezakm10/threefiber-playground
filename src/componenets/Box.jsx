import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

const Box = () => {
  const cubeRef = useRef(null);

  // useFrame(() => {
  //   if (!cubeRef.current) return;
  //   cubeRef.current.rotation.x += 0.003;
  //   cubeRef.current.rotation.y = 0.001;
  //   cubeRef.current.rotation.z = 0.05;
  // });

  return (
    <mesh 
    ref={cubeRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#b8e994" />
    </mesh>
  );
};

export default Box;
