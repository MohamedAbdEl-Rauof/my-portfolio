"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Item = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
};

export function CertificateGrid({ items }: { items: Item[] }) {
  const t = useTranslations("about");
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id}>
          <Dialog
            open={open === item.id}
            onOpenChange={(next) => setOpen(next ? item.id : null)}
          >
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label={`${t("viewCertificate")}: ${item.title}`}
                className="group h-full w-full space-y-3 rounded-xl border bg-card p-3 text-start transition-colors hover:border-signal/40"
              >
                <Image
                  src={item.image}
                  alt=""
                  width={640}
                  height={452}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="aspect-3/2 w-full rounded-md border object-cover object-top"
                />
                <span className="block space-y-1 px-1 pb-1">
                  <span className="block font-medium text-balance">
                    {item.title}
                  </span>
                  <span className="block text-sm text-muted-foreground">
                    {item.issuer}
                  </span>
                  <span className="numeric block text-xs text-muted-foreground">
                    {item.date}
                  </span>
                </span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-2 sm:p-3">
              <DialogTitle className="sr-only">{item.title}</DialogTitle>
              <Image
                src={item.image}
                alt={item.title}
                width={1600}
                height={1130}
                sizes="90vw"
                className="h-auto w-full rounded-md"
              />
            </DialogContent>
          </Dialog>
        </li>
      ))}
    </ul>
  );
}
