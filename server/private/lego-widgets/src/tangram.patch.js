/***************************************************************************
 *
 * Copyright (c) 2011 Baidu.com, Inc. All Rights Reserved
 * $Id: tangram.patch.js 16784 2013-01-14 07:57:53Z pengxing $
 *
 **************************************************************************/



/**
 * src/tangram.patch.js ~ 2011/04/25 18:39:36
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 16784 $
 * @description
 * 提供了一些对tangram的扩充方法，希望有朝一日这部分
 * 代码能进入主干，然后这个文件就没有存在的必要了.
 * XXX 如果使用主干上面的tangram，导致的问题就是
 * 必须提供一个externs定义文件，但是这个的工作量就比较大了，
 * 另外，如果使用externs文件来定义baidu下面的内容，那么使用
 * goog.provide('baidu')的地方就需要通过hack caldeps.py来实现，也
 * 不是一个好的版本....
 * 如何处理呢？....
 * 暂时恢复回去吧...
 **/

/**
 * When defining a class Foo with an abstract method bar(), you can do:
 *
 * Foo.prototype.bar = goog.abstractMethod
 *
 * Now if a subclass of Foo fails to override bar(), an error
 * will be thrown when bar() is invoked.
 *
 * Note: This does not take the name of the function to override as
 * an argument because that would make it more difficult to obfuscate
 * our JavaScript code.
 *
 * @type {!Function}
 * @throws {Error} when invoked to indicate the method should be
 *   overridden.
 */
baidu.abstractMethod = function() {
  throw Error('unimplemented abstract method');
};

/**
 * Returns an object based on its fully qualified external name.  If you are
 * using a compilation pass that renames property names beware that using this
 * function will not find renamed properties.
 *
 * @param {string} name The fully qualified name.
 * @param {Object=} opt_obj The object within which to look; default is
 *     |window|.
 * @return {?Object} The object or, if not found, null.
 */
baidu.getObjectByName = function(name, opt_obj) {
  var parts = name.split('.');
  var cur = opt_obj || window;
  for (var part; part = parts.shift(); ) {
    if (cur[part] != null) {
      cur = cur[part];
    } else {
      return null;
    }
  }

  return cur;
};

/**
 * Adds a {@code getInstance} static method that always return the same instance
 * object.
 * @param {!Function} ctor The constructor for the class to add the static
 *     method to.
 */
baidu.addSingletonGetter = function(ctor) {
  ctor.getInstance = function() {
    return ctor.instance_ || (ctor.instance_ = new ctor());
  };
};

// DAN里面没有调用的地方（检测CLB和掘金）
// baidu.dom.htmlToDocumentFragement;

/**
 * 判断一个元素是否有值（不是null，不是undefined）
 * @param {*} source
 * @return {boolean}
 */
baidu.lang.hasValue = function(source) {
  return !(source === null || typeof source == 'undefined');
};

/**
 * 是否是一个简单的对象
 * @param {*} source 需要判断的对象.
 * @return {boolean} true是，false不是.
 */
// DAN里面没有调用的地方（检测CLB和掘金）
// baidu.lang.isPlainObject;

/**
 * Whether the object/map/hash is empty.
 *
 * @param {Object} obj The object to test.
 * @return {boolean} true if obj is empty.
 */
baidu.object.isEmpty = function(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
};

// DAN里面没有调用的地方（检测CLB和掘金）
// baidu.object.getCount;

/**
 * 去掉字符串中的html标签
 * @param {string} source 要处理的字符串.
 * @return {string}
 */
baidu.string.stripTags = function(source) {
  return String(source || '').replace(/<[^>]+>/g, '');
};

/**
 * 检测输入的内容是否是
 * null, undefined, "", [], {}, "      "之类的东东.
 * @param {*} object 要判断的元素.
 * @return {boolean}
 */
baidu.lang.isEmptyObject = function(object) {
  if (object == null) {
    // null == null
    // undefined == null
    return true;
  }

  if (baidu.lang.isString(object)) {
    return (!object || !baidu.trim(object));
  } else if (baidu.lang.isArray(object)) {
    return !object.length;
  } else if (Object.prototype.toString.call(object) != '[object Object]') {
    return false;
  } else if (baidu.object.isEmpty(object)) {
    return true;
  }

  return false;
};

