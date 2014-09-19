/***************************************************************************
 *
 * Copyright (c) 2011 Baidu.com, Inc. All Rights Reserved
 * $Id: after_title.js 9415 2012-05-28 06:53:00Z liyubei $
 *
 **************************************************************************/



/**
 * src/pdc/after_title.js ~ 2011/11/15 11:44:13
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 9415 $
 * @description
 *
 **/
var PDC = {
    _version: '0.1',
    _render_start: new Date().getTime(),
    _analyzer: {
        loaded: false,
        url: 'http://static.tieba.baidu.com/tb/pms/wpo.pda.js?v=0.1',
        callbacks: []
    },
    _opt: {
        is_login: false,
        sample: 0,
        product_id: 0,
        page_id: 0,
        common_resources: [],
        special_resources: []
    },
    _timing: {},
    init: function(a) {
        for (var b in a) {
            this._opt[b] = a[b];
        }
    },
    mark: function(a) {
        this._timing[a] = new Date().getTime();
    },
    render_start_again: function() {
        this._render_start = new Date().getTime();
    },
    view_start: function() {
        this.mark('vt');
    },
    tti: function() {
        this.mark('tti');
    },
    page_ready: function() {
        this.mark('fvt');
    },
    metadata: function() {
        var a = this._opt;
        var b = {
            env: {
                user: (a.is_login == true ? 1 : 0),
                product_id: a.product_id,
                page_id: a.page_id
            },
            common_resources: a.common_resources,
            special_resources: a.special_resources,
            render_start: this._render_start,
            timing: this._timing
        };
        return b;
    }
};
(function() {
    if (document.attachEvent) {
        window.attachEvent('onload', function() {
            PDC.mark('let');
            PDC._load_analyzer();
        });
    } else {
        window.addEventListener('load', function() {
            PDC.mark('lt');
        }, false);
    }
})();









/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
