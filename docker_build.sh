#!/bin/bash
echo What should the version be?
read VERSION

# echo "npm run build"
# npm run build

if [[ -z $VERSION ]];
then
    echo "building with version:latest"
    docker rmi file_download_server --force
    docker build -t file_download_server:latest .
else
    echo "building with version:"$VERSION
    docker build -t file_download_server:$VERSION .
fi