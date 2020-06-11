module.exports = {
  env: {
    es6: true,
    node: true,
    "jest/globals": true
  },
  plugins: ["jest", "promise"],
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    "no-unused-vars": ["warn", { "argsIgnorePattern": "next" }]
  }
}
