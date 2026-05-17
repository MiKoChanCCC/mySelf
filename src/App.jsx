import { useTranslation } from "react-i18next";
import "@/styles/globals.css";
import NavOverlay from "@/components/layout/NavOverlay";
import SmoothScrolling from "@/components/scroll/SmoothScrolling";
import HomePage from "@/pages/HomePage";

function setDocumentLocale(locale) {
  const html = document.documentElement;
  html.lang = locale;
}

export default function App() {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  setDocumentLocale(locale);

  return (
    <>
      <NavOverlay />
      <SmoothScrolling>
        <HomePage />
      </SmoothScrolling>
    </>
  );
}
