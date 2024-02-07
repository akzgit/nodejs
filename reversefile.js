const fs = require('fs');

const input = 'input.txt';
const output = 'output.txt';

fs.readFile(input, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading input file:', err.message);
        return;
    }

    // const reverse = data.split('').reverse().join('');
    let reverse = '';
    let i = data.length - 1;
    while (i >= 0) {
        reverse += data[i];
        i--;
    }

    fs.writeFile(output, reverse, 'utf8', (err) => {
        if (err) {
            console.error('Error writing output:', err.message);
            return;
        }
        console.log('content has been reversed to output.txt');
    });
});