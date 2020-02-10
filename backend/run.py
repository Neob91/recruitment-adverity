#!/usr/bin/env bash
set -e

PROJECT_DIR=$(cd $(dirname $0) && pwd)
docker build -t adverity $PROJECT_DIR
docker run -it --rm -v $PROJECT_DIR:/app  adverity $@
