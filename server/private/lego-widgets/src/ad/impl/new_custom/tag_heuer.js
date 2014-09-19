/**
 * @author chenjiawei01@baidu.com
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.Image');
goog.require('ad.widget.Video');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.MultiVideoThunbnail');
goog.require('ad.widget.Flash');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.lv.List');
goog.require('ad.widget.DependencySelect');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.SinaWeibo');

goog.include('ad/impl/new_custom/tag_heuer.less');

goog.provide('ad.impl.new_custom.Tag_heuer');


ad.Debug(function(async) {
    var list;
    var select;
    var listIndex = -1;
    var weiboIndex = -1;
    var selectDefault;

    function createWidget(cfg, index) {
        var widgetConfig = cfg['tab_content'];
        if ('image_cartoon' in widgetConfig) {
            return new ad.widget.ImageCartoon(widgetConfig['image_cartoon']);
        } else if ('form' in widgetConfig) {
            if (!widgetConfig['form']['dependency']) {
                widgetConfig['form']['dependency'] = [{
                    'name': 'city',
                    'title': '城&nbsp;&nbsp;&nbsp;&nbsp;市',
                    'default': '上海'
                }, {
                    'name': 'store',
                    'title': '专卖店'
                }];
            }
            selectDefault = widgetConfig['form']['dependency'][0]['default'];
            select = new ad.widget.DependencySelect(widgetConfig['form']);
            list = new ad.widget.lv.List({
                'title_left': widgetConfig['form']['head_text'],
                'title_left_rcv_url': widgetConfig['form']['head_text_rcv_url']
            });
            var nc = new ad.widget.NormalContainer({});
            nc.setWidgets([list, select]);
            listIndex = index;
            return nc;
        } else if ('weibo' in widgetConfig) {
            var weibo = new ad.widget.SinaWeibo(widgetConfig['weibo']['weibo']);
            var weixin = new ad.widget.SmallHead(widgetConfig['weibo']['weixin']);
            var nc = new ad.widget.NormalContainer({});
            nc.setWidgets([weibo, weixin]);
            weiboIndex = index;
            return nc;
        }
    }
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var video = new ad.widget.Video(AD_CONFIG['video']);
    var imgs = new ad.widget.MultiVideoThunbnail(AD_CONFIG['products']);

    var flashFwcArr = [];
    var flashFwcRendered = [];
    var flashOptions = AD_CONFIG['products']['options'];
    for (var j = 0; j < flashOptions.length; j++) {
        var flashFwcConf = AD_CONFIG['flash_fwc'];
        flashFwcConf['float_bg'] = {};
        flashFwcConf['float_bg']['src'] = flashOptions[j]['flash']['ipad_img'];
        flashFwcConf['float_bg']['rcv_url'] = flashOptions[j]['flash']['link_rcv_url'];
        flashFwcConf['material_name'] = 'ec-tag-heuer-flash';
        flashFwcConf['id'] = j + 2;
        var flashFwc = new ad.widget.FloatWindowContainer(flashFwcConf);
        flashFwc.setWidgets([new ad.widget.Flash(flashOptions[j]['flash'])]);
        flashFwcArr.push(flashFwc);
        flashFwcRendered.push(false);
    }

    var tabOptions = AD_CONFIG['tab']['options'];
    var tabBodies = [];
    for (var i = 0; i < tabOptions.length; i++) {
        tabBodies.push(createWidget(tabOptions[i], i));
    }
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    /**
     * @param {number} index
     * @return {string}
     */
    tab.getTabClassName = function(index) {
        var className = 'ec-tab-content-' + index;
        if (index === listIndex) {
            className += ' ec-tab-content-form';
        } else if (index === weiboIndex) {
            className += ' ec-tab-content-weibo'
        } else {
            className += ' ec-tab-content-image-cartoon';
        }
        return className;
    }
    tab.setWidgets(tabBodies);


    var widgets = [
        [title],
        [video, smallHead, imgs],
        [tab],
        flashFwcArr
    ];
    material.setWidgets(widgets);
    if (async === true) {
        return material;
    }
    material.show();
    //material.initMonitor(AD_CONFIG['main_url']);
    //material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

    tab.addListener(ui.events.TAB_CHANGE, function(index) {
        if(weiboIndex !== -1 &&　index === weiboIndex) {
            var title2 = 'TAB' + (index + 1) + '微博右侧图片';
            this.rewriteTitle2(baidu.dom.q('ec-logo')[0], title2, true);
            title2 = 'TAB' + (index + 1) + '微博右侧图片描述';
            this.rewriteTitle2(baidu.dom.q('ec-description')[1], title2, true);
            weiboIndex = -1;
        }
    });


    imgs.addListener(ui.events.CLICK, function(index) {
        showFlashFWC(index);
        imgs.sendLog('img' + (index + 1) + 'floatopen');
    });
    baidu.each(flashFwcArr, function(item, index) {
        item.addListener(ui.events.CLOSE, function() {
            imgs.resetCurrentIndex();
            hideFWC();
        });
    });
    if (select) {
        select.addListener(ui.events.CHANGE, function(city, shop, depth) {
            var detail;
            var sel = select.getEleByName('city');
            if (depth == 0) {
                detail = shop[0];
            } else {
                var sIndex = city[1]['selectedIndex'];
                detail = shop[sIndex]['children'][0];
            }
            detail['enable_bmap'] = false;
            detail['img_src'] = RT_CONFIG.HOST('ecma.bdimg.com') + '/adtest/e95d4b929e1cb6938751645176a62178.jpg';
            detail['title_left'] = list.getData('title_left', detail['title_left']);
            detail['title_left_rcv_url'] = list.getData('title_left_rcv_url', detail['title_left_rcv_url'])
            list.refresh(null, detail);
            list.rewriteTitle2(null, detail['title_right'] + ' ', false);
        });

        // select初始化完毕了.
        select.addListener(ui.events.LOAD, function() {
            var defaultCity = selectDefault || '上海';
            select.initByVal(defaultCity);
        });
    }
    var fwcRenderd = false;
    /**
     * 显示对应的Flash浮层
     * @param {number} index 索引.
     */
    function showFlashFWC(index) {
        if (!flashFwcArr[index]) {
            return;
        }
        hideFWC();
        flashFwcArr[index].show();
        if (!flashFwcRendered[index]) {
            var canvas = baidu.dom.first(flashFwcArr[index].getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                //material.getCMS().init(canvas.id);
                flashFwcRendered[index] = true;
            }
        }
    }

    /**
     * 隐藏所有浮层
     */
    function hideFWC() {
        if (flashFwcArr) {
            baidu.each(flashFwcArr, function(item, index) {
                item.hide();
            });
        }
    }
    return material;
});
