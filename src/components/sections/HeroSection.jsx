import Header from "@/components/layout/Header";
import Marquee from "@/components/text/Marquee";
import { HERO_VARIANTS, HERO_IMAGE_VARIANTS } from "@/lib/animations";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useScrollTo } from "@/hooks/useScrollTo";

const TECH_ITEMS = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Node.js", "Tailwind CSS", "Redux", "React-Redux", "React-Router", "Git", "Webpack", "Vite", "Create-React-App", "uni-app", "Ajax", "Axios"];

const WIPE_EASE = [0.25, 0.46, 0.45, 0.94];

function CtaButton({ label, onClick, className }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`relative overflow-hidden inline-flex items-center bg-foreground/80 text-background font-bold uppercase cursor-pointer ${className}`}
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      initial="initial"
    >
      <motion.span
        className="absolute inset-0 bg-foreground rounded-full"
        variants={{ initial: { x: "-101%" }, hover: { x: "0%" } }}
        transition={{ duration: 0.4, ease: WIPE_EASE }}
      />
      <span className="relative z-10">{label}</span>
      <motion.span
        className="relative z-10"
        variants={{ initial: { x: 0, scale: 1 }, hover: { x: 2, scale: 1.15 } }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <ArrowUpRight className="w-[1em] h-[1em] ml-1" />
      </motion.span>
    </motion.button>
  );
}

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const scrollTo = useScrollTo();
  const containerRef = useRef(null);

  const todayLabel = useMemo(() => {
    const d = new Date();
    const loc =
      locale === "zh-TW" ? "zh-TW" : locale === "zh-CN" ? "zh-CN" : "en-US";
    return new Intl.DateTimeFormat(loc, {
      month: "short",
      day: "2-digit",
    }).format(d);
  }, [locale]);

  const scrollProgress = useMotionValue(0);

  useLenis(({ scroll }) => {
    const el = containerRef.current;
    if (!el) return;
    const progress = Math.min(Math.max((scroll - el.offsetTop) / el.offsetHeight, 0), 1);
    scrollProgress.set(progress);
  });

  const y = useTransform(scrollProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollProgress, [0, 1], [1, 0.8]);

  return (
    <div id="home" ref={containerRef} className="relative h-screen z-0 overflow-hidden">
      {/* animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-[#646cff]/10 blur-[120px] animate-orb-1" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-[#42d392]/10 blur-[120px] animate-orb-2" />
        <div className="absolute top-1/3 right-1/4 w-[40vw] h-[40vw] rounded-full bg-[#bd34fe]/8 blur-[100px] animate-orb-3" />
      </div>
      <div className="relative top-0 h-screen flex flex-col px-8 pb-8">
        <Header />

        <motion.div
          className="flex-1 flex flex-col"
          style={{ y, opacity, scale, willChange: "transform", backfaceVisibility: "hidden" }}
        >
          <div className="flex-1 min-h-[60px]" />

          <div className="flex flex-col">
            <motion.h1
              className="text-7xl max-[380px]:text-[70px] font-semibold tracking-tighter uppercase md:text-[14.8vw] md:leading-[0.8] whitespace-nowrap flex justify-between text-foreground/95 scale-y-[0.88]"
              variants={HERO_VARIANTS}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              SIYANG
              <br className="md:hidden" />
              <span className="hidden md:inline"> </span>
              CHEN
            </motion.h1>

            <div className="relative grid grid-cols-12 gap-x-4 gap-y-6 md:hidden">
              <motion.div
                className="col-span-12 space-y-4 mt-4"
                variants={HERO_VARIANTS}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                <p className="text-base max-w-[260px] text-balance text-foreground/60 font-medium">{t("Hero.tagline")}</p>
                <div>
                  <CtaButton
                    label={t("Hero.cta")}
                    onClick={() => scrollTo("contact")}
                    className="px-5 py-4 rounded-full text-sm"
                  />
                </div>
              </motion.div>

              <motion.div
                className="col-span-4 overflow-hidden rounded-sm max-w-[300px]"
                variants={HERO_IMAGE_VARIANTS}
                initial="hidden"
                animate="visible"
                custom={3}
              >
                <Marquee items={TECH_ITEMS} speed={20} reverse className="py-2" />
              </motion.div>

              <motion.div
                className="col-span-8 flex items-end justify-end"
                variants={HERO_VARIANTS}
                initial="hidden"
                animate="visible"
                custom={4}
              >
                <div className="text-right">
                  <p className="text-base uppercase text-muted-foreground leading-tight font-mono">
                    {t("Hero.availabilityMobileLine1")}
                  </p>
                  <p className="text-base uppercase text-muted-foreground leading-tight font-mono">
                    {t("Hero.availabilityMobileLine2")}
                  </p>
                  <p className="text-4xl font-semibold uppercase leading-none tracking-tight mt-1 text-foreground/80">
                    {todayLabel}
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="hidden md:grid md:grid-cols-12 gap-x-6 mt-8">
              <motion.div
                className="col-span-4 flex flex-col justify-between"
                variants={HERO_VARIANTS}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                <div className="space-y-12">
                  <ArrowDownRight className="text-muted-foreground size-12" />
                  <div className="flex flex-col gap-8 pl-3">
                    <p className="text-2xl xl:text-3xl tracking-tight leading-[1.4] max-w-[32ch] text-balance text-foreground/60 font-medium">
                      {t("Hero.tagline")}
                    </p>
                    <div>
                      <CtaButton
                        label={t("Hero.cta")}
                        onClick={() => scrollTo("contact")}
                        className="tracking-tight px-4 py-3 text-xs md:px-6 md:py-4 md:text-base lg:px-8 lg:py-5 lg:text-lg rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="col-span-4 flex justify-center">
                <motion.div
                  className="h-[50vh] max-w-lg overflow-hidden rounded-sm w-fit flex flex-col justify-center"
                  variants={HERO_IMAGE_VARIANTS}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                >
                  <Marquee items={TECH_ITEMS} speed={25} reverse className="py-3" />
                </motion.div>
              </div>

              <motion.div
                className="col-span-4 flex flex-col justify-end items-end"
                variants={HERO_VARIANTS}
                initial="hidden"
                animate="visible"
                custom={4}
              >
                <div className="text-right">
                  <p className="text-sm xl:text-base uppercase text-muted-foreground leading-tight tracking-wider font-mono">
                    {t("Hero.availabilityDesktop")}
                  </p>
                  <p className="text-[8vw] text-foreground/80 font-semibold uppercase leading-none tracking-tighter mt-1">
                    {todayLabel}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
