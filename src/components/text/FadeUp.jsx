import { motion, useInView } from "motion/react";
import { useRef } from "react";

export default function FadeUp({
  children,
  className,
  duration = 0.7,
  delay = 0,
  yOffset = 30,
  threshold = 0.3,
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once });

  const variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
