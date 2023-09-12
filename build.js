const fs = require('fs');
const minify = require('html-minifier').minify;

//read HTML, CSS and JavaScript files
const html = fs.readFileSync('./src/index.html', 'utf8');
const css = fs.readFileSync('./src/styles.css', 'utf-8');
const js = fs.readFileSync('./src/scripts.js', 'utf-8');

//combine files into a single HTML string
const bundledHTML = `<html><head><style>${css}</style><script>${js}</script></head><body>${html}</body></html>`;

//minify the combined HTML
const minifiedHTML = minify(bundledHTML, {
  removeComments: true,
  collapseWhitespace: true,
  minifyJS: true,
  minifyCSS: true,
});

//write the minified HTMl to a new file
fs.writeFileSync('./public/output.html', minifiedHTML);

console.log('project bundling and minification complete. Output saved to output.html');