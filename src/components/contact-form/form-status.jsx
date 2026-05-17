import { CircleCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export function FormStatusOverlay({ status, onReset }) {
  const { t } = useTranslation();
  const resetClass =
    "text-sm text-secondary-foreground/50 underline underline-offset-4 hover:text-secondary-foreground/80 transition-colors cursor-pointer";

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-2">
      {status === "success" ? (
        <>
          <CircleCheck className="text-secondary-foreground size-8 sm:size-10 shrink-0" />
          <p className="text-secondary-foreground font-medium text-lg">
            {t("Form.successTitle")}
          </p>
          <button type="button" onClick={onReset} className={resetClass}>
            {t("Form.successAgain")}
          </button>
        </>
      ) : (
        <>
          <p className="text-red-400 font-medium text-lg">
            {t("Form.errorTitle")}
          </p>
          <button type="button" onClick={onReset} className={resetClass}>
            {t("Form.errorBack")}
          </button>
        </>
      )}
    </div>
  );
}
