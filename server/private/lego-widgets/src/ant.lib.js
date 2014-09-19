/***************************************************************************
 *
 * Copyright (c) 2011 Baidu.com, Inc. All Rights Reserved
 * $Id: ant.lib.js 18185 2013-03-08 08:12:04Z zhouminming01 $
 *
 **************************************************************************/



/**
 * ant.lib.js ~ 2011/04/18 23:54:59
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 18185 $
 * @description
 * self是关键字
 **/

if (!Array.prototype.filter) {
  // @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter
  Array.prototype.filter = function(fun /*, thisp */) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
if ( !Array.prototype.forEach ) {

  Array.prototype.forEach = function( callback, thisArg ) {

    var T, k;

    if ( this == null ) {
      throw new TypeError( " this is null or not defined" );
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0; // Hack to convert O.length to a UInt32

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if ( {}.toString.call(callback) != "[object Function]" ) {
      throw new TypeError( callback + " is not a function" );
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if ( thisArg ) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while( k < len ) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if ( k in O ) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[ k ];

        // ii. Call the Call internal method of callback with T as the this value and
        // argument list containing kValue, k, and O.
        callback.call( T, kValue, k, O );
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}

/**
 * @type {Object}
 * @const
 */
var logger = {
  _level: 0,
  DEBUG: 1,
  WARNING: 2,
  ERROR: 3
};

/**
 * @param {number} level 日志级别.
 */
logger.setLevel = function(level) {
  logger._level = level;
}

/**
 * 打印warning信息.
 * @param {string} msg 要打印的信息.
 */
logger.warning = function(msg) {
  if (logger.WARNING >= logger._level) {
    self.log('WARNING:' + msg);
  }
};

/**
 * 打印error信息.
 * @param {string} msg 要打印的信息.
 */
logger.error = function(msg) {
  if (logger.ERROR >= logger._level) {
    self.log('ERROR:' + msg);
  }
};

/**
 * 打印debug信息.
 * @param {string} msg 要打印的信息.
 */
logger.debug = function(msg) {
  if (logger.DEBUG >= logger._level) {
    self.log('DEBUG:' + msg);
  }
};

/**
 * @param {string} name 属性的名字.
 * @param {string=} opt_value 值，可选.
 * @return {string} 环境变量的值.
 */
function _(name, opt_value) {
  if (typeof opt_value != 'undefined') {
    self.getProject().setProperty(name, opt_value);
  }
  return self.getProject().getProperty(name);
}

/**
 * @param {string} name task的名字.
 * @return {*} Task.
 */
function createTask(name) {
  return self.getProject().createTask(name);
}

/**
 * @param {string} msg 需要输出的信息.
 */
function echo(msg) {
  var task = createTask('echo');
  task.setMessage(msg);
  task.perform();
}

/**
 * @param {string=} opt_msg 退出当前的Build进程.
 */
function fail(opt_msg) {
  var task = createTask('fail');
  if (opt_msg) {
    task.setMessage(opt_msg);
  }
  task.perform();
}

/**
 * @param {Array.<string>|string} input 要删除的目录.
 */
function rmdir(input) {
  var task = createTask('delete');
  if (isString(input)) {
    task.setDir(new java.io.File(input));
  } else if (isArray(input)) {
    for (var i = 0, j = input.length; i < j; i++) {
      task.setDir(new java.io.File(input[i]));
    }
  }
  task.perform();
}

/**
 * @param {Array.<string>|string} input 要删除的文件.
 */
function rm(input) {
  var task = createTask('delete');
  if (isString(input)) {
    task.setFile(new java.io.File(input));
  } else if (isArray(input)) {
    for (var i = 0, j = input.length; i < j; i++) {
      task.setFile(new java.io.File(input[i]));
    }
  }
  task.perform();
}

/**
 * 打印出一些环境变量的信息，供调试使用.
 */
function echo_env() {
  echo('== ENV ==');
  if (_('env.OS') == 'Windows_NT') {
    echo(_('env.Path'));
  } else {
    echo(_('env.PATH'));
  }
  exec('java', ['-version']);
  exec('python', ['--version']);
  exec('python', ['-c',  '\'import sys;print(sys.path)\'']);
  exec('node', ['--version']);
  echo('== END ==');
}

/**
 * 获取不同系统下面的python版本
 * @return {string}
 */
function getPython() {
  if (_('env.USER') == 'scmpf') {
    return 'python2.7';
  } else {
    return 'python';
  }
}

/**
 * 获取不同系统下面的python版本
 * @return {string}
 */
function PYTHON() {
  return getPython();
}

/**
 * 调用jython来执行python脚本
 * @param {Array.<string>=} opt_args 一些默认的参数.
 */
function JYTHON(opt_args) {
  var args = ['-jar ' + (_('tools.dir') + '/lib/jython-2.5.2.jar')];
  if (isArray(opt_args)) {
    args = args.concat(opt_args);
  }

  exec('java', args);
}

/**
 * 需要在ant脚本里面添加这句话
 * <property environment="env" />
 * @return {string} null device.
 */
function getNullDevice() {
  if (_('env.OS') == 'Windows_NT') {
    return 'NUL:';
  } else {
    return '/dev/null';
  }
}

/**
 * @param {string} dir 需要创建的目录.
 */
function mkdir(dir) {
  var task = createTask('mkdir');
  task.setDir(new java.io.File(dir));
  task.perform();
}

/**
 * @return {Array.<string>}
 */
function echoproperties() {
  var tmp = tempfile();

  var task = createTask('echoproperties');
  task.setDestfile(new java.io.File(tmp));
  task.perform();

  var properties = readFile(tmp).split("\n");
  return properties;
}

/**
 * @return {string} uuid.
 */
function uuid() {
  return Math.floor(Math.random() * 2147483648).toString(36);
}

/**
 * 获取一个文件的目录名
 * @param {string} file 输入文件.
 * @return {string} 目录名称.
 */
function dirname(file) {
  var property = uuid();

  var task = createTask('dirname');
  task.setFile(new java.io.File(file));
  task.setProperty(property);
  task.perform();

  return _(property);
}

/**
 * @param {boolean=} opt_deleteOnExit jvm退出的时候是否删掉文件，默认是true.
 * @param {string=} opt_suffix 文件后缀
 * @return {string} 获取一个临时的文件路径.
 */
function tempfile(opt_deleteOnExit, opt_suffix) {
  var property = uuid();

  var task = createTask('tempfile');
  task.setProperty(property);
  if (opt_deleteOnExit !== false) {
    task.setDeleteOnExit(true);
  }
  if (opt_suffix) {
    task.setSuffix(opt_suffix);
  }
  task.perform();

  return _(property);
}

/**
 * 创建一个临时目录
 * @return {string} 目录的路径.
 */
function tempdir() {
  var tmp = tempfile(false);
  var file = new java.io.File(tmp);
  file.mkdirs();

  return '' + file.getAbsolutePath();
}

/**
 * 从一个路径中获取文件的名字.
 *
 * @param {string} path 输入的路径.
 * @return {string} 文件名称.
 */
function basename(path) {
  var property = uuid();

  var task = createTask('basename');
  task.setFile(new java.io.File(path));
  task.setProperty(property);
  task.perform();

  return _(property);
}

/**
 * 请参考python中的os.path.splitext
 * @param {string} name 文件名.
 * @return {Array.<string} > 数组有两项，[0]是名字,[1]是后缀包含'.'
 * 如果没有后缀，则[1]为空.
 */
function splitext(name) {
  var last_dot_pos = name.lastIndexOf('.');
  if (last_dot_pos == -1) {
    return [name, ''];
  } else {
    var basename = name.substring(0, last_dot_pos);
    var extension = name.substring(last_dot_pos);

    return [basename, extension];
  }
}

/**
 * @param {string} from 源文件.
 * @param {string} to 目标文件.
 * @param {boolean=} opt_overwrite 是否覆盖.
 */
function copy(from, to, opt_overwrite) {
  var fromFile = new java.io.File(from),
      toFile = new java.io.File(to);
  if (!fromFile.exists()) {
    return;
  }

  if (fromFile.isDirectory()) {
    var task = createTask('copydir');
    task.setSrc(fromFile);
    task.setDest(toFile);
    task.perform();
  } else {
    var task = createTask('copy');
    task.setFile(fromFile);
    task.setTofile(toFile);

    if (opt_overwrite) {
      task.setOverwrite(true);
    }
    task.perform();
  }
}

/**
 * @return {string} svnversion.
 */
function svnversion() {
  var property = uuid();

  var task = createTask('exec');
  task.setExecutable('svnversion');
  task.setOutputproperty(property);
  task.setFailonerror(false);
  task.setFailIfExecutionFails(false);
  task.setDir(_('base.dir'));

  try {
    task.perform();
    return _(property);
  } catch (e) {
    return 'BUILD_VERSION';
  }
}

/**
 * @return {string} 机器名.
 */
function hostname() {
  var property = uuid();

  var task = createTask('exec');
  task.setExecutable('hostname');
  task.setOutputproperty(property);
  task.perform();

  return _(property);
}

/**
 * @param {string} inputfile 输入文件.
 */
function md5sum(inputfile) {
  var property = uuid();

  var checksum = createTask('checksum');
  if (isString(inputfile)) {
    inputfile = new java.io.File(inputfile);
  }
  checksum.setFile(inputfile);
  checksum.setProperty(property);
  checksum.perform();

  return _(property);
}

/**
 * @param {string} inputfile 输入文件.
 */
function gen_checksum(inputfile) {
  var file = new java.io.File(inputfile);
  if (!file.exists()) {
    return;
  }

  var checksum = md5sum(inputfile);

  var destfile = '',
      last_dot_pos = inputfile.lastIndexOf('.');
  if (last_dot_pos == -1) {
    destfile = inputfile + '-' + checksum;
  } else {
    destfile = inputfile.substring(0, last_dot_pos) + '-' +
                checksum + inputfile.substring(last_dot_pos);
  }

  copy(inputfile, destfile);

  return checksum;
}

/**
 * @param {string} input 输入文件.
 * @param {string} output 输出文件.
 * @param {string=} opt_jar yui的jar文件.
 */
function yui(input, output, opt_jar) {
  var task = createTask('java'),
      jar = opt_jar || (_('tools.dir') + '/lib/yui-compressor.jar');

  task.setJar(new java.io.File(jar));
  task.setFork(true);
  task.setFailonerror(true);
  task.setMaxmemory('128m');
  task.createArg().setLine('--line-break 800');
  task.createArg().setLine('-o ' + output);
  task.createArg().setLine(input);
  task.perform();
}

/**
 * @param {string|Array.<string>} input 输入文件，可以是一个，也可以是一个数组.
 * @param {string} output 输出文件.
 * @param {string=} opt_jar gcc的jar文件.
 * @param {Array.<string>=} opt_extraflags 命令行参数.
 * @param {string=} opt_error error的输出文件.
 */
function gcc(input, output, opt_jar, opt_extraflags, opt_error) {
  var task = createTask('java'),
      jar = opt_jar || (_('tools.dir') + '/lib/google-closure-compiler.jar');

  task.setJar(new java.io.File(jar));
  task.setFork(true);
  task.setFailonerror(true);
  task.setMaxmemory('128m');
  task.createArg().setLine('--js_output_file ' + output);
  if (isString(input)) {
    task.createArg().setLine('--js ' + input);
  } else if (isArray(input)) {
    for (var i = 0, j = input.length; i < j; i++) {
      task.createArg().setLine('--js ' + input[i]);
    }
  }

  var extraflags = opt_extraflags || [];
  if (extraflags.length) {
    for (var i = 0, j = extraflags.length; i < j; i++) {
      task.createArg().setLine(extraflags[i]);
    }
  }

  if (opt_error) {
    task.setError(new java.io.File(opt_error));
  }

  try {
    logger.debug('java -jar ' + jar + (isArray(extraflags) ? (' ' + extraflags.join(' ')) : ''));
    task.perform();
  } catch (e) {
    fail('gcc failed');
  }
}

/**
 * 获取某个目录中的所有文件.
 * @param {string} dir 需要变量的目录名称.
 * @param {RegExp=} opt_exclude 通过正则来忽略某些内容.
 */
function fileset(dir, opt_exclude) {
  var dirFile = new java.io.File(dir);
  if (!dirFile.isDirectory()) {
    return [];
  }

  var files = [];
  var entries = dirFile.listFiles();
  for (var i = 0, j = entries.length; i < j; i++) {
    var entry = entries[i],
        name = getPath(dir + '/' + entry.getName());
    if (!opt_exclude ||
        (opt_exclude && !opt_exclude.test(name))) {
      if (entry.isDirectory()) {
        files = files.concat(fileset(name, opt_exclude));
      } else {
        files.push(name);
      }
    }
  }

  return files;
}

/**
 * @param {string} pattern 正则的规则.
 * @param {string=} opt_flag flag.
 * @return {RegExp}
 */
function regexp(pattern, opt_flag) {
  var escaped = pattern.replace(
      new RegExp('([.*+?^=!:\x24{}()|[\\]/\\\\])', 'g'),
      '\\\x241');
  if (opt_flag) {
    return new RegExp(escaped, opt_flag);
  } else {
    return new RegExp(escaped);
  }
}

/**
 * 判断目标参数是否Array对象
 *
 * @param {*} source 目标参数.
 * @return {boolean} 类型判断结果.
 */
function isArray(source) {
  return '[object Array]' == Object.prototype.toString.call(
                             /** @type {Object}*/ (source));
}

/**
 * 判断目标参数是否string类型或String对象
 *
 * @param {*} source 目标参数.
 * @return {boolean} 类型判断结果.
 */
function isString(source) {
  return '[object String]' == Object.prototype.toString.call(
                              /** @type {Object}*/ (source));
}

/**
 * 将源对象的所有属性拷贝到目标对象中
 *
 * @param {Object} target 目标对象.
 * @param {Object} source 源对象.
 * @return {Object} 目标对象.
 */
function extend(target, source) {
    for (var p in source) {
        if (source.hasOwnProperty(p)) {
            target[p] = source[p];
        }
    }
    return target;
}

/**
 * @param {string} command 要执行的命令.
 * @param {Array.<string>=} opt_args 命令参数，可选.
 * @param {function(stdin, stderr, exmsg)=} opt_callback 处理stdin和stderr的callback.
 * @return {string} stdin的输出.
 */
function exec(command, opt_args, opt_callback) {
  var task = createTask('exec');
  task.setExecutable(getPath(command));
  task.setFailonerror(true);
  task.setLogError(true);

  var outputProperty = uuid();
  task.setOutputproperty(outputProperty);

  if (isArray(opt_args)) {
    for (var i = 0, j = opt_args.length; i < j; i++) {
      task.createArg().setLine(opt_args[i]);
    }
  }

  var exmsg = null;
  try {
    logger.debug(command + (isArray(opt_args) ? (' ' + opt_args.join(' ')) : ''));
    task.perform();
  } catch (e) {
    exmsg = e.toString();
  }

  if (opt_callback) {
    // stdin & stderr
    if (exmsg) {
      opt_callback(null, _(outputProperty), exmsg);
    } else {
      opt_callback(_(outputProperty));
    }
  } else {
    if (exmsg) {
      fail(exmsg);
    }
  }

  return _(outputProperty);
}

/**
 * @param {string} input 输入文件.
 * @return {string} 文件的内容.
 */
function readFile(input) {
  var file = new java.io.File(getPath(input));
  if (!file.exists()) {
    return '';
  }

  var content = '';
  var scanner = new java.util.Scanner(file, 'utf-8').useDelimiter('\\Z');
  if (scanner.hasNext()) {
    content = scanner.next();
  }
  scanner.close();

  return String(content);
}

/**
 * @param {java.io.File|string} input 要写入的文件.
 * @param {string} content 内容.
 * @param {boolean=} opt_append 是否追加内容.
 */
function writeFile(input, content, opt_append) {
  var file = input;
  if (isString(input)) {
    file = new java.io.File(input);
  }

  var parentDir = file.getParentFile();
  if (parentDir != null && !parentDir.exists()) {
    parentDir.mkdirs();
  }

  //use OutputStreamWriter instead, so it could specify charset encoder
  var writer = new java.io.BufferedWriter(
      new java.io.OutputStreamWriter(new java.io.FileOutputStream(file, opt_append === true), 'utf-8')
  );
  writer.write(content);
  writer.close();
}

/**
 * @param {string} input 归一化文件的路径.
 * @return {string} 归一化之后的路径.
 */
function getPath(input) {
  return String(input).replace(/\//g, java.io.File.separator);
}

/**
 * @param {string} path 要检测的文件路径.
 * @return {boolean} true文件存在，false文件不存在.
 */
function fileExists(path) {
  var dummy = new java.io.File(path);
  return !!dummy.exists();
}

function build_version() {
  return new Date().toString() + '@' + hostname();
}

function patchCustomBuildCfg(compilationArguments, customBuildCfg) {
  /** 用来记录哪些属性已经被自定义的覆盖过了 */
  var customizedArgs = {};

  var cfgs = readFile(customBuildCfg).split(/\r?\n/g);
  for(var i = 0; i < cfgs.length; i ++) {
    var line = cfgs[i];
    if (line.indexOf('#') === 0) {
      continue;
    }
    var index = line.indexOf('=');
    if (index != -1) {
      var key = line.substring(0, index);
      var value = line.substring(index + 1);
      echo(key + ' -> ' + value);
      if (!customizedArgs[key]) {
        customizedArgs[key] = true;
        /** 第一次出现，直接覆盖就好了 */
        compilationArguments[key] = value;
      } else {
        /** 已经出现过了，看看是不是数组类型，如果是的话，直接push，否则转化为数组 */
        if (isArray(compilationArguments[key])) {
          compilationArguments[key].push(value);
        } else {
          compilationArguments[key] = [
            compilationArguments[key],
            value
          ];
        }
      }
    }
  }
}

/**
 * @param {string} name app的文件名，去掉.app.html的部分.
 * @param {string} dir app所在的目录.
 * @param {string} output_dir 最终要输出的目录.
 * @param {string} opt_customBuildCfg 用户编译配置文件
 */
function build_ad_entry(name, dir, output_dir, opt_customBuildCfg) {
  var entry_point = dir + '/' + name + '.app.html';
  if (!fileExists(entry_point)) {
    fail(entry_point + ' not exists.');
  }

  var externs = [];
  [
      'ad_deploy.js', 'amd.js', 'bmap.js', 'd3.js', 'jquery.externs.js',
      'mobiscroll.js', 'muses.js', 'ns_external_api.js', 'passport.js',
      'pdc.js', 'raphael.js', 'tangram.js', 'tieba_post_video_url.js',
      'uglify.js', 'weibo.js', 'ps_aladdin.js', 'untitled.js'/*, 'zepto.js'*/
  ].forEach(
    function(item) {
      externs.push(_('externs.dir') + '/' + item);
    }
  );

  /** 默认的编译参数. */
  var compilationArguments = {
    /** 从这些目录里面搜索js代码 */
    'path': ['src'],
    /** 如果遇到了@import-once，这些目录里面搜索less文件 */
    'less_include_path': _('less_include_path'),
    /** 是否打印详细的信息 */
    'enable_noisy': '1',
    /** 是否检查JS中使用到的静态资源 */
    'enable_javascript_rewriter': '1',
    /** 是否检查HTML中使用到的静态资源 */
    'enable_html_rewriter': '1',
    /** 是否自动合并图片 */
    'enable_auto_sprite': '1',
    /** 是否自动把PNG32转化为PNG8（如果需要的情况下）*/
    'enable_png8_convert': '0',
    /** TPL最终输出的代码模板 */
    'ad_template_wrapper': "'var AD_TEMPLATE_CONTENT=%output%;'",
    /** CSS最终输出的代码模板（如果为None，那么会把代码输出到单独的文件中去）*/
    'ad_style_wrapper': "'var AD_STYLE_CONTENT=%output%;'",
    /** 第三方的代码，最终会处于文件的头部 */
    'third_party_files': [
      dir + '/' + name + '.config.js',
      'assets/js/mustache.compiled.js'
    ],

    /** Google Closure Compiler需要的参数 */
    'GCC_FLAGS_compilation_level': 'ADVANCED_OPTIMIZATIONS',
    'GCC_FLAGS_generate_exports': '1',
    'GCC_FLAGS_warning_level': 'VERBOSE',
    'GCC_FLAGS_externs': externs
  };

  /** 查询自定义的编译参数 */
  var customBuildCfg = opt_customBuildCfg || (dir + '/' + name + '.build.cfg');
  if (fileExists(customBuildCfg)) {
    echo('== CUSTOMIZED BUILD CFG ==');
    patchCustomBuildCfg(compilationArguments, customBuildCfg);
    echo('== CUSTOMIZED BUILD CFG ==');
  }

  start_build(entry_point, output_dir, compilationArguments);
}

/**
 * @param {string} entry_point 入口文件.
 * @param {string} output_dir_name 输出的文件目录.
 * @param {Object} options 编译参数.
 */
function start_build(entry_point, output_dir_name, options) {
  var output_dir = _('build.dir') + '/' + output_dir_name;
  try{
    rmdir(output_dir);
  }
  catch (e){} //可以清空但无法删除根目录

  var args = [
    getPath(_('tools.dir') + '/bin/Fer.py'),
    '--gen_deploy',
    '--entry_point "' + entry_point + '"',
    '--output_dir "' + output_dir + '"'
  ];

  function buildArgs(key, value) {
    if (key.match(/^(enable|disable)_/)) {
      if (value === '1') {
        args.push('--' + key);
      }
    } else if (key.match(/^GCC_FLAGS_/)) {
      args.push('--compiler_flags --' + key.substring(10) + '=' + value);
    } else {
      args.push('--' + key + ' ' + value);
    }
  }

  for(var key in options) {
    var value = options[key];
    if (isArray(value)) {
      for(var i = 0; i < value.length; i ++) {
        buildArgs(key, value[i]);
      }
    } else {
      buildArgs(key, value);
    }
  }

  exec(PYTHON(), args);
}

/**
 * @param {string} entry_point 入口文件.
 * @param {string} output_dir_name 输出的文件目录.
 * @param {string=} opt_third_party 默认的第三方文件列表，逗号分割.
 */
function build_app_entry(entry_point, output_dir_name, opt_third_party) {
  var ep = entry_point;
  if (!ep || !output_dir_name) {
    fail("please set -Dentry_point and -Doutput_dir_name.");
  }

  var output_dir = _('build.dir') + '/' + output_dir_name;
  try{
    rmdir(output_dir);
  }
  catch (e){} //可以清空但无法删除根目录

  var target = self.getOwningTarget();
  var ad_deploy_phrase = (target == "ad.deploy" || target == "ad.all");

  var args = ([
    getPath(_('tools.dir') + '/bin/Fer.py'),
    '--gen_deploy',
    '-p src',
    '--entry_point ' + ep,
    '--less_include_path "' + _('less_include_path') + '"',
    '-f "--compilation_level=' + _("compilation_level") + '"',
    //'-f "--formatting=PRETTY_PRINT"',
    '-f "--warning_level=VERBOSE"',
    '-f "--externs=' + _("externs.js") + '"',
    '-r "' + _('build.dir') + '/' + output_dir_name + '"'
  ]);

  if (!ad_deploy_phrase) {
    args = args.concat([
      '-f "--define=app.version=\'' + build_version() + '\'"',
      '-f "--flagfile=' + _("flagfile") +'"',
    ]);
  } else {
    args = args.concat([
      '-f "--generate_exports"'
    ]);
  }

  if (!ad_deploy_phrase) {
    /**
     * 如果是build广告的阶段，是不需要添加这些变量的
     * 可能以后需要（比如生成不同版式的代码）
     */
    var properties;
    properties = echoproperties();
    for(var i = 0; i < properties.length; i ++) {
      if (properties[i].indexOf("#") === 0) {
        continue;
      }
      if (properties[i].match(/^([0-9a-zA-Z_\.]+)_URL=/)) {
        var name = properties[i].split('=')[0];
        args.push('-f "--define=' + name + '=\'' + _(name) + '\'"');
      } else if (properties[i].match(/FLAGS_enable/)) {
        var name = properties[i].split('=')[0];
        if (_(name) == "1") {
          // FLAGS_enable_javascript_rewriter -> --enable_javascript_rewriter
          args.push(name.replace('FLAGS_', '--'));
        }
      }
    }
  }

  if (!opt_third_party) {
    opt_third_party = _("FLAGS_third_party");
  }
  if (opt_third_party) {
    /** 从函数传参和从properties里拿出来的String一个是javascript的，一个是java的 */
    opt_third_party = new java.lang.String(opt_third_party);
    var third_party_files = opt_third_party.split(",");
    for(var i = 0; i < third_party_files.length; i ++) {
      if (String(third_party_files[i]).length > 0) {
        args.push('-j ' + third_party_files[i]);
      }
    }
  }

  if (_("FLAGS_noisy") == "1") {
    args.push('--noisy');
  }

  if (_("FLAGS_ad_template_wrapper")) {
    args.push('--ad_template_wrapper=' + _("FLAGS_ad_template_wrapper"))
  }

  if (_("FLAGS_ad_style_wrapper")) {
    args.push('--ad_style_wrapper=' + _("FLAGS_ad_style_wrapper"))
  }

  if (_("FLAGS_ftangram") == '0') {
    args.push('--disable_ftangram')
  }

  /** 可以再*.build.cfg里面动态配置的参数 */
  var customCfgs = [
    ['stage', 'ad_stage'],
    ['compiler_jar', 'compiler_jar'],
    ['output_file_template', 'output_file_template']
  ];
  for(var i = 0; i < customCfgs.length; i ++) {
    var cfgItem = customCfgs[i];
    var value = _(cfgItem[0]);
    if (value) {
      args.push('--' + cfgItem[1] + ' ' + value);
    }
  }

  exec(PYTHON(), args);
}

/**
 * @param {string} from 源文件.
 * @param {string} to 目标文件.
 * @param {boolean=} opt_overwrite 是否覆盖.
 */
function prompt(msg, optionValue, defaultValue) {
    var uid = uuid();
    var task = createTask('input');
    task.setMessage(msg);
    task.setValidargs(optionValue);
    task.setDefaultvalue(defaultValue);
    task.setAddproperty(uid);
    task.perform();
    return self.getProject().getProperty(uid);
}


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
