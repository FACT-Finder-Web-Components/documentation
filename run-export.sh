#!/bin/bash

VERSION1=1.2
VERSION3=3.0
DOCS1=markdown/${VERSION1}/en
DOCS3=markdown/${VERSION3}/en
API1=${DOCS1}/api
API3=${DOCS3}/api
OF=export

if [ ! -d "$OF" ]; then
    mkdir -p "$OF"
fi

if [ -d "$API1" ] && [ -d "$API3" ]; then
    java -jar ./documentation-export.jar -d "$DOCS1" -a "$API1" -o "$OF" -v "$VERSION1"
    java -jar ./documentation-export.jar -d "$DOCS3" -a "$API3" -o "$OF" -v "$VERSION3"
else
    echo "markdown directories don't exist"
    exit 1;
fi
