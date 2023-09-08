"use strict";

// Minify CSS using purgecss
//
// Load all HTML files in the same directory and subdirectories, then
// load all CSS rules from the /css/main.css file,
// remove all unused rules and finally save the result to the /css/main.min.css file.


const PurgeCSS = require('purgecss').PurgeCSS;

const purgeCSS = new PurgeCSS();

const purgeCSSConfig = {
  content: ['./**/*.html'],
  css: ['./css/main.css'],
  output: './css/main.min.css',
  safelist: ['is-active'],
};

purgeCSS.purge(purgeCSSConfig).then(result => {
  // write to file
  require('fs').writeFileSync(purgeCSSConfig.output, result[0].css);
  console.log('CSS minified successfully!');
}).catch(err => {
  console.log(err);
});
