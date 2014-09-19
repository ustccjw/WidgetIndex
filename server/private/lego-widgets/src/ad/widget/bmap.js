/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/bmap.js ~ 2012/09/11 18:39:39
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 10927 $
 * @description
 * bmap相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/bmap.less');
goog.include('ad/widget/bmap.html');

goog.provide('ad.widget.Bmap');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Bmap = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_bmap';

    /**
     * 当前地图实例.
     * @type {BMap.Map}
     */
    this.map;
    /**
     * 最后一次调用search的时候传递的参数
     * @type {string|BMap.Map}
     */
    this._lastCity;

    /**
     * 最后一次调用search的时候传递的参数
     * @type {string}
     */
    this._lastAddress;

    /**
     * @private
     * @type {number}
     */
    this._timer;
    /**
     * @private
     * 脚本加载index
     * @type {number}
     */
    this._loadIndex;
    /**
     * @private
     * 要加载的地图开源库数组
     * @type {Array}
     */
    this._scripts;
    /**
     * @private
     * 标注聚合数组
     * @type {Array}
     */
    this._markersArr = [];
    /**
     * @private
     * 标记聚合器数组
     * @type {Array}
     */
    this._markerClusterers = [];
};
baidu.inherits(ad.widget.Bmap, ad.widget.Widget);

/**
 * @param {string} url js文件地址.
 * @param {string=} parm_name 注册回调的参数名.
 * @param {Function=} callback 回调函数.
 * #export
 */
ad.widget.Bmap.prototype.loadScriptAutoCallback = function(url, parm_name, callback) {
    var me = this;
    if(!url){
        return;
    }
    if(!parm_name) {
        parm_name = 'callback';
    }
    var random_string = 'fun' + ad.base.uuid();
    var scr = document.createElement('SCRIPT');
    var func_name = me.getId(random_string).replace(/[^a-zA-Z]/g, '');
    if(url.lastIndexOf('?') < 0){
        url = url + '?' + parm_name + '=' + func_name;
    }else if(url.lastIndexOf('?') > 0 && url.lastIndexOf('?') < url.split("").length - 1){
        url = url + '&' + parm_name + '=' + func_name;
    }else {
        url = url + parm_name + '=' + func_name;
    }
    scr.setAttribute('type', 'text/javascript');
    scr.setAttribute('charset', 'utf-8');
    scr.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(scr);
    window[func_name] = function(){
        if(callback && baidu.lang.isFunction(callback)) {
            callback.apply(me);
        }
        window[func_name] = baidu.fn.blank;
    }
};
/** @private */
ad.widget.Bmap.prototype._enterDocument = function() {
    var apiHost = RT_CONFIG.HOST('api.map.baidu.com');
    var me = this;
    baidu.page.loadCssFile(apiHost + '/library/SearchInfoWindow/1.4/src/SearchInfoWindow_min.css');
    me.loadScriptAutoCallback(apiHost + '/api?v=1.4', 'callback', function(){
        me.map = new BMap.Map(me.getId("map-container"));
        me.map.enableScrollWheelZoom();
        me.map.enableKeyboard();
        me.map.enableInertialDragging();
        me.map.enableContinuousZoom();
        me.map.addControl(new BMap.NavigationControl());
        me.map.addControl(new BMap.ScaleControl());
        me.map.addControl(new BMap.OverviewMapControl());
        //me.map.addControl(new BMap.MapTypeControl());
        me._loadIndex = 0;
        //百度地图API二次开发的开源的代码库
        me._scripts = [
            apiHost + '/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js',
            apiHost + '/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js',
            apiHost + '/library/SearchInfoWindow/1.4/src/SearchInfoWindow_min.js'
        ];
        function scriptLoadCallback(){
            me._loadIndex++;
            if(me._loadIndex == me._scripts.length){
                ad.base.require(me.getId('datasource-id'), me._data['datasource_url'], function(data){
                    me._data['markers'] = data;
                    if (me._lastCity || me._lastAddress) {
                        me.search(me._lastCity, me._lastAddress);
                    } else {
                        me.moveToChina();
                        me.addMarkerandInfoWindow();
                    }
                });
            }
        }
        for(var i = 0; i < me._scripts.length; i++){
            baidu.sio.callByBrowser(me._scripts[i], scriptLoadCallback);
        }
    });
};

