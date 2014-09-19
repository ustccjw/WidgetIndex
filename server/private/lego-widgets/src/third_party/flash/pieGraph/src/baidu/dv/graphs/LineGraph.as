package baidu.dv.graphs {
	
	import flash.display.Shape;
	import flash.display.Graphics;
	import flash.geom.Point;
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import baidu.dv.core.GraphItem;
	import baidu.dv.core.LineStyle;
	import baidu.dv.events.ItemEvent;
	
	/**
	 * 线条样式
	 */
	[Style(name="lineStyle", type="baidu.dv.core.LineStyle")]

	/**
	 *  折线图形
	 *  @author xiaokun
	 */
	public class LineGraph extends GridBasedGraph {
		
		/**
		 *	@private
		 *	绘制线条图形的图层
		 */
		protected var _graphLayer:Shape;
		
		/**
		 *	@private
		 *	线条图形的遮罩
		 */
		protected var _graphMask:Shape;
		
		public function LineGraph() {
			super();
		}

		/**
		 *  @private
		 */
		override protected function initStyle():void {
			_styles["lineStyle"] = new LineStyle(0x222222, 1, 1);
		}
		
		/**
		 *	@private
		 */
		override protected function applyChanges():void {
			if (!_categoryGrid || !_valueGrid || !_data) {
				return;
			}
			
			drawGraph();
			if (isInvalidOnly(INVALID_TYPE_SIZE)) {
				locateItems();
			} else {
				if (_items) {
					for each (var item:GraphItem in _items) {
						if (this.contains(item)) {
							this.removeChild(item);
						}
					}
				}
				genItems();
				locateItems();
			}
		}
		
		/**
		 *	@private
		 *	绘制线条及其遮罩
		 */
		protected function drawGraph():void {
			//生成绘制图层
			if (_graphLayer == null) {
				_graphLayer = new Shape();
				addChildAt(_graphLayer, 0);
				_graphMask = new Shape();
				addChild(_graphMask);
				_graphLayer.mask = _graphMask;
			}
			
			//从有值的点开始绘制
			var gp:Graphics = _graphLayer.graphics;
			gp.clear();
			var lineStyle:LineStyle = _styles["lineStyle"];
			gp.lineStyle(lineStyle.thickness, lineStyle.color, lineStyle.alpha);
			var started:Boolean = false;
			for (var i:Number = 0, len:Number = _data.length; i < len; i++) {
				if (isNaN(_data[i])) {		//支持数据不完整
					continue;
				}
				var point:Point = getPointByIndex(i);
				if (started) {
					gp.lineTo(point.x, point.y);
				} else {
					gp.moveTo(point.x, point.y);
					started = true;
				}
			}
			
			//绘制遮罩
			gp = _graphMask.graphics;
			gp.clear();
			gp.beginFill(0, 1);
			gp.drawRect(0, 0, _width, _height);
			gp.endFill();
		}
		
		/**
		 *	@private
		 *	生成所有的图形项
		 */
		protected function genItems():void {
			_items = [];
			if (_itemRenderer) {
				for (var i:Number = 0, len:Number = _data.length; i < len; i++) {
					if (isNaN(_data[i])) {		//支持数据不完整
						continue;
					}
					var item:GraphItem = new _itemRenderer();
					item.setStyles(_itemStylesCache);
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
		 *	定位所有的图形项
		 */
		protected function locateItems():void {
			for each (var item:GraphItem in _items) {
				var point:Point = getPointByIndex(item.index);
				item.x = point.x;
				item.y = point.y;
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