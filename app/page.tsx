"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { PropsWithChildren } from "react";

export default function Home() {
  return (
    <motion.div className="w-full h-[500dvh] bg-gradient-to-t">
      <div className="text-7xl font-semibold w-full h-screen flex justify-center items-center sticky top-0">
        <div className="absolute text-opacity-20 text-white">HELLO</div>
        <ScrollChar x={-100} rotation={100} scale={4}>
          H
        </ScrollChar>
        <ScrollChar y={50} rotation={-30} scale={0.5}>
          E
        </ScrollChar>
        <ScrollChar rotation={100} x={90} y={-400}>
          L
        </ScrollChar>
        <ScrollChar>L</ScrollChar>
        <ScrollChar x={-50} y={-50} scale={0.2}>
          O
        </ScrollChar>
      </div>
    </motion.div>
  );
}

interface ScrollCharProps extends PropsWithChildren {
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
}
function ScrollChar({
  children,
  rotation = 955,
  x = 150,
  y = 300,
  scale = 1,
}: ScrollCharProps) {
  const { scrollYProgress: baseScrollY } = useScroll();
  const scrollYProgress = useSpring(baseScrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const textBlur = useTransform(
    scrollYProgress,
    [1, 0],
    ["blur(0px)", "blur(10px)"]
  );
  const textX = useTransform(scrollYProgress, [1, 0], [0, y]);
  const textY = useTransform(scrollYProgress, [1, 0], [0, x]);
  const textRotate = useTransform(
    scrollYProgress,
    [1, 0],
    ["0deg", `${rotation}deg`]
  );
  const textScale = useTransform(scrollYProgress, [1, 0], [1, scale]);
  const textOpacity = useTransform(scrollYProgress, [1, 0], [1, 0]);
  return (
    <motion.span
      style={{
        filter: textBlur,
        rotateZ: textRotate,
        y: textY,
        x: textX,
        opacity: textOpacity,
        scale: textScale,
      }}
      className="relative z-10"
    >
      {children}
    </motion.span>
  );
}
