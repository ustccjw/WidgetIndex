package baidu.dv.graphs {
	import baidu.dv.core.Graph;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.events.Event;
	import baidu.dv.core.GraphItem;
	import flash.geom.ColorTransform;
	
	import baidu.dv.events.ItemEvent;
	
	/**
	 * 中国地图背景的颜色
	 */
	[Style(name = "bgColor", type = "uint")]
	
	/**
	 * 中国地图区域的边线样式
	 */
	[Style(name = "borderColor", type = "uint")]
	
	/**
	 * 中国地图单个区域相应鼠标Over事件
	 */
	[Event(name = "item_over", type = "baidu.dv.events.ItemEvent")]
	
	/**
	 * 中国地图单个区域相应鼠标Out事件
	 */
	[Event(name = "item_out", type = "baidu.dv.events.ItemEvent")]
	
	/**
	 * 中国地图单个区域相应鼠标Click事件
	 */
	[Event(name = "item_click", type = "baidu.dv.events.ItemEvent")]
	
	/**
	 * 中国地图图表类
	 * @author pangfei@baidu.com
	 * @version 2009/09/15
	 */
	public class ChinaMapGraph extends Graph {
		/**
		 * @private
		 * 地图素材的原始高度
		 */
		private static const MAP_ORIGINAL_WIDTH:Number = 496;
		
		/**
		 * @private
		 * 地图素材的原始高度
		 */
		private static const MAP_ORIGINAL_HEIGHT:Number = 496;
		
		/**
		 * @private
		 * 地图初始化时
		 */
		private static const INVALID_TYPE_MAP_INIT:String = "mapinit";
		
		/**
		 * @private
		 * 地图实例
		 */
		protected var _mapInstance:Sprite;
		
		/**
		 * @private 
		 * 地图背景实例
		 */
		protected var _mapBg:Sprite;
		
		/**
		 * @private
		 * 显示地图区域名称
		 */
		protected var _labels:String;
		
		/**
		 * @private
		 * 地图背景的颜色
		 */
		protected var _bgColor:uint;
		
		/**
		 * @private
		 * 是否有地图的背景
		 */
		protected var _hasMapBg:Boolean;
		
		/**
		 * @private
		 * 地图区域的边线颜色
		 */
		protected var _borderColor:uint;
		
		/**
		 * @private
		 * 地图区域名称，与实例名称对应
		 */
		protected var _mapAreaNames:Array = ["河北", "山东", "天津", "上海", "澳门", "香港",
											"北京", "山西", "辽宁", "吉林", "黑龙江", "江苏", 
											"浙江", "安徽",	"福建", "江西",  "河南", 
											"湖北", "湖南", "广东", "海南", "四川", "贵州", 
											"云南", "陕西", "甘肃", "青海", "台湾", 
											"新疆", "西藏", "内蒙古", "宁夏", "广西", "重庆"];
		
		/**
		 * @private 
		 * 地图的缩放比率，地图为等比例缩放，根据用户给定的宽度和高度的最小值换算缩放比率
		 */
		protected var _mapScale:Number;
		
		/**
		 * @private
		 * 地图的宽度
		 */
		protected var _mapWidth:Number;
		
		/**
		 * @private
		 * 地图的高度
		 */
		protected var _mapHeight:Number;
		
		/**
		 * @private
		 * 实际有效的地图元素
		 */
		public var realMapItems:Array;
		
		/**
		 * @private
		 * 构造函数
		 */
		public function ChinaMapGraph() {
			super();
			invalidate(INVALID_TYPE_MAP_INIT);
		}
		
		/**
		 * @private
		 * 初始化地图样式
		 */
		override protected function initStyle():void {
			_borderColor = 0xFFFFFF;
			_bgColor = 0xFFFFFF;
		}
		
		/**
		 * 设置/获取地图的宽度
		 */
		override public function set width(value:Number):void {
			if (isNaN(value) || _mapWidth == value) {
				return;
			}
			_mapWidth = value;
			invalidate(INVALID_TYPE_SIZE);
		}
		
		override public function get width():Number {
			return _mapWidth;
		}
		
		/**
		 * 设置/获取地图的高度
		 */
		override public function set height(value:Number):void {
			if (isNaN(value) || _mapHeight == value) {
				return;
			}
			_mapHeight = value;
			invalidate(INVALID_TYPE_SIZE);
		}
		
		override public function get height():Number {
			return _mapHeight;
		}
		
		/**
		 * 设置/获取地图背景的可视
		 */
		public function set mapBgVisible(value:Boolean):void {
			if (_hasMapBg == value) {
				return;
			}
			_hasMapBg = value;
			invalidate(INVALID_TYPE_STYLE);
		}
		
		public function get mapBgVisible():Boolean {
			return _hasMapBg;
		}
		
		/**
		 * 设置/获取地图背景的颜色
		 */
		public function set bgColor(value:uint):void {
			if (isNaN(value) || _bgColor == value) {
				return;
			}
			_bgColor = value;
			invalidate(INVALID_TYPE_STYLE);
		}
		
		public function get bgColor():uint {
			return _bgColor;
		}
		
		/**
		 * @private
		 * 当样式改变
		 */
		override protected function applyChanges():void {
			if (isInvalidOnly(INVALID_TYPE_SIZE)) {
				_mapScale = Math.min(_mapWidth / MAP_ORIGINAL_WIDTH, _mapHeight / MAP_ORIGINAL_HEIGHT);
				
				//如果地图实例存在的话，启用样式，如果不存在，则只记录缩放比率
				if (_mapInstance) {
					_mapInstance.scaleX = _mapInstance.scaleY = _mapScale;
				}
				
				//如果地图背景实例存在的话启用样式
				if (_mapBg) {
					_mapBg.scaleX = _mapBg.scaleY = _mapScale;
				}
				
			}else if(isInvalidOnly(INVALID_TYPE_STYLE)) {
				
			}else{
				createMap();
			}
		}
		
		/**
		 * @private
		 * 执行创建地图Items的操作
		 */
		private function createMap():void {
			//计算地图的缩放比率
			_mapScale = Math.min(_mapWidth / MAP_ORIGINAL_WIDTH, _mapHeight / MAP_ORIGINAL_HEIGHT);
			
			//显示地图的背景
			if (_hasMapBg && _mapBg == null) {
				_mapBg = new ChinaMapBg();
				addChild(_mapBg);
				_mapBg.scaleX = _mapBg.scaleY = _mapScale;
			}else if (_hasMapBg == false && _mapBg != null) {
				removeChild(_mapBg);
				_mapBg = null;
			}
			
			//显示所有地图元素
			var i:uint;
			var j:uint;
			if (this._items != null) {
				for (i = 0; i < this._items.length; i++ ) {
					removeChild(this._items[i]);
				}
				this._items = null;
			}else {
				this._items = new Array();
				for (i = 0; i < _mapAreaNames.length; i++ ) {
					var item:ChinaMapItem = new ChinaMapItem();
					addChild(item);
					this._items.push(item);
					item.data = _mapAreaNames[i];
					item.validateAll();			//样式重置
					item.disabled = true;
					item.addEventListener(MouseEvent.ROLL_OVER, doItemOperate);
					item.addEventListener(MouseEvent.ROLL_OUT, doItemOperate);
					item.addEventListener(MouseEvent.CLICK, doItemOperate);
				}
			}
			
			//应用Item样式
			realMapItems = [];
			for (i = 0; i < this._items.length; i++ ) {
				for (j = 0; j < _data.length; j++ ) {
					if (this._items[i].name == _data[j].name) {
						this._items[i].disabled = false;
						this._items[i].index = j;
						realMapItems.push(this._items[i]);
						for (var styleName:String in _data[j]) {
							if (styleName != "name") {
								this._items[i].setStyle(styleName, _data[j][styleName]);
							}
						}
					}
				}
			}
		}
		
		/**
		 *	@private
		 */
		override public function validateAll(evt:Event = null):void {
			super.validateAll(evt);
			
			if (_items) {
				for each (var item:GraphItem in _items) {
					item.validateNow();
				}
			}
		}
		
		override public function set data(value:*):void {
			if (value) {
				this._data = value;
			}else {
				return;
			}
			invalidate(INVALID_TYPE_MAP_INIT);
		}
		
		/**
		 *	@private
		 *	图形项鼠标操作的侦听器
		 */
		protected function doItemOperate(evt:MouseEvent):void {
			var eventType:String;
			var item:GraphItem = evt.currentTarget as GraphItem;
			switch (evt.type) {
				case MouseEvent.ROLL_OVER :
					eventType = ItemEvent.ITEM_OVER;
					item.emphasize();
					break;
				case MouseEvent.ROLL_OUT :
					eventType = ItemEvent.ITEM_OUT;
					item.normalize();
					break;
				case MouseEvent.CLICK :
					eventType = ItemEvent.ITEM_CLICK;
					break;
				default:
					break;
			}
			var itemEvent:ItemEvent = new ItemEvent(eventType);
			itemEvent.index = item.index;
			this.dispatchEvent(itemEvent);
		}
	}
}