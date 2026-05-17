import ContactForm from "@/components/contact-form";
import { useTranslation } from "react-i18next";

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="px-8 md:px-10 pt-16 pb-12 md:pb-32 -mt-[25vh]">
      <div className="relative flex flex-col items-center rounded-md bg-contact-gradient border border-white/10 shadow-lg overflow-hidden p-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl bg-contact-radial-highlight"
        />

        <h2 className="max-w-[15ch] text-center text-balance text-[clamp(64px,9vw,144px)] font-semibold uppercase leading-[1.1] md:leading-[0.9] tracking-tighter text-secondary-foreground">
          {t("Contact.heading")}
        </h2>

        <div className="w-full sm:max-w-[36rem] mx-auto my-10 px-4 sm:px-10 py-6 md:py-12 xl:px-14 rounded-2xl backdrop-blur-sm border surface-contact-form">
          <p className="text-center text-xl sm:text-2xl lg:text-3xl font-medium mb-8 text-stone-200 tracking-tight">
            {t("Contact.subheading")}
          </p>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
