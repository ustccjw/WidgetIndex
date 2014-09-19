/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/widget/imageplus/link_unit.js
 * desc:    LU 渲染类
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/03 08:50:14$
 */

goog.require('ad.dom');
goog.provide('ad.widget.imageplus.LinkUnit');

/**
 * @constructor
 * @param {Array.<Object>} ads 数据集合.
 * @param {Object} config 配置集合.
 * @param {Object} options 选项集合.
 */
ad.widget.imageplus.LinkUnit = function (ads, config, options) {
    /**
     * 容器
     * @type {HTMLElement}
     */
    this.main;

    /**
     * @type {string}
     */
    this.id;

    /**
     * 广告数据
     * @type {Array.<Object>}
     */
    this.ads = ads;

    /**
     * 配置
     * @type {Object}
     */
    this.config = config;

    /**
     * 选项
     * @type {Object}
     */
    this.options = options;

    /**
     * 所处document
     * @type {Document}
     */
    this.doc = options['doc'] || document;

    /**
     * 所处ShadowRoot
     * @type {Element}
     */
    this.shadowRoot = options['shadowRoot'] || null;

    /**
     * 是否显示顶部Bar，默认显示
     * @type {boolean}
     */
    this.showBar = config['showBar'] !== false;

    /**
     * 顶部Bar的高度
     * @type {number}
     */
    this.barHeight = config['barHeight'] || 25;

    /**
     * 广告位宽
     * @type {number}
     */
    this.totalWidth = config['width']; // 对应 config.rsi0

    /**
     * 广告位高
     * @type {number}
     */
    this.totalHeight = config['height']; // 对应 config.rsi1

    /**
     * LU主体部分宽
     * @type {number}
     */
    this.canvasWidth = config['width'];

    /**
     * LU主体部分高
     * @type {number}
     */
    this.canvasHeight = config['height'] - (this.showBar ? this.barHeight : 0);

    /**
     * 最小单元格高度
     * @type {number}
     */
    this.minUnitHeight = config['minUnitHeight'] || 25;

    /**
     * 最小单元格高度
     * @type {number}
     */
    this.minUnitWidth = config['minUnitWidth'] || 100;

    /**
     * 大格子占总单元格比例
     * @type {number}
     */
    this.largeBlockRatio = config['largeBlockRatio'] || 4/7;

    /**
     * 中格子占总单元格比例
     * @type {number}
     */
    this.middleBlockRatio = config['middleBlockRatio'] || 2/7;

    /**
     * 当前rank
     * @type {number}
     */
    this.currentRank = 0;

    /**
     * 是否显示rank
     * @type {boolean}
     */
    this.showRank = false;

    /**
     * 整个广告背景颜色
     * @type {string}
     */
    this.bgColor = config['bgColor'] || '#000';

    /**
     * 整个广告背景透明度，默认透明度为全透明
     * @type {number}
     */
    this.bgOpacity = config['bgOpacity'] || 0;

    /**
     * 格子的背景颜色配置
     * @type {Array.<string>}
     */
    this.blockBgColor = config['blockBgColor'] || ['#bb4652', '#eb5e35', '#fc9451', '#fff', '#fff', '#fff'];

    /**
     * 格子背景透明度配置
     * @type {Array.<number>}
     */
    this.blockBgOpacity = config['blockBgOpacity'] || [1, 1, 1, 1, 1, 1];

    /**
     * 顶部Bar格子背景颜色
     * @type {Array.<string>}
     */
    this.barBlockBgColor = config['barBlockBgColor'] || ['#000', '#000'];

    /**
     * 顶部Bar格子背景透明度
     * @type {Array.<number>}
     */
    this.barBlockBgOpacity = config['barBlockBgOpacity'] || [0.75, 1];

    /**
     * 顶部Bar格子边框颜色
     * @type {Array.<string>}
     */
    this.barBlockBorderColor = config['barBlockBorderColor'] || ['#fff', '#fff'];

    /**
     * 顶部Bar格子字体颜色
     * @type {Array.<string>}
     */
    this.barFontColor = config['barFontcolor'] || ['#fff', '#fff'];

    /**
     * 顶部Bar格子字体大小
     * @type {number}
     */
    this.barFontSize = config['barFontSize'] || 12;

    /**
     * 格子字体大小
     * 说明：middle block 会有自适应字体的过程，也就是并不一定是20像素
     * @type {Array.<number>}
     */
    this.fontSize = config['fontSize'] || [24, 20, 12];

    /**
     * 格子字体颜色
     * @type {Array.<string>}
     */
    this.fontColor = config['fontColor'] || ['#fff', '#fff', '#fff', '#000', '#000', '#000'];

    /**
     * 格子边框宽度
     * @type {number}
     */
    this.blockBorderWidth = config['borderWidth'] != null ? config['borderWidth'] : 2;

    /**
     * 格子间间隔
     * @type {number}
     */
    this.blockSpace = config['blockSpace'] != null ? config['blockSpace'] : 2;

    /**
     * 格子边框颜色
     * @type {number}
     */
    this.blockBorderColor = config['borderColor'] || ['#bb4652', '#eb5e35', '#fc9451', '#bb4652', '#eb5e35', '#fc9451'];

    /**
     * 是否显示特效
     * @type {boolean}
     */
    this.showEffect = config['showEffect'] != null ? config['showEffect'] : false;

    /**
     * 特效配置
     * @type {Object}
     */
    this.effectConfig = config['effectConfig'] || {
        'types': ['barCarousel'], // 默认类型：轮播
        'barCarouselInterval': 1000 // 轮播间隔
    };

    /**
     * 是否显示箭头标记
     * @type {boolean}
     */
    this.showMark = config['showMark'] === true;

    /**
     * 标记的图片地址
     * @type {Array.<string>}
     */
    this.mark = config['mark'] || ['http://cpro.baidustatic.com/cpro/exp/other/img/TU_LU2.png', 'http://cpro.baidustatic.com/cpro/exp/other/img/TU_LU1.png'];

    /**
     * 标记停靠位置：左或者右
     * @type {string}
     */
    this.markDockTo = config['markDockTo'] || 'right';

    /**
     * 标记宽度
     * @type {number}
     */
    this.markWidth = config['markWidth'] || 22;

    /**
     * 标记高度
     * @type {number}
     */
    this.markHeight = config['markHeight'] || 22;

    /**
     * 标记距离停靠边的距离
     * @type {number}
     */
    this.markOffset = config['markOffset'] || 2;

    /**
     * 标记容器的宽度
     * @type {number}
     */
    this.markWrapperOffset = config['markWrapperOffset'] || 25;

    // XXX: leave it be, need more work
    // oneRowCol: false
    // flag: false
};

