import fs from 'fs';
import path from 'path';
import glob from 'glob';

const srcDir = path.join('./src');
const distDir = path.join('./dist/js');
const files = glob.sync('**/*.d.ts', {
  cwd: srcDir,
});

const scss = glob.sync('**/*.scss', {
  cwd: srcDir,
});

const svg = glob.sync('**/*.svg', {
  cwd: srcDir,
});

const copyFile = (from: string, to: string) => {
  fs.copyFile(from, to, (err) => {
    if(err)console.log(err);
    console.log('Successfully built', from, '===========> ', to);
  });
};
[...files, ...scss, ...svg].forEach((file: string) => {
  const from = path.join(srcDir, file);
  const to = path.join(distDir, file);
  const esm = path.join('./dist/esm', file);
  const umd = path.join('./dist/umd', file);
  copyFile(from, esm);
  copyFile(from, to);
  copyFile(from, umd);
});
