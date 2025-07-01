import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import reactNativePlugin from "eslint-plugin-react-native";

export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      "react-native": reactNativePlugin
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "@typescript-eslint/no-require-imports": "off",
      "react-native/no-unused-styles": "warn",
      "react-native/no-inline-styles": "warn",
      "react-native/no-raw-text": "warn"
    }
  },
  {
    plugins: { onlyWarn },
  },
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "ios/**",
      "android/**",
      ".expo/**",
      "*eslint.config.mjs"
    ],
  }
];