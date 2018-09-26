const fs = require('fs');

const requires = [
    'http://localhost:4200/runtime.js',
    'http://localhost:4200/polyfills.js',
    'http://localhost:4200/styles.js',
    'http://localhost:4200/vendor.js',
    'http://localhost:4200/main.js'
];
const content = require('./config')(true, requires);

console.log('Writing nns.dev.user.js script');
try {
    if (!fs.existsSync('./src/tmp')){
        fs.mkdirSync('./src/tmp');
    }

    fs.writeFileSync('./src/tmp/nns.dev.user.js', content);
    console.log('Done');
} catch (e) {
    console.error("Cannot write file ", e);
}
