const fs = require('fs');
const minify = require('uglify-js').minify;

const jsCode = fs.readFileSync('scripts.js', 'utf-8');

const result = minify(jsCode, {
  mangle: {
    // Specify the names you want to preserve here
    // For example, if you want to preserve a function named "myFunction",
    // add it to the list below.
    reserved: ['magnify', 'img', 'glass', 'w', 'h', 'bw', 'moveMagnifier', 'getCursorPos', 'image', 'magGlass', 'isMouseOver']
  }
});

fs.writeFileSync('uglify-output.js', result.code);

console.log('JS minification OfflineAudioCompletionEvent, output saved as uglify-output.js');