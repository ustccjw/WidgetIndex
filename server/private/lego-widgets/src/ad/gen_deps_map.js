/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/gen_deps_map.js
 * desc:    从deps.js生成deps.json
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/03/12 14:03:44$
 */

function module_exists(name) {
    try {
        return require.resolve(name);
    }
    catch (e) {
        return false;
    }
}

function loadModule(name) {
    var mod;
    var relPath = '../../tools/node_modules/' + name;
    if (module_exists(relPath)) {
        mod = require(relPath);
    }
    else {
        mod = require(name);
    }
    return mod;
}

var optimist = loadModule('optimist');
var ARGS = optimist.usage('$0 file.js --output=output.json')
            .describe('output', '输出文件地址')
            .string('output')
            .argv;

var fs = require('fs');
var code = fs.readFileSync(ARGS._[0]);
var output = ARGS.output;

var hash = {};
function addDependency(path, provide, require) {
    hash[path] = {
        "filename": path,
        "provide": provide,
        "require": require
    }
}
eval(code.toString().replace(/goog\.addDependency/g, 'addDependency'));
fs.writeFileSync(output, JSON.stringify(hash, null, '    '));

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
