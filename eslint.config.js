import boundariesPlugin from "eslint-plugin-boundaries";
import importPlugin from "eslint-plugin-import";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["dist/**", "coverage/**", "node_modules/**"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
      import: importPlugin,
      boundaries: boundariesPlugin,
    },
    settings: {
      "boundaries/elements": [
        { type: "engine", pattern: "src/engine/**" },
        { type: "render", pattern: "src/render/**" },
        { type: "ui", pattern: "src/ui/**" },
        { type: "adapters", pattern: "src/adapters/**" },
        { type: "shared", pattern: "src/shared/**" },
        { type: "app", pattern: "src/app/**" },
      ],
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "import/no-default-export": "error",
      "import/no-cycle": "error",
      "boundaries/element-types": [
        "error",
        {
          default: "allow",
          rules: [
            { from: "engine", disallow: ["render", "ui"] },
            { from: "render", disallow: ["ui"] },
          ],
        },
      ],
    },
  },
  {
    files: ["src/engine/**/*.ts", "src/engine/**/*.tsx"],
    rules: {
      "no-restricted-globals": [
        "error",
        { name: "window", message: "Use ports/adapters instead of browser globals." },
        { name: "document", message: "Use ports/adapters instead of browser globals." },
        { name: "localStorage", message: "Use storage ports/adapters instead." },
        { name: "indexedDB", message: "Use storage ports/adapters instead." },
        { name: "fetch", message: "Use network ports/adapters instead." },
        { name: "performance", message: "Use time ports/adapters instead." },
        {
          name: "requestAnimationFrame",
          message: "Keep game logic in fixed timestep systems.",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            "react",
            "pixi.js",
            "@pixi/*",
            "src/render/*",
            "src/ui/*",
            "@render/*",
            "@ui/*",
          ],
        },
      ],
    },
  },
  {
    files: ["src/ui/**/*.ts", "src/ui/**/*.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["src/engine/*", "@engine/*", "!src/engine/public", "!@engine/public"],
        },
      ],
    },
  },
  {
    files: ["eslint.config.js", "vite.config.ts", "vitest.config.ts"],
    rules: {
      "import/no-default-export": "off",
    },
  },
];
