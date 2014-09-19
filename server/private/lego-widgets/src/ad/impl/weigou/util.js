/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: util.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/weigou/util.js ~ 2013/03/04 13:59:08
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 11222 $
 * @description
 * weigou的工具类
 **/
goog.provide('ad.impl.weigou.util');


ad.impl.weigou.util = {

    /**
     * @param {string} source
     * @return {number}
     */
    getByteLength: function(source){
        return String(source).replace(/[^\x00-\xff]/g, "ci").length;
    },

    /**
     * @param {string} source
     * @param {number} length
     * @param {string=} opt_tail 后缀
     * @return {string}
     */
    subByte: function(source, length, opt_tail){
        source = String(source);
        var tail = opt_tail || '...';
        if (length < 0 || ad.impl.weigou.util.getByteLength(source) <= length) {
            return source; //此时没有进行截断，不需要添加tail chenxin
        }
        var tailLen = tail.length;
        //'...'实际占宽只有两个字节，做特殊处理 -- chenxin
        if(tail == '...'){
            tailLen = 2;
        }
        //thanks 加宽提供优化方法
        source = source.substr(0,length).replace(/([^\x00-\xff])/g,"\x241 ")//双字节字符替换成两个
        .substr(0,length-tailLen)//截取长度 (需要减掉tail的长度来给tail留空-chenxin)
        .replace(/[^\x00-\xff]$/,"")//去掉临界双字节字符
        .replace(/([^\x00-\xff]) /g,"\x241");//还原
        return source + tail;
    },

    /**
     * @param {string} source
     * @param {number} length
     * @return {string}
     */
    ellipsis: function(source, length){
        return ad.impl.weigou.util.subByte(source, length, '...');
    },

    /**
     * Json to Query
     * @param {Object} obj
     * @return {string} url
     */
    jsonToQuery: function(obj){
        var value;
        var url = '';
        var valueArr = [];
        for(var key in obj){
            value = obj[key];
            valueArr.push(key + '=' + encodeURIComponent(value));
        }
        return valueArr.join('&');
    },

    /**
     * Get the window.location.href, and Query to Json
     * @return {Object}
     */
    getUrlParams: function() {
        try{
            var href = window['location']['href'];
            var sParam = href.substring(href.indexOf('?'));
            var params = baidu.url.queryToJson(sParam);

            // Have to do this thing, because queryToJson didn't decode for us.
            for(var p in params){
                try{
                    params[p] = decodeURIComponent(params[p]);
                } catch(e1) { }
            }
            return params;
        } catch (e){
            return {};
        }
    },

    dateFormat: function (source, pattern) {
        if ('string' != typeof pattern) {
            return source.toString();
        }

        function replacer(patternPart, result) {
            pattern = pattern.replace(patternPart, result);
        }

        var pad = function(source, length) {
            var pre = "",
            negative = (source < 0),
            string = String(Math.abs(source));

            if (string.length < length) {
                pre = (new Array(length - string.length + 1)).join('0');
            }

            return (negative ?  "-" : "") + pre + string;
        },
        year    = source.getFullYear(),
        month   = source.getMonth() + 1,
        date2   = source.getDate(),
        hours   = source.getHours(),
        minutes = source.getMinutes(),
        seconds = source.getSeconds();

        replacer(/yyyy/g, pad(year, 4));
        replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
        replacer(/MM/g, pad(month, 2));
        replacer(/M/g, month);
        replacer(/dd/g, pad(date2, 2));
        replacer(/d/g, date2);

        replacer(/HH/g, pad(hours, 2));
        replacer(/H/g, hours);
        replacer(/hh/g, pad(hours % 12, 2));
        replacer(/h/g, hours % 12);
        replacer(/mm/g, pad(minutes, 2));
        replacer(/m/g, minutes);
        replacer(/ss/g, pad(seconds, 2));
        replacer(/s/g, seconds);

        return pattern;
    }
};


/**
 * @param {string} template 模板
 * @param {Object} data 数据
 * @param {Object=} opt 参数，可包含自定义函数
 * @return {string|Function} 如果包含数据，则返回函数执行后的字符串，否则返回函数
 */
