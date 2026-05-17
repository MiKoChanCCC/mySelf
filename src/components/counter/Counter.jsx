import { motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";

const Digit = ({
  value,
  duration,
  digitClassName,
}) => {
  const [height, setHeight] = useState(0);
  const containerRef = useRef(null);
  const firstDigitRef = useRef(null);

  useLayoutEffect(() => {
    const updateHeight = () => {
      if (firstDigitRef.current) {
        // 获取精确的浮点高度
        const h = firstDigitRef.current.getBoundingClientRect().height;
        setHeight(h);
      }
    };

    updateHeight();
    // 应对窗口大小变化（尤其是你用了 vw 单位）
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div
      className={clsx("overflow-hidden leading-[0.8]", digitClassName)}
      style={{ height: height || "auto" }}
    >
      <motion.div
        animate={{ y: -value * height }}
        transition={{
          type: "tween",
          duration,
          ease: "easeInOut", // 或 "linear" / "easeOut"
        }}
      >
        {Array.from({ length: 10 }).map((_, n) => (
          <div
            key={n}
            ref={n === 0 ? firstDigitRef : null}
            className="flex items-center justify-center"
          >
            {n}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Counter({
  value,
  autoPlay = true,
  interval = 1000,
  duration = 0.8,
  digits = 2,
  max = 10 ** digits,
  className,
  digitClassName,
}) {
  const [internal, setInternal] = useState(0);

  // 自动播放逻辑
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setInternal((c) => (c + 1) % max);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, max]);

  // 优先使用外部 value
  const displayValue = value ?? internal;

  const digitList = String(displayValue)
    .padStart(digits, "0")
    .slice(-digits)
    .split("");

  return (
    <div
      className={className}
      style={{ display: "flex" }}
    >
      {digitList.map((d, i) => (
        <Digit
          key={i}
          value={Number(d)}
          duration={duration}
          digitClassName={digitClassName}
        />
      ))}
    </div>
  );
}
