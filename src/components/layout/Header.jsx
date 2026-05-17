import { useTranslation } from "react-i18next";
import { useScrollTo } from "@/hooks/useScrollTo";


const HEADER_IDS = ["services", "about", "contact"];

export default function Header() {
  const { t } = useTranslation();
  const scrollTo = useScrollTo();

  return (
    <header className="flex justify-between items-start pt-8">
      <div className="flex flex-wrap items-start justify-between gap-4 md:contents">
        <button
          type="button"
          onClick={() => scrollTo("home")}
          className="text-base leading-relaxed text-foreground/60 tracking-tight text-left font-medium"
        >
          <p className="md:hidden">{t("Header.roleMobile1")}</p>
          <p className="md:hidden">{t("Header.roleMobile2")}</p>
          <p className="hidden md:block md:text-lg lg:text-xl">{t("Header.roleDesktop")}</p>
        </button>
      </div>
      <nav className="flex flex-col items-end gap-1 md:flex-row md:items-center md:gap-4">
        {HEADER_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            className="text-base text-foreground/60 md:text-lg lg:text-xl tracking-tight cursor-pointer font-medium"
          >
            {t("Nav." + id)}
          </button>
        ))}

      </nav>
    </header>
  );
}
