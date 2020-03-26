module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    mongo: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:mocha/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: ['react', '@typescript-eslint', 'mocha'],
  rules: {
    'no-console': 'off',
    'operator-linebreak': ['error', 'after'],
  },
};
