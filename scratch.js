const fs = require('fs');
const content = fs.readFileSync('index.html', 'latin1');
const fixed = Buffer.from(content, 'latin1').toString('utf8');
fs.writeFileSync('test.html', fixed, 'utf8');
