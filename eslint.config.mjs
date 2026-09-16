import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      /*
       * RTL safety: the site renders Arabic by default, so a physical-direction
       * utility silently breaks the mirrored layout. Logical properties only
       * (ms-/me-/ps-/pe-/start-/end-/text-start/text-end).
       */
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "Literal[value=/(?:^|\\s)(?:ml|mr|pl|pr)-(?:\\d|px|auto|\\[)/]",
          message:
            "Use logical spacing (ms-/me-/ps-/pe-) instead of ml-/mr-/pl-/pr- so RTL mirrors correctly.",
        },
        {
          selector: "Literal[value=/(?:^|\\s)text-(?:left|right)(?:\\s|$)/]",
          message:
            "Use text-start/text-end instead of text-left/text-right so RTL mirrors correctly.",
        },
      ],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
