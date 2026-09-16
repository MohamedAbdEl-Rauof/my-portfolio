"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLinks, type NavItem } from "./NavLinks";

export function MobileNav({
  items,
  title,
  openLabel,
  closeLabel,
}: {
  items: NavItem[];
  title: string;
  openLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={openLabel}
          className="size-11 md:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      {/* `side="right"` resolves to the inline end: the shadcn variant is
          written with logical properties, so it flips with the document. The
          built-in close button is replaced because its label is hardcoded
          English, which would be wrong on the Arabic default. */}
      <SheetContent side="right" showCloseButton={false} className="w-72">
        <SheetHeader className="flex-row items-center justify-between">
          <SheetTitle className="font-display">{title}</SheetTitle>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-11"
              aria-label={closeLabel}
            >
              <X className="size-5" aria-hidden="true" />
            </Button>
          </SheetClose>
        </SheetHeader>
        {/* Touch rows: the desktop nav is a pointer target at its text
            height, but every item in this sheet is tapped. */}
        <NavLinks
          items={items}
          label={title}
          className="flex flex-col px-4 text-base [&>a]:flex [&>a]:min-h-11 [&>a]:items-center"
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