/**
 * 获取背景透明css
 * @param {string} color 背景颜色
 * @param {number} opacity 透明度
 * @return {string}
 */
ad.widget.imageplus.LinkUnit.prototype.getOpacityBackground = function(color, opacity) {
    function toRgb(color) {
        color = color.substr(1);
        var vector = [];
        if (color.length == 3) {
            vector = color.split('');
            for (var i = 0; i < vector.length; i++) {
                vector[i] = vector[i] + vector[i];
            }
        }
        else {
            vector = color.match(/\w\w/g);
        }
        return [
            parseInt(vector[0], 16),
            parseInt(vector[1], 16),
            parseInt(vector[2], 16)
        ];
    }
    function padColorPart(hex) {
        hex = hex + '';
        return hex.length == 1 ? '0' + hex : hex;
    }
    function rgba(rgb, opacity) {
        return 'rgba(' + rgb.join(', ') + ', ' + opacity + ')';
    }
    function argb(rgb, opacity) {
        var hexOpacity = parseInt(opacity * 255, 10).toString(16);
        return [
            '#',
            padColorPart(hexOpacity),
            padColorPart(rgb[0].toString(16)),
            padColorPart(rgb[1].toString(16)),
            padColorPart(rgb[2].toString(16))
        ].join('');
    }

    var rgb = toRgb(color);
    var rgbaColor = rgba(rgb, opacity);
    var argbColor = argb(rgb, opacity);
    return [
        'background-color: ' + rgbaColor + ';',
        'filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=' + argbColor + ', endColorstr=' + argbColor + ');',
        '-ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=' + argbColor + ', endColorstr=' + argbColor + ');'
    ].join('')
}

/**
 * 渲染
 * @param {HTMLElement} main 容器元素
 */
ad.widget.imageplus.LinkUnit.prototype.render = function(main) {
    this.main = main;
    this.id = this.main.id || (Math.random() * 9007199254740992).toString(16);
    this.main.id = this.id;

    // 计算行列数
    var dimension = this.calcGridDimension();
    this.rowCount = dimension.rowCount;
    this.colCount = dimension.colCount;
    // 单元格宽，含border和space
    this.blockWidth = Math.floor(this.canvasWidth / this.colCount);
    // 单元格高，含border和space
    this.blockHeight = Math.floor(this.canvasHeight / this.rowCount);
    // 计算大格子数目
    this.largeCount = Math.round(this.rowCount * this.colCount * this.largeBlockRatio / 4);
    // 计算中格子数目
    this.middleCount = Math.round(this.rowCount * this.colCount * this.middleBlockRatio / 2);

    // 只有一列时显示排名信息
    if (this.colCount === 1) {
        this.showRank = true;
    }

    // 开始布局
    this.layout();
};

/**
 * 重新设定尺寸
 * @param {number} width 广告宽度
 */
ad.widget.imageplus.LinkUnit.prototype.resize = function(width, opt_height) {
    this.totalWidth = width;
    this.canvasWidth = width;
    if (opt_height) {
        this.totalHeight = opt_height;
        this.canvasHeight = opt_height - (this.showBar ? this.barHeight : 0);
    }
    if (this.id) {
        var style = this.doc.getElementById(this.getId('style'));
        style.parentNode.removeChild(style);
    }
    this.render(this.main);
};

/**
 * 布局
 * 基本思路：
 *  1. 按大中小顺序填充
 *  2. 对于填充了的单元格从可布局单元格集合中删除
 *  3. 填充时对可布局单元格进行随机填充
 */
