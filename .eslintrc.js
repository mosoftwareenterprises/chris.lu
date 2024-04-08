module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    'env': {
        browser: true,
        es2021: true,
        node: true,
    },
    ignorePatterns: [
        'node_modules/',
        '.next/',
        '.vscode/',
        'public/',
    ],
    plugins: [
        'react',
        '@typescript-eslint',
        '@react-three',
        '@next/next',
    ],
    reportUnusedDisableDirectives: true,
    // ignore all by default
    // we re-eanble each by using overrides
    ignorePatterns: ['**/*.ts?(x)', '**/*.md?(x)'],
    overrides: [
        {
            files: ['**/*.ts?(x)'],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:@react-three/recommended',
                'plugin:@next/next/recommended',
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
                warnOnUnsupportedTypeScriptVersion: true,
            },
            rules: {
                // Indentation BUG: https://github.com/eslint/eslint/issues/16385
                /*
                indent: [
                    'error',
                    4,
                ],*/
                quotes: [
                    'error',
                    'single',
                    { "allowTemplateLiterals": true },
                ],
                semi: [
                    'error',
                    'never',
                ],
                '@typescript-eslint/naming-convention': [
                    'error',
                    {
                        'selector': 'interface',
                        'format': [
                            'PascalCase',
                        ],
                        'custom': {
                            'regex': '^I[A-Z]',
                            'match': true,
                        },
                    }
                ],
                '@typescript-eslint/ban-ts-comment': {
                    'ts-expect-error': 'allow-with-description',
                    'ts-ignore': 'allow-with-description',
                    'ts-nocheck': true,
                    'ts-check': true,
                    minimumDescriptionLength: 3,
                }
            },
        },
        {
            files: ['**/*.md?(x)'],
            extends: [
                'plugin:mdx/recommended',
            ],
            parser: 'eslint-mdx',
            parserOptions: {
                markdownExtensions: ['*.md, *.mdx'],
            },
            settings: {
                'mdx/code-blocks': false,
                'mdx/remark': true,
            },
            // rules get configured in remarkrc.mjs
        },
    ],
}