module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended", // Extends Prettier config
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react-refresh",
    "prettier", // Prettier plugin
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "prettier/prettier": [
      "error",
      {
        semi: false, // Disable semicolons
        trailingComma: "es5",
        singleQuote: true,
        printWidth: 80,
        tabWidth: 2,
        endOfLine: "auto",
        jsxSingleQuote: true,
      },
    ],
    // Additional ESLint rules
    semi: ["error", "never"], // Ensure no semicolons
    "@typescript-eslint/no-unused-vars": "warn",
  },
};
