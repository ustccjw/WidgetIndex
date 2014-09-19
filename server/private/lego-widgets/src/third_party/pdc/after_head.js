/***************************************************************************
 *
 * Copyright (c) 2011 Baidu.com, Inc. All Rights Reserved
 * $Id: after_head.js 9415 2012-05-28 06:53:00Z liyubei $
 *
 **************************************************************************/



/**
 * src/pdc/after_head.js ~ 2011/11/15 11:45:05
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 9415 $
 * @description
 *
 **/

PDC.mark('ht');
(function() {
    var a = PDC.ready = function() {
            var g = false,
                f = [],
                c;
            if (document.addEventListener) {
                c = function() {
                    document.removeEventListener('DOMContentLoaded', c, false);
                    d();
                }
            } else {
                if (document.attachEvent) {
                    c = function() {
                        if (document.readyState === 'complete') {
                            document.detachEvent('onreadystatechange', c);
                            d();
                        }
                    }
                }
            }
            function d() {
                if (!d.isReady) {
                    d.isReady = true;
                    for (var k = 0, h = f.length; k < h; k++) {
                        f[k]();
                    }
                }
            }
            function b() {
                try {
                    document.documentElement.doScroll('left');
                } catch (h) {
                    setTimeout(b, 1);
                    return;
                }
                d();
            }
            function e() {
                if (g) {
                    return;
                }
                g = true;
                if (document.addEventListener) {
                    document.addEventListener('DOMContentLoaded', c, false);
                    window.addEventListener('load', d, false);
                } else {
                    if (document.attachEvent) {
                        document.attachEvent('onreadystatechange', c);
                        window.attachEvent('onload', d);
                        var h = false;
                        try {
                            h = window.frameElement == null;
                        } catch (i) {}
                        if (document.documentElement.doScroll && h) {
                            b();
                        }
                    }
                }
            }
            e();
            return function(h) {
                d.isReady ? h() : f.push(h);
            }
        }();
    a.isReady = false;
})();
PDC.ready(function() {
    PDC.mark('drt');
});
PDC.mark('vt');









/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
