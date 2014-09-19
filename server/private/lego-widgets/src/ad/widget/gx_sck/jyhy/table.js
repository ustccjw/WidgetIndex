/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/gx_sck/jyhy/table.js ~ 2014/04/02 17:00:34
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * table相关的实现逻辑
 **/

goog.require('ad.env');
goog.require('ad.base');
goog.require('ad.widget.Widget');

goog.include('ad/widget/gx_sck/jyhy/table.less');
goog.include('ad/widget/gx_sck/jyhy/table.html');

goog.provide('ad.widget.gx_sck.jyhy.Table');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 * @export
 */
ad.widget.gx_sck.jyhy.Table = function(data) {
    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_gx_sck_jyhy_table';

    /**
     * 阿拉丁scrollbar.
     * @type {opui_scroll_scrollbarv}
     */
    this._scrollbar = null;

    /**
     * bds.ready事件触发标志.
     * @type {boolean}
     */
    this._isBDSReady = false;

    ad.widget.Widget.call(this, data);
};
baidu.inherits(ad.widget.gx_sck.jyhy.Table, ad.widget.Widget);


/** @override */
ad.widget.gx_sck.jyhy.Table.prototype.patchData = function() {
    if (this._data) {
        // 处理数据结构
        var selectedTableType = (function(tables) {
            for (var i in tables) {
                return i;
            }
        })(this._data['tables']);
        this._data['table'] = this._data['tables'][selectedTableType];
        var consult = this._data['table']['consult_rcv_url'];
        this._data['table']['body'] = (function (rows) {
            var body = [];
            var row;
            var cells;

            for (var i = 0; i < rows.length; ++i) {
                cells = rows[i];
                row = [];
                for (var j in cells) {
                    //将公共的咨询链接填充到各类型表格每行的咨询链接中
                    if (cells[j]['class'] === 'consult') {
                        cells[j]['name_rcv_url'] = consult;
                    }
                    // 生成地图图标链接地址
                    if (selectedTableType === 'campus' 
                        && cells[j]['class'] === 'intro') {
                        cells[j]['poi_url'] =
                            'http://api.map.baidu.com/geocoder?address='
                            + encodeURIComponent(cells[j]['name'])
                            + '&output=html';
                    }

                    row.push(cells[j]);
                }
                body.push(row);
            }
            return body;
        })(this._data['table']['body']);

        this._data['is_ipad'] = ad.env.isIpad;
        var rows = this.getData('table.body');
        if (rows && rows.length) {
            //设置表格高度
            var height = this._getTableHeight(rows.length);
            this._data['list_height'] = height;
            if (height !== 'auto') {
                this._data['list_container_height'] 
                    = (parseInt(height, 10) - 1) + 'px';
            } else {
                this._data['list_container_height'] = height;
            }
        }

        if (this._data['ps_select']) {
            var title = (this._data['ps_select']['title']) ? this._data['ps_select']['title'] : this._data['title'];
            title = title.replace(/<em>|<\/em>/g, '');
            var url = (this._data['ps_select']['site']) ? this._data['ps_select']['site'] : this._data['site'];
            url = /^https?:\/\//.test(url) ? url : 'http://' + url;
            var data = {
                // title中会包含&quot;等字符，需要decode
                'title': baidu.decodeHTML(title),
                'url': url
            };
            this._data['ps_select']['data'] = baidu.json.stringify(data);
        }

        //v标
        if (this._data.hasOwnProperty('sign')) {
            this._data['ps_vsign'] = true;
        }
    }
};



/** @override */
ad.widget.gx_sck.jyhy.Table.prototype.enterDocument = function() {
    ad.widget.gx_sck.jyhy.Table.superClass.enterDocument.call(this);

    this._row = baidu.g(this.getId('row'));
    this._list = baidu.g(this.getId('list'));
    this._listContainer = baidu.g(this.getId('list-container'));

    var height = this.getData('list_height');
    if (height !== 'auto') {
        baidu.dom.setStyle(this._list, 'height', height);
    }

    this._setScrollBar();
};


/** @override */
ad.widget.gx_sck.jyhy.Table.prototype.bindEvent = function() {
    ad.widget.gx_sck.jyhy.Table.superClass.bindEvent.call(this);

    var me = this;

    //处理bds.ready
    var bdsReady = ad.base.getObjectByName('bds.ready');
    if (typeof bdsReady === 'function') {
        bdsReady(function() {
            me._isBDSReady = true;
            //初始化阿拉丁滚动条
            me._setScrollBar();

        });
    }

    //v标
    if (this._data['ps_vsign']) {
        var bdsReady = ad.base.getObjectByName('bds.ready');
        if ('function' === typeof bdsReady) {
            bdsReady(function() {
                //创建dom
                var trustDom = baidu.g(me.getId('c-trust'));
                trustDom.innerHTML = '<span class="c-trust" data_key="' + me._data['sign'] + '"></span>';
                var trustObj = ad.base.getObjectByName('bds.se.trust');
                if(trustObj && 'function' === typeof trustObj['init']) {
                    trustObj['init']();
                }
            });
        }
    }
};




/** 
 * 初始化阿拉丁滚动条
 */
ad.widget.gx_sck.jyhy.Table.prototype._setScrollBar = function() {
    if (this._scrollbar) {
        return;
    }
    var me = this;
    //在投放和具有大搜环境的调试环境使用大搜的阿拉丁滚动条
    if (typeof(A) !== 'undefined' && A.use) {
        A.use('baidu', function() {
            A.use('scrollbarv', function() {
                if (me._scrollbar) {
                    return;
                }
                me._scrollbar = A.ui.scrollbarv({
                    'content': me._list
                });
            });
        });
    } else {
        baidu.page.loadCssFile(RT_CONFIG.HOST('ecma.bdimg.com') + '/adtest/f21d6f3e168c1f1b3b45e4ff5012d7fc.css');
        baidu.sio.callByBrowser(RT_CONFIG.HOST('ecma.bdimg.com') + '/adtest/b2416b37b50a0ed76302f26fe313b45c.js', function() {
            if (me._scrollbar) {
                return;
            }
            me._scrollbar = A.ui.scrollbarv({
                'content': me._list
            });
        });
    }
};


/** 
 * 根据个数计算表格的高度以实现自适应
 * @param {number} count 个数
 */
ad.widget.gx_sck.jyhy.Table.prototype._getTableHeight = function(count) {
    if (count > 4) {
        return '132px';
    } else {
        return 'auto';
    }
};






/* vim: set ts=4 sw=4 sts=4 tw=100 : */
