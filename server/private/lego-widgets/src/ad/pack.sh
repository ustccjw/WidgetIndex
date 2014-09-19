#!/bin/bash
pushd src
cp ../assets ./assets -r
zip -r widgets.zip * -x \*/.svn/\* ad/demo/\* ad/widget/widget-automation/\* ad/preview/\* ad/style_impl/\* ad/test/\* ad/gen_deps_map.js ad/render_ad.js materials/\* third_party/\* ant.lib.js Requester.js app.deps.json
rm assets -rf
popd
