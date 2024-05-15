import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./componenets/Scene";
import { Suspense } from "react";



function App() {


  return (
    <div className="App">
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Suspense fallback={null} >
        <Scene />
      </Suspense>
        </Canvas>
    </div>
  );
}

export default App;
