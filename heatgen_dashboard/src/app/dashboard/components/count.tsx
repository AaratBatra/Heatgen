//import "./styles.css";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function Count({c}:{c: number}) {
  const x = c;
  //console.log(typeof x)
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, x, {
      duration: 2
    });
  }, []);

  return <motion.h1 className="inline-block">{rounded}</motion.h1>;
}
