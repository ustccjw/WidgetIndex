goog.require('ad.impl.weigou.urls');

goog.require('ad.impl.weigou.dal');

goog.provide('ad.impl.mweigou.mockup');

var dal = ad.impl.weigou.dal;
var send = dal.send;

dal._maps = {};

/**
 * 重写send函数
 */
dal.send = function(opt){
    if(dal._maps[opt.url]){
        if(window.console) {
            console.log(opt.url, opt);
        }

        // Get the mocked data or function.
        var data = dal._maps[opt.url];
        var type = Object.prototype.toString.call(data);
        if('[object Function]' === type) {
            data = data.call();
        } else if(Object.prototype.toString.call(data) === '[object Array]') {
            var length = data.length;
            var index = Math.floor(Math.random() * length);
            data = data[index];
        }

        // simulate delay
        var _s = ad.base.setTimeout(function(){
            opt.callback(data);
            ad.base.clearTimeout(_s);
        }, 50);
    } else {
        send.call(this, opt);
    }
};

/**
 * @param {string} url
 * @param {function|Object|Array} data
 *  data如果为function，会返回函数的执行结果
 *  data如果是Object，直接返回
 *  data如果是Array，返回Array里的随机一个值
 *  data如果是其他类型，直接返回
 */
dal.register = function(url, data){
    dal._maps[url] = data;
};


(function() {
    dal.register(ad.impl.weigou.urls.SEARCH, {
        'success': 'true',
        'message': {},
        'page': {
            'pageNo': 4,
            'pageSize': 4,
            'totalCount': 10,
            'result': [
                {
                    'id': '1313',
                    'name': 'iphone6s，来自百度微购，百度专卖，值得信iphone4s，来自百度微购，百度专卖，值得信iphone4s，来自百度微购，百度专卖，值得信iphone4s，来自百度微购，百度专卖，值得信赖赖赖赖iphone4s，来自百度微购，百度专卖，值得信赖',
                    'logo': 'http://t11.baidu.com/it/u=496150465,3381860409&fm=58',
                    'price': 2848.12345,
                    'original_price': 2849.0000,
                    'vendor': '京东商城',
                    'vendor_id': 1313
                },
                {
                    'id': '1313',
                    'name': 'iphone4s，来自百度微购，百度专卖，值得信赖iphone4s，来自百度微购，百度专卖，值得信赖',
                    'logo': 'http://t11.baidu.com/it/u=496150465,3381860409&fm=58',
                    'price': 2848.00,
                    'vendor': '京东商城',
                    'vendor_id': 1313
                },
                {
                    'id': '1313',
                    'name': 'iphone4s，来自百度微购，百度专卖，值得信赖',
                    'logo': 'http://t11.baidu.com/it/u=496150465,3381860409&fm=58',
                    'price': 2848.00,
                    'vendor': '京东商城',
                    'vendor_id': 1313
                }
            ]
        }
    });

    dal.register(ad.impl.weigou.urls.DETAIL, {
        "message":{},
        "result":{
            "attribute_count":5,
            "attributes":[
                {"key":"操控","value":"电容屏触屏"},
                { "key":"外观", "value":"直板"}
            ],
            "id":"176610352",
            "name":"苹果（APPLE）iPhone 8 8G版 3G手机（黑色）WCDMA\/GSM",
            "original_price":3848.00,
            "picture":"http:\/\/s3.bae.baidu.com:80\/ma-image\/176610352_1618434994_451129690_126_126.jpg",
            "price":2899.00,
            "vendor":"京东商城",
            "vendor_id":276
        },
        "success":"true"
    });

    dal.register(ad.impl.weigou.urls.ATTRIBUTE, {
        "message":{},
        "result":[
                {"key":"操控","value":"电容屏触屏"},
                {"key":"外观","value":"直板"},
                {"key":"特点","value":"wifi\/wapi,音乐手机,3G视频通话,导航模块,手写输入,商务手机"},
                {"key":"系统","value":"IOS"},
                {"key":"网络","value":"联通3G(WCDMA),GSM"}
        ],
        "success":"true"
    });

    dal.register(ad.impl.weigou.urls.MOBILE_VCODE, {
        "success": "true",
        "message": {},
        "result": {}
    });

    dal.register(ad.impl.weigou.urls.CHECK_ORDER, {
        "success":"true",
        "message":[],
        "result":{
            "fare":"5.00",
            "totalPrice":"30.890123",
            "176610352":{
                "count":1,
                "id":176538356,
                "price":"25.8012312"
            }
        }
    });

    dal.register(ad.impl.weigou.urls.ADDRESSES, {
        "success":"true",
        "message":{},
        "result":[
            {
                address: "碧波路690号4号楼3层",
                addressee: "王杨",
                city: "上海市",
                district: "浦东新区",
                id: "159",
                is_default: "0",
                merchant_id: "京东",
                province: "上海",
                tel: "15202133259",
                the_fifth_level: null,
                town: null,
                user_id: "15202133259"
            },
            {
                address: "比三级多一级",
                addressee: "王小虎",
                city: "石家庄市",
                district: "辛集市",
                id: "159",
                is_default: "0",
                merchant_id: "京东商城",
                province: "河北",
                tel: "15202133259",
                the_fifth_level: null,
                town: '马庄乡',
                user_id: "15202133259"
            }
        ]
    });

     /*
      *dal.register(ad.impl.weigou.urls.ADDRESSES, {
      *    "success":"false",
      *    "message":{
      *        "field":{
      *            "mobile_vcode":"\u77ed\u4fe1\u9a8c\u8bc1\u7801\/\u5bc6\u7801\u4e0d\u6b63\u786e"
      *        }
      *    },
      *    "result":{}
      *});
      */

    dal.register(ad.impl.weigou.urls.SUBMIT_BUY, {
        "success":"false",
        "message":{
            'global': '无法送达'
        },
        "result":{}
    });

})();


