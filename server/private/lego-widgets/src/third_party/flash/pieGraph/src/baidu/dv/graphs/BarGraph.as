package baidu.dv.graphs {

	import flash.display.Sprite;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import baidu.dv.core.GraphItem;
	import baidu.dv.core.LineStyle;
	import baidu.dv.core.GridPlacement;
	import baidu.dv.events.ItemEvent;
	
	/**
	 *  柱状图形
	 *  @author xiaokun
	 */
	public class BarGraph extends GridBasedGraph {
		
		/**
		 *	@private
		 *	图形占宽失效
		 */
		protected static const INVALID_TYPE_BAR_WIDTH:String = "barWidth";
		
		/**
		 *	@private
		 *	是否堆叠失效
		 */
		protected static const INVALID_TYPE_STACK:String = "stack";
		
		/**
		 *	@private
		 *	是否自动调整类目坐标轴两边的空白大小失效
		 */
		protected static const INVALID_TYPE_AUTO_CATEGORY_PADDING:String = "autoCategoryPadding";
		
		/**
		 *	@private
		 *	序列间隔大小失效
		 */
		protected static const INVALID_TYPE_SERIES_SPACING:String = "seriesSpacing";
		
		/**
		 *	@private
		 *	序列数目
		 */
		protected var _numSeries:uint = 0;
		
		/**
		 *	@private
		 *	图形占宽
		 */	
		protected var _barWidth:Number = 0.6;
		
		/**
		 *	@private
		 *	是否堆叠
		 */
		protected var _stack:Boolean = false;
		
		/**
		 *	@private
		 *	是否自动调整类目坐标轴两边的空白大小
		 */
		protected var _autoCategoryPadding:Boolean = true;
		
		/**
		 *	@private
		 *	序列间隔大小
		 */
		protected var _seriesSpacing:Number = 0.05;
		
		/**
		 *	@private
		 *	所有图形项的位置大小信息
		 */
		protected var _itemBounds:Array;
		
		/**
		 *	@private
		 *	针对每个序列的图形项渲染器
		 */
		protected var _seriesRenderers:Array;
		
		/**
		 *	@private
		 *	针对每个序列的图形项样式缓冲
		 */
		protected var _seriesStylesCache:Array = [];
		
		public function BarGraph() {
			super();
		}
		
		/**
		 *	@private
		 */
		override public function set data(value:*):void {
			super.data = value;
			
			if (_data) {
				if (_data[0] is Array) {
					_numSeries = _data[0].length;
				} else {
					_numSeries = 1;
				}
			} else {
				_numSeries = 0;
			}
		}
		
		/**
		 *	获取/设置每个类目中图形的占宽<br/>
		 *	小于1就代表百分比，否则代表实际像素值
		 */
		public function get barWidth():Number {
			return _barWidth;
		}
		
		public function set barWidth(value:Number):void {
			if (value == _barWidth) {
				return;
			}
			
			_barWidth = value;
			invalidate(INVALID_TYPE_BAR_WIDTH);
		}
		
		/**
		 *	获取/设置不同序列的图形项是否堆叠
		 */
		public function get stack():Boolean {
			return _stack;
		}
		
		public function set stack(value:Boolean):void {
			if (value == _stack) {
				return;
			}
			
			_stack = value;
			invalidate(INVALID_TYPE_STACK);
		}
		
		/**
		 *	获取序列数目
		 */
		public function get numSeries():uint {
			return _numSeries;
		}
		
		/**
		 *	获取/设置是否自动调整类目坐标轴两边的空白大小
		 */
		public function get autoCategoryPadding():Boolean {
			return _autoCategoryPadding;
		}
		
		public function set autoCategoryPadding(value:Boolean):void {
			if (value == _autoCategoryPadding) {
				return;
			}
			
			_autoCategoryPadding = value;
			invalidate(INVALID_TYPE_AUTO_CATEGORY_PADDING);
		}
		
		/**
		 *	获取/设置序列之间的间隔大小<br/>
		 *	小于1就代表百分比，否则代表实际像素值
		 */
		public function get seriesSpacing():Number {
			return _seriesSpacing;
		}
		
		public function set seriesSpacing(value:Number):void {
			if (value == _seriesSpacing) {
				return;
			}
			
			_seriesSpacing = value;
			invalidate(INVALID_TYPE_SERIES_SPACING);
		}
		
		/**
		 *	设置针对每个序列的图形项渲染器
		 */
		public function set seriesRenderers(value:Array):void {
			if (value == _seriesRenderers || value.length < 1) {
				return;
			}
			
			_seriesRenderers = value;
			invalidate(INVALID_TYPE_ITEM_RENDERER);
		}
		
		/**
		 *	设置针对某个序列的图形项的单个样式值
		 *	@param	seriesIndex		<uint>序列索引值
		 *	@param	key				<String>样式类型
		 *	@param	value			样式值			
		 */
		public function setSeriesStyle(seriesIndex:uint, key:String, value:*):void {
			if (_seriesStylesCache[seriesIndex] == null) {
				_seriesStylesCache[seriesIndex] = {};
			}
			_seriesStylesCache[seriesIndex][key] = value;
			
			for each (var item:GraphItem in _items) {
				if (item.index % numSeries == seriesIndex) {
					item.setStyle(key, value);
				}
			}
		}
		
		/**
		 * 一次性设置针对某个序列的图形项的多个样式
		 * @param	stylesObj	<Object>样式对象，如果为null则恢复默认样式
		 */
		public function setSeriesStyles(seriesIndex:uint, stylesObj:Object):void {
			if (_seriesStylesCache[seriesIndex] == null) {
				_seriesStylesCache[seriesIndex] = {};
			}
			if (stylesObj == null) {
				_seriesStylesCache[seriesIndex] = {};
			} else {
				for (var key:String in stylesObj) {
					_seriesStylesCache[seriesIndex][key] = stylesObj[key];
				}
			}
			for each (var item:GraphItem in _items) {
				if (item.index % numSeries == seriesIndex) {
					item.setStyles(_itemStylesCache);
				}
			}
		}
		
		
		/**
		 *	@private
		 *	因为Bar可能多序列，所以这里覆写方法
		 */
		override public function getPointByIndex(index:uint):Point {
			validateAll();
			var point:Point = new Point();
			var bound:Rectangle = _itemBounds[index];
			switch (_categoryGrid.placement) {
				case GridPlacement.BOTTOM :
					point.x = bound.x + bound.width / 2;
					point.y = bound.y;
					break;
				case GridPlacement.LEFT :
					point.x = bound.x + bound.width;
					point.y = bound.y + bound.height / 2;
					break;
				case GridPlacement.TOP :
					point.x = bound.x + bound.width / 2;
					point.y = bound.y + bound.height;
					break;
				case GridPlacement.RIGHT :
					point.x = bound.x;
					point.y = bound.y + bound.height / 2;
					break;
			}
			return point;
		}
		
		/**
		 *	@private
		 */
		override protected function applyChanges():void {
			if (!_categoryGrid || !_valueGrid || !_data) {
				return;
			}
			
			if (_autoCategoryPadding) {
				_categoryGrid.padding = 0.5;
				_categoryGrid.validateNow();
			}
			calculateItemBounds();
			if (!isInvalidOnly(INVALID_TYPE_SIZE)) {
				if (_items) {
					for each (var item:GraphItem in _items) {
						if (this.contains(item)) {
							this.removeChild(item);
						}
					}
				}
				genItems();
			}
			refreshItems();
			for each (item in _items) {
				item.validateNow();
			}
		}
		
		/**
		 *	@private
		 *	计算所有图形项的位置和大小
		 */
		protected function calculateItemBounds():void {
			var unitSizeC:Number = _categoryGrid.unitSize;
			var realBarWidth:Number = ((_barWidth < 1) ? unitSizeC * _barWidth : _barWidth) / (stack ? 1 : numSeries);
			var realSeriesSpacing:Number = (_seriesSpacing < 1) ? unitSizeC * _seriesSpacing : _seriesSpacing;
			var seriesOffsets:Array = [];
			if (numSeries == 1) {
				seriesOffsets.push(0);
			} else {
				for (var s:int = 0; s < numSeries; s++) {
					var offset:Number;
					if (stack) {
						offset = 0;
					} else {
						offset = (realBarWidth + realSeriesSpacing) * (s - (numSeries - 1) / 2);
					}
					seriesOffsets.push(offset);
				}
			}
			
			_itemBounds = [];
			for (var i:int = 0, len:int = _data.length * numSeries; i < len; i++) {
				var bound:Rectangle = new Rectangle();
				var seriesIndex:uint = i % numSeries;
				var categoryIndex:uint = (i - seriesIndex) / numSeries;
				var posCategory:Number = _categoryGrid.getPositionByIndex(categoryIndex) + seriesOffsets[seriesIndex];
				var value:Number;
				var selfValue:Number;
				if (numSeries > 1) {
					var values:Array = _data[categoryIndex];
					if (stack) {
						value = 0;
						for (s = 0; s <= seriesIndex; s++) {
							value += values[s];
						}
					} else {
						value = values[seriesIndex];
					}	
					selfValue = values[seriesIndex];
				} else {
					value = selfValue = _data[categoryIndex];
				}
				var posValue:Number = _valueGrid.getPositionByValue(value);
				var height:Number = _valueGrid.unitSize * selfValue;
				switch (_categoryGrid.placement) {
					case GridPlacement.BOTTOM :
						bound.x = posCategory - realBarWidth / 2;
						bound.y = posValue;
						bound.width = realBarWidth;
						bound.height = height;
						break;
					case GridPlacement.LEFT :
						bound.x = posValue - height;
						bound.y = posCategory - realBarWidth / 2;
						bound.width = height;
						bound.height = realBarWidth;
						break;
					case GridPlacement.TOP :
						bound.x = posCategory - realBarWidth / 2;
						bound.y = posValue - height;
						bound.width = realBarWidth;
						bound.height = height;
						break;
					case GridPlacement.RIGHT :
						bound.x = posValue;
						bound.y = posCategory - realBarWidth / 2;
						bound.width = height;
						bound.height = realBarWidth;
						break;
				}
				_itemBounds.push(bound);
			}
			
		}
		
		/**
		 *	@private
		 *	生成所有的图形项
		 */
		protected function genItems():void {
			_items = [];
			if (_itemRenderer || _seriesRenderers.length > 0) {
				for (var i:Number = 0, len:Number = _data.length * numSeries; i < len; i++) {
					var seriesIndex:uint = i % numSeries;
					var renderer:Class = (_itemRenderer) ? _itemRenderer : _seriesRenderers[seriesIndex];
					var item:GraphItem = new renderer();
					item.setStyles(_itemStylesCache);
					if (_seriesStylesCache[seriesIndex]) {
						item.setStyles(_seriesStylesCache[seriesIndex]);
					}
					item.index = i;
					addChild(item);
					item.addEventListener(MouseEvent.ROLL_OVER, doItemOperate);
					item.addEventListener(MouseEvent.ROLL_OUT, doItemOperate);
					item.addEventListener(MouseEvent.CLICK, doItemOperate);
					_items[i] = item;
				}
			}
		}
		
		/**
		 *	@private
		 *	定位所有的图形项并设置大小
		 */
		protected function refreshItems():void {
			for each (var item:GraphItem in _items) {
				var bound:Rectangle = _itemBounds[item.index];
				item.x = bound.x;
				item.y = bound.y;
				item.width = bound.width;
				item.height = bound.height;
			}
		}
		
		/**
		 *	@private
		 *	图形项鼠标操作的侦听器
		 */
		protected function doItemOperate(evt:MouseEvent):void {
			var eventType:String;
			switch (evt.type) {
				case MouseEvent.ROLL_OVER :
					eventType = ItemEvent.ITEM_OVER;
					break;
				case MouseEvent.ROLL_OUT :
					eventType = ItemEvent.ITEM_OUT;
					break;
				case MouseEvent.CLICK :
					eventType = ItemEvent.ITEM_CLICK;
					break;
			}
			var itemEvent:ItemEvent = new ItemEvent(eventType);
			itemEvent.index = (evt.currentTarget as GraphItem).index;
			this.dispatchEvent(itemEvent);
		}
	
	}

}

