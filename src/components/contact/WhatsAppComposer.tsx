"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/**
 * Writes a WhatsApp message and hands it to WhatsApp.
 *
 * Nothing is submitted anywhere and nothing is stored: the fields only build a
 * `wa.me` link, which opens with the text already typed. That removes the whole
 * category of problems a contact form brings, spam, a mail provider, a server
 * route holding messages, while keeping the one thing the form was for, which
 * is not making someone compose a cold message from a blank screen.
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
    <div className="space-y-5 rounded-xl border bg-card p-6">
      <div className="space-y-1">
        <h2 className="font-display text-xl font-semibold">
          {t("composerTitle")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("composerHint")}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="composer-name">{t("yourName")}</Label>
        <Input
          id="composer-name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="h-11"
        />
      </div>

      <div className="space-y-2">
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

      <Button asChild size="lg" variant="signal" className="h-12 w-full">
        <a href={href} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="size-5" aria-hidden="true" />
          {t("openWhatsApp")}
        </a>
      </Button>
    </div>
  );
}
