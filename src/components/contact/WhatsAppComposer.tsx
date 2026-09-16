"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/**
 * Writes a WhatsApp message and hands it to WhatsApp. Nothing is submitted or
 * stored; the fields only build a wa.me link that opens with the text typed.
 */
export function WhatsAppComposer({
  number,
  defaultMessage,
}: {
  number: string;
  defaultMessage: string;
}) {
  const t = useTranslations("contact");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const body = [
    message.trim() || defaultMessage,
    name.trim() && `— ${name.trim()}`,
  ]
    .filter(Boolean)
    .join("\n\n");
  const href = `https://wa.me/${number}?text=${encodeURIComponent(body)}`;

  return (
    <div className="tile space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{t("composerTitle")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("composerHint")}
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="composer-name">{t("yourName")}</Label>
        <Input
          id="composer-name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="composer-message">{t("yourMessage")}</Label>
        <Textarea
          id="composer-message"
          name="message"
          rows={5}
          placeholder={defaultMessage}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>

      <a
        className="btn btn-primary w-full sm:w-auto"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("openWhatsApp")}
      </a>
    </div>
  );
}
