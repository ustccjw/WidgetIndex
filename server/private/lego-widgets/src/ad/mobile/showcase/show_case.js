/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: show_case.js 13639 2012-10-31 09:33:49Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/mobile/showcase/show_case.js ~ 2012/08/01 10:59:25
 * @author leeight@gmail.com (leeight)
 * @version $Revision: 13639 $
 * @description
 * show_case相关的实现逻辑
 **/

goog.require('ad.mobile.showcase.config');
goog.require('ad.mobile.showcase.data');
goog.require('ad.mobile.xlab.A');
goog.require('ad.mobile.xlab.B');
goog.require('ad.mobile.xlab.C');

goog.require('ad.mobile.xlab.D');
goog.require('er.ListAction');
goog.require('ui.RichTextInput');
goog.require('ui.pref.WidgetPreference');

goog.include('css/ui-layouteditor.less');
goog.include('css/ui-mateditor.css');

goog.include('ad/mobile/showcase/module.less');
goog.include('ad/mobile/showcase/show_case.less');
goog.include('ad/mobile/showcase/show_case.html');

goog.provide('ad.mobile.showcase.ShowCase');

/**
 * @constructor
 * @extends {er.ListAction}
 */
ad.mobile.showcase.ShowCase = function() {
    er.ListAction.call(this);

    /**
     * 当前Action的View模板名称.
     * @type {string}
     */
    this.view = 'MAIN_PAGE_ad_mobile_showcase_show_case';

    /**
     * 模块的配置信息
     * @type {ui.pref.WidgetPreference}
     */
    this._wp;
};
baidu.inherits(ad.mobile.showcase.ShowCase, er.ListAction);

/** @inheritDoc */
ad.mobile.showcase.ShowCase.prototype.initModel = function(argMap, callback) {
    // CODE HERE.

    callback();
};

/** @inheritDoc */
ad.mobile.showcase.ShowCase.prototype.afterInit = function(page) {
    // CODE HERE.
};

/** @inheritDoc */
ad.mobile.showcase.ShowCase.prototype.enterDocumentInternal = function() {
    // CODE HERE.
    var forms = this.page.getChild('forms');

    function URL(name, displayName, opt_defaultValue) {
        return {
            'name': name,
            'displayName': displayName,
            'defaultValue': (opt_defaultValue || 'http://'),
            'datatype': 'STRING',
            'rules': {
                'required': true,
                'stringType': 'URL'
            },
            'extraAttr': {},
            'items': []
        };
    }

    function STRING(name, displayName, opt_defaultValue) {
        return {
            'name': name,
            'displayName': displayName,
            'defaultValue': opt_defaultValue || '请输入文本',
            'datatype': 'STRING',
            'rules': {
                'required': true
            },
            'extraAttr': {},
            'items': []
        };
    }

    var userPrefs = [
        {
            "name" : "options",
            "displayName" : "选项",
            "datatype" : "combined",
            "items" : [
                URL('url', '地址', 'http://www.baidu.com'),
                STRING('txt', '内容', 'hello')
            ]
        }
    ];

    /*
    var userPrefs = [
        URL('logo_image_276x44', '276x44图片', 'http://placehold.it/276x44'),
        URL('logo_image_202x28', '202x28图片', 'http://placehold.it/202x28'),
        {
            'name': 'title_text',
            'displayName': '标题',
            'defaultValue': '',
            'datatype': 'HTML',
            'richeditor': true,
            'multiline': false,
            'tip': '填写24字节(12个汉字)以内',
            'rules': {
                'required' : true,
                'minTextByteLength': 10,
                'maxTextByteLength': 30,
                'tagList': {
                    'em': {
                        'maxTextByteLength': 12,
                        'minCount': 1,
                        'maxCount': 1
                    }
                }
            },
            'extraAttr': {
                'editor_config': {
                    'tools': ['emphasize']
                }
            },
            'items': []
        },
        URL('title_url', '标题URL', 'http://www.olay.com.cn'),
        {
            'name': 'description',
            'displayName': '描述',
            'defaultValue': 'OLAY玉兰油，作为最早进入中国市场的国际著名护肤品牌，一直致力于提高专业全面的高品...',
            'datatype': 'STRING',
            'multiline': true,
            'tip': '共2行，每行最多14个汉字，共28个汉字',
            'rules': {
                'required': true,
                'maxByteLength': 48
            },
            'extraAttr': {},
            'items': []
        },
        URL('description_url', '描述URL', 'http://www.olay.com.cn'),
        URL('official_url', '显示URL', 'www.olay.com.cn'),
        STRING('text_1', '底部文本1', '美白双天后联手代言OLAY阿波罗UV防晒王'),
        URL('link_1', '底部文本1链接', 'http://www.olay.com.cn'),
        STRING('text_2', '底部文本2', 'OLAY姐妹同萌1+1 轻松养出超萌肌'),
        URL('link_2', '底部文本2链接', 'http://www.olay.com.cn')
    ];
    */

    var me = this;
    var oldGetObject = ui.pref.util.getObject;
    ui.pref.util.getObject = function(domId, strClass, opt_mode) {
        if (strClass === 'ui.pref.WidgetPreference') {
            return me._wp;
        } else {
            return oldGetObject(domId, strClass, opt_mode);
        }
    }

    var a, b, c, d;

    a = new ad.mobile.xlab.A(null);
    a.setRoot(baidu.g('a'));

    b = new ad.mobile.xlab.B(null);
    b.setRoot(baidu.g('b'));

    c = new ad.mobile.xlab.C(null);
    c.setRoot(baidu.g('c'));

    d = new ad.mobile.xlab.D(null);
    d.setRoot(baidu.g('d'));

    this._wp = new ui.pref.WidgetPreference(userPrefs, 'mobile', forms.getId('foo'));
    forms.getRoot().innerHTML = this._wp.toForm();
    this._wp.bindEvent();

    this._wp.addListener(ui.events.FORM_CHANGE, function() {
        var config = me._wp.getValue();
        // console.log(config);

        a.setData(config);
        a.render();

        b.setData(config);
        b.render();

        c.setData(config);
        c.render();

        d.setData(config);
        d.render();
    });

    baidu.on(window, 'scroll', function() {
        var pos = baidu.dom.getPosition(baidu.g('span7')),
            scrollTop = baidu.page.getScrollTop();
        if (scrollTop > pos.top) {
            baidu.g('preview').style.position = 'fixed';
            baidu.g('preview').style.top = '5px';
        } else {
            baidu.g('preview').style.position = 'static';
        }
        // console.log('a = ' + pos.top + ', b = ' + scrollTop);
    });

    baidu.on('btn', 'click', function() {
        baidu.dom.toggle('code');

        var ah = a.getMainHtml();
        var bh = b.getMainHtml();
        var ch = c.getMainHtml();
        var dh = d.getMainHtml();

        baidu.g('html-code').value = [
          '<!-- 智能机 -->', ah,,,
          '<!-- 触屏 -->', bh,,,
          '<!-- 炫彩 -->', ch,,,
          '<!-- 极简 -->', dh
        ].join('\n');
    });
};




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
