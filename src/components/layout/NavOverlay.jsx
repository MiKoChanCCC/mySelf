import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useScrollTo } from "@/hooks/useScrollTo";


const NAV_IDS = ["home", "services", "about", "contact"];

const socialLinks = [
  { labelKey: "github", href: "https://github.com/MiKoChanCCC" },
];

const EMAIL = "1607250879@qq.com";

const EASE = [0.76, 0, 0.24, 1];

const menuVariants = {
  closed: { x: "100%", transition: { duration: 0.6, ease: EASE } },
  opened: { x: "0%", transition: { duration: 0.6, ease: EASE } },
};

const linkVariants = {
  initial: { y: 20, opacity: 0 },
  enter: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.3 + i * 0.08, ease: EASE },
  }),
};

const footerVariants = {
  initial: { y: 12, opacity: 0 },
  enter: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.35, ease: EASE },
  },
};

export default function NavOverlay() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const scrollTo = useScrollTo();

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const onScroll = () => {
      setShowButton(window.scrollY >= window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <motion.button
        animate={{ opacity: showButton ? 1 : 0, scale: showButton ? 1 : 0.8 }}
        whileHover={{ scale: 0.9 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={{ pointerEvents: showButton ? "auto" : "none", cursor: "pointer" }}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? t("NavOverlay.closeMenu") : t("NavOverlay.openMenu")}
        type="button"
        className="fixed top-9 right-8 z-[9999] p-3 bg-secondary-foreground rounded-full shadow-lg"
      >
        <svg width="35" height="35" viewBox="0 0 35 35" style={{ display: "block" }}>
          <motion.line
            x1="2" y1="13.5" x2="33" y2="13.5"
            stroke="black" strokeWidth="2" strokeLinecap="round"
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 4 : 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          />
          <motion.line
            x1="2" y1="21.5" x2="33" y2="21.5"
            stroke="black" strokeWidth="2" strokeLinecap="round"
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -4 : 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            aria-hidden="true"
            className="fixed inset-0 backdrop-blur-lg"
            style={{ zIndex: 997 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        variants={menuVariants}
        initial="closed"
        animate={isOpen ? "opened" : "closed"}
        onClick={close}
        className="fixed top-0 right-0 h-screen w-screen flex justify-end"
        style={{ zIndex: 998 }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full relative flex max-w-2xl flex-col justify-end overflow-hidden xl:max-w-3xl"
        >
          <nav className="relative h-full px-10 sm:px-16 flex items-center">
            <ul
              className="flex flex-col justify-center gap-4"
              onMouseLeave={() => setHoveredId(null)}
            >
              {NAV_IDS.map((id, i) => {
                const isDimmed = hoveredId !== null && hoveredId !== id;
                return (
                  <li key={id} className="relative flex items-center overflow-hidden">
                    <motion.button
                      type="button"
                      custom={i}
                      variants={linkVariants}
                      initial="initial"
                      animate={
                        { ...(isOpen ? { y: 0, opacity: isDimmed ? 0.25 : 1 } : { y: 20, opacity: 0 }), scale: isDimmed ? 0.9 : 1 }
                      }
                      transition={{ duration: 0.3, ease: EASE }}
                      onMouseEnter={() => setHoveredId(id)}
                      onClick={() => { scrollTo(id); close(); }}
                      className="group relative inline-block text-secondary-foreground font-bold uppercase leading-none tracking-tighter select-none cursor-pointer"
                      style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
                    >
                      {t("Nav." + id)}
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            variants={footerVariants}
            initial="initial"
            animate={isOpen ? "enter" : "initial"}
            className="flex flex-col items-start gap-y-6 px-10 pb-10 sm:px-16 sm:pb-14"
          >

            <div className="flex flex-col">
              <span className="text-base font-bold uppercase text-black">
                {t("NavOverlay.emailLabel")}
              </span>
              <div className="flex items-center gap-x-2">
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-medium text-black text-base"
                >
                  {EMAIL}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label={t("NavOverlay.copyEmail")}
                  className="text-white/40 hover:text-secondary-foreground transition-colors duration-200 cursor-pointer"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check size={14} className="text-green-400" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Copy size={14} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            <ul className="flex flex-nowrap gap-x-6">
              {socialLinks.map(({ labelKey, href }) => (
                <li key={labelKey}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={href}
                    className="relative text-secondary-foreground font-medium text-base transition-colors duration-300 hover:text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {t("NavOverlay." + labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
