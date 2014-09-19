#!/usr/bin/env bash

MOD_HOME=$(dirname $(readlink -f $0))
APP_HOME="${MOD_HOME}/../../../../.."

cd ${APP_HOME}

ant -f build.xml ad.deploy -Dname=cx_270x240 -Ddir=src/ad/impl/xlab/intermediate_page
ant -f build.xml ad.deploy -Dname=cx_984x90 -Ddir=src/ad/impl/xlab/intermediate_page
ant -f build.xml ad.deploy -Dname=fbx_270x240 -Ddir=src/ad/impl/xlab/intermediate_page
ant -f build.xml ad.deploy -Dname=fbx_984x90 -Ddir=src/ad/impl/xlab/intermediate_page
ant -f build.xml ad.deploy -Dname=wy_270x240 -Ddir=src/ad/impl/xlab/intermediate_page
ant -f build.xml ad.deploy -Dname=wy_984x90 -Ddir=src/ad/impl/xlab/intermediate_page

ant -f build.xml ad.rewrite -Dname=cx_270x240 -Dlink_id=100000000
ant -f build.xml ad.rewrite -Dname=cx_984x90 -Dlink_id=100000020
ant -f build.xml ad.rewrite -Dname=fbx_270x240 -Dlink_id=100000040
ant -f build.xml ad.rewrite -Dname=fbx_984x90 -Dlink_id=100000060
ant -f build.xml ad.rewrite -Dname=wy_270x240 -Dlink_id=100000080
ant -f build.xml ad.rewrite -Dname=wy_984x90 -Dlink_id=100000100

