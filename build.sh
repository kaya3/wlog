#!/bin/sh

papyri build.papyri -o out/ \
    && rm -r public/ \
    && mv out/ public/ \
    && cp -r resources/ public/resources/
