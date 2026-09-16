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

/**
 * The thumbnail box is a fixed 4:3 frame the scan sits inside, so a portrait
 * certificate shows whole instead of losing its bottom two thirds to a crop.
 */
export function CertificateGrid({ items }: { items: Item[] }) {
  const t = useTranslations("about");
  const common = useTranslations("common");
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
                className="group w-full text-start"
              >
                <span className="flex aspect-4/3 items-center justify-center rounded-sm border bg-muted p-2 transition-colors group-hover:bg-accent">
                  <Image
                    src={item.image}
                    alt=""
                    width={600}
                    height={450}
                    sizes="(min-width: 640px) 240px, 100vw"
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="mt-2 block text-sm font-medium text-balance">
                  {item.title}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {item.issuer} · <span className="numeric">{item.date}</span>
                </span>
              </button>
            </DialogTrigger>
            <DialogContent
              className="max-w-3xl p-2"
              closeLabel={common("close")}
            >
              <DialogTitle className="sr-only">{item.title}</DialogTitle>
              <Image
                src={item.image}
                alt={item.title}
                width={1200}
                height={900}
                sizes="90vw"
                className="h-auto max-h-[85vh] w-full rounded-sm object-contain"
              />
            </DialogContent>
          </Dialog>
        </li>
      ))}
    </ul>
  );
}
