#!/bin/bash
echo "Making dist directory"
mkdir -p dist
echo "Finished making dist directory.  Next: Setting NPM config"
npm config set registry http://registry.npmjs.org/
echo "Finished Setting NPM registry.  Next: Npm install"
npm install || exit 1
echo "NPM install finished. Next: Starting npm run build directory"
npm run build
echo $PWD
echo "NPM build finished. Next: copy and paste index.html"
cp src/index.html dist/index.html
echo "Completed moving index.html"