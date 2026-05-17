import DecryptedText from "@/components/text/DecryptedText";
import FadeUp from "@/components/text/FadeUp";
import SplitText from "@/components/text/SplitText";
import { motion, useScroll, useTransform } from "motion/react";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";

const SKILL_ITEMS = [
  [
    // 语言
    "HTML",
    "CSS",
    "JavaScript(ES6+)",
    "TypeScript",
    "WeChat Mini Program  (Native)"
  ],
  [
    // 框架与库
    "React",
    "Node.js",
    "Tailwind CSS",
    "Redux",
    "React-Redux",
    "React-Router",
    "Ant Design"
  ],
  [
    // 工具与网络
    "Git",
    "Webpack",
    "Vite",
    "Create-React-App",
    "uni-app",
    "Ajax",
    "Axios"
  ],
];

export default function AboutSection() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  const skillGroups = useMemo(() => {
    const titles = t("About.skillGroups", { returnObjects: true });
    return titles.map((g, i) => ({
      title: g.title,
      items: [...SKILL_ITEMS[i]],
    }));
  }, [t]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.1, 1], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="mt-[-2vh]"
    >
      <div className="relative z-10">
        <motion.div
          style={{ scale, y, willChange: "transform", transformOrigin: "top center" }}
          className="rounded-b-3xl bg-secondary px-10 pt-4 sm:pt-8 md:pt-12 pb-20 sm:pb-40 text-secondary-foreground space-y-28 md:space-y-56"
        >
          <div className="grid grid-cols-12 gap-x-6 gap-y-12">
            <h2 className="order-2 col-span-12 flex flex-col lg:pt-1 font-semibold tracking-tighter leading-none md:order-1 lg:col-span-6 text-[54px] sm:text-7xl md:text-[88px] lg:text-[96px]">
              <span className="block">

              </span>
              <span className="block">

              </span>
              <span className="block">

              </span>
            </h2>

            <div className="order-1 col-span-12 overflow-hidden md:order-2">
              <section className="self-start px-3 py-5 md:px-6">
                <div className="mx-auto max-w-4xl rounded-2xl bg-background/50 backdrop-blur-sm border border-foreground/5 shadow-lg p-8 md:p-12 flex flex-col items-center">
                  <div className="mb-8 text-center tracking-tighter font-semibold text-[40px] sm:text-[50px] md:text-[clamp(70px,calc(70px+(90-70)*((100vw-768px)/(1280-768))),90px)] xl:text-[90px] leading-none">
                    {t("About.skillsHeading")}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-0 md:gap-5 md:p-5">
                    {skillGroups.map((group) => (
                      <div key={group.title} className="p-2">
                        <h4 className="hidden md:flex text-xl font-semibold mb-4 tracking-tighter">
                          {group.title}
                        </h4>
                        <ul className="space-y-1 text-base md:text-lg lg:text-xl">
                          {group.items.map((item) => (
                            <li key={item}>
                              <DecryptedText once={false} className="font-mono font-[400] text-secondary-foreground/75">
                                {item}
                              </DecryptedText>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="pointer-events-none relative max-h-[30rem] col-span-12 md:col-span-3 flex aspect-square w-full h-full items-center overflow-clip rounded-md sm:aspect-auto md:items-end">
              <img
                src="/images/about/bgImg.webp"
                alt={t("About.aboutImageAlt")}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>

            <div className="col-span-12 flex flex-col gap-y-9 lg:gap-y-18 md:col-span-7 md:col-start-6">
              <FadeUp
                className="max-w-[39ch] text-balance text-2xl md:text-3xl lg:text-4xl font-medium leading-snug tracking-tight"
                once={false}
              >
                {t("About.lead")}
              </FadeUp>

              <div className="flex flex-col gap-x-10 gap-y-4 lg:flex-row">
                <span className="font-mono uppercase text-secondary-foreground/70">
                  {t("About.aboutLabel")}
                </span>

                <div className="flex max-w-[38ch] flex-col gap-y-4 text-balance text-base md:text-lg lg:text-xl text-secondary-foreground/75 tracking-tight font-normal">
                  <FadeUp once={false}>
                    <p>{t("About.p1")}</p>
                  </FadeUp>

                  <FadeUp delay={0.12} once={false}>
                    <p>{t("About.p2")}</p>
                  </FadeUp>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