ad.impl.weigou.util.tmpl = (function(){
    /**
     * Paser
     * @constructor
     * @param {string} str
     */
    function Parser(str){
        var me = this;
        me.str = str;
        me.length = str.length;

        var EOF = "";

        var START = 0,
            DONE = 1,
            INCODE = 2,
            INCOMMENT = 3,
            INTEXT = 4;

        var type = {
            CODE : 0,
            TEXT : 1,
            NONE : 2
        };

        //running variables
        me.offset = -1;
        me.lineno = 1;

        var error = function(msg){
            throw new Error(msg + ': lineno[' + me.lineno + ']');
        };

        me.getNextStmt = function(){
            var status = START,
            start = me.offset + 1,
            end,
            category;

            while(status != DONE){
                //var c = me.getNextChar();
                var c = me.str.charAt(++me.offset);

                if(c == "\n"){
                    me.str = me.str.substring(0, me.offset) + ' ' + me.str.substring(me.offset + 1);
                    c = ' ';
                    me.lineno++;
                }
                switch(status){
                    case START:
                        if(c == '<'){
                            //var _c = me.getNextChar();
                            var _c = me.str.charAt(++me.offset);
                            if(_c == '%'){
                                status = INCODE;
                            } else {
                                me.offset--;
                                status = INTEXT;
                            }
                        } else if(c === EOF){
                            status = DONE;
                            category = type.NONE;
                        } else {
                            status = INTEXT;
                        }
                        break;
                    case INCODE:
                        if(c == '%'){
                            //var _c = me.getNextChar();
                            var _c = me.str.charAt(++me.offset);
                            if(_c == '>'){
                                status = DONE;
                                category = type.CODE;
                            } else {
                                //me.ungetNextChar();
                                me.offset--;
                            }
                        } else if(c === EOF){
                            error("Error. There is a single syntax seperator.");
                        }
                        break;
                    case INTEXT:
                        if(c == '<'){
                            //var _c = me.getNextChar();
                            var _c = me.str.charAt(++me.offset);
                            if(_c == '%'){
                                me.offset -= 2;
                                status = DONE;
                                category = type.TEXT;
                            }
                        } else if(c === EOF){
                            status = DONE;
                            category = type.TEXT;
                        }
                }

            }

            if(category == type.NONE){
                return null;
            } else {
                return {
                    start : start,
                    end : me.offset + 1,
                    type : category
                };
            }
        };

        me.parse = function(){
            var stmt,
            code = '',
            lastType = 1; //0代表直接输出，1代表其他
            /**
             * 拼接代码，对连续输出进行优化，两个连续的输出语句会合并为一条语句
             */
            function concatCode(str, type){
                switch(type){
                    case 0 :
                        if(lastType){
                            code += '__s+=' + str;
                        } else {
                            code += '+' + str;
                        }
                        lastType = 0;
                        break;
                    default:
                        if(!lastType){
                            code += ';'
                        }
                        code += str;
                        lastType = 1;
                }
            };
            while(stmt = me.getNextStmt()){
                switch(stmt.type){
                    case type.CODE:
                        var flag = me.str.charAt(stmt.start + 2);
                        if(flag == '='){
                            concatCode(me.str.substring(stmt.start + 3, stmt.end - 2), 0);
                        } else if(flag == ':'){
                            flag = me.str.charAt(stmt.start + 3);
                            switch(flag){
                                case 'u':
                                    if(me.str.charAt(stmt.start + 4) == '='){
                                        concatCode('encodeURIComponent(' + me.str.substring(stmt.start + 5, stmt.end - 2) + ')', 0);
                                    } else 
                                        error("Errors. Expect char: \'=\'");
                                    break;
                                case 'h':
                                    if(me.str.charAt(stmt.start + 4) == '='){
                                        concatCode('encodeHTML(' + me.str.substring(stmt.start + 5, stmt.end - 2) + ')', 0);
                                    } else 
                                        error('Errors. Expect char: \'=\'');
                                    break;
                            }
                        } else if(flag == '#'){
                            //注释
                            break;
                        } else {
                            concatCode(me.str.substring(stmt.start + 2, stmt.end - 2), 1);
                        }
                        break;
                    case type.TEXT:
                        concatCode('"' + me.str.substring(stmt.start, stmt.end).replace(/"/g, "\\\"").replace(/'/g, "\\\'") + '"', 0);
                        break;
                    default:
                        error("Errors. Unsupported statement");
                }
            }

            return code;
        };

    }

    var innerFns = {
        'encodeHTML' : [
            'function(str){',
                'return String(str)',
                    '.replace(/&/g,"&amp;")',
                    '.replace(/</g,"&lt;")',
                    '.replace(/>/g,"&gt;")',
                    '.replace(/"/g,"&quot;")',
                    '.replace(/\'/g,"&#39;")',
                    '.replace(/\\\\/g,"\\\\")',
                    '.replace(/\\\//g,"\\\/")',
            '}'
        ].join(''),
        'print' : 'function(s){__s+=s}'
    };

    var tpl = function(template, data, opt){
        if(!opt) opt = {};
        var parser = new Parser(template);
        var str = parser.parse();
        var inFns = '',
            key,
            value;
        opt['fns'] = opt['fns'] || {};
        for(key in innerFns){
            value = innerFns[key];
            opt['fns'][key] = opt['fns'][key] || value;
        }
        for(key in opt['fns']){
            value = opt['fns'][key];
            value = 'var ' + key + '=' + value.replace(/[\r\t\n]/g, ' ') + ';';
            inFns += value;
        }
        var fn = new Function('obj', 'var __s="";' + inFns + 'with(obj){' + str + '}return __s');
        return data ? fn(data) : fn;
    };

    return tpl;
})();
