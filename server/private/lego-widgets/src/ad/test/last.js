/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: last.js 12776 2012-10-15 03:08:37Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/test/last.js ~ 2012/09/04 17:15:36
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 12776 $
 * @description
 *
 **/
goog.require('ad.test.Canvas');
goog.require('ad.test.Widget');
goog.require('ad.test.WidgetCollection');
goog.require('ad.test.coord');
goog.require('ad.test.getNote');
goog.require('ad.test.lang');
goog.require('ad.test.marker');
goog.require('ad.test.style');
goog.require('ad.test.wp');
goog.require('ui.events');

goog.provide('ad.test.last');

/**
 * @param {Array.<Object>=} opt_widgets the ad style widget list responsed from the server.
 */
ad.test.last = function(opt_widgets) {
    var canvas = new ad.test.Canvas();
    if (!opt_widgets) {
        canvas.addWidget(new ad.test.Widget('Video', 'width:100px;height:100px;top:0;left:0;background:#369;'));
        canvas.addWidget(new ad.test.Widget('Slider', 'width:100px;height:200px;top:100px;left:130px;background:red;'));
        canvas.addWidget(new ad.test.Widget('H1', 'width:200px;height:100px;top:340px;left:10px;background:green;'));
        canvas.addWidget(new ad.test.Widget('Flash', 'width:200px;height:200px;top:250px;left:250px;background:silver;'));
        canvas.addWidget(new ad.test.Widget('SmallWeibo', 'width:150px;height:150px;top:280px;left:280px;top:80px;background:#c3d9ff'));
    } else {
        for (var i = 0, widget; widget = opt_widgets[i]; i++) {
            var style = 'width:' + widget['width'] + 'px;height:' + widget['height'] + 'px;left:' +
                widget['left'] + 'px;top:' + widget['top'] + 'px;';
            canvas.addWidget(new ad.test.Widget(widget['name'], style, widget['ns']));
        }
    }

    canvas.addListener(ui.events.FOCUS, function(evt) {
        if (evt.target instanceof ad.test.Widget) {
            // 展示配置信息.
            var widget = evt.target;
            ad.test.wp.loadWidget(widget.getNS());
            ad.test.style.loadWidget(widget.getNS(), function(styles) {
                widget.refreshStyles(styles);
            });
        }
    });

    canvas.addListener(ui.events.DRAG_START, function(evt) {
        var target = evt.payload[0];
        ad.test.coord.refresh(target.getRoot());
    });

    canvas.addListener(ui.events.DRAG, function(evt) {
        var target = evt.payload[0];
        var root = target.getRoot();

        var x1 = parseInt(root.style.left, 10);
        var y1 = parseInt(root.style.top, 10);
        var x2 = x1 + root.offsetWidth;
        var y2 = y1 + root.offsetHeight;

        var cache = ad.test.coord.match(x1, y1, x2, y2);
        if (cache !== false) {
            ad.test.marker.show(cache.x, cache.y);
        } else {
            ad.test.marker.hide();
        }
    });

    canvas.addListener(ui.events.DRAG_END, function(evt) {
        var target = evt.payload[0];
        ad.test.marker.hide();
        ad.test.Widget.snap(target.getRoot());
    });

    canvas.enableDroppable();
    canvas.enableResizable();
    canvas.bindStyleSelect();


    var collection = new ad.test.WidgetCollection();
    collection.show();

    if (baidu.g('btn-layout')) {
        baidu.on(baidu.g('btn-layout'), 'click', function(e) {
            canvas.genLayout();
        });
    }

    if (baidu.g('btn-check')) {
        baidu.on(baidu.g('btn-check'), 'click', function(e) {
            if (canvas.check(canvas.getStyleByLayuout())) {
                alert('没用重叠，验证通过');
            } else {
                alert('模块有重叠，验证不通过');
            }
        });
    }

    if (baidu.g('btn-save')) {
        baidu.on(baidu.g('btn-save'), 'click', function(e) {
            var styleName = baidu.g('txt-stylename').value;
            if (styleName) {
                var style = canvas.getStyleByLayuout();
                //styles.push({'name':styleName,'style':style});
                canvas.addStyle({'name': styleName, 'style': style});
                alert('样式保存成功！');
                baidu.g('txt-stylename').value = '';
                canvas.bindStyleSelect();
            }
            else {
                alert('请输入样式名称！');
            }
        });
    }

    if (baidu.g('btn-load')) {
        baidu.on(baidu.g('btn-load'), 'click', function(e) {
            canvas.clear();
            canvas.loadStyle(baidu.g('sel-style').value);
            collection.show();
        });
    }

    if (baidu.g('btn-widget-property-reflash')) {
        baidu.on(baidu.g('btn-widget-property-reflash'), 'click', function(e) {
            canvas.setWidgetPropertyForRender();
            canvas._curWidget.showPreview();
        });
    }

    // THE FOLLOWING CODES SHOULD ONLY WORK UNDER codereview.bae.baidu.com ENV.
    ad.test.last.baeEnvPatch(canvas);
};

/**
 * validate and submit
 * @param {ad.test.Canvas} canvas
 */
ad.test.last.baeEnvPatch = function(canvas) {
    if (location.pathname.indexOf('/ad_style/') === -1) {
        var message = ad.test.getNote();
        document.title = message;
        baidu.g('note').innerHTML = message;
    }

    $('#goto-step3').click(function() {
        ad.test.last.gotoStep3(canvas);
        return false;
    });
};

/**
 * validate and submit
 * @param {ad.test.Canvas} canvas
 */
ad.test.last.gotoStep3 = function(canvas) {
    if (!canvas.check(canvas.getStyleByLayout())) {
        alert('模块有重叠，验证不通过');
        return;
    }

    var widgets = canvas.getAllWidgets();
    var data = [];
    for (var i = 0, w, root; w = widgets[i]; i++) {
        root = w.getRoot();
        data.push({
            'name' : w.getName(),
            'ns' : w.getNS(),
            'width' : root.offsetWidth,
            'height' : root.offsetHeight,
            'top' : parseInt(root.style.top, 10) || 0,
            'left' : parseInt(root.style.left, 10) || 0,
            'z_index' : root.style.zIndex
        });
    }

    $.post(document.location.href, {'widgets': data}, function(res) {
        if (res['success'] === true &&
            res['count'] === widgets.length) {
            window.location.href = 'step3' + location.search;
        } else {
            alert('SAVE FAILED.');
        }
    });
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */
