/**
 * @author chenjiawei01@baidu.com
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ButtonList');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.standard.TabCont');
goog.require('ad.widget.Image');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/new_custom/weibao.less');
goog.provide('ad.impl.new_custom.Weibao');


ad.Debug(function(async) {

    var tabContIndex = [];
    var imageCartoonIndex = [];
    var newtabContIndex = [];
    var imageIndex = [];

    // 创建tab子组件
    function createWidget(cfg, index) {
        var widgetConfig = cfg['tab_content'];
        if ('tabCont' in widgetConfig) {
            tabContIndex.push(index);
            return new ad.widget.TabCont(widgetConfig['tabCont']);
        } 
        else if ('imageCartoon' in widgetConfig) {
            imageCartoonIndex.push(index);
            return new ad.widget.ImageCartoon(widgetConfig['imageCartoon']);
        } 
        else if ('newtabCont' in widgetConfig) {
            newtabContIndex .push(index);
            return new ad.widget.standard.TabCont(widgetConfig['newtabCont']);
        } 
        else if ('image' in widgetConfig) {
            imageIndex.push(index);
            return new ad.widget.Image(widgetConfig['image']);
        }
    }

    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var video = new ad.widget.Video(AD_CONFIG['video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['smallHead']);
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['buttonGroup']);

    // 创建按钮列表
    var buttonList = []
    var btnList1 = null;
    var btnList2 = null;
    var btnOptions = AD_CONFIG['buttonList']['options'];
    var btnWidth = AD_CONFIG['buttonList']['button_width'];
    if (btnOptions.length >= 4) {

        // 有两行
        btnList1 = new ad.widget.ButtonList({
            'button_width': btnWidth,
            'options': btnOptions.splice(0, 3)
        });
        btnList2 = new ad.widget.ButtonList({
            'button_width': btnWidth,
            'options': btnOptions
        });

        buttonList.push(btnList1);
        buttonList.push(btnList2);
    }
    else {
        // 只有一行
        btnList1 = new ad.widget.ButtonList({
            'options': btnOptions
        });
        buttonList.push(btnList1);
    }

    // tab
    var tabOptions = AD_CONFIG['tab']['options'];
    var tabBodies = [];
    for (var i = 0; i < tabOptions.length; i++) {
        tabBodies.push(createWidget(tabOptions[i], i));
    }
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tab.getTabClassName = function(index) {
        var className = 'ec-tab-content-' + index;
        return className;
    }
    tab.setWidgets(tabBodies);

   

    var widgets = [
        [title],
        [video, [smallHead, buttonList]],
        [tab],
        [buttonGroup]
    ];
    material.setWidgets(widgets);

    if (async === true) {
        return material;
    }
    material.show();

     // 列表小于3时列表不浮动
    tab.addListener(ui.events.TAB_CHANGE, function(index) {
        if (baidu.array.contains(newtabContIndex, index)) {
            var parent = baidu.dom.q('ad-widget-standard-tab-cont')[0];
            var elements = parent.getElementsByTagName('li');
            if (elements.length < 3) {
                baidu.array.every(elements, function(element, index) {
                    baidu.dom.setStyle(element, 'float', 'none');
                    return true;
                });
            }
            baidu.array.remove(newtabContIndex, index);
        }
    });

    if(baidu.dom.q('ad-block-0-1-1-1-1').length) {

        // button-list 第二行的元素
        var parent = baidu.dom.q('ad-block-0-1-1-1-1')[0];
        var elements = parent.getElementsByTagName('td');
        var len = 0;
        if (len = 3 - elements.length) {
            if(len < 3){
                // 第二行有元素且不足3个时，补充空的单元格占位
                while (len--) {
                    var newNode = elements[0].parentNode.appendChild(document.createElement("td"));
                    if(len == 0) {
                        baidu.dom.addClass(newNode, 'ec-last');
                    }
                }
            }
        }
    }

    // rewrite button-list title2
    btnList1.rewriteTitle2(null, '第一行', false);
    if (btnList2) {
        btnList2.rewriteTitle2(null, '第二行', false)
    }

    return material;
});