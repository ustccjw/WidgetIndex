#!/usr/bin/env bash

FILE_NAME="$1"
CLASS_NAME="$2"

cat h1.config.js | sed "s/h1/${FILE_NAME}/g" > "${FILE_NAME}.config.js"
cat h1.app.html | sed -e "s/h1/${FILE_NAME}/g" -e "s/H1/${CLASS_NAME}/g" > "${FILE_NAME}.app.html"