ad.widget.imageplus.LinkUnit.prototype.layout = function() {
    var me = this;
    function join(x, y) {
        return x + '-' + y;
    }

    var largeAvailableMap = {};
    var middleAvailableMap = {};
    var smallAvailableMap = {};
    for (var i = 0; i < this.colCount; i++) {
        for (var j = 0; j < this.rowCount; j++) {
            var ij = join(i, j);
            if (j < this.rowCount - 1) {
                middleAvailableMap[ij] = true;
                if (i < this.colCount - 1) {
                    largeAvailableMap[ij] = true;
                }
            }
            smallAvailableMap[ij] = true;
        }
    }

    var keys;
    // 填充大格子
    var largeArranged = [];
    for (var i = 0; i < this.largeCount; i++) {
        // 找出可以放置大格子的
        keys = baidu.object.keys(largeAvailableMap);
        // 没有可以放置的位置
        if (!keys.length) {
            // 那就以中格子填充？
            // this.middleCount += this.largeCount - i;
            break;
        }
        // 随机选择一个
        var picked = keys[parseInt(Math.random() * keys.length, 10)];
        largeArranged.push(picked);
        // 计算三种大小格子各自可放置的位置
        var xy = picked.split('-');
        var x = parseInt(xy[0], 10);
        var y = parseInt(xy[1], 10);
        // 找到大中小三种格子不能再填充的位置(记格子左上角位置)
        var largeForbidden = [
                                              join(x, y - 2),
                           join(x- 1, y - 1), join(x, y - 1), join(x + 1, y - 1),
            join(x- 2, y), join(x- 1, y),     join(x, y),     join(x + 1, y),     join(x + 2, y),
                           join(x- 1, y + 1), join(x, y + 1), join(x + 1, y + 1),
                                              join(x, y + 2)
        ];
        var middleForbidden = [
            join(x, y - 1), join(x + 1, y - 1),
            join(x, y),     join(x + 1, y),
            join(x, y + 1), join(x + 1, y + 1)
        ];
        var smallForbidden = [
            join(x, y),     join(x + 1, y),
            join(x, y + 1), join(x + 1, y + 1)
        ];
        for (var j = 0; j < largeForbidden.length; j++) {
            delete largeAvailableMap[largeForbidden[j]];
        }
        for (var j = 0; j < middleForbidden.length; j++) {
            delete middleAvailableMap[middleForbidden[j]];
        }
        for (var j = 0; j < smallForbidden.length; j++) {
            delete smallAvailableMap[smallForbidden[j]];
        }
    }
    // 填充中格子
    var middleArranged = [];
    for (var i = 0; i < this.middleCount; i++) {
        // 找出可以放置中格子的
        keys = baidu.object.keys(middleAvailableMap);
        // 没有可以放置的位置
        if (!keys.length) {
            break;
        }
        // 随机选择一个
        var picked = keys[parseInt(Math.random() * keys.length, 10)];
        middleArranged.push(picked);
        // 计算三种大小格子各自可放置的位置
        var xy = picked.split('-');
        var x = parseInt(xy[0], 10);
        var y = parseInt(xy[1], 10);
        // 找到大中小三种格子不能再填充的位置(记格子左上角位置)
        var middleForbidden = [
            join(x, y - 1),
            join(x, y),
            join(x, y + 1)
        ];
        var smallForbidden = [
            join(x, y),
            join(x, y + 1)
        ];
        for (var j = 0; j < middleForbidden.length; j++) {
            delete middleAvailableMap[middleForbidden[j]];
        }
        for (var j = 0; j < smallForbidden.length; j++) {
            delete smallAvailableMap[smallForbidden[j]];
        }
    }
    // 找出可以放置小格子的
    var smallArranged = baidu.object.keys(smallAvailableMap);

    // 绘制单元格
    this.fill(largeArranged, middleArranged, smallArranged);
};

/**
 * 绘制单元格
 * @param {Array.<string>} largeArranged 大格子
 * @param {Array.<string>} middleArranged 中格子
 * @param {Array.<string>} smallArranged 小格子
 */
