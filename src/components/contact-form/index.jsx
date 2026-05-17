import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormField } from "./form-field";
import { FormSubmitButton } from "./form-button";
import { FormStatusOverlay } from "./form-status";

export default function ContactForm() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: "", email: "", message: "" },
  });

  const [status, setStatus] = useState("idle");

  const onSubmit = async (data) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={clsx(
          "space-y-2 sm:space-y-4 transition-opacity duration-300",
          status === "success" || status === "error"
            ? "opacity-0 pointer-events-none"
            : "opacity-100",
        )}
      >
        <FormField
          placeholder={t("Form.namePlaceholder")}
          {...register("name", { required: t("Form.nameRequired") })}
          error={errors.name?.message}
        />

        <FormField
          type="email"
          placeholder={t("Form.emailPlaceholder")}
          {...register("email", {
            required: t("Form.emailRequired"),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t("Form.emailInvalid"),
            },
          })}
          error={errors.email?.message}
        />

        <FormField
          placeholder={t("Form.messagePlaceholder")}
          textarea
          {...register("message", {
            required: t("Form.messageRequired"),
          })}
          error={errors.message?.message}
        />

        <FormSubmitButton loading={isSubmitting} />
      </form>

      {(status === "success" || status === "error") && (
        <FormStatusOverlay
          status={status}
          onReset={() => {
            setStatus("idle");
            reset();
          }}
        />
      )}
    </div>
  );
}
