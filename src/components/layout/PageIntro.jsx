import { useEffect, useState } from "react";
import { motion, useAnimate } from "motion/react";
import { INTRO } from "@/lib/animations";

export default function PageIntro() {
  const [scope, animate] = useAnimate();
  const [done, setDone] = useState(false);

  useEffect(() => {
    animate(
      scope.current,
      { y: "-100%" },
      {
        delay: INTRO.delay,
        duration: INTRO.duration,
        ease: INTRO.ease,
      }
    ).then(() => setDone(true));
  }, [animate, scope]);

  if (done) return null;

  return (
    <motion.div
      ref={scope}
      className="fixed inset-0 bg-secondary pointer-events-none"
      style={{ zIndex: 9998 }}
    />
  );
}
