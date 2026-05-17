import { ReactLenis } from "lenis/react";
import { frame, cancelFrame } from "motion";
import { useEffect, useRef } from "react";

function SmoothScrolling({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        function update(data) {
            lenisRef.current?.lenis?.raf(data.timestamp);
        }

        frame.read(update, true);

        return () => {
            cancelFrame(update);
        };
    }, []);

    return (
        <ReactLenis
            root
            ref={lenisRef}
            options={{
                lerp: 0.1,
                duration: 1.2,
                smoothWheel: true,
                autoRaf: false,
            }}
        >
            {children}
        </ReactLenis>
    );
}

export default SmoothScrolling;
