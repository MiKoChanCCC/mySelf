import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Counter from "@/components/counter/Counter";
import ProjectCard from "@/components/project-card/ProjectCard";
import SplitText from "@/components/text/SplitText";
import FadeUp from "@/components/text/FadeUp";

const PROJECT_ASSETS = [
  {
    bgImage: "/images/projects/works_bg_01.webp",
    previewImage: "/images/projects/works_profolio.jpg",
  },
  {
    bgImage: "/images/projects/works_bg_02.webp",
    previewImage: "/images/projects/works_hynel.jpg",
  },
  {
    bgImage: "/images/projects/works_bg_03.webp",
    previewImage: "/images/projects/works_vehicle_search.jpg",
  },
];

export default function SelectedWorksSection() {
  const { t } = useTranslation();
  const projects = useMemo(
    () => t("Works.projects", { returnObjects: true }),
    [t],
  );
  const merged = useMemo(
    () => PROJECT_ASSETS.map((assets, idx) => ({ ...assets, ...projects[idx] })),
    [projects],
  );

  const [activeIndex, setActiveIndex] = useState(1);
  const activeIndexRef = useRef(1);
  const cardRefs = useRef([]);
  const metricsRef = useRef({});
  const scrollYRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    scrollYRef.current = window.scrollY;

    const observer = new IntersectionObserver(
      (entries) => {
        const direction = window.scrollY >= scrollYRef.current ? "down" : "up";
        scrollYRef.current = window.scrollY;

        entries.forEach((entry) => {
          const rawIndex = entry.target.getAttribute("data-index");
          if (!rawIndex) return;

          const index = Number(rawIndex);
          metricsRef.current[index] = {
            ratio: entry.intersectionRatio,
            bottom: entry.boundingClientRect.bottom,
          };
        });

        const current = activeIndexRef.current;
        const maxIndex = merged.length;

        if (
          direction === "down" &&
          current < maxIndex &&
          metricsRef.current[current]?.bottom <= 0
        ) {
          setActiveIndex(current + 1);
          return;
        }

        if (direction === "up" && current > 1) {
          const previousIndex = current - 1;
          if ((metricsRef.current[previousIndex]?.ratio ?? 0) >= 0.5) {
            setActiveIndex(previousIndex);
          }
        }
      },
      {
        root: null,
        threshold: [0, 0.5, 1],
      },
    );

    cardRefs.current.forEach((node, idx) => {
      if (!node) return;
      node.setAttribute("data-index", String(idx + 1));
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, [merged.length]);

  return (
    <section id="works" className="space-y-12 bg-secondary px-10 pt-10 pb-20 sm:py-20 text-secondary-foreground">
      <div>
        <SplitText stagger={0.04} duration={0.8} yOffset={50} className="mb-20 text-6xl leading-none font-semibold tracking-tighter uppercase md:text-[7vw]">
          {t("Works.heading")}
        </SplitText>
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 flex flex-col gap-x-18 gap-y-6 md:col-start-6 md:col-span-7 sm:flex-row">
            <span className="text-md text-nowrap text-secondary-foreground/50 tracking-tighter uppercase">
              {t("Works.label")}
            </span>

            <FadeUp
              className="w-full max-w-[25ch] text-balance text-lg leading-snug font-light text-secondary-foreground/80 md:text-2xl"
              delay={0.15}
              once={false}
            >
              {t("Works.intro")}
            </FadeUp>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 sticky top-12 hidden self-start md:col-start-1 md:col-span-5 md:block">
          <Counter
            digitClassName="text-[22vw] font-mono text-secondary-foreground/80"
            autoPlay={false}
            value={activeIndex}
          />
        </div>
        <div className="col-span-12 flex flex-col gap-y-18 md:gap-y-20 lg:gap-y-28 md:col-span-7 md:pt-5">
          {merged.map((project, idx) => (
            <ProjectCard
              key={`${project.title}-${idx}`}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              {...project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