/**
 * 对目标字符串进行格式化
 * @suppress {duplicate}
 * @param {string} source  目标字符串.
 * @param {...*} var_args  提供相应数据的对象.
 * @return {string} 格式化后的字符串.
 */
baidu.string.format = function(source, var_args) {
  source = String(source);

  var opts = arguments[1];
  if ('undefined' != typeof opts) {
    if (baidu.object.isPlain(/** @type {Object} */ (opts))) {
      return source.replace(/\$\{(.+?)\}/g,
          function(match, key) {
              var replacer = opts[key];
              if ('function' == typeof replacer) {
                  replacer = replacer(key);
              }
              return ('undefined' == typeof replacer ? '' : replacer);
          });
    } else {
      var data = Array.prototype.slice.call(arguments, 1),
          len = data.length;
      return source.replace(/\{(\d+)\}/g,
          function(match, index) {
              index = parseInt(index, 10);
              return (index >= len ? match : data[index]);
          });
    }
  }

  return source;
};

// 声明快捷方法
baidu.format = baidu.string.format;

// DAN里面没有调用的地方（检测CLB和掘金）
// baidu.array.isEmpty;

/**
 * 移除数组中的项
 * @param {Array} source 需要移除项的数组.
 * @param {*|function(*):boolean=} condition 要移除的项或移除匹配函数.
 * condition如果是Function类型，则会按function (item, index)方式调用判断，
 * 函数需要返回true或false。如果要移除Function类型的项，请传入自定义的判断函数。.
 * @see baidu.array.removeAt
 * @suppress {duplicate}
 * @return {Array} 移除后的数组.
 */
baidu.array.remove = function(source, condition) {
  var len = source.length,
      iterator = condition;

  if ('function' != typeof condition) {
    iterator = function(item) {
      return condition === item;
    };
  }

  while (len--) {
    if (true === iterator.call(source, source[len], len)) {
      source.splice(len, 1);
    }
  }
  return source;
};

// DAN里面没有调用的地方（检测CLB和掘金）
// baidu.array.indexOf;

/**
 * 把20110102235959 14位数字转为DATE对象
 * @param {string} num 需要转化的数字.
 * @return {Date} 日期对象.
 */
baidu.date.parseToDate = function(num) {
  function parse(source) {
    var match = null;
    if (match = /^(\d{4})[-\/]?([01]\d)[-\/]?([0-3]\d)$/.exec(source)) {
      return new Date(
        parseInt(match[1], 10),
        parseInt(match[2], 10) - 1,
        parseInt(match[3], 10)
      );
    }
    return null;
  };

  num = num + '';
  var date = parse(num.substring(0, 8));
  if (num.substring(8, 10)) date.setHours(num.substring(8, 10));
  if (num.substring(10, 12)) date.setMinutes(num.substring(10, 12));
  if (num.substring(12)) date.setSeconds(num.substring(12));
  return date;
};

/**
 * 让IE6缓存背景图片
 */
if (baidu.ie && baidu.ie < 7) {
  try {
    document.execCommand('BackgroundImageCache', false, true);
  } catch (e) {}
}
// FIXME baidu.ajax.request -> (cacheable -> noCache)

/**
 * 解决baidu.string.ellipse执行速度的问题.
 * @param {string} text 需要处理的文本.
 * @param {number} width 最宽的宽度.
 * @param {string=} opt_dots 小数点.
 */
