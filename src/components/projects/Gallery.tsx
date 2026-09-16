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

type Item = { src: string; alt: string; caption?: string };

export function Gallery({ items }: { items: Item[] }) {
  const common = useTranslations("common");
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => (
        <li key={item.src}>
          <Dialog
            open={open === index}
            onOpenChange={(next) => setOpen(next ? index : null)}
          >
            <DialogTrigger asChild>
              <button
                type="button"
                className="group w-full space-y-2 text-start"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1600}
                  height={1000}
                  sizes="(min-width: 640px) 360px, 100vw"
                  className="aspect-16/10 w-full rounded-sm border object-cover object-top transition-opacity group-hover:opacity-90"
                />
                {item.caption ? (
                  <span className="block text-sm text-muted-foreground">
                    {item.caption}
                  </span>
                ) : null}
              </button>
            </DialogTrigger>
            <DialogContent
              className="max-w-4xl p-2"
              closeLabel={common("close")}
            >
              <DialogTitle className="sr-only">{item.alt}</DialogTitle>
              <Image
                src={item.src}
                alt={item.alt}
                width={1600}
                height={1000}
                sizes="90vw"
                className="h-auto w-full rounded-sm"
              />
              {item.caption ? (
                <p className="px-2 pb-2 text-sm text-muted-foreground">
                  {item.caption}
                </p>
              ) : null}
            </DialogContent>
          </Dialog>
        </li>
      ))}
    </ul>
  );
}