ad.widget.imageplus.LinkUnit.prototype.fill = function(largeArranged, middleArranged, smallArranged) {
    // 总格子数
    this.visibleAdCount = largeArranged.length + middleArranged.length + smallArranged.length;

    var me = this;
    var index = -1;
    /**
     * 获取广告
     * @return {Object}
     */
    function getAdData() {
        index++;
        return me.ads[index % me.ads.length];
    }

    /**
     * 计算下标
     */
    function getIndexs(key) {
        var xy = key.split('-');

        return {
            x: parseInt(xy[0], 10),
            y: parseInt(xy[1], 10)
        };
    }

    var renderFuncs = [this.getLargeHtml, this.getMiddleHtml, this.getSmallHtml];
    var all = [largeArranged, middleArranged, smallArranged];
    var types = ['large', 'middle', 'small'];
    var bodyHtml = [this.getLogoHtml()];
    var grid = [];
    for (var i = 0; i < this.colCount; i++) {
        grid[i] = [];
        for (var j = 0; j < this.rowCount; j++) {
            grid[i][j] = null;
        }
    }
    for (var i = 0; i < all.length; i++) {
        var arraged = all[i];
        for (var j = 0; j < arraged.length; j++) {
            var idx = getIndexs(arraged[j]);
            var adData = getAdData();
            bodyHtml.push(
                renderFuncs[i].call(
                    this,
                    idx,
                    adData
                )
            );
            grid[idx.x][idx.y] = {
                ad: adData,
                index: idx,
                origin: idx,
                type: types[i]
            };
        }
    }

    // 设置HTML
    this.main.innerHTML = [
        this.showBar ? '<div class="ad-lu-bar" id="' + this.getId('bar') + '">' + this.getBarHtml(grid) + '</div>' : '',
        '<div class="ad-lu-body" id="' + this.getId('body') + '">',
            bodyHtml.join(''),
        '</div>'
    ].join('');

    // 创建style标签
    ad.dom.createStyles(this.getBasicCss(), this.getId('style'), this.main, this.doc);

    // 展示特效
    this.runEffect();
};

/**
 * 生成ID
 * @param {string} opt_part id后缀
 */
ad.widget.imageplus.LinkUnit.prototype.getId = function(opt_part) {
    if (opt_part) {
        return this.id + '-' + opt_part;
    }
    else {
        return this.id;
    }
};

/**
 * 获取LOGO的HTML
 * @return {string}
 */
ad.widget.imageplus.LinkUnit.prototype.getLogoHtml = function() {
    return '<a class="ad-bd-logo" href="http://wangmeng.baidu.com/" '
        + 'title="百度网盟推广" target="_blank" onfocus="this.blur()"></a>';
};

/**
 * 生成顶部Bar的HTML
 *
 * 顶部单元格广告选取基本思路：
 *  1. 以此查看当前列包含的大、中、小三种格子
 *  2. 按大中小优先级选取
 *  3. 选取不到的时候随机选取一个广告
 *
 * @param {Array.<Array>} grid 已布局格子二维数组
 * @return {string}
 */
ad.widget.imageplus.LinkUnit.prototype.getBarHtml = function(grid) {
    var barBlockCount = this.colCount;
    function clone(block, i, j) {
        var obj = baidu.object.clone(block);
        obj.index = {
            x: i,
            y: j
        };
        return obj;
    }
    for (var i = 0; i < grid.length; i++) {
        var col = grid[i];
        for (var j = 0; j < col.length; j++) {
            var block = col[j];
            // 如果是格子左上角，将相关信息填充到该格子相关格子里
            if (block.origin.x == block.index.x
                && block.origin.y == block.index.y
            ) {
                if (block.type == 'large') {
                    grid[i][j + 1] = clone(block, i, j + 1);
                    grid[i + 1][j] = clone(block, i + 1, j);
                    grid[i + 1][j + 1] = clone(block, i + 1, j + 1);
                }
                else if (block.type == 'middle') {
                    grid[i][j + 1] = clone(block, i, j + 1);
                }
            }
        }
    }
    var barAds = [];
    for (var i = 0; i < barBlockCount; i++) {
        var found = {
            'large': [],
            'middle': [],
            'small': []
        };
        for (var j = 0; j < this.rowCount; j++) {
            var block = grid[i][j];
            if (block) {
                found[block.type].push(block);
                var origin = block.origin;
                if (block.type == 'large') {
                    grid[origin.x][origin.y] = null;
                    grid[origin.x][origin.y + 1] = null;
                    grid[origin.x + 1][origin.y] = null;
                    grid[origin.x + 1][origin.y + 1] = null;
                }
                else if (block.type == 'middle') {
                    grid[origin.x][origin.y] = null;
                    grid[origin.x][origin.y + 1] = null;
                }
                else {
                    grid[origin.x][origin.y] = null;
                }
            }
        }
        if (found['large'].length) {
            barAds.push(found['large'][0]);
        }
        else if (found['middle'].length) {
            barAds.push(found['middle'][0]);
        }
        else if (found['small'].length) {
            barAds.push(found['small'][0]);
        }
        else {
            barAds.push({
                ad: this.ads[parseInt(Math.random() * this.visibleAdCount, 10) % this.ads.length]
            });
        }
    }
    var barHtml = [];
    for (var i = 0; i < barAds.length; i++) {
        if (barAds[i]) {
            barHtml.push(this.getBarItemHtml(barAds[i].ad, i));
        }
    }
    return barHtml.join('');
};

/**
 * 计算上方和左方的间距
 * @param {{x: number, y: number}} coordinate 格子左上单元格的坐标
 * @return {{top: string, left: string}}
 */
ad.widget.imageplus.LinkUnit.prototype.getTopLeft = function(coordinate) {
    return {
        top: coordinate.y * this.blockHeight + 'px',
        left: coordinate.x * this.blockWidth + 'px'
    };
};

