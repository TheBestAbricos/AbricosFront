module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'airbnb-base',
		// 'airbnb-typescript/base',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	plugins: ['svelte3', '@typescript-eslint', 'prettier'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['**/*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript'),
	},
	parserOptions: {
		sourceType: 'module',
		// project: './tsconfig.json',
		ecmaVersion: 2020,
	},
	env: {
		browser: true,
		node: true,
		es6: true,
		jest: true,
	},
	rules: {
		'import/prefer-default-export': 'off',
		'import/no-unresolved': ['off', { ignore: ['$\\w/'] }],
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'always',
				tsx: 'always',
			},
		],
	},
};
