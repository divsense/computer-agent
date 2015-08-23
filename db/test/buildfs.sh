#! /usr/bin/env bash

##############################################################
#
#    db /
#        test1.json
#
#    src/
#        AA / out
#        BB / out
#        CC / out
#        DD / out
#
#    dest/
#        |
#        + folder_1
#        |       |
#        |       +------- folder_2
#        |       |               |
#        |       |               +-----* file.a --> src/AA/out
#        |       |               |
#        |       |               +-----* file.b
#        |       |
#        |       +------* file.c
#        |
#        +-* file.d --> src/DD/out
#
#
##############################################################


SRC=src
DEST=dest

FILE_A=file_a
FILE_B=file_b
FILE_C=file_c


# Clean dest
rm -rf "$DEST"
mkdir "$DEST"

cat db/test1.json | node ../buildfs.js --dest "test/$DEST" --src "test/$SRC"

tree dest
