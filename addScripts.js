const fs = require("fs");

module.exports = () =>
  fs.readFile("package.json", "utf-8", (err, data) => {
    const dataObj = JSON.parse(data);
    const newScripts = {
      test: "react-scripts test --coverage",
      "build:lib":
        "rm -rf dist && yarn build:babel && yarn build:types && ts-node --project tsconfig.lib.json ./copier.ts",
      "build:babel":
        'concurrently "yarn build:babel:esm && yarn build:babel:umd" "yarn build:babel:cjs"',
      "build:babel:cjs":
        'BABEL_ENV=cjs babel --source-maps --extensions ".js,.ts,.tsx" src --out-dir dist/js --presets=@babel/env',
      "build:babel:esm":
        'BABEL_ENV=esm babel --source-maps --extensions ".js,.ts,.tsx" src --out-dir dist/esm',
      "build:babel:umd":
        'BABEL_ENV=umd babel --source-maps --extensions ".js" dist/esm --out-dir dist/umd --plugins=transform-es2015-modules-umd',
      "build:types": "tsc -p tsconfig.lib.json",
      coveralls: "cat ./coverage/lcov.info | node node_modules/.bin/coveralls",
    };
    const pack = {
      main: "dist/js/export.js",
      module: "dist/esm/export.js",
      types: "dist/js/export.d.ts",
      files: ["dist"],
      "husky": {
        "hooks": {
          "pre-commit": "ts-node --project tsconfig.lib.json publish.ts && git add package.json"
        }
      },
    };
    const devDependencies = {
      "@babel/cli": "^7.8.4",
      "@babel/plugin-proposal-class-properties": "^7.8.3",
      "@babel/plugin-proposal-export-default-from": "^7.8.3",
      "@babel/plugin-transform-typescript": "^7.9.6",
      "babel-plugin-transform-es2015-modules-umd": "^6.24.1",
      "babel-plugin-typescript-to-proptypes": "^1.3.2",
      concurrently: "^5.2.0",
      coverage: "^0.4.1",
      coveralls: "^3.1.0",
      "@types/glob": "^7.1.1",
      "husky": "^4.2.5",
      "ts-node": "^8.10.1"
    };
    const newPackageJson = JSON.stringify(
      {
        ...pack,
        ...dataObj,
        devDependencies: { ...devDependencies, ...dataObj.devDependencies },
        scripts: { ...dataObj.scripts, ...newScripts },
      },
      null,
      2
    );
    fs.writeFile("package.json", newPackageJson, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`New Scripts Added`);
      }
    });
  });
