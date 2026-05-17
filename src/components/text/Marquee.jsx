import { useRef, useEffect, useCallback } from "react";

export default function Marquee({ items, speed = 30, reverse = false, className = "" }) {
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const halfRef = useRef(0);
  const rafRef = useRef(null);

  const wrap = useCallback((val) => {
    const h = halfRef.current;
    if (!h) return val;
    return ((val % h) + h) % h;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
    };
    measure();

    const dir = reverse ? 1 : -1;
    let lastTime = performance.now();

    const tick = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (!draggingRef.current) {
        offsetRef.current = wrap(offsetRef.current + dir * speed * dt);
        track.style.transform = `translateX(${-offsetRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const resizeObs = new ResizeObserver(measure);
    resizeObs.observe(track);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObs.disconnect();
    };
  }, [items, speed, reverse, wrap]);

  const getX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const onPointerDown = (e) => {
    draggingRef.current = true;
    startXRef.current = getX(e);
    startOffsetRef.current = offsetRef.current;
    trackRef.current.style.cursor = "grabbing";
  };

  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    const dx = getX(e) - startXRef.current;
    offsetRef.current = wrap(startOffsetRef.current - dx);
    trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
  };

  const onPointerUp = () => {
    draggingRef.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="flex w-max cursor-grab select-none"
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex-shrink-0 px-4 py-1 text-base md:text-xl font-mono text-foreground/70 whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
