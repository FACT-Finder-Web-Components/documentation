#!/bin/bash

DOCS=markdown/en
API=${DOCS}/api
OF=$(pwd)/export

if [ ! -d "$OF" ]; then
    mkdir -p "$OF"
fi

if [ -d "$API" ]; then
    java -jar ./documentation-export.jar -d "$DOCS" -a "$API" -o "$OF"
else
    exit 1;
fi