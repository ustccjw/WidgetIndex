/***************************************************************************
 *
 * Copyright (c) 2011 Baidu.com, Inc. All Rights Reserved
 * $Id: after_html.js 9415 2012-05-28 06:53:00Z liyubei $
 *
 **************************************************************************/



/**
 * src/pdc/after_html.js ~ 2011/11/15 11:45:51
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 9415 $
 * @description
 *
 **/
PDC._load_js = function(b, c) {
    var a = document.createElement('script');
    a.setAttribute('type', 'text/javascript');
    a.setAttribute('src', b);
    a.onload = a.onreadystatechange = function() {
        if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
            a.onload = a.onreadystatechange = null;
            if (typeof c === 'function') {
                c(b, true);
            }
        }
    };
    a.onerror = function(d) {
        if (typeof c === 'function') {
            c(b, false);
        }
    };
    document.getElementsByTagName('head')[0].appendChild(a);
};
PDC._load_analyzer = function() {
    if (PDC._is_sample() == false) {
        return;
    }
    PDC._analyzer.loaded = true;
    PDC._load_js(PDC._analyzer.url, function() {
        var c = PDC._analyzer.callbacks;
        for (var b = 0, a = c.length; b < a; b++) {
            c[b]();
        }
    });
};
PDC.send = function() {
    if (PDC._analyzer.loaded == true) {
        WPO_PDA.send();
    } else {
        PDC._analyzer.callbacks.push(function() {
            WPO_PDA.send();
        });
    }
};
PDC._is_sample = function() {
    var e = false,
        d = this._opt.sample,
        b = 0;
    if (window.performance && window.performance.timing) {
        d = d * 5;
    }
    var c = new Date().getHours();
    if (c > 1 && c < 8) {
        d = d * 5;
    }
    d = d > 0.9 ? 0.9 : d;
    d = d < 0.0001 ? 0.0001 : d;
    var a = document.cookie.match(/BAIDUID=(\w*):/);
    if (a) {
        b = parseInt(a[1].slice(-4), 16);
        b = isNaN(b) ? 0 : b;
    }
    if (d <= 0.5) {
        e = (b % (parseInt(1 / d)) == 1);
    } else {
        e = (b % (parseInt(1 / (1 - d))) != 1);
    }
    return e;
};
(function() {
    if (document.attachEvent) {
        window.attachEvent('onload', function() {
            PDC.mark('lt');
        }, false);
    } else {
        window.addEventListener('load', function() {
            PDC.mark('let');
            PDC._load_analyzer();
        });
    }
})();









/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
