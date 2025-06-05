import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import pollutionSecurity from 'eslint-plugin-prototype-pollution-security-rules'
import noWildcardPostmessage from 'eslint-plugin-no-wildcard-postmessage'
import noUnsanitized from 'eslint-plugin-no-unsanitized'
import pluginSecurity from 'eslint-plugin-security'
import pluginReact from 'eslint-plugin-react'

export default [
{ ignores: ['dist/**', 'client/.vite/**'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {...globals.browser, ...globals.node},
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'detect-prototype-pollution': pollutionSecurity,
      'no-wildcard-postmessage': noWildcardPostmessage,
      'no-unsanitized': noUnsanitized,
      'plugin-security': pluginSecurity,
      'plugin-react': pluginReact,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'detect-prototype-pollution/detect-merge': 1,
      'no-wildcard-postmessage/no-wildcard-postmessage': "error",
      'no-unsanitized/method': 'error',
      'no-unsanitized/property': 'error',
      'plugin-security/detect-unsafe-regex': 'error',
      'plugin-security/detect-non-literal-fs-filename': 'error',
      'plugin-security/detect-non-literal-regexp': 'error',
      'plugin-security/detect-non-literal-require': 'error',
      'plugin-security/detect-possible-timing-attacks': 'error',
      'plugin-security/detect-eval-with-expression': 'error',
      'plugin-react/display-name': 'error',
      'plugin-react/jsx-key': 'error',
      'plugin-react/jsx-no-comment-textnodes': 'error',
      'plugin-react/jsx-no-duplicate-props': 'error',
      'plugin-react/jsx-no-target-blank': 'error',
      'plugin-react/jsx-no-undef': 'error',
      'plugin-react/jsx-uses-react': 'error',
      'plugin-react/no-children-prop': 'error',
      'plugin-react/no-danger-with-children': 'error',
      'plugin-react/no-deprecated': 'error',
      'plugin-react/no-direct-mutation-state': 'error',
      'plugin-react/no-find-dom-node': 'error',
      'plugin-react/no-is-mounted': 'error',
      'plugin-react/no-render-return-value': 'error',
      'plugin-react/no-string-refs': 'error',
      'plugin-react/no-unescaped-entities': 'error',
      'plugin-react/no-unknown-property': ['warn', {ignore: ['class']}],
      'plugin-react/no-unsafe': 'error',
      'plugin-react/require-render-return': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