/**
 * 计算字体大小 (字体大小自适应)
 * @param {number} xUnitCount 格子水平方向上包含的单元格数目
 * @param {number} yUnitCount 格子垂直方向上包含的单元格数目
 * @param {string} title 广告标题
 * @return {number}
 */
ad.widget.imageplus.LinkUnit.prototype.getFontSize = function(xUnitCount, yUnitCount, title) {
    var width = xUnitCount * this.blockWidth - this.blockSpace;
    var height = yUnitCount * this.blockHeight - this.blockSpace;
    var wordCount = Math.ceil(baidu.string.getByteLength(title) / 2);
    return Math.min(
        Math.floor((width - 10 - this.blockSpace) / wordCount),
        height * 0.6,
        24
    );
};

/**
 * 生成大格子HTML
 * @param {{x: number, y: number}} coordinate 格子左上单元格的坐标
 * @return {string}
 */
ad.widget.imageplus.LinkUnit.prototype.getLargeHtml = function(coordinate, data) {
    var topLeft = this.getTopLeft(coordinate);
    var tpl = '<a href="{0}" target="_blank" class="ad-lu-large{3}" style="{1}"><i>{4}{2}</i></a>';
    return baidu.format(
        tpl,
        baidu.string.encodeHTML(data['target_url']),
        [
            'top:' +  topLeft.top + ';',
            'left:' +  topLeft.left + ';',
            (coordinate.x + 1 === this.colCount - 1
                ? 'width: ' + (this.canvasWidth - this.blockWidth * coordinate.x - this.blockBorderWidth * 2) + 'px;'
                : ''
            ),
            (coordinate.y + 1 === this.rowCount - 1
                ? 'height: ' + (this.canvasHeight - this.blockHeight * coordinate.y - this.blockBorderWidth * 2) + 'px;'
                    + 'line-height: ' + (this.canvasHeight - this.blockHeight * coordinate.y - this.blockBorderWidth * 2) + 'px;'
                : ''
            )
        ].join(''),
        baidu.string.encodeHTML(data['title']),
        this.showMark ? ' ad-lu-large-marked' : '',
        this.showMark ? '<span class="ad-lu-mark"><b></b></span>' : ''
    );
};

/**
 * 生成中格子HTML
 * @param {{x: number, y: number}} coordinate 格子左上单元格的坐标
 * @return {string}
 */
ad.widget.imageplus.LinkUnit.prototype.getMiddleHtml = function(coordinate, data) {
    var topLeft = this.getTopLeft(coordinate);
    var tpl = '<a href="{0}" target="_blank" class="ad-lu-middle" style="{1}"><i>{2}</i></a>';
    return baidu.format(
        tpl,
        baidu.string.encodeHTML(data['target_url']),
        [
            'top:' +  topLeft.top + ';',
            'left:' +  topLeft.left + ';',
            'font-size: ' + this.getFontSize(1, 2, data['title']) + 'px;',
            (coordinate.x === this.colCount - 1
                ? 'width: ' + (this.canvasWidth - this.blockWidth * coordinate.x - this.blockBorderWidth * 2) + 'px;'
                : ''
            ),
            (coordinate.y + 1 === this.rowCount - 1
                ? 'height: ' + (this.canvasHeight - this.blockHeight * coordinate.y - this.blockBorderWidth * 2) + 'px;'
                    + 'line-height: ' + (this.canvasHeight - this.blockHeight * coordinate.y - this.blockBorderWidth * 2) + 'px;'
                : ''
            )
        ].join(''),
        baidu.string.encodeHTML(data['title'])
    );
};

/**
 * 生成小格子HTML
 * @param {{x: number, y: number}} coordinate 格子左上单元格的坐标
 * @return {string}
 */
ad.widget.imageplus.LinkUnit.prototype.getSmallHtml = function(coordinate, data) {
    var topLeft = this.getTopLeft(coordinate);
    var tpl = '<a href="{0}" target="_blank" class="ad-lu-small" style="{1}"><i>{2}</i></a>';
    return baidu.format(
        tpl,
        baidu.string.encodeHTML(data['target_url']),
        [
            'top:' +  topLeft.top + ';',
            'left:' +  topLeft.left + ';',
            'font-size: ' + this.getFontSize(1, 1, data['title']) + 'px;',
            (coordinate.x === this.colCount - 1
                ? 'width: ' + (this.canvasWidth - this.blockWidth * coordinate.x - this.blockBorderWidth * 2) + 'px;'
                : ''
            ),
            (coordinate.y === this.rowCount - 1
                ? 'height: ' + (this.canvasHeight - this.blockHeight * coordinate.y - this.blockBorderWidth * 2) + 'px;'
                    + 'line-height: ' + (this.canvasHeight - this.blockHeight * coordinate.y - this.blockBorderWidth * 2) + 'px;'
                : ''
            )
        ].join(''),
        baidu.string.encodeHTML(data['title'])
    );
};

/**
 * 生成顶部Bar的格子的HTML
 * @param {Object} data 广告数据
 * @param {number} index 第几个格子
 * @return {string}
 */
