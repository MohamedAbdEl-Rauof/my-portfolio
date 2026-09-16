# Content guide

Everything the site says lives in `content/`. No component holds a project
title, a date or a piece of copy. Each file is validated by a Zod schema in
`src/lib/schemas/`, and `pnpm validate:content` runs before every build.

## The bilingual rule

Every translatable field is an object with both languages:

```json
"title": { "en": "Nova Bill", "ar": "نوفا بِل" }
```

Both are required. This is deliberate: it makes it impossible to add a fact in
English and forget it in Arabic, which is how bilingual sites usually drift
apart. Write the Arabic as Arabic, not as a translation of the English
sentence structure. Keep product names in Latin script inside Arabic text.

## Adding a project

1. Create `content/projects/<slug>.json`. The filename must match the `slug`
   field; the validator checks this.
2. Add the slug to `content/projects/_index.json`. That array is the display
   order of the work grid, hand-maintained because the strongest work is not
   always the newest.
3. Put a cover at `public/projects/<slug>/cover.webp`, 1600×1000.
4. Run `pnpm media:og` to produce the social card, then `pnpm validate:content`.

### Fields

| Field                         | Notes                                                                       |
| ----------------------------- | --------------------------------------------------------------------------- |
| `slug`                        | lowercase, hyphenated; must match the filename                              |
| `title`, `tagline`, `summary` | tagline under about 90 characters; summary 2–3 sentences                    |
| `role`                        | what _you_ did: "Solo developer", "Front-end developer in the website team" |
| `client`                      | omit for personal work                                                      |
| `timeline`                    | `{ "start": "YYYY-MM", "end": "YYYY-MM" }`, `end: null` while ongoing       |
| `status`                      | `live`, `internal`, `archived`, `in-progress`                               |
| `category`                    | `professional`, `freelance`, `personal` — drives the filter                 |
| `featured`                    | shown on the home page; at most six, enforced by the validator              |
| `order`                       | sort key within a category                                                  |
| `stack`                       | ids from `content/tech.json` only; unknown ids fail the build               |
| `highlights`                  | 2–6 items, each one specific sentence, ideally with a number                |
| `metrics`                     | optional; a case study must carry at least one                              |
| `private`                     | requires `privateNote` explaining why there is no link                      |
| `caseStudy`                   | the long-form body; see below                                               |

Rules the validator enforces beyond the schema: a `live` project needs a
`links.live`; a `private` project needs a `privateNote`; every cover, gallery
image and video must exist on disk.

### Case studies

Only projects worth a full read carry a `caseStudy`. It renders `problem`,
`approach` and `results` as a numbered sequence, then any extra `sections`
unnumbered, then `lessons` in a closing panel. The numbering is there because
those three genuinely are a sequence; do not add numbers to anything that is
not one.

## The other files

- `profile.json` — name, headline, contact details, socials, CV paths.
- `tech.json` — the single registry of tool names and logos. Everything else
  references these by id, so a tool is spelled one way across the whole site.
- `skills.json` — groups for the stack section, plus the `marquee` list, which
  may only contain ids that have a logo.
- `experience.json` — roles, each linking the projects it produced.
- `education.json`, `certificates.json`, `services.json`.

## Writing style

Plain, concrete, active voice. Say what the thing does and what changed. Avoid
"comprehensive", "robust", "seamless", "cutting-edge". Prefer a number or a
mechanism over a claim: "recovered 74 legacy URLs" beats "improved SEO".

Dates are month precision because that is the accuracy these records actually
have. If you do not know a month, do not invent one.
