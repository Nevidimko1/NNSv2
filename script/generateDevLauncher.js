const fs = require('fs');

const requires = [
    'http://localhost:4200/runtime.js',
    'http://localhost:4200/polyfills.js',
    'http://localhost:4200/styles.js',
    'http://localhost:4200/vendor.js'
];
const header = require('./config')(true, requires);

const content = header + `
        let script = document.createElement("script");
        script.src = 'http://localhost:4200/main.js';
        script.type = 'text/javascript';
        document.documentElement.appendChild(script);
`;

console.log('Writing nns.dev.user.js script');
try {
    if (!fs.existsSync('./src/tmp')){
        fs.mkdirSync('./src/tmp');
    }

    fs.writeFileSync('./src/tmp/nns2.dev.user.js', content);
    console.log('Done');
} catch (e) {
    console.error("Cannot write file ", e);
}
