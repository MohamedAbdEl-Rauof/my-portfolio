import "server-only";
import { cache } from "react";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { z } from "zod";
import { Profile } from "@/lib/schemas";

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * Read one JSON file and parse it through its schema. Throwing here is the
 * point: a malformed content file should stop the build, not render a page
 * with holes in it.
 */
function readJson<S extends z.ZodType>(
  relativePath: string,
  schema: S,
): z.infer<S> {
  const file = path.join(CONTENT_DIR, relativePath);
  let raw: string;
  try {
    raw = readFileSync(file, "utf8");
  } catch {
    throw new Error(`Content file missing: content/${relativePath}`);
  }

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    throw new Error(
      `Content file is not valid JSON: content/${relativePath}\n${String(error)}`,
    );
  }

  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Content file failed validation: content/${relativePath}\n` +
        JSON.stringify(result.error.issues, null, 2),
    );
  }
  return result.data;
}

/** Name, contact details, socials and CV links. */
export const getProfile = cache(() => readJson("profile.json", Profile));

/** The wa.me deep link, with an optional prefilled message. */
export function whatsappUrl(number: string, message?: string): string {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
