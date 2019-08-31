module.exports = {
    'env': {
        'commonjs': true,
        'es6': true,
        'node': true,
        "jest": true,
        "jest/globals": true
    },
    "extends": [ 
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018
    },
    "plugins": [
        "react", "jest",
        "react-hooks"
    ],
    'rules': {
        'indent': [
            "react-hooks/rules-of-hooks": "error",
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "no-console": 0,
        "react/prop-types": 0
    }
}