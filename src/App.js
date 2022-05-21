import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import Controls from "./Controls";
import "./styles.css";
import LoliB from "./Anime_loli";
import Room from "./Room_japanes";
import Ninja1 from "./Ninja";

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1009, 1000]} />
      <shadowMaterial attach="material" color="#171717" />
    </mesh>
  );
}

function Cube(props) {
  const [ref] = useBox(() => ({
    mass: 1,
    position: [0, 5, 0],
    rotation: [0.4, 0.2, 0.5],
    ...props
  }));
  const color = props.color ? props.color : "hotpink";
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxBufferGeometry />
      <meshLambertMaterial attach="material" color={color} />
    </mesh>
  );
}

function App() {
  return (
    <Canvas
      shadowMap
      sRGB
      gl={{ alpha: false }}
      camera={{ position: [-1, 1, 5], fov: 70 }}
    >
      <fog attach="fog" args={[0xfff0ea, 10, 60]} />
      <color attach="background" args={["lightblue"]} />
      <Physics>
        <Controls />
        <hemisphereLight intensity={0.35} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <Plane position={[0, -2, 0]} color="green"/>
        <Cube />
        <Cube position={[0, 10, -2]} color="rebeccapurple" />
        <Cube position={[0, 20, -2]} color="darkseagreen" />  
        <Suspense fallback={null}>
          <Room position={[3, -1.1, -6]} scale={[0.5, 0.5, 0.5]}/>
          <LoliB position={[3 ,-2, -4]} scale={[2, 2, 2]} />
          <Ninja1 position={[2 ,-2, 4]} scale={[2,2,2,]} rotation={[0, 1, 0]}/>
        </Suspense>
      </Physics>
    </Canvas>
  );
}

export default App;