baidu.string.fast_ellipse = function() {
  var cache = null;
  var span = null;

  function initContainer() {
    span = document.createElement('SPAN');
    span.style.position = 'absolute';
    span.style.left = '-10000px';
    span.style.top = '-10000px';
    span.style.padding = '0px';
    span.style.margin = '0px';
    span.style.fontWeight = 'bold';
    document.body.insertBefore(span, document.body.firstChild);
  }

  function getCharWidth(string) {
    span.innerHTML = string;
    return span.offsetWidth;
  }

  function buildCache(dots) {
    if (null == span) {
      initContainer();
    }
    cache = {};
    for (var i = 1; i <= 255; i++) {
      cache[String.fromCharCode(i)] = getCharWidth(String.fromCharCode(i));
    }
    cache['中'] = getCharWidth('中'); // 汉字的宽度都是一样的.
    if (dots) {
        cache[dots] = getCharWidth(dots);
    }
  }

  return function(text, width, opt_dots, suffix_length) {
    var rv = [],
        cc = null,
        cw = 0,
        tw = 0,
        dots = opt_dots || '...',
        suffix = '';

    if (null == cache) {
        buildCache('...');
    }

    if (typeof cache[dots] == 'undefined') {
        cache[dots] = getCharWidth(dots);
    }

    if (!!parseInt(suffix_length)) {
        suffix = text.substring(text.length - suffix_length, text.length);
        cache[suffix] = getCharWidth(suffix);
        text = text.substring(0, text.length - suffix_length);
        width -= cache[suffix];
    }

    if (dots) {
        width -= (cache[dots] + 5);
    }

    for (var i = 0, l = text.length; i < l; i++) {
      cc = text.charCodeAt(i);
      // 0xFE30 <=cc && 0xFFA0 >= cc 常见的中文标点
      // 参考：http://en.wikibooks.org/wiki/Unicode/Character_reference/F000-FFFF
      // 原来的范围里面不包含标点符号，请参考文章
      // http://www.iteye.com/topic/558050
      if ((0x2E80 <= cc && cc <= 0x2EFF) || // CJK部首补充
          (0x3000 <= cc && cc <= 0x303F) || // CJK标点符号
          (0x31C0 <= cc && cc <= 0x31EF) || // CJK笔划
          (0x2F00 <= cc && cc <= 0x2FDF) || // 康熙部首
          (0x2FF0 <= cc && cc <= 0x2FFF) || // 汉字结构描述字符
          (0xFE10 <= cc && cc <= 0xFE1F) || // 中文竖排标点
          (0x4E00 <= cc && cc <= 0x9FFF) || // CJK Unified Ideographs
          (0xFE30 <= cc && cc <= 0xFFA0)) { // CJK兼容符号（竖排变体、下划线、顿号）
        // CJK
        cw = cache['中'];
      } else {
        cw = cache[String.fromCharCode(cc)] || cache['a'];
      }
      
      // 追加一个字符.
      rv.push(text.charAt(i));
      
      tw += cw;
      if (tw > width) {
        break;
      }
    }

    if (tw < width) {
      return baidu.string.encodeHTML(text) + suffix;
    } else {
      rv.pop();
      return baidu.string.encodeHTML(rv.join('') + dots + suffix);
    }
  };
}();







/**
 * 发送一个XMLHttpRequest2请求
 * @author: allstar, erik, berg, guyiling
 * @name baidu.ajax.request
 * @function
 * @grammar baidu.ajax.request(url[, options])
 * @param {string}  url 发送请求的url.
 * @param {Object}  options 发送请求的选项参数.
 * @config {String}   [method]      请求发送的类型。默认为GET
 * @config {Boolean}  [async]       是否异步请求。默认为true（异步）
 * @config {String}   [data]        需要发送的数据。如果是GET请求的话，不需要这个属性
 * @config {Object}   [headers]       要设置的http request header
 * @config {number}   [timeout]       超时时间，单位ms
 * @config {String}   [username]      用户名
 * @config {String}   [password]      密码
 * @config {Function} [onsuccess]     请求成功时触发，function(XMLHttpRequest xhr, string responseText)。
 * @config {Function} [onfailure]     请求失败时触发，function(XMLHttpRequest xhr)。
 * @config {Function} [onbeforerequest] 发送请求之前触发，function(XMLHttpRequest xhr)。
 * @config {Function} [on{STATUS_CODE}]   当请求为相应状态码时触发的事件，如on302、on404、on500，function(XMLHttpRequest xhr)。3XX的状态码浏览器无法获取，4xx的，可能因为未知问题导致获取失败。
 * @config {Function} [onloadstart]   请求开始时触发，function(ProgressEvent evt)。
 * @config {Function} [onprogress]    请求数据传输有新进度时触发，function(ProgressEvent evt)。
 * @config {Function} [onabort]       请求终止时触发，function(ProgressEvent evt)。
 * @config {Function} [onerror]       请求错误时触发，function(ProgressEvent evt)。
 * @config {Function} [onload]        请求数据成功发送时触发，function(ProgressEvent evt)。
 * @config {Function} [ontimeout]     请求超时时触发，function(ProgressEvent evt)。
 * @config {Function} [onloadend]     请求结束时触发，function(ProgressEvent evt)。
 * @config {Boolean}  [noCache]       是否需要缓存，默认为false（缓存），1.1.1起支持。
 *
 * @meta standard
 * @see baidu.ajax.get,baidu.ajax.post,baidu.ajax.form
 *
 * @return {XMLHttpRequest} 发送请求的XMLHttpRequest对象.
 */