ad.widget.imageplus.LinkUnit.prototype.getBarItemHtml = function(data, index) {
    var topLeft = {
        top: '0',
        left: (index * this.blockWidth) + 'px'
    };
    var tpl = '<a href="{0}" target="_blank" class="ad-lu-bar-item" style="{1}" data-index="{3}"><i>{2}</i></a>';
    return baidu.format(
        tpl,
        baidu.string.encodeHTML(data['target_url']),
        [
            'top:' +  topLeft.top + ';',
            'left:' +  topLeft.left + ';',
            // 'font-size: ' + this.getFontSize(1, 1, data['title']) + 'px;',
            (index === this.colCount - 1
                ? 'width: ' + (this.canvasWidth - this.blockWidth * index - this.blockBorderWidth * 2) + 'px;'
                : ''
            )
        ].join(''),
        baidu.string.encodeHTML(data['title']),
        index
    );
};

/**
 * 计算格子行列数
 * @return {{rowCount: number, colCount: number}}
 */
ad.widget.imageplus.LinkUnit.prototype.calcGridDimension = function() {
    var rowCount = Math.floor(this.canvasHeight / this.minUnitHeight);
    var colCount = Math.floor(this.canvasWidth / this.minUnitWidth);

    function getTotalBlock(rowCount, colCount) {
        var maxLarge = Math.floor(rowCount / 2) * Math.floor(colCount / 2);
        var maxMiddle = Math.floor(rowCount / 2) * colCount;

        var totalUnit = rowCount * colCount;
        // 这里貌似也没啥理由，可能是：
        // 1. 一个原因
        //      1/2 -> 4/8 ~= 4/7
        //      1/4 -> 2/8 ~= 2/7
        // 2. 第二个原因
        //      大格子和大格子之间要有间隔
        var largeCount = Math.floor(maxLarge / 2);
        var middleCount = Math.ceil(maxMiddle / 4);
        var totalBlock = totalUnit - 3*largeCount - 1*middleCount;

        return totalBlock;
    }

    var threshold = 4;
    var lastTotalBlock = null;
    // 广告太少了，有两种解决方案：
    // 1. 减少block数目
    // 2. 将广告重复展现
    // 策略：
    // 先减少block（按列或按行，具体按啥看哪个以相同比例缩减先减到）
    // 逐步减少到少于广告数
    // 如果最后一步发现减少block造成格子减少太多，那么反过来将广告重复展现
    var lastRowCount = null;
    var lastColCount = null;
    while (true) {
        // 检查是否满足条件
        var totalBlock = getTotalBlock(rowCount, colCount);
        if (totalBlock <= this.ads.length) {
            if (lastTotalBlock == null
                || lastColCount == null
                || lastRowCount == null
            ) {
                return {
                    rowCount: rowCount,
                    colCount: colCount
                };
            }
            // 比较之前缺少的广告，和现在缩减之后多出来的广告，权衡一下是选哪个方案
            // 这里的条件是：缺少的较少，所以选择方案2
            else if (lastTotalBlock - this.ads.length < this.ads.length - totalBlock) {
                return {
                    rowCount: lastRowCount,
                    colCount: lastColCount
                };
            }
            else { // 缩减之后多出来的广告较少，选方案1
                return {
                    rowCount: rowCount,
                    colCount: colCount
                };
            }
        }
        // 貌似不可能发生的情况
        if (totalBlock < 1) {
            return {
                rowCount: 1,
                colCount: 1
            };
        }

        // 记录之前的
        lastRowCount = rowCount;
        lastColCount = colCount;
        lastTotalBlock = totalBlock;

        // 开始按行缩减
        var reducedRowCount = rowCount - 1;
        var relatedColCount = Math.floor(this.canvasHeight * reducedRowCount / (this.minUnitHeight * rowCount));
        var totalByRowReduce = getTotalBlock(
            reducedRowCount,
            relatedColCount
        );
        // 开始按列缩减
        var reducedColCount = colCount - 1;
        var relatedRowCount = Math.floor(this.canvasWidth * reducedColCount / (this.minUnitWidth * colCount));
        var totalByColReduce = getTotalBlock(
            relatedRowCount,
            reducedColCount
        );
        // 两种缩减中有满足条件的
        if (totalByRowReduce <= this.ads.length
            || totalByColReduce <= this.ads.length
        ) {
            // 两种都满足的情况下，需要PK一下，取缩减幅度最小的
            if (totalByRowReduce <= this.ads.length
                && totalByColReduce <= this.ads.length
            ) {
                if (totalByRowReduce < totalByColReduce) {
                    colCount = reducedColCount;
                    rowCount = relatedRowCount;
                }
                else {
                    rowCount = reducedRowCount;
                    colCount = relatedColCount;
                }
            }
            else if (totalByRowReduce <= this.ads.length) { // 只有缩减行满足的情况下
                rowCount = reducedRowCount;
                colCount = relatedColCount;
            }
            else { // 只有缩减列满足的情况下
                colCount = reducedColCount;
                rowCount = relatedRowCount;
            }
        }
        else { // 这种情况属于两个单独减少都不行的，那么都减...
            rowCount = reducedRowCount;
            colCount = reducedColCount;
        }
    }
};

