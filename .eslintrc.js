module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/essential",
    "plugin:vue/recommended"
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module"
  },
  plugins: [
    "vue"
  ],
  rules: {
    "array-bracket-spacing": [
      "error"
    ],
    "arrow-body-style": [
      "warn"
    ],
    "arrow-spacing": [
      "error"
    ],
    "block-spacing": [
      "error",
      "never"
    ],
    "brace-style": [
      "error",
      "1tbs"
    ],
    "comma-spacing": [
      "error"
    ],
    "comma-style": [
      "error"
    ],
    "computed-property-spacing": [
      "error"
    ],
    curly: [
      "error"
    ],
    "dot-location": [
      "error",
      "property"
    ],
    "dot-notation": [
      "error"
    ],
    eqeqeq: [
      "error"
    ],
    "func-call-spacing": [
      "error"
    ],
    "key-spacing": [
      "error"
    ],
    "keyword-spacing": [
      "error"
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "new-cap": [
      "warn"
    ],
    "new-parens": [
      "error"
    ],
    "no-console": [
      "error",
      {"allow": ["info", "warn", "error"]}
    ],
    "no-multi-spaces": [
      "error"
    ],
    "no-trailing-spaces": [
      "warn"
    ],
    "no-unneeded-ternary": [
      "warn"
    ],
    "no-useless-call": [
      "error"
    ],
    "no-useless-computed-key": [
      "error"
    ],
    "no-var": [
      "error"
    ],
    "no-whitespace-before-property": [
      "warn"
    ],
    "object-curly-spacing": [
      "error"
    ],
    "object-shorthand": [
      "warn"
    ],
    "operator-assignment": [
      "warn"
    ],
    "operator-linebreak": [
      "error",
      "after"
    ],
    "prefer-arrow-callback": [
      "error",
      {"allowNamedFunctions": true}
    ],
    "prefer-rest-params": [
      "error"
    ],
    quotes: [
      "error",
      "double"
    ],
    "rest-spread-spacing": [
      "error"
    ],
    semi: [
      "error",
      "always"
    ],
    "semi-spacing": [
      "error"
    ],
    "semi-style": [
      "error"
    ],
    "space-before-blocks": [
      "error"
    ],
    "space-before-function-paren": [
      "error",
      {"anonymous": "always", "named": "never", "asyncArrow": "always"}
    ],
    "space-in-parens": [
      "error"
    ],
    "space-infix-ops": [
      "error"
    ],
    "space-unary-ops": [
      "error"
    ],
    "spaced-comment": [
      "warn",
      "always",
      {"markers": ["!"]}
    ],
    "switch-colon-spacing": [
      "error"
    ],
    "vue/script-indent": [
      "error"
    ]
  }
};
