module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"standard-with-typescript",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended"
	],
	"ignorePatterns": ['dist', '.eslintrc.cjs'],
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint",
		"prettier"
	],
	"rules": {
		"prettier/prettier": "error",
    "@typescript-eslint/no-floating-promises": "off"
	}
}
