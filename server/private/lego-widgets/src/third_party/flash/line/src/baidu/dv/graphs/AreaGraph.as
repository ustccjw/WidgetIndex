package baidu.dv.graphs {
	
	import flash.display.Shape;
	import flash.display.Graphics;
	import flash.geom.Point;
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import baidu.dv.core.GraphItem;
	import baidu.dv.core.LineStyle;
	import baidu.dv.core.GridPlacement;
	import baidu.dv.events.ItemEvent;
	
	/**
	 * 线条样式
	 */
	[Style(name="lineStyle", type="baidu.dv.core.LineStyle")]
	
	/**
	 * 区域图形的颜色
	 */
	[Style(name="areaColor", type="uint")]
	
	/**
	 * 区域图形的透明度
	 */
	[Style(name="areaAlpha", type="Number")]

	/**
	 *  区域图形
	 *  @author xiaokun
	 */
	public class AreaGraph extends GridBasedGraph {
		
		/**
		 *	@private
		 *	绘制区域图形的图层
		 */
		protected var _graphLayer:Shape;
		
		/**
		 *	@private
		 *	区域图形的遮罩
		 */
		protected var _graphMask:Shape;
		
		public function AreaGraph() {
			super();
		}

		/**
		 *  @private
		 */
		override protected function initStyle():void {
			_styles["lineStyle"] = new LineStyle(0x222222, 1, 1);
			_styles["areaColor"] = 0x222222;
			_styles["areaAlpha"] = 0.5;
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
		 *	绘制图形及其遮罩
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
			gp.beginFill(_styles["areaColor"], _styles["areaAlpha"]);
			var startPoint:Point;
			var point:Point;
			for (var i:Number = 0, len:Number = _data.length; i < len; i++) {
				if (isNaN(_data[i])) {		//支持数据不完整
					continue;
				}
				point = getPointByIndex(i);
				if (startPoint) {
					gp.lineTo(point.x, point.y);
				} else {	
					gp.moveTo(point.x, point.y);
					startPoint = point.clone();
				}
			}
			gp.lineStyle();
			if (startPoint) {
				switch (_categoryGrid.placement) {
					case GridPlacement.BOTTOM :
						gp.lineTo(point.x, _height);
						gp.lineTo(startPoint.x, _height);
						gp.lineTo(startPoint.x, startPoint.y);
						break;
					case GridPlacement.TOP :
						gp.lineTo(point.x, 0);
						gp.lineTo(startPoint.x, 0);
						gp.lineTo(startPoint.x, startPoint.y);
						break;
					case GridPlacement.LEFT :
						gp.lineTo(0, point.y);
						gp.lineTo(0, startPoint.y);
						gp.lineTo(startPoint.x, startPoint.y);
						break;	
					case GridPlacement.RIGHT :
						gp.lineTo(_width, point.y);
						gp.lineTo(_width, startPoint.y);
						gp.lineTo(startPoint.x, startPoint.y);
						break;
				}
			}
			gp.endFill();
			
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
					item.setStyle("color", _styles["lineStyle"].color);
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