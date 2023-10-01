import { OrbitControls, useScroll } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { Room } from "./Room";
import { motion } from "framer-motion-3d";
import { Float,MeshDistortMaterial,MeshWobbleMaterial } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { framerMotionConfig } from "../config";
import { useControls } from "leva";
import { Projects } from "./Projects";
import { Background } from "./Background";

export const Experience = (props) => {


  const {mx,my,mz,rx,ry,rz} = useControls({
    mx: {
      value: 0,
    min: -10,
    max: 10,
    step: 0.01,
    },
    my: {
      value: 0,
    min: -2,
    max: 2,
    step: 0.01,
    },
    mz: {
      value: 0,
    min: -5,
    max: 5,
    step: 0.01,
    },
    rx: {
      value: 0,
    min: -10,
    max: 10,
    step: 0.01,
    },
    ry: {
      value: 0,
    min: -2,
    max: 2,
    step: 0.01,
    },
    rz: {
      value: 0,
    min: -5,
    max: 5,
    step: 0.01,
    }})

    const {menuOpened} = props; 
    const {viewport} = useThree();
    const data = useScroll();

    const [section,setSection] = useState(0);

    const cameraPositionX = useMotionValue();
    const cameraLookAtX = useMotionValue();

    useEffect(()=>{
      animate(cameraPositionX,menuOpened ? -5 : 0, {
        ...framerMotionConfig
      });
      animate(cameraLookAtX,menuOpened ? 5 : 0,{
        ...framerMotionConfig
      } );
    },[menuOpened])
  


    const [characterAnimation, setCharaterAnimation ] = useState("Typing");

    useEffect(()=>{
      setCharaterAnimation("Falling");
      setTimeout(()=>{
        setCharaterAnimation(section === 0 ? "Typing" : "Standing")
      }, 600)
    },[section])

    useFrame ((state) =>{

      let curSection = Math.floor(data.scroll.current * data.pages);

      if(curSection > 3){
        curSection = 3;
      }

      if(curSection !== section) {
        setSection(curSection);
      }

      state.camera.position.x = cameraPositionX.get();
      state.camera.lookAt(cameraLookAtX.get(),0,0)
    })
    return (
        <> 

        <Background/>
        {/* <Avatar/> */}
        <ambientLight intensity={1}/>
        <motion.group position={[2,0,0]} rotation-y={-Math.PI/2}
        animate = {{
            y: section === 0 ? 0 : -1,
        }}>
        <Room section = {section}/>
       
        <motion.group 
        position={[-4.48,0.00,-1.72]} 
        rotation={[0.00,-1.42,0.00]}
        animate={"" + section}
        transition={{
          duration: 0.3,
        }}
        variants = {{
          0:{
            scaleX: 2.5,
            scaleY: 2.5,
            scaleZ: 2.5,
          },
          1:{
            y: -viewport.height + 0.5,
            x:0,
            z: 2,
            rotateX:0,
            rotateY:Math.PI/2,
            rotateZ:0,
            scaleX: 3,
            scaleY: 3,
            scaleZ: 3,
          },
          2: {
            x: 0,
            y: -viewport.height * 2 + 0.5,
            z : 10,
            rotateX: 0,
            rotateY: 3*Math.PI/4,
            rotateZ: 0,
            scaleX: 1.5,
            scaleY: 1.5,
            scaleZ: 1.5,
          },
          3: {
            y: -viewport.height *3 - 3,
            x: 12,
            z: 0,
            rotateX: 0, 
            rotateY: Math.PI/4,
            rotateZ: 0,
            scaleX: 5,
            scaleY: 5,
            scaleZ: 5,
          }
        }}
        >

        <Avatar  animation = {characterAnimation}/>
        </motion.group>


        </motion.group>

        {/* Skills */}

        <motion.group
        animate={{
            z: section === 1 ? 0 : -10,
            y: section === 1 ? -viewport.height : -1.5,
        }} >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[1, -3, -15]} scale={[2, 2, 2]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"red"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[3, 3, 3]} position={[3, 1, -18]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="yellow"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[1.4, 1.4, 1.4]} position={[-3, -1, -11]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"blue"}
            />
          </mesh>
        </Float>
        {/* <group scale={[4,4,4]} position-y={-1.5} position-z={-1}>
            <Avatar animation = {section === 0 ? "Falling" : "Standing"}/>
            </group>  */}
            </motion.group>
            <Projects />
        </>
    );
};