////////////////////////////////////////////////////////////////////////////////////

// 在页面里的JS，移到这里来，避免closure编译失败
(function() {
    function a(j, i) {
        var l = (new Date()).getTime();
        var k = window[l] = new Image();
        var g = "default",
            h;
        k.onload = k.onerror = k.onabort = function() {
            window[l] = null
        };
        if ( !! arguments.callee.arguments[1]) {
            g = i
        }
        h = "http://m.baidu.com/static/tj.gif?prod=" + g + "&type=" + j + "&time=" + l + "&from=src";
        k.src = h
    }
    window.sendRecord = a;

    function d() {
        var g = 1;
        if ("orientation" in window) {
            switch (window.orientation) {
            case 90:
            case -90:
                g = -1;
                break;
            case 0:
            case 180:
                g = 1;
                break;
            default:
            }
        } else {
            width = window.innerWidth;
            height = window.innerHeight;
            g = height > width ? 1 : -1
        }
        return g
    }
    var f = [];
    var c = "onorientationchange" in window,
        e = c ? "orientationchange" : "resize";
    var b = d();
    $(window).bind(e, function() {
        var g = d();
        if (g != b) {
            b = g;
            ad.base.setTimeout(function() {
                window.scrollTo(0, 1)
            }, 200)
        }
    })
})();
(function() {
    var b = {
        checkInterval: 300,
        sugNum: 6,
        sugBaseUrl: "http://m.baidu.com/su?p=3&ie=utf-8&from=wise_web",
        sugScriptId: "sug",
        hisStorageNum: 6,
        defSiteIconUrl: "http://m.baidu.com/static/index/siteDef.png",
        defAppIconUrl: "http://m.baidu.com/static/index/appDef.png",
        sugdirUrl: "http://m.baidu.com/tc?l=1"
    },
        c = {
            isRequesting: false,
            sugWinMoved: false,
            sugClosed: false,
            isFocus: false
        },
        f = {
            btn: $('input[name="tj"]').val(),
            qtime: 0,
            type: "inp"
        },
        d = {},
        e = {
            wrap: "suggest-div",
            sug: "sug",
            his: "his",
            touch: "touched",
            sugEdit: "sugAdd"
        },
        a = function(g) {
            g.preventDefault && (g.preventDefault(), g.stopPropagation())
        };
    window.baidu = window.baidu || {};
    $.sug = function(g) {
        var h = this;
        $.extend(h, {
            doms: {
                wrap: $(g.wrapid),
                input: $(g.inputid),
                reset: $(g.resetid),
                bn: $(g.buttonid)
            },
            lastKw: $(g.inputid).val() || "",
            needHis: g.needHis,
            record: g.record,
            sugsa: g.sugsa,
            hissa: g.hissa
        });
        h.init()
    };
    $.sug.prototype = {
        init: function() {
            var g = this;
            g.DOMprepared();
            g.attchEvent()
        },
        DOMprepared: function() {
            var g = this;
            g.sugDiv = $("<div/>").attr("class", e.wrap);
            g.sugClose = $("<div/>").html("\u5173\u95ed").attr("class", "suggest-close");
            g.sugTitle = $("<div/>").attr("class", "suggest-title");
            g.clear = $("<div/>").attr("class", "history-clear").html("\u6e05\u9664\u5386\u53f2\u8bb0\u5f55");
            g.sugDirect = $("<div/>").attr("class", "suggest-direct");
            g.sugContent = $("<div/>").attr("class", "suggest-content");
            g.sugTitle.append(g.clear);
            g.sugDiv.append(g.sugDirect).append(g.sugContent).append(g.sugClose).append(g.sugTitle);
            g.doms.wrap.append(g.sugDiv);
            g.form = g.doms.wrap.parents("form");
            g.boxsa = g.form.attr("sa").value;
            g.hd()
        },
        attchEvent: function() {
            var i = this;
            var g = i.doms.input;
            var h = function(k) {
                    g.focus();
                    a(k)
                };
            var j = $.os.ios && /iPhone OS 6/.test(navigator.userAgent);
            j && g.one("touchstart", h).bind("touchmove", a);
            g.bind("focus", function() {
                if (!c.sugClosed) {
                    $("." + e.wrap).hide()
                }
                c.isFocus = true;
                f.qtime == 0 && (f.qtime = (new Date).getTime());
                i.scrollTop();
                i.checkInput()
            }).bind("blur", function() {
                j && i.doms.input.one("touchstart", h);
                c.isFocus = false;
                ad.base.clearTimeout(i.timer)
            });
            i.doms.bn.bind("click", function(k) {
                f.type = "inp";
                i.submitProcess(k)
            });
            i.clear.bind("click", function() {
                if (confirm("\u6e05\u9664\u5168\u90e8\u67e5\u8be2\u5386\u53f2\u8bb0\u5f55?")) {
                    i.clearHis()
                } else {
                    i.clear.removeClass(e.touch)
                }
            });
            i.sugClose.bind("click", function() {
                c.sugClosed = true;
                i.hd()
            });
            i.doms.reset.bind("touchstart", function(k) {
                i.doms.input.val("").focus();
                $(this).hide();
                a(k)
            });
            $("body").bind("click", function() {
                if (!c.isFocus) {
                    ad.base.clearTimeout(i.timer);
                    $("." + e.wrap).hide()
                }
            })
        },
        scrollTop: function() {
            var g = this;
            if ($.os.ios) {
                window.scrollTo(0, g.form.attr("offsetTop") - 2)
            } else {
                ad.base.setTimeout(function() {
                    window.scrollTo(0, g.form.attr("offsetTop") - 2)
                }, 100)
            }
        },
        clearTouchStatus: function() {
            var i = $("." + e.sugEdit),
                g = $("." + e.sug),
                j = $("." + e.his),
                h = e.touch;
            i.removeClass(h);
            g.removeClass(h);
            j.removeClass(h);
            this.sugDirect.removeClass(h);
            this.sugClose.removeClass(h);
            this.clear.removeClass(h)
        },
        bindTouch: function(k) {
            var j = this,
                i = e.touch,
                h = $("." + (k ? e.sug : e.his)),
                g = j.doms.input;
            $("." + e.sugEdit).bind("touchend", function(l) {
                j.clearTouchStatus();
                a(l)
            }).bind("touchstart", function(m) {
                var l = $(this).siblings("button").attr("data-kw"),
                    n = $(this).siblings("button").attr("data-index");
                j.clearTouchStatus();
                $(this).addClass(e.touch);
                g.focus();
                j.scrollTop();
                g.addClass("animate");
                ad.base.setTimeout(function() {
                    g.removeClass("animate")
                }, 400);
                g.val(l);
                j.lastKw = l;
                j.doms.reset.show();
                j.sendRequest(l);
                sendRecord("sugedit" + n, j.record);
                j.form.attr("sug_edit").value = "1";
                if ( !! f.no || f.no == 0) {
                    delete f.no
                }
                a(m)
            }).bind("touchmove", a);
            h.bind("touchstart", function(l) {
                j.clearTouchStatus();
                $(this).addClass(i);
                c.sugWinMoved = false
            }).bind("touchmove", function(l) {
                c.sugWinMoved = true
            }).bind("touchend", function(l) {
                j.clearTouchStatus()
            }).bind("click", function(o) {
                if (!c.sugWinMoved) {
                    var m = $(this).attr("class"),
                        l = m.split(" ");
                    if (l.length >= 3 && l[1] === "direct") {
                        var n = o.target;
                        if (n.nodeName === "A" && n.href && n.href.indexOf("tel:") === 0) {
                            sendRecord("sugTel");
                            return
                        } else {
                            f.type = "dir";
                            f.no = l[2];
                            h.removeClass(i);
                            j.form.attr("rawqs").value = g.val();
                            if (l[2] == 2 || l[2] == 3) {
                                k.rs.p == 1 && g.val(k.s[0]);
                                j.submitProcess(o, l[2], k.rs.v[0])
                            } else {
                                if (l[2] == 5) {
                                    g.val(k.rs.v[3])
                                } else {
                                    k.rs.p == 1 && g.val(k.s[0])
                                }
                                j.submitProcess(o)
                            }
                        }
                    } else {
                        f.type = l[0];
                        f.no = (l[1] - 1) >= 0 ? (l[1] - 1) : 0;
                        h.removeClass(i);
                        j.form.attr("rawqs").value = g.val();
                        g.val(this.innerText);
                        j.form.attr("sa").value = (k ? j.sugsa : j.hissa) + "_" + (parseInt(f.no) + 1);
                        j.submitProcess(o)
                    }
                }
                a(o)
            });
            j.sugClose.bind("touchstart", function(l) {
                j.clearTouchStatus();
                $(this).addClass("touched")
            }).bind("touchend", function(l) {
                j.clearTouchStatus()
            });
            j.clear.bind("touchstart", function(l) {
                $(this).addClass("touched")
            }).bind("touchend", function(l) {
                j.clearTouchStatus()
            })
        },
        statistics: function(g) {
            var h = "";
            for (key in g) {
                h += g[key] + "_"
            }
            h = h.substring(0, h.length - 1);
            return h
        },
        clearstatics: function(h) {
            var g = this;
            h.btn = g.form.attr("tj").value.split("_", 2).join("_");
            g.form.attr("tj").value = h.btn;
            g.form.attr("sa").value = g.boxsa;
            $('input[name="sugv"]').val("0");
            $('input[name="hisv"]').val("0");
            $('input[name="sug_edit"]').val("0");
            $('input[name="loadtime"]').val("0");
            $('input[name="stime"]').val("0");
            $('input[name="showdirtype"]').val("");
            h.qtime = 0;
            h.type = "inp";
            if (h.no) {
                delete h.no
            }
        },
        submitProcess: function(l, h, j) {
            var i = this,
                k = this.doms.input.val();
            if (k) {
                if (i.needHis) {
                    i.setHis(k.toLowerCase().trim())
                }
                f.qtime = (new Date()).getTime() - f.qtime;
                i.doms.reset.hide();
                i.hd();
                var g = i.statistics(f);
                $('input[name="tj"]').val(g);
                $('input[name="stime"]').val((new Date()).getTime());
                $('input[name="loadtime"]').val((new Date()).getTime() - window._loadtime);
                c.sugClosed = false;
                if (h && j) {
                    location.href = b.sugdirUrl + "&type=clicksugdir&from=wise_web&showdirtype=" + h + "&word=" + encodeURIComponent(k) + "&tj=" + g + "&" + j
                } else {
                    i.form.submit()
                }
                i.clearstatics(f)
            }
            a(l)
        },
        checkInput: function() {
            var h = this,
                g = (h.doms.input.val().toLowerCase()).trim();
            h.timer = ad.base.setTimeout(function() {
                h.checkInput()
            }, b.checkInterval);
            if (c.sugClosed) {
                if (g != "") {
                    h.doms.reset.show()
                } else {
                    h.doms.reset.hide()
                }
                return
            } else {
                if (g == h.lastKw && (h.sugContent.children().length > 0 || h.sugDirect.children().length > 0) && !c.isRequesting) {
                    h.sh()
                } else {
                    h.lastKw = g;
                    h.getSug(g)
                }
            }
        },
        getSug: function(h) {
            var g = this;
            if (h == "") {
                g.doms.reset.hide();
                g.dataProcess(h, null)
            } else {
                g.doms.reset.show();
                if (d[h] && !c.isRequesting) {
                    g.dataProcess(h, d[h])
                } else {
                    if (!c.isRequesting) {
                        c.isRequesting = true;
                        g.sendRequest(h)
                    }
                }
            }
        },
        dataProcess: function(m, h) {
            var o = this;
            var p = (h && h.s) || [];
            var g = h && h.rs;
            var j = {},
                q = [];
            for (var k = 0, l = p.length; k < l; k++) {
                j[p[k]] = true;
                q.push(["sug", p[k]])
            }
            if (o.needHis) {
                var n = o.getHis(m);
                for (var k = 0, l = n.length; k < l; k++) {
                    if (!j[n[k]]) {
                        q.push(["his", n[k]])
                    }
                }
            }
            o.buildDOM(m, q, g);
            o.bindTouch(h);
            o.doms.wrap.find("." + e.his).size() == 0 ? o.clear.hide() : o.clear.show()
        },
        buildSugDirDOM: function(m, n, h) {
            var l = this;
            if (h) {
                var k = l.getSugDirItem(h.t, h.v);
                if (!k) {
                    l.sugDirect.hide();
                    return false
                }
                l.form.attr("showdirtype").value = h.t;
                l.sugDirect.show();
                var j = $("<div/>").attr("class", "sug direct " + h.t + " d" + h.t);
                var i = $("<button/>");
                j.append(i);
                if (k.icon) {
                    i.append($("<div/>").attr("class", "directIcon directIcon" + h.t).append(k.icon))
                }
                var g = $("<div/>").attr("class", "directText directText" + h.t);
                k.title && g.append(k.title);
                k.info && g.append(k.info);
                i.append(g);
                l.sugDirect.append(j);
                return true
            } else {
                l.sugDirect.hide();
                return false
            }
        },
        getSugDirItem: function(i, h) {
            var l = this;
            var j = null;
            var n = $("<p/>").attr("class", "title");
            var m = $("<p/>").attr("class", "info");
            var g = {
                "1": function() {
                    j = $("<img/>").attr("class", "icon").attr("src", h[3]);
                    var o = h[2].split(/\s+/);
                    n.html('<span class="right">\u8be6\u60c5</span><b>' + o[0] + "</b>");
                    m.html('<span class="pre">\u4eca\u5929 ' + h[0] + '</span><span class="leftBorder">' + o[1] + "</span>")
                },
                "2": function() {
                    j = $("<img/>").attr("class", "icon").attr("src", h[3] || b.defSiteIconUrl);
                    n.html(l.getInnerWrap.call(l, h[2], "b", "span", null));
                    m.html(h[1])
                },
                "3": function() {
                    j = $("<img/>").attr("class", "icon").attr("src", h[4] || b.defAppIconUrl);
                    n.html("<b>" + h[1] + "</b><span>\u4e0b\u8f7d</span>");
                    m.html("\u7248\u672c" + h[2] + '<span class="leftBorder">' + h[3] + '</span><span class="leftBorder">\u66f4\u65b0' + h[5] + "</span>")
                },
                "4": function() {
                    var s = h[0].split(",");
                    var t = h[1].split(",");
                    var o = [],
                        q = h[0] ? s.length : 0,
                        r = h[1] ? t.length : 0,
                        p;
                    for (p = 0; p < q; p++) {
                        o.push('<div class="ball redball">', s[p], "</div>")
                    }
                    for (p = 0; p < r; p++) {
                        o.push('<div class="ball blueball">', t[p], "</div>")
                    }
                    n.html(o.join(""));
                    m.html(["<b>", h[2], '</b><span class="leftBorder">\u5f00\u5956\u65e5\u671f\uff1a', h[3], "</span>"].join(""))
                },
                "5": function() {
                    n.html(['<b class="pre">', h[0] ? (h[0] + " ") : "", h[1], "</b>"].join(""));
                    m.html([h[3], '<span class="leftBorder">', h[2], "</span>"].join(""))
                },
                "6": function() {
                    n.html(['<b class="num">', h[0], "</b>"].join(""));
                    m.html([h[1], '<span class="leftBorder">\u5317\u4eac\u65f6\u95f4', h[2], "</span>"].join(""))
                },
                "7": function() {
                    var p = h[0].split(",");
                    var o = h[3].split(",");
                    if (h[0]) {
                        n.html(['<b class="pre"><span class="num">', p[0], '</span> \u548c <span class="num">', p[1], "</span></b>"].join(""))
                    } else {
                        n.html(["<b>\u4e0d\u9650\u884c</b>"].join(""))
                    }
                    if (h[3]) {
                        m.html(["<b>\u4eca\u65e5(", h[1], ')</b><span class="leftBorder">\u660e\u65e5(', h[2], ")", o[0], "\u548c", o[1], "</span>"].join(""))
                    } else {
                        m.html(["<b>\u4eca\u65e5(", h[1], ')</b><span class="leftBorder">\u660e\u65e5(', h[2], ")\u4e0d\u9650\u884c</span>"].join(""))
                    }
                },
                "8": function() {
                    n.html(['<b class="num">', h[0], '</b><span class="leftBorder pre">', h[1], " \u90ae\u7f16</span>"].join(""))
                },
                "9": function() {
                    n.html(['<b class="num">', h[0], '</b><span class="leftBorder pre">', h[1], " \u533a\u53f7</span>"].join(""))
                },
                "10": function() {
                    n.html(["<b>", h[0], "</b>"].join(""))
                },
                "11": function() {
                    n.html(["<b>", h[0], h[1], "</b>"].join(""));
                    m.html(["[\u5b57\u4e49]", h[2]].join(""))
                },
                "12": function() {
                    n.html(["<b>", h[0], "</b>"].join(""));
                    m.html([h[1], h[2] ? ('<span class="leftBorder pre">' + h[2] + "</span>") : ""].join(""))
                },
                "13": function() {
                    n.html(['<b class="pre">', h[0], "</b>"].join(""));
                    m.html(["\u300a", h[1], "\u300b", h[2] ? ('<span class="leftBorder pre">' + h[2] + "</span>") : ""].join(""))
                },
                "14": function() {
                    n.html(["<b>", h[0], '</b><span class="leftBorder pre">', h[1], "</span>"].join(""))
                },
                "15": function() {
                    n.html(['<a href="tel:', h[0], '">', h[0], '</a><b>\u5b98\u65b9</b><span class="leftBorder pre">', h[1], "</span>"].join(""))
                }
            };
            var k = null;
            if (g[i]) {
                g[i]();
                k = {
                    icon: j,
                    title: n,
                    info: m
                }
            }
            return k
        },
        buildDOM: function(m, o, h) {
            var l = this;
            l.cl();
            var g = Math.min(o.length, b.sugNum);
            var k = l.buildSugDirDOM(m, o, h);
            if (g === 0 && !k) {
                return l.hd()
            }
            for (var j = 0; j < g; j++) {
                o[j][0] == "his" && (l.form.attr("hisv").value = 1);
                var n = $("<div/>").attr("class", o[j][0] + " " + (j + 1));
                n.append(l.getInnerWrap.call(l, o[j][1], "b", "button", {
                    "data-kw": o[j][1],
                    "data-index": j
                }));
                n.append($("<div/>").attr("class", "sugAdd")).append($("<div/>").attr("class", o[j][0] + "Icon"));
                l.sugContent.append(n)
            }
            if (!c.sugClosed && c.isFocus) {
                l.sh();
                l.form.attr("sugv").value = 1
            }
        },
        getInnerWrap: function(n, m, g, i) {
            var l = this.lastKw.replace(/(.+?)([\)|\(|\[|\]\*|\+|\)|\(|\[|\]|\\]{1,})/gi, "$1"),
                k = (new RegExp("(.*?)" + l + "(.*)", "ig")).exec(n),
                j = null,
                h = $("<" + g + "/>");
            this.lastKw = l;
            if (k) {
                if (k[1]) {
                    j = $("<" + m + "/>").text(k[1]);
                    h.append(j);
                    i && h.attr(i)
                }
                h.html(h.html() + this.lastKw);
                if (k[2]) {
                    j = $("<" + m + "/>").text(k[2]);
                    h.append(j);
                    i && h.attr(i)
                } else {
                    j = k[2];
                    h.append(j);
                    i && h.attr(i)
                }
            } else {
                j = $("<" + m + "/>").text(n);
                h.append(j);
                i && h.attr(i)
            }
            return h
        },
        setHis: function(h) {
            try {
                localStorage["kw:" + h] = JSON.stringify({
                    time: new Date().getTime(),
                    kw: h
                });
                localStorage.hisUpdated = 0
            } catch (g) {}
        },
        getHis: function(l) {
            var m = {},
                j = [],
                k = [];
            try {
                if (localStorage.hisUpdated == "0") {
                    m = this.reflowHis()
                } else {
                    if (localStorage.processedCache === undefined) {} else {
                        m = JSON.parse(localStorage.processedCache)
                    }
                }
                for (var h in m) {
                    var o = (h.split("kw:")[1]).toLowerCase();
                    if (o.indexOf(l) != -1 && o != l) {
                        j.push(JSON.parse(m[h]))
                    }
                }
                if (j.length == 0) {
                    return []
                } else {
                    j.sort(function(p, i) {
                        return i.time - p.time
                    });
                    for (var g = j.length; g--;) {
                        k.unshift(j[g]["kw"])
                    }
                }
            } catch (n) {}
            return k
        },
        reflowHis: function() {
            var g = {};
            try {
                for (var j = localStorage.length; j--;) {
                    var h = localStorage.key(j);
                    if (h.indexOf("kw:") == 0) {
                        g[h] = localStorage[h]
                    }
                }
                localStorage.processedCache = JSON.stringify(g);
                localStorage.hisUpdated = 1
            } catch (k) {}
            return g
        },
        clearHis: function() {
            try {
                var i = this,
                    g = JSON.parse(localStorage.processedCache);
                for (var h in g) {
                    localStorage.removeItem(h)
                }
                localStorage.removeItem("processedCache");
                localStorage.hisUpdated = 0;
                i.cl();
                i.hd()
            } catch (j) {}
        },
        sendRequest: function(i) {
            var h = this;
            window.baidu.sug = function(j) {
                if (j.q != "" && (!j.rs || (j.rs && j.rs.t !== 1))) {
                    d[j.q] = j
                }
                h.dataProcess(j.q, j);
                c.isRequesting = false
            };
            var g = document.getElementById(b.sugScriptId);
            g && document.body.removeChild(g);
            g = document.createElement("script");
            g.id = b.sugScriptId;
            g.src = b.sugBaseUrl + "&wd=" + encodeURIComponent(i) + "&t=" + new Date().getTime();
            document.body.appendChild(g)
        },
        hd: function() {
            this.sugDiv && this.sugDiv.hide()
        },
        sh: function() {
            this.sugDiv && this.sugDiv.show()
        },
        cl: function() {
            this.sugContent && this.sugContent.html("");
            this.sugDirect && this.sugDirect.html("")
        }
    }
})();
(function() {
    $(document).ready(function() {
        window.scrollTo(0, 1);
        if ($("#kw").length > 0) {
            new $.sug({
                wrapid: "#se_box",
                inputid: "#kw",
                resetid: "#cross",
                buttonid: "#se_bn",
                needHis: !! window.localStorage,
                record: "default_src",
                sugsa: "ts",
                hissa: "th"
            })
        }
        if ($("#kw2").length > 0) {
            new $.sug({
                wrapid: "#se_box2",
                inputid: "#kw2",
                resetid: "#cross2",
                buttonid: "#se_bn2",
                needHis: !! window.localStorage,
                record: "default_src",
                sugsa: "bs",
                hissa: "bh"
            })
        }
        $("#switchBt").bind("click", function() {
            if ($("#switchBt").data("slide") == "false") {
                $("#more").show();
                $("#switchBt").data("slide", "true");
                $("#mo").addClass("more_show");
                $("#arr").addClass("arrow_show")
            } else {
                a()
            }
        });

        function a() {
            $("#more").hide();
            $("#switchBt").data("slide", "false");
            $("#mo").removeClass("more_show");
            $("#arr").removeClass("arrow_show")
        }
    })
})();
(function() {
    var p = window.A,
        l = p.$,
        m = p.log;
    if (!m) {
        return
    }
    var k = m.settings,
        j = "m.baidu.com",
        o = "WA_LOG_",
        n = ["TAB", "BTN", "GES", "OTHER"];
    var q = function(t, h) {
            var e = true,
                d, a = [],
                z, B, f = t,
                i = l(f),
                g;
            while (e && f && f !== h) {
                if (i.attr("data-nolog")) {
                    e = false;
                    break
                } else {
                    if (d = i.attr("data-click")) {
                        a.push(d);
                        if (/['"]?sto['"]?:/.test(d)) {
                            g = i
                        }
                    }
                }
                f = f.parentNode;
                i = l(f)
            }
            if (e) {
                var z, B, A, f = t,
                    c, y = n.length;
                while (!z && f && f !== h) {
                    for (var b = 0; b < y; b++) {
                        if (l(f).hasClass(o + n[b])) {
                            z = n[b];
                            c = f;
                            break
                        }
                    }
                    f = f.parentNode
                }
                if (z) {
                    l.each(l("." + o + z, l(h)), function(u, s) {
                        if (s === c) {
                            B = u + 1;
                            return false
                        }
                    });
                    g && l.each(l("." + o + z, g), function(u, s) {
                        if (s === c) {
                            A = u + 1;
                            return false
                        }
                    });
                    if (B || A) {
                        return {
                            isLog: e,
                            type: z,
                            index: B,
                            sIndex: A,
                            overrideData: a
                        }
                    }
                }
            }
            return null
        };
    var r = function(t, h) {
            var w = l(h).attr("srcid");
            if (!m.list[w]) {
                return
            }
            var b = +new Date(),
                e = q(t, h);
            if (e && e.isLog) {
                var g = k.sPARAMS.pn,
                    c = k.sPARAMS.rn,
                    x = k.API_URL + l.param(k.PARAMS) + "&";
                var i = m.list[w],
                    f = [i.ensrcid, i.order, g, c].join("_"),
                    d = {
                        fm: i.fm,
                        order: i.order
                    },
                    a = e && e.type.charAt(0).toLowerCase() || "o";
                i.ala_appid && (d.ala_appid = i.ala_appid);
                i.waplogo && (d.waplogo = i.waplogo);
                e.index && (d.ala_clk = [f, a + e.index].join("_"));
                e.sIndex && (d.sto = "");
                d.src = i.mu || j;
                d.ala_clk_t = l(t).text();
                e.overrideData.length > 0 && l.each(e.overrideData.reverse(), function(s, u) {
                    d = l.extend(d, (new Function("return " + u))())
                });
                d.sto && e.sIndex && (d.sto = [d.sto, a + e.sIndex].join("_"));
                d.sec = b;
                m.send(x + l.param(d))
            }
        };
    l(window.document.body).bind({
        touchend: function(a) {
            var c = a.target;
            if (c) {
                var b = l(c).parents("[srcid]").get(0) || c;
                l(b).attr("srcid") && r(c, b)
            }
        }
    })
})();;
var ls_script_flag = true;
