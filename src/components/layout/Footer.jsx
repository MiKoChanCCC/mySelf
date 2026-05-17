import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useScrollTo } from "@/hooks/useScrollTo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RollingText } from "@/components/ui/RollingText";

const MENU_IDS = ["home", "services", "about", "contact"];

const socialItems = [
  { kind: "link", id: "github", href: "https://github.com/MiKoChanCCC" },
  { kind: "wechat", id: "wechat" },
];

function LocalClock() {
  const { i18n } = useTranslation();
  const locale = i18n.language;
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString(
          locale === "en" ? "en-US" : locale === "zh-TW" ? "zh-TW" : "zh-CN",
          {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZoneName: "short",
          },
        ),
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [locale]);

  return <span className="font-mono font-medium uppercase text-foreground/60 text-base">{time}</span>;
}

function WeChatItem({ label, qrAlt }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="group text-foreground/60 tracking-tighter hover:text-foreground/80 transition-colors overflow-hidden cursor-default"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <RollingText className="text-base sm:text-lg lg:text-xl">{label}</RollingText>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        className="w-auto p-2"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <img
          src="/images/footer/weChat.jpg"
          alt={qrAlt}
          width={180}
          height={180}
          className="rounded-md"
        />
      </PopoverContent>
    </Popover>
  );
}

function ScrollToTopButton({ onClick, ariaLabel }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-center rounded-full bg-scroll-top-surface p-6 hover:scale-90 active:scale-95 transition-transform duration-300 cursor-pointer overflow-hidden"
    >
      <motion.div
        animate={hovered ? { y: [0, -14, 0] } : { y: 0 }}
        transition={
          hovered
            ? { duration: 0.6, ease: "easeInOut" }
            : { duration: 0.2 }
        }
      >
        <ArrowUp className="md:size-6 lg:size-10 text-scroll-top-foreground" />
      </motion.div>
    </button>
  );
}

export default function Footer() {
  const { t } = useTranslation();
  const scrollTo = useScrollTo();

  return (
    <footer className="px-10 py-12 flex flex-col gap-12">
      <div className="grid grid-cols-2 gap-y-10 md:grid-cols-12 gap-x-8">
        <div className="flex flex-col md:col-span-6">
          <h3 className="mb-3 border-b-[1.5px] border-foreground/30 pb-2 font-bold text-lg lg:text-xl tracking-tighter text-foreground/80">
            {t("Footer.menu")}
          </h3>
          <ul className="flex flex-col gap-1.5">
            {MENU_IDS.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollTo(id)}
                  className="group text-left text-foreground/60 sm:text-lg lg:text-xl tracking-tighter cursor-pointer hover:text-foreground/80 transition-colors overflow-hidden"
                >
                  <RollingText className="text-base sm:text-lg lg:text-xl">{t("Nav." + id)}</RollingText>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col md:col-span-3">
          <h3 className="mb-3 border-b-[1.5px] border-foreground/30 pb-2 font-bold text-lg lg:text-xl tracking-tighter text-foreground/80">
            {t("Footer.socials")}
          </h3>
          <ul className="flex flex-col gap-1.5">
            {socialItems.map((item) =>
              item.kind === "wechat" ? (
                <li key={item.id}>
                  <WeChatItem label={t("Footer.wechat")} qrAlt={t("Footer.wechatQrAlt")} />
                </li>
              ) : (
                <li key={item.id}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-foreground/60 tracking-tighter hover:text-foreground/80 transition-colors overflow-hidden"
                  >
                    <RollingText className="text-base sm:text-lg lg:text-xl">{t("Footer." + item.id)}</RollingText>
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <div className="flex w-full items-end justify-between md:grid md:grid-cols-12 gap-x-8">
        <span className="text-4xl font-semibold tracking-tighter text-foreground/80 md:col-span-6 md:text-5xl"></span>

        <div className="flex flex-col text-sm md:col-span-3">
          <span className="font-bold uppercase tracking-tighter text-foreground/80 text-base sm:text-lg">
            {t("Footer.localTime")}
          </span>
          <LocalClock />
        </div>

        <div className="hidden md:flex md:col-span-3 justify-end">
          <ScrollToTopButton
            ariaLabel={t("Footer.scrollToTop")}
            onClick={() => scrollTo("home")}
          />
        </div>
      </div>
    </footer>
  );
}