/** @override */
ad.widget.Bmap.prototype.enterDocument = function() {
    var me = this;
    ad.widget.Bmap.superClass.enterDocument.call(this);
    if(COMPILED){
        if (document.readyState === 'complete') {
            me._enterDocument();
        } else {
            baidu.on(window, 'load', function(){
                me._enterDocument();
            });
        }
    }else{
        me._enterDocument();
    }
};

/** 
 * 定位全国
 */
ad.widget.Bmap.prototype.moveToChina = function() {
    var me = this;
    if(me.map){
        me.map.centerAndZoom(new BMap.Point(111.482382,31.76551),5); 
    }
};

/** 
 * 地址解析成坐标并在地图上标注
 * @param {string} city 城市名称
 * @param {string} address 地址
 * @param {boolean=} opt_isOpenInfoWindow 标注是否添加信息窗口
 * @param {Object=} opt_data 信息窗口数据
 */
ad.widget.Bmap.prototype.addMarkerByAddress = function(city, address, opt_isOpenInfoWindow, opt_data) {
    var me = this;
    if(!opt_data){
        opt_data = {};
    }
    if(city && address){
        var myGeo = new BMap.Geocoder();  
        myGeo.getPoint(address, function(point){
           if (point) {
               var data_infowindow = baidu.object.extend(opt_data || {}, {'lng':point['lng'],'lat':point['lat']});
               me.addMarkerandInfoWindow([[data_infowindow]], opt_isOpenInfoWindow);
           }
        }, city);
    }else{
        me.addMarkerandInfoWindow([[opt_data]], opt_isOpenInfoWindow);
    }
}

/** 
 * 定位城市
 * @param {string=} opt_city 城市名称
 */
ad.widget.Bmap.prototype.moveToCity = function(opt_city) {
    var me = this;
    var city_name = opt_city || me._data["city_name"];
    if(city_name){
        var myGeo = new BMap.Geocoder();  
        myGeo.getPoint(city_name, function(point){  
           if (point) {
               me.map.centerAndZoom(point, 10);
           }
        }, city_name);
    }else{
        var localCity = new BMap.LocalCity();
        localCity.get(function(result){
            var point = result["center"];
            me.map.centerAndZoom(new BMap.Point(point['lng'], point['lat']), result["level"]);
        });
    }
};
 /**
  * 地图搜索
  * @param {Object|string} cityOrMap 城市（搜索范围）.
  * @param {string} address 搜索地址.
  * @param {Function=} opt_callback 搜索后回调.
  */
ad.widget.Bmap.prototype._searchImpl = function(cityOrMap, address, opt_callback) {
    var me = this;
    var local = new BMap.LocalSearch(cityOrMap, {
        'renderOptions' : {
            'map': me.map,
            'autoViewport': false,
            'selectFirstResult': true
        },
        'onSearchComplete' : function(result) {
            var resultNum = result['getNumPois']();
            if ((resultNum && resultNum > 0)) {
                if(opt_callback && baidu.lang.isFunction(opt_callback)){
                    opt_callback.apply(me, result);
                }
            }
        }
    });
    local.search(address);
};
/**
 * 地图搜索
 * @param {Object|string=} opt_city 城市（搜索范围）
 * @param {string=} opt_place 搜索地址
 */
ad.widget.Bmap.prototype.search = function(opt_city, opt_place) {
    var me = this;

    me._lastCity = opt_city || me._data['city_name'];
    me._lastAddress = opt_place || me._data['address'];
    if(typeof me.map != "undefined"){
        me._searchImpl(me._lastCity, me._lastAddress);
        me.onlyOnce = true;
        if(me.onlyOnce){
            me.onlyOnce = false;
            me.map.addEventListener("zoomend", function(){
                if(me._timer){
                    ad.base.clearTimeout(me._timer);
                }
                me._timer = ad.base.setTimeout(function(){
                    me.search(me.map, me._lastAddress);
                },800);
            });
        }
    }
}
/**
 * 显示标注
 * @param {Array.<number>} index_arr marker manager索引数组
 */
