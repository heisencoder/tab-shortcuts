#!/usr/bin/bash

VERSION=v`cat tab-shortcuts/manifest.json | jq -r '.version'`
RELEASE_FILENAME="tab-shortcuts-${VERSION}.zip"
RELEASE_PATH="releases/${RELEASE_FILENAME}"

mkdir -p releases
if [ -e ${RELEASE_PATH} ]; then
  rm ${RELEASE_PATH}
fi
cd tab-shortcuts
zip ../${RELEASE_PATH} *

echo "Created ${RELEASE_PATH}"
