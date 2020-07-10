module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: [
    'airbnb-base', 'prettier'
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'no-console': 'off',
    'comma-dangle': 'off',
    semi: 0,
    'consistent-return': 0,
    'function-paren-newline': 0,
    'no-underscore-dangle': 0,
  },
};
