module.exports = {
  root: true,
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  plugins: ["react-hooks"],
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@next/next/recommended",
  ],
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_|req|res|next|err|ctx|args|context|info",
      },
    ],
    "@typescript-eslint/no-object-literal-type-assertion": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "prettier/prettier": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/default": "off",
    "import/named": "off",
    "import/namespace": "off",
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", ["parent", "sibling"], "index"],
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "@/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "@test/**",
            group: "external",
            position: "after",
          },
        ],
        alphabetize: {
          order:
            "asc" /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
      },
    ],
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/self-closing-comp": "warn",
  },
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        // typescript-eslint specific options
        warnOnUnsupportedTypeScriptVersion: true,
      },
      settings: {
        "import/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
    },
  ],
  globals: {
    React: "writable",
  },
};
