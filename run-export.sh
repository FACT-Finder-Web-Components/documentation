#!/bin/bash

DOCS=markdown/en
API=${DOCS}/api

if [ -d "$API" ]; then
    java -jar ./documentation-export.jar -d "$DOCS" -a "$API"
else
    exit 1;
fi