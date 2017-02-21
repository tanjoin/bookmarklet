#!/bin/sh

cd $(cd $(dirname $0) && pwd)

uglifyjs js/winlose.js --mangle --output js/min/winlose.min.js
uglifyjs js/accmaker.js --mangle --output js/min/accmaker.min.js
