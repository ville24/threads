import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import stylisticJs from '@stylistic/eslint-plugin-js'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {ignores: [
    '*/dist/**',
    'playwright-report/trace/**'
  ]},
  {files: ['**/*.{js,mjs,cjs,jsx}']},
  {files: ['**/*.js'],
    languageOptions: {sourceType: 'commonjs'},
    languageOptions: {sourceType: 'module'}},
  {languageOptions: {globals: {...globals.browser,
    ...globals.node,
    ...globals.jest}}},
  pluginReact.configs.flat.recommended,
  stylisticJs.configs['all-flat'],
  {
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'prefer-const': 'error',
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/no-multi-spaces': 'error',
      '@stylistic/js/no-multiple-empty-lines': 'error',
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'never'
      ],
      '@stylistic/js/quote-props': [
        'error',
        'consistent'
      ],
      '@stylistic/js/dot-location': [
        'error',
        'property'
      ],
      '@stylistic/js/no-extra-parens': [
        'error',
        'all',
        {'nestedBinaryExpressions': false}
      ]
    }
  }
]
