// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  "extends": "eslint:recommended",
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  // add your custom rules here
  'rules': {
    "indent": [
      "error",
      4,
      {
        "SwitchCase": 1
      }
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-var": "error",
    "no-unused-vars": [
      "warn"
    ],
    "no-console": [
      "error",
      {
        "allow": [
          "warn",
          "error"
        ]
      }
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-mixed-spaces-and-tabs": [0],
    "no-tabs": 0,
    "no-unreachable": 0,
    "skipBlankLines": 0,
    "max-len": [0, 120, 4],
    "no-console": 0,
    "no-undef": 0,
    "arrow-spacing": 0,
    "space-before-function-paren": 0,
    "keyword-spacing": 0,
    "no-useless-escape": 0,
    "indent":0,
    "padded-blocks":0,
    "comma-spacing":0,
    "no-unused-vars":0,
    "key-spacing":0,
    "space-before-blocks":0,
    "spaced-comment":0,
    "comma-dangle":0,
    "standard/array-bracket-even-spacing":0,
    "semi":0,
    "no-self-assign":0,
    "one-var":0,
    "no-unneeded-ternary":0,
    "space-in-parens":0,
    "ignoreComments": 0,
    "no-trailing-spaces": [2, { "skipBlankLines": true }],

  }
}
