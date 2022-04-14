module.exports = {
  root: true,
  env: { browser: true, es6: true, node: true, 'codeceptjs/codeceptjs': true },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['prettier', 'import', 'codeceptjs'],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:prettier/recommended',
    'plugin:codeceptjs/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    actor: true,
    Feature: true,
    Scenario: true,
    xScenario: true,
    Before: true,
    BeforeSuite: true,
    AfterSuite: true,
    codecept_helper: true,
    pause: true,
    inject: true,
  },
  rules: {
    curly: 'error',
    'import/no-duplicates': 'error',
    'import/no-named-as-default': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: false,
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'object-shorthand': ['error', 'properties'],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: false,
        avoidEscape: true,
      },
    ],
    semi: ['error', 'always'],
    'sort-imports': [
      'error',
      {
        allowSeparatedGroups: false,
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      },
    ],
  },
};
