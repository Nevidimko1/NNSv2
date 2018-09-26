const package = require('../package.json');

module.exports = (dev, requires = []) => {
    const scripts = requires.reduce((f, r) => f = f + `

script = document.createElement("script");
script.src = '${r}';
script.type = 'text/javascript';
script.async = false;
document.documentElement.appendChild(script);`, 'let script;');

    return `
// ==UserScript==

// @name            Virtonomica: NNSv2 script ${dev ? 'DEV' : ''}
// @namespace       Virtonomica
// @description     Универсальный скрипт для виртономики
// @version         ${package.version}
// @include         https://*virtonomic*.*/*
// @import          url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

// ==/UserScript==

${scripts}
`;
};
