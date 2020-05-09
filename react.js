#!/usr/bin/env node
const fs = require("fs");
const [, , ...argv] = process.argv;

const [name, ...args] = argv;
const nme = name.split("/")[0];
let arguments = {};
args.forEach((each) => {
  const [first, value] = each.split("=");
  const [zero, key] = first.split("--");
  if (key) {
    arguments[key] = value;
  } else {
    console.log(`== Invalid argument ${each}. argument skipped.== `);
  }
});

const makeDirectory = (name) => {
  if (name) {
    if (fs.existsSync(name)) {
      console.log(`========> directory ${name} already exists.`);
      return false;
    }
    fs.mkdirSync(name);
    return true;
  }
  return false;
};

const createFile = (filename, content) => {
  fs.writeFile(`${filename}`, content, (err) => {
    if (err) {
      console.log("=======>", err.message);
      return false;
    }
    console.log(`============> ${filename} created successfully`);
  });
};

if (
  makeDirectory(
    arguments.target ? `src/${arguments.target}/${nme}` : `src/${nme}`
  )
) {
  createFile(
    arguments.target
      ? `src/${arguments.target}/${nme}/index.ts`
      : `src/${nme}/index.ts`,
    `
export { default as ${nme} } from './${nme}';
    `
  );

  createFile(
    arguments.target
      ? `src/${arguments.target}/${nme}/${nme}.tsx`
      : `src/${nme}/${nme}.tsx`,
    `
import React, { FC } from 'react';
import {Props} from './${nme}.interface';
import useStyles from './${nme}.styles';

const ${nme}: FC<Props> = () => {
  return (
    <div>
        This is ${nme} Component
    </div>
  );
};

export default ${nme};
    `
  );

  createFile(
    arguments.target
      ? `src/${arguments.target}/${nme}/${nme}.interface.ts`
      : `src/${nme}/${nme}.interface.ts`,
    `
export interface Props {
}
    `
  );

  createFile(
    arguments.target
      ? `src/${arguments.target}/${nme}/${nme}.styles.ts`
      : `src/${nme}/${nme}.styles.ts`,
    `
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => createStyles({}));
    `
  );
}
