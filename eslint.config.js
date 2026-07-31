import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // public/ holds vendored, pre-minified assets (the Draco decoder) — not ours to lint.
  { ignores: ['dist', 'public'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Without eslint-plugin-react there is no jsx-uses-vars, so anything used
      // only inside JSX reads as unused. Capitalised components are covered by
      // ^[A-Z_]; `motion` is the one lowercase JSX namespace we import.
      'no-unused-vars': [
        'error',
        { varsIgnorePattern: '^[A-Z_]|^motion$', argsIgnorePattern: '^[A-Z_]|^_' },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
