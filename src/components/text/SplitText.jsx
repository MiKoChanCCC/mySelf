import { motion, useInView } from "motion/react";
import { useRef } from "react";

const containerVariants = {
  hidden: {},
  visible: (stagger) => ({
    transition: {
      staggerChildren: stagger,
    },
  }),
};

export default function SplitText({
  children,
  className,
  duration = 0.5,
  stagger = 0.04,
  yOffset = 40,
  threshold = 0.3,
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once });

  const charVariants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      variants={containerVariants}
      custom={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-label={children}
    >
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={charVariants}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
