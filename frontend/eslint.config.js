import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const simpleImportSortPlugin = {
  rules: simpleImportSort.rules,
}

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': 'error',

      // Ordenação das importações
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // 1. Pacotes externos (React, Redux, etc.)
            ['^react', '^@?\\w', '^/'],

            // 2. Imports internos da pasta src (exceto components)
            ['^(?!.*components).*\\./'],

            // 3. Componentes da pasta src/components
            ['^\\.*/components/'],

            // 4. Estilos e arquivos CSS
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
    },
  },
)

