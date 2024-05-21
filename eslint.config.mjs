export default [{
  languageOptions: {
    globals: {
      'process': true
    },
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
},
files: ["*.js", "*.jsx"],
  rules: {
  // Rules only for JavaScript files
  "no-unused-vars": "warn",
    "no-console": "off"
},
plugins: {
  prettier: {
    useTabs: true,
      semi: true,
      singleQuote: true,
  },
  codeceptjs: {
    enabled: true
  }
},

}];