/**
 * 展示特效
 */
ad.widget.imageplus.LinkUnit.prototype.runEffect = function() {
    if (!this.showEffect) {
        return;
    }
    var effectConfig = this.effectConfig;
    // 目前只支持轮播额
    var effectMap = {
        'barCarousel': this.showBarCarousel
    };
    var types = effectConfig['types'];
    for (var i = 0; i < types.length; i++) {
        var type = types[i];
        if (effectMap[type]) {
            effectMap[type].call(this, effectConfig);
        }
    }
};

/**
 * 显示轮播特效
 * @param {Object} config 特效配置
 */
ad.widget.imageplus.LinkUnit.prototype.showBarCarousel = function(config) {
    var interval = config['barCarouselInterval'];
    var bar = this.doc.getElementById(this.getId('bar'));
    var blocks = baidu.q('ad-lu-bar-item', bar);
    blocks.sort(function(a, b) {
        var ai = parseInt(baidu.dom.getAttr(a, 'data-index'), 10);
        var bi = parseInt(baidu.dom.getAttr(b, 'data-index'), 10);

        return ai - bi;
    });
    var current = -1;
    function run() {
        try {
            current = (current + 1) % blocks.length;
            var activeItems = baidu.q('ad-lu-bar-item-active', bar);
            for (var i = 0; i < activeItems.length; i++) {
                baidu.dom.removeClass(activeItems[i], 'ad-lu-bar-item-active');
            }
            baidu.dom.addClass(blocks[current], 'ad-lu-bar-item-active');

            ad.base.setTimeout(run, interval);
        }
        catch(e) {}
    }
    ad.base.setTimeout(run, interval);
};

/**
 * 生成CSS代码
 * @return {string}
 */
