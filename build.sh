#!/bin/bash
echo "Making dist directory"
mkdir -p dist
echo "Finished making dist directory. Next: Npm install"
npm install || exit 1
echo "NPM install finished. Next: Starting npm run build directory"
npm run build
echo $PWD
echo "NPM build finished. Next: copy and paste index.html"
cp src/index.html dist/index.html
echo "Completed moving index.html"
echo '----------------- Attempting to zip project structure...'
zip -r dist/fusion-api-jenkinsfiles.zip node_modules server.js package.json
echo '----------------- Copying Fusionfile to dist folder...'
cp Fusionfile dist