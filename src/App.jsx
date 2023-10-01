import // Backdrop,
// RoundedBox,
// ScrollControls,
// Scroll,
// Sparkles,
// Float,
// Ring
"@react-three/drei";
import { Experience } from "./components/Experience";
import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Interface } from "./components/interface";
import { ScrollManager } from "./components/ScrollMAnager";
import { useState,useEffect } from "react";
import { Menu } from "./components/Menue";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { framerMotionConfig } from "./config";
import { Cursor } from "./components/Cursor";

function App() {

  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() =>{
    setMenuOpened(false);
  },[section])

  

  return (
    <>
    <MotionConfig  transition={{
     ...framerMotionConfig,
    }} >
      <Canvas shadows camera={{ position: [0, 5, 20], fov: 40 }}>
        {/* <color attach="background" args={["#ececec"]} /> */}
        <color attach="background" args={["#e6e7ff"]} />
        <ScrollControls pages={4} damping={0.1}>
          <ScrollManager section={section} onSectionChange={setSection} />
          <Scroll>
          <Experience section = {section} menuOpened = {menuOpened}/>
          </Scroll>
          <Scroll html>
            <Interface setSection={setSection}/>
            
          </Scroll>
        </ScrollControls>
      </Canvas>
      <Menu onSectionChange = {setSection} menuOpened ={menuOpened} setMenuOpened = {setMenuOpened}/>
      <Cursor />
      </MotionConfig>
      <Leva hidden />
    </>
  );
}

export default App;
