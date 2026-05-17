import { useLenis } from "lenis/react";

export function useScrollTo() {
  const lenis = useLenis();

  return (sectionId) => {
    const target = sectionId === "home" ? 0 : `#${sectionId}`;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2 });
    } else {
      if (sectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
}
