import {OrbitControls, Sphere} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, {useRef} from "react";
import './style.css';
import {pointsInner, pointsOuter} from "./utils";

//Libraries Used: React, Vite, Three.js / React-three-fiber, drei 

const ShapeLanding = () => {
    return <div className="relative">
        <Canvas className="canvas-style"
            camera={{position: [10, -7.5, -5]}}
            >
            <OrbitControls maxDistance={20} minDistance={10} />
            <directionalLight />
            <pointLight position={[-30, 10, -30]} power={10.0} />
            <PointCircle />
        </Canvas>
        <div className ="main-text">
            <h1>Project 4 </h1>
            <p>This 3D shape was created using react and three.js, a javascript framework for generating 3D graphics on the web. Try moving the camera around with your mouse! (Click + Drag) </p>
            </div>
    </div>
}

const PointCircle = () => {
   const ref = useRef();
    
   useFrame(({clock}) => {
    ref.current.rotation.z = clock.getElapsedTime() * 0.05;
});
   
   return (
        <group ref ={ref}>
            {pointsInner.map((point, i) => <Point key={point.idx} position={point.position} color={point.color} />)}
            {pointsOuter.map((point, i) => <Point key={point.idx} position={point.position} color={point.color} />)}
        </group>
    );
}

const Point = ({position, color}) => {
    return (
        <Sphere
                position={position}
                args={[0.1,10,10]}>
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={0.5} 
                        roughness={0.5}
                        />
            </Sphere>
    )
}
export default ShapeLanding