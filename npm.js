#!/usr/bin/env node
const fs = require("fs");
const path = require('path');
const scripts = require('./addScripts');

const createFile = (filename, content) => {
  fs.writeFile(`${filename}`, content, (err) => {
    if (err) {
      console.log("=======>", err.message);
      return false;
    }
    console.log(`============> ${filename} created successfully`);
  });
};

const copyFile = (filename) => {
  fs.readFile(path.join(__dirname, filename), 'utf-8', (err, data) => {
    createFile(filename, data);
  });
};

createFile('src/export.ts');
copyFile('copier.ts');
copyFile('.babelrc');
copyFile('publish.ts');
copyFile('tsconfig.lib.json');
scripts();