baidu.ajax.request2 = function(url, opt_options) {
    var options = opt_options || {},
        data = options.data || '',
        async = !(options.async === false),
        username = options.username || '',
        password = options.password || '',
        method = (options.method || 'GET').toUpperCase(),
        headers = options.headers || {},
        timeout = options.timeout || 0,
        eventHandlers = {},
        lv2EventTypes = [
          'loadstart',
          'progress',
          'abort',
          'error',
          'load',
          'timeout',
          'loadend'
        ],
        key, xhr, formData, hasFile = false;

    /**
     * readyState发生变更时调用
     *
     * @ignore
     */
    function stateChangeHandler() {
        if (xhr.readyState == 4) {
            try {
                var stat = xhr.status;
            } catch (ex) {
                // 在请求时，如果网络中断，Firefox会无法取得status
                fire('failure');
                return;
            }

            fire(stat);

            // http://www.never-online.net/blog/article.asp?id=261
            // case 12002: // Server timeout
            // case 12029: // dropped connections
            // case 12030: // dropped connections
            // case 12031: // dropped connections
            // case 12152: // closed by server
            // case 13030: // status and statusText are unavailable

            // IE error sometimes returns 1223 when it
            // should be 204, so treat it as success
            if ((stat >= 200 && stat < 300)
                || stat == 304
                || stat == 1223) {
                fire('success');
            } else {
                fire('failure');
            }

            /*
             * NOTE: Testing discovered that for some bizarre reason, on Mozilla, the
             * JavaScript <code>XmlHttpRequest.onreadystatechange</code> handler
             * function maybe still be called after it is deleted. The theory is that the
             * callback is cached somewhere. Setting it to null or an empty function does
             * seem to work properly, though.
             *
             * On IE, there are two problems: Setting onreadystatechange to null (as
             * opposed to an empty function) sometimes throws an exception. With
             * particular (rare) versions of jscript.dll, setting onreadystatechange from
             * within onreadystatechange causes a crash. Setting it from within a timeout
             * fixes this bug (see issue 1610).
             *
             * End result: *always* set onreadystatechange to an empty function (never to
             * null). Never set onreadystatechange from within onreadystatechange (always
             * in a setTimeout()).
             */
            window.setTimeout(
                function() {
                    // 避免内存泄露.
                    // 由new Function改成不含此作用域链的 baidu.fn.blank 函数,
                    // 以避免作用域链带来的隐性循环引用导致的IE下内存泄露. By rocy 2011-01-05 .
                    xhr.onreadystatechange = baidu.fn.blank;
                    if (async) {
                        xhr = null;
                    }
                }, 0);
        }
    }

    /**
     * 获取XMLHttpRequest对象
     *
     * @ignore
     * @return {XMLHttpRequest} XMLHttpRequest对象.
     */
    function getXHR() {
        if (window.ActiveXObject) {
            try {
                return new ActiveXObject('Msxml2.XMLHTTP');
            } catch (e) {
                try {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                } catch (e) {}
            }
        }
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    }

    /**
     * 触发事件
     *
     * @ignore
     * @param {String} type 事件类型.
     */
    function fire(type) {
        type = 'on' + type;
        var handler = eventHandlers[type],
            globelHandler = baidu.ajax[type];

        // 不对事件类型进行验证
        if (handler) {

            if (type != 'onsuccess') {
                handler(xhr);
            } else {
                //处理获取xhr.responseText导致出错的情况,比如请求图片地址.
                try {
                    xhr.responseText;
                } catch (error) {
                    return handler(xhr);
                }
                handler(xhr, xhr.responseText);
            }
        } else if (globelHandler) {
            //onsuccess不支持全局事件
            if (type == 'onsuccess') {
                return;
            }
            globelHandler(xhr);
        }
    }


    for (key in options) {
        // 将options参数中的事件参数复制到eventHandlers对象中
        // 这里复制所有options的成员，eventHandlers有冗余
        // 但是不会产生任何影响，并且代码紧凑
        eventHandlers[key] = options[key];
    }

    headers['X-Requested-With'] = 'XMLHttpRequest';


    try {
        xhr = getXHR();

        //为XMLHttpRequestLv2的事件类型绑定处理函数
        baidu.each(lv2EventTypes, function(type) {
          var type = 'on' + type;
          if (eventHandlers[type]) {
            xhr[type] = eventHandlers[type];
          }
        });
        if (eventHandlers.onprogress) {
          xhr.upload.onprogress = eventHandlers.onprogress;
        }

        if (method == 'GET') {
            if (data) {
                url += (url.indexOf('?') >= 0 ? '&' : '?') + data;
                data = null;
            }
            if (options['noCache'])
                url += (url.indexOf('?') >= 0 ? '&' : '?') + 'b' + (+ new Date) + '=1';
        }

        if (username) {
            xhr.open(method, url, async, username, password);
        } else {
            xhr.open(method, url, async);
        }

        if (async) {
            xhr.onreadystatechange = stateChangeHandler;
        }

        if (data && !baidu.object.isEmpty(data)) {
          formData = new FormData();
          baidu.object.each(data, function(item, key) {
            if (!hasFile && item.constructor === File) {
              hasFile = true;
            }
            formData.append(key, item);
          });
        } else {
          formData = null;
        }

        // 在open之后再进行http请求头设定
        // FIXME 是否需要添加; charset=UTF-8呢
        if (method == 'POST' && !hasFile) {
            xhr.setRequestHeader('Content-Type',
                (headers['Content-Type'] || 'application/x-www-form-urlencoded'));
        }

        for (key in headers) {
            if (headers.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }

        fire('beforerequest');

        xhr.send(formData);

        if (!async) {
            stateChangeHandler();
        }
    } catch (ex) {
        fire('failure');
    }

    return xhr;
};

/**
 * @param {string} resource 资源路径.
 * @return {string} 还是原来的资源路径.
 */
function RES(resource) {
    return resource;
}

/**
 * 修正IE6下Number.prototype.toFixed的不正常表现
 */
baidu.browser.ie === 6 && (function() {
    /**
     * 覆盖Number.prototype.toFixed
     *
     * @param {Number} digits 小数点后需要保留的位数.
     */
    Number.prototype.toFixed = function(digits) {
        if(isNaN(this) || !isFinite(this)) {
            return this + '';
        }

        var positive = this >= 0,
            num = Math.abs(this),
            factor = Math.pow(10, Math.abs(digits) || 0),
            val = digits < 0 ? ((Math.round(num / factor) * factor) + '') :
                               ((Math.round(num * factor) / factor) + ''),
            point = val.indexOf('.');
        factor += '';
        return (!positive ? '-' : '') + (
            digits < 0 ? val :
                        (point === -1 ? (val + (factor.length > 1 ? '.' : '') + factor . substr(1)) :
                                        (val + factor.substr(val.length - point))
                        )
        );
    };
})();

/**
 * 通过请求一个图片的方式令服务器存储一条日志
 * @function
 * @grammar baidu.sio.log(url)
 * @param {string} url 要发送的地址.
 * @author: int08h,leeight
 */
baidu.sio.log = function(url) {
  var img = new Image(),
      key = 'tangram_sio_log_' + Math.floor(Math.random() *
            2147483648).toString(36);

  // 这里一定要挂在window下
  // 在IE中，如果没挂在window下，这个img变量又正好被GC的话，img的请求会abort
  // 导致服务器收不到日志
  window[key] = img;

  img.onload = img.onerror = img.onabort = function() {
    // 下面这句非常重要
    // 如果这个img很不幸正好加载了一个存在的资源，又是个gif动画
    // 则在gif动画播放过程中，img会多次触发onload
    // 因此一定要清空
    img.onload = img.onerror = img.onabort = null;

    window[key] = null;

    // 下面这句非常重要
    // new Image创建的是DOM，DOM的事件中形成闭包环引用DOM是典型的内存泄露
    // 因此这里一定要置为null
    img = null;
  };

  // 一定要在注册了事件之后再设置src
  // 不然如果图片是读缓存的话，会错过事件处理
  // 最后，对于url最好是添加客户端时间来防止缓存
  // 同时服务器也配合一下传递Cache-Control: no-cache;
  img.src = url;
};

baidu.data = {};

/**
 * 一个本地存储对象，使用key-value的方式来存值，不具备夸浏览器通信功能，根据浏览器的不同自动选择userData或是localStorage或是cookie来存值.
 * @Object
 * @grammar baidu.data.storage
 * @return {baidu.data.storage}
 */
baidu.data.storage = (function() {
    var _guid = baidu.lang.guid(),
        _status = {//状态说明
            SUCCESS: 0,
            FAILURE: 1,
            OVERFLOW: 2
        };
    function _getKey(key) {
        //escape spaces in name，单下划线替换为双下划线，空格替换为_s
        return key.replace(/[_\s]/g, function(matcher) {
            return matcher == '_' ? '__' : '_s';
        });
    }

    function _getElement() {
        return baidu.dom.g(_guid + '-storage');
    }

    function _getInstance() {
        var _storage;
        if (window.ActiveXObject && baidu.browser.ie < 9) { //IE9不再支持userData，暂时采用版本判断的临时方法解决。by xiadengping
            _storage = _createUserData();
        }else if (window.localStorage) {
            _storage = _createLocalStorage();
        }else {
            _storage = _createCookie();
        }
        return _storage;
    }

    /**
     * 将userData进行包装并返回一个只包含三个方法的对象
     * @return {Object} 一个对象，包括set, get, del接口.
     * @private
     */
    function _createUserData() {
        baidu.dom.insertHTML(document.body,
            'beforeEnd',
            baidu.string.format('<div id="#{id}" style="display:none;"></div>',
                {id: _guid + '-storage'})
        );
        _getElement().addBehavior('#default#userData');
        return {
//            size: 64 * 1024,
            set: function(key, value, callback, options) {
                var status = _status.SUCCESS,
                    ele = _getElement(),
                    newKey = _getKey(key),
                    time = options && options.expires ? options.expires
                        : new Date().getTime() + 365 * 24 * 60 * 60 * 1000;//默认保存一年时间
                //bugfix 若expires是毫秒数，先要new Date().getTime()再加上毫秒数。 
                //另外time有可能是字符串，需要变成数字。by xiadengping
                if (baidu.lang.isDate(time)) {
                    time = time.getTime();
                } else {
                    time = new Date().getTime() + (time - 0);
                }
                ele.expires = new Date(time).toUTCString();
                try {
                    ele.setAttribute(newKey, value);
                    ele.save(newKey);
                }catch (e) {
                    status = _status.OVERFLOW;//存储时抛出异常认为是溢出
                }
                ele = null;
                callback && callback.call(this, status, value);
            },
            get: function(key, callback) {
                var status = _status.SUCCESS,
                    ele = _getElement(),
                    newKey = _getKey(key),
                    val = null;
                try {
                    ele.load(newKey);
                    val = ele.getAttribute(newKey);//若过期则返回null
                }catch (e) {
                    status = _status.FAILURE;
                    throw 'baidu.data.storage.get error!';
                }
                callback && callback.call(this, status, val);
            },
            del: function(key, callback) {
                var status = _status.SUCCESS,
                    ele = _getElement(),
                    newKey = _getKey(key),
                    val;
                try {
                    ele.load(newKey);
                    val = ele.getAttribute(newKey);
                    if (val) {
                        //315532799000 是格林威治时间1979年12月31日23时59分59秒。这是删除UserData的最靠前的一个有效expires时间了，再往前一毫秒，expires = new Date(315532798999).toUTCString(); 就删不掉userdata了，可以认为是IE的一个bug
                        ele.removeAttribute(newKey);
                        ele.expires = new Date(315532799000).toUTCString();
                        ele.save(newKey);
                    }else {
                        status = _status.FAILURE;
                    }
                }catch (e) {
                    status = _status.FAILURE;
                }
                callback && callback.call(this, status, val);
            }
        };
    }

    /**
     * 将localstorage进行包装并返回一个只包含三个方法的对象
     * @return {Object} 一个对象，包括set, get, del接口.
     * @private
     */
    function _createLocalStorage() {
        return {
//            size: 10 * 1024 * 1024,
            set: function(key, value, callback, options) {
                var status = _status.SUCCESS,
                    storage = window.localStorage,
                    newKey = _getKey(key),
                    time = options && options.expires ? options.expires : 0;
                //bugfix 若expires是毫秒数，先要new Date().getTime()再加上毫秒数。
                //另外time有可能是字符串，需要变成数字。by xiadengping
                if (baidu.lang.isDate(time)) {
                    time = time.getTime();
                } else if (time > 0) {
                    time = new Date().getTime() + (time - 0);
                }
                
                try {
                    storage.setItem(newKey, time + '|' + value);
                }catch (e) {
                    status = _status.OVERFLOW;
                }
                callback && callback.call(this, status, value);
            },
            get: function(key, callback) {
                var status = _status.SUCCESS,
                    storage = window.localStorage,
                    newKey = _getKey(key),
                    val = null,
                    index,
                    time;
                try {
                    val = storage.getItem(newKey);
                }catch (e) {
                    status = _status.FAILURE;
                }
                if (val) {
                    index = val.indexOf('|');
                    time = parseInt(val.substring(0, index), 10);
                    if (new Date(time).getTime() > new Date().getTime()
                        || time == 0) {
                        val = val.substring(index + 1, val.length);
                    }else {
                        val = null;
                        status = _status.FAILURE;
                        this.del(key);
                    }
                }else {
                    status = _status.FAILURE;
                }
                callback && callback.call(this, status, val);
            },
            del: function(key, callback) {
                var status = _status.SUCCESS,
                    storage = window.localStorage,
                    newKey = _getKey(key),
                    val = null;
                try {
                    val = storage.getItem(newKey);
                }catch (e) {
                    status = _status.FAILURE;
                }
                if (val) {
                    val = val.substring(val.indexOf('|') + 1, val.length);
                    status = _status[val ? 'SUCCESS' : 'FAILURE'];
                    val && storage.removeItem(newKey);
                }else {
                    status = _status.FAILURE;
                }
                callback && callback.call(this, status, val);
            }
        };
    }

    /**
     * 将baidu.cookie进行包装并返回一个只包含三个方法的对象
     * @return {Object} 一个对象，包括set, get, del接口.
     * @private
     */
    function _createCookie() {
        return {
//            size: 4 * 1024,
            set: function(key, value, callback, options) {
                baidu.cookie.set(_getKey(key), value, options);
                callback && callback.call(me, _status.SUCCESS, value);
            },

            get: function(key, callback) {
                var val = baidu.cookie.get(_getKey(key));
                callback && callback.call(me, _status[val ? 'SUCCESS' : 'FAILURE'], val);
            },
            del: function(key, callback) {
                var newKey = _getKey(key),
                    val = baidu.cookie.get(newKey);
                baidu.cookie.remove(newKey);
                callback && callback.call(me, _status[val ? 'SUCCESS' : 'FAILURE'], val);
            }
        };
    }


    return /**@lends baidu.data.storage.prototype*/{
        /**
         * 将一个键值对存入到本地存储中
         * @function
         * @grammar baidu.data.storage.set(key, value, callback, options)
         * @param {String} key 一个键名.
         * @param {String} value 一个值.
         * @param {Function} callback 一个回调函数，函数的第一参数返回该次存储的状态码，各状码表示{0: 成功, 1: 失败, 2: 溢出}，第二参数返回当次的value.
         * @param {Object} options config参数.
         * @config {Date|Number} expires 设置一个过期时间，值的类型必须是一个Date对象或是一个毫秒数
         */
        set: function(key, value, callback, options) {
            var me = this;
            !me._storage && (me._storage = _getInstance());
            me._storage.set.apply(me._storage, arguments);
        },

        /**
         * 依据一个键名称来取得本地存储中的值
         * @function
         * @grammar baidu.data.storage.get(key, callback)
         * @param {String} key 一个键名称.
         * @param {Function} callback 一个回调函数，函数的第一参数返回该次存储的状态码，各状码表示{0: 成功, 1: 失败, 2: 溢出}，第二参数返回当次的value.
         */
        get: function(key, callback) {
            var me = this;
            !me._storage && (me._storage = _getInstance());
            me._storage.get.apply(me._storage, arguments);
        },

        /**
         * 根据一个键名称来删除在本地存储中的值
         * @function
         * @grammar baidu.data.storage.remove(key, callback)
         * @param {String} key 一个键名称.
         * @param {Function} callback 一个回调函数，函数的第一参数返回该次存储的状态码，各状码表示{0: 成功, 1: 失败, 2: 溢出}，第二参数返回当次的value.
         */
        remove: function(key, callback) {
            var me = this;
            !me._storage && (me._storage = _getInstance());
            me._storage.del.apply(me._storage, arguments);
        }
    };
})();

/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
