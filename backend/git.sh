#! /usr/bin/bash
echo "Access Project!"
cd /usr/share/nginx/html/create-company-vite

echo 'Clear Changed' 
checkout git checkout -- .

echo 'pull Code'
git pull

echo "Install Package ..."
npm install

echo 'Build Project'
yarn build

# find ./ -name dist-build ! -path './node_modules/*'
# find ./ -name dist ! -path './node_modules/*'
echo 'remove old Source'
rm -rf dist

echo 'Change new source name'
mv dist-build dist
