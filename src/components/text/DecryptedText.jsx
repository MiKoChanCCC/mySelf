import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>[]{}";

export default function DecryptedText({
  children,
  className,
  stagger = 60,
  duration = 400,
  scrambleSpeed = 40,
  threshold = 0.3,
  once = true,
  chars = DEFAULT_CHARS,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once });

  const [displayChars, setDisplayChars] = useState(() =>
    children.split("")
  );

  useEffect(() => {
    setDisplayChars(
      children.split("").map(c =>
        c === " " ? " " : chars[Math.floor(Math.random() * chars.length)]
      )
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

  useEffect(() => {
    if (!isInView) return;

    const intervals = [];
    const timeouts = [];

    children.split("").forEach((char, i) => {
      if (char === " ") {
        setDisplayChars(prev => {
          const next = [...prev];
          next[i] = " ";
          return next;
        });
        return;
      }

      const startAt = i * stagger;

      const startTimer = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayChars(prev => {
            const next = [...prev];
            next[i] = randomChar();
            return next;
          });
        }, scrambleSpeed);
        intervals.push(interval);

        const resolveTimer = setTimeout(() => {
          clearInterval(interval);
          setDisplayChars(prev => {
            const next = [...prev];
            next[i] = char;
            return next;
          });
        }, duration);
        timeouts.push(resolveTimer);
      }, startAt);

      timeouts.push(startTimer);
    });

    return () => {
      intervals.forEach(clearInterval);
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <span ref={ref} className={className} aria-label={children}>
      {displayChars.map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
