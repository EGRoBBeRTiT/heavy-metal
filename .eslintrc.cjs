module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    plugins: ['react', 'import', 'prettier', 'cypress'],
    extends: [
        'airbnb',
        'airbnb/hooks',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:cypress/recommended',
        'plugin:react/jsx-runtime',
        'prettier',
        'plugin:@typescript-eslint/stylistic',
        'plugin:@typescript-eslint/recommended-type-checked',
        'next/core-web-vitals',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
    },
    rules: {
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn',
        'no-restricted-syntax': 'off',
        'spaced-comment': ['error', 'always', { markers: ['/'] }],
        'comma-dangle': ['error', 'always-multiline'],
        'arrow-parens': ['error', 'always'],

        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'react/function-component-definition': [
            2,
            { namedComponents: 'arrow-function' },
        ],
        indent: 'off',
        'max-len': [
            'error',
            120,
            2,
            {
                ignoreUrls: true,
                ignoreComments: false,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ],
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: '*', next: 'return' },
            { blankLine: 'always', prev: '*', next: 'if' },
        ],
        'implicit-arrow-linebreak': 'off',
        'no-plusplus': 'off',
        'max-classes-per-file': 'off',
        'operator-linebreak': 'off',
        'object-curly-newline': 'off',
        'class-methods-use-this': 'off',
        'no-confusing-arrow': 'off',
        'function-paren-newline': 'off',
        'no-param-reassign': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'off',
        'consistent-return': 'off',
        'prettier/prettier': 'error',

        '@typescript-eslint/explicit-function-return-type': 'off',

        'react/prop-types': 'off',
        'react/static-property-placement': 'off',
        'react/state-in-constructor': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-props-no-spreading': 'off',
        'react/destructuring-assignment': 'off',
        'react/sort-comp': 'off',
        'react/no-array-index-key': 'off',
        'react/require-default-props': 'off',

        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-noninteractive-tabindex': 'off',
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
                aspects: ['invalidHref', 'preferButton'],
            },
        ],

        'import/prefer-default-export': 'off',
        'import/order': [
            'error',
            {
                groups: [
                    ['builtin', 'external'],
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                ],
                'newlines-between': 'always',
            },
        ],
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': ['off'],
        'arrow-body-style': ['error', 'as-needed'],
        'no-unused-expressions': 'off',

        '@typescript-eslint/consistent-type-imports': [
            'error',
            {
                prefer: 'type-imports',
                fixStyle: 'separate-type-imports',
            },
        ],
        '@typescript-eslint/consistent-type-exports': [
            'error',
            { fixMixedExportsWithInlineTypeSpecifier: true },
        ],
        'no-restricted-imports': [
            'error',
            {
                patterns: [
                    {
                        group: ['../'],
                        message:
                            'Relative imports from parent directories are not allowed.',
                    },
                ],
            },
        ],
        '@typescript-eslint/consistent-type-definitions': [
            'error',
            'interface',
        ],
        '@typescript-eslint/restrict-template-expressions': [
            'error',
            {
                allowAny: true,
                allowBoolean: true,
                allowNullish: false,
                allowNumber: true,
                allowRegExp: false,
            },
        ],
        'no-void': 'off',
    },
    overrides: [
        {
            files: ['*.tsx?'],
            env: {
                browser: true,
            },
            globals: {
                window: true,
                document: true,
            },
        },
        {
            files: ['*.test.tsx?', '*.test.js'],
            plugins: ['jest'],
            env: {
                browser: true,
                mocha: true,
            },
        },
        {
            files: [
                'src/pages/ErrorPage/ErrorPage.tsx',
                'src/utils/store/consoleActionError.ts',
                'src/utils/store/handleAsyncActionReject.ts',
            ],
            rules: {
                'no-console': ['warn', { allow: ['error'] }],
            },
        },
        {
            files: [
                'src/utils/randomUUID.ts',
                'src/utils/getHashFromString.ts',
            ],
            rules: {
                'no-bitwise': 'off',
            },
        },
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
};
