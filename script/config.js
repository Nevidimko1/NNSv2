const package = require('../package.json');

module.exports = (dev, requires = []) => {
    return `
        // ==UserScript==

        // @name            Virtonomica: NNSv2 script ${dev ? 'DEV' : ''}
        // @namespace       Virtonomica
        // @description     Универсальный скрипт для виртономики
        // @version         ${package.version}
        // @include         https://*virtonomic*.*/*
        // @import          url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

        ${requires.reduce((f, r) => f = f + '// @require\t' + r + '\n\t\t', '')}
        // ==/UserScript==
    `;
};
