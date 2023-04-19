module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
  ],
  overrides: [
    {
      files: ['config/**/*.ts', 'src/global-definitions.d.ts', 'src/libs.d.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['src/redux/slices/*.ts'],
      rules: {
        'no-param-reassign': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
      },
    },
    {
      files: ['**/*.tsx'],
      rules: {
        'react/require-default-props': 'off',
      },
    },
    {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      extends: ['plugin:@typescript-eslint/recommended'],
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.{ts,tsx,js,jsx}'],
      },
    ],
    'import/no-default-export': 'error',
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 0,
    indent: 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^action' }],
    'no-nested-ternary': 'off',
    'no-unneeded-ternary': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
};
