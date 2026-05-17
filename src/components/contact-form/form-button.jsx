import { useTranslation } from "react-i18next";
import { Spinner } from "@/components/ui/spinner";

export function FormSubmitButton({ loading }) {
  const { t } = useTranslation();

  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-base sm:text-lg transition-all duration-150 bg-secondary-foreground text-secondary hover:bg-white active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading && <Spinner className="size-[1.125em] shrink-0 text-secondary" />}
      {loading ? t("Form.submitSending") : t("Form.submitIdle")}
    </button>
  );
}