ad.widget.imageplus.LinkUnit.prototype.getBasicCss = function() {
    var prefix = '#' + this.id + ' ';
    var largeWidth = this.blockWidth * 2 - this.blockBorderWidth * 2 - this.blockSpace;
    var largeHeight = this.blockHeight * 2 - this.blockBorderWidth * 2 - this.blockSpace;
    var middleWidth = this.blockWidth - this.blockBorderWidth * 2 - this.blockSpace;
    var middleHeight = this.blockHeight * 2 - this.blockBorderWidth * 2 - this.blockSpace;
    var smallWidth = this.blockWidth - this.blockBorderWidth * 2 - this.blockSpace;
    var smallHeight = this.blockHeight - this.blockBorderWidth * 2 - this.blockSpace;
    var barItemWidth = this.blockWidth - this.blockBorderWidth * 2 - this.blockSpace;
    var barItemHeight = this.barHeight - this.blockBorderWidth * 2 - this.blockSpace;
    return [
        prefix + '{',
            'position: relative;',
            'width: ' + this.totalWidth + 'px;',
            'height: ' + this.totalHeight + 'px;',
        '}',
        prefix + '.ad-lu-bar {',
            'position: relative;',
            'width: ' + this.canvasWidth + 'px;',
            'height: ' + this.barHeight + 'px;',
        '}',
        prefix + '.ad-lu-body {',
            'position: relative;',
            'width: ' + this.canvasWidth + 'px;',
            'height: ' + this.canvasHeight + 'px;',
        '}',
        prefix + '.ad-bd-logo {',
            'text-decoration: none;',
            'cursor: pointer;',
            'display: block;',
            'overflow: hidden;',
            'position: absolute;',
            'bottom: 0;',
            'right: 0;',
            'z-index: 2147483647;',
            'height: 18px;',
            'width: 18px;',
            'background: url(http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/bg.png) no-repeat left top;',
            'background-position:0 0;',
            '_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src="http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/logo-border-light.png",sizingMethod="crop");',
            '_background:0;',
        '}',
        prefix + '.ad-bd-logo:hover {',
            'background-position:-70px 0;',
            '_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src="http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/logo-border-dark.png",sizingMethod="crop");',
        '}',
        prefix + '{',
            'position: relative;',
            this.bgOpacity != 0 ? this.getOpacityBackground(this.bgColor, this.bgOpacity) : '',
        '}',
        prefix + 'a {',
            'display: block;',
            'position: absolute;',
            'text-align: center;',
            'overflow: hidden;',
            'color: #fff;',
            'font-family: "宋体";',
            'text-decoration: none;',
        '}',
        prefix + 'a i {',
            'position: absolute;',
            'font-style:normal;',
            'top: 0;',
            'left: 0;',
            'width: 100%;',
            'height: 100%;',
            'cursor: pointer;',
        '}',
        prefix + 'a.ad-lu-large {',
            'width: ' + largeWidth + 'px;',
            'height: ' + largeHeight + 'px;',
            'line-height: ' + largeHeight + 'px;',
            'border: ' + this.blockBorderWidth + 'px solid ' + this.blockBorderColor[0] + ';',
            'font-size: ' + this.fontSize[0] + 'px;',
            'color: ' + this.fontColor[0] + ';',
            this.getOpacityBackground(this.blockBgColor[0], this.blockBgOpacity[0]),
        '}',
        prefix + 'a.ad-lu-large:hover {',
            'border: ' + this.blockBorderWidth + 'px solid ' + this.blockBorderColor[3] + ';',
            'color: ' + this.fontColor[3] + ';',
            this.getOpacityBackground(this.blockBgColor[3], this.blockBgOpacity[3]),
        '}',
        prefix + 'a.ad-lu-large span.ad-lu-mark {',
            'display: block;',
            'float: ' + (this.markDockTo == 'left' ? 'left' : 'right') + ';',
            'width: ' + this.markWrapperOffset + 'px;',
            'height: ' + largeHeight + 'px;',
        '}',
        prefix + 'a.ad-lu-large span.ad-lu-mark b {',
            'display: block;',
            'width: ' + this.markWidth + 'px;',
            'height: ' + this.markHeight + 'px;',
            'cursor:pointer;',
            'margin-left: ' + (this.markWrapperOffset - this.markWidth - this.markOffset) + 'px;',
            'margin-top: ' + parseInt((largeHeight - this.markHeight) / 2, 10) + 'px;',
            'background:url(' + this.mark[0] + ') no-repeat 0 0;',
            'background:none\\9;',
            'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled="true",sizingMethod="corp",src="' + this.mark[0] + '")\\9;',
        '}',
        prefix + 'a.ad-lu-large:hover span.ad-lu-mark b {',
            'background:url(' + this.mark[1] + ') no-repeat 0 0;',
            'background:none\\9;',
            'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled="true",sizingMethod="corp",src="' + this.mark[1] + '")\\9;',
        '}',
        prefix + 'a.ad-lu-middle {',
            'width: ' + middleWidth + 'px;',
            'height: ' + middleHeight + 'px;',
            'line-height: ' + middleHeight + 'px;',
            'border: ' + this.blockBorderWidth + 'px solid ' + this.blockBorderColor[1] + ';',
            'font-size: ' + this.fontSize[1] + 'px;',
            'color: ' + this.fontColor[1] + ';',
            this.getOpacityBackground(this.blockBgColor[1], this.blockBgOpacity[1]),
        '}',
        prefix + 'a.ad-lu-middle:hover {',
            'border: ' + this.blockBorderWidth + 'px solid ' + this.blockBorderColor[4] + ';',
            'color: ' + this.fontColor[4] + ';',
            this.getOpacityBackground(this.blockBgColor[4], this.blockBgOpacity[4]),
        '}',
        prefix + 'a.ad-lu-small {',
            'width: ' + smallWidth + 'px;',
            'height: ' + smallHeight + 'px;',
            'line-height: ' + smallHeight + 'px;',
            'border: ' + this.blockBorderWidth + 'px solid ' + this.blockBorderColor[2] + ';',
            'font-size: ' + this.fontSize[2] + 'px;',
            'color: ' + this.fontColor[2] + ';',
            this.getOpacityBackground(this.blockBgColor[2], this.blockBgOpacity[2]),
        '}',
        prefix + 'a.ad-lu-small:hover {',
            'border: ' + this.blockBorderWidth + 'px solid ' + this.blockBorderColor[5] + ';',
            'color: ' + this.fontColor[5] + ';',
            this.getOpacityBackground(this.blockBgColor[5], this.blockBgOpacity[5]),
        '}',
        prefix + 'a.ad-lu-bar-item {',
            'width: ' + barItemWidth + 'px;',
            'height: ' + barItemHeight + 'px;',
            'line-height: ' + barItemHeight + 'px;',
            'border: ' + this.blockBorderWidth + 'px solid ' + this.barBlockBorderColor[0] + ';',
            'font-size: ' + this.barFontSize + 'px;',
            'color: ' + this.barFontColor[0] + ';',
            this.getOpacityBackground(this.barBlockBgColor[0], this.barBlockBgOpacity[0]),
        '}',
        prefix + 'a.ad-lu-bar-item:hover,',
        prefix + 'a.ad-lu-bar-item-active {',
            'border: ' + this.blockBorderWidth + 'px solid ' + this.barBlockBorderColor[1] + ';',
            'color: ' + this.barFontColor[1] + ';',
            this.getOpacityBackground(this.barBlockBgColor[1], this.barBlockBgOpacity[1]),
        '}',
        prefix + '.ad-lu-triangle {',
            'position: absolute;',
            'border-left: 25px solid #fde35b;',
            'border-bottom: 25px solid transparent;',
            'margin: 0px;',
            'padding: 0;',
            'height: 0px;',
            'width: 0px;',
            'text-align: center;',
            'top: 0px;',
            'left: 0px;',
        '}',
        prefix + '.ad-lu-ranktext {',
            'position: absolute;',
        '}',
        prefix + '.ad-lu-ranktext a {',
            'display: inline;',
            'background: transparent;',
            'color: #886235;',
            'font-size: 11px;',
            'font-weight: bold;',
            'font-family: "arial";',
        '}'
    ].join('');
};














/* vim: set ts=4 sw=4 sts=4 tw=100 : */
