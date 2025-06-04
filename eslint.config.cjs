const { defineConfig, globalIgnores } = require("eslint/config")

const tsParser = require("@typescript-eslint/parser")
const typescriptEslint = require("@typescript-eslint/eslint-plugin")
const parser = require("svelte-eslint-parser")
const globals = require("globals")
const js = require("@eslint/js")

const { FlatCompat } = require("@eslint/eslintrc")

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = defineConfig([
  {
    extends: compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:svelte/recommended",
      "prettier",
    ),

    languageOptions: {
      parser: tsParser,
      sourceType: "module",
      ecmaVersion: 2020,

      parserOptions: {
        extraFileExtensions: [".svelte"],
      },

      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      "@typescript-eslint": typescriptEslint,
    },

    rules: {
      "no-undef": "off",
    },
  },
  {
    files: ["**/*.svelte"],

    languageOptions: {
      parser: parser,

      parserOptions: {
        parser: {
          ts: "@typescript-eslint/parser",
          js: "espree",
          typescript: "@typescript-eslint/parser",
        },
      },
    },
  },
  {
    files: ["**/*.test.ts", "**/*.spec.ts"],

    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  globalIgnores([
    "**/.DS_Store",
    "**/node_modules",
    "build",
    ".svelte-kit",
    "package",
    "**/.env",
    "**/.env.*",
    "!**/.env.example",
    "**/pnpm-lock.yaml",
    "**/package-lock.json",
    "**/yarn.lock",
    "eslint.config.cjs",
  ]),
])