ad.widget.Bmap.prototype.showMarkersByMgr = function(index_arr) {
    var me = this;
    if(index_arr && index_arr.length){
        baidu.array.each(index_arr, function(item, index){
            var i = /** @type {number} */item;
            if(me._markerClusterers[i]){
                me._markerClusterers[i]['clusterer'].addMarkers(me._markerClusterers[i]['markers']);
            }
        });
    }
}

/**
 * 隐藏所有标注
 */
ad.widget.Bmap.prototype.hideAllMarkers = function() {
    var me = this;
    if(me._markerClusterers.length){
        baidu.array.each(me._markerClusterers, function(item, index){
            item['clusterer'].clearMarkers();
        });
    }
}

/**
 * 隐藏某一组标注
 * @param {Array.<number>} index_arr marker manager索引数组
 */
ad.widget.Bmap.prototype.hideMarkersByMgr = function(index_arr) {
    var me = this;
    if(index_arr && index_arr.length){
        baidu.array.each(index_arr, function(item, index){
            var i = /** @type {number} */ item;
            if(me._markerClusterers[i]){
                me._markerClusterers[i]['clusterer'].clearMarkers();
            }
        });
    }
}
/** 
 * 添加标注和信息窗口
 * @param {Array=} opt_mars 标注的相关信息
 * @param {boolean=} opt_isOpenInfoWindow 标注的相关信息
 */
ad.widget.Bmap.prototype.addMarkerandInfoWindow = function(opt_mars, opt_isOpenInfoWindow) {
    var me = this;
    var mark_data = opt_mars || me._data['markers'];
    var isOpenInfoWindow = typeof opt_isOpenInfoWindow === 'undefined' ? true : opt_isOpenInfoWindow;
    var icon;
    if(me._data['icon']){
        var icon_data = me._data['icon'];
        if(icon_data && icon_data['url']){
            var size = new BMap.Size(icon_data['width'], icon_data['height']);
            icon = new BMap.Icon(icon_data['url'], size);
        }
    }
    if(mark_data && mark_data.length){
        baidu.array.each(mark_data,function(item_arr, i){
            var markers_arr = [];
            var mark_items = item_arr;
            var markers = [];
            if(mark_items && mark_items.length){
                baidu.array.each(mark_items, function(item, index){
                    if(item && item['lng'] && item['lat']){
                        var marker;
                        var point = new BMap.Point(item['lng'],item['lat']);
                        if(icon){
                            marker = new BMap.Marker(point, {'icon':icon});
                        }else{
                            marker = new BMap.Marker(point);
                        }
                        if(isOpenInfoWindow) {
                            var content = '<div style="margin:0;line-height:20px;padding:2px;"><img src="' + item['logo'] + '" alt="' + item['title'] + '" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>地址：' + item['address'] + '<br/>电话：' + item['tel'] + '<br/>简介：' + item['info'] + '</div>';
                            //创建检索信息窗口对象
                            var searchInfoWindow = new BMapLib.SearchInfoWindow(me.map, content, {
                                'title'  : item['title'],      //标题
                                'width'  : 290,             //宽度
                                'height' : 105,              //高度
                                'enableAutoPan' : true,     //自动平移
                                'searchTypes'   :[
                                    BMAPLIB_TAB_SEARCH,   //周边检索
                                    BMAPLIB_TAB_TO_HERE,  //到这里去
                                    BMAPLIB_TAB_FROM_HERE //从这里出发
                                ]
                            });
                            marker.addEventListener("click", function(e){
                                searchInfoWindow.open(marker);
                            })
                        }
                        markers_arr.push(marker);
                        markers.push(marker);
                    }
                });
            }
            if(markers_arr.length){
                me._markersArr.push(markers_arr);
            }
            if(markers.length){
                var markerClusterer = new BMapLib.MarkerClusterer(me.map, {'markers':markers})
                me._markerClusterers.push({'clusterer': markerClusterer,'markers': markers});
            }
        });
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
