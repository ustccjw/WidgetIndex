package baidu.dv.core {

	import flash.display.Sprite;
	import flash.events.Event;
	
	/**
	 * 图形项鼠标over事件
	 */
	[Event(name = "item_over", type = "baidu.dv.events.ItemEvent")]
	
	/**
	 * 图形项鼠标out事件
	 */
	[Event(name = "item_out", type = "baidu.dv.events.ItemEvent")]
	
	/**
	 * 图形项鼠标点击事件
	 */
	[Event(name = "item_click", type = "baidu.dv.events.ItemEvent")]
	
	/**
	 *  图形类，可能包含有图形项
	 *  @author xiaokun
	 */
	public class Graph extends DVBase {
		
		/**
		 *	@private
		 *	图形项渲染类失效
		 */
		protected static const INVALID_TYPE_ITEM_RENDERER:String = "itemRenderer";
		
		/**
		 *	@private
		 *	所有的图形项
		 */
		protected var _items:Array;
		
		/**
		 *	@private
		 *	图形项渲染类
		 */
		protected var _itemRenderer:Class;
		
		/**
		 *	@private
		 *	通过Graph直接设置的图形项样式缓存，子类创建新图形项时一定要将这个缓存样式设置给它们
		 */
		protected var _itemStylesCache:Object = {};
		
		/**
		 *	构造函数
		 */
		public function Graph() {
			super();
		}
		
		/**
		 *	获取/设置图形项的渲染类，此类需继承GraphItem类
		 */
		public function get itemRenderer():Class {
			return _itemRenderer;
		}
		
		public function set itemRenderer(value:Class):void {
			if (value == _itemRenderer) {
				return;
			}
			
			_itemRenderer = value;
			invalidate(INVALID_TYPE_ITEM_RENDERER);
		}
		
		/**
		 *	设置图形项某个样式值
		 *	@param	key		<String>样式类型
		 *	@param	value	样式值			
		 */
		public function setItemStyle(key:String, value:*):void {
			_itemStylesCache[key] = value;
			
			for each (var item:GraphItem in _items) {
				item.setStyle(key, value);
			}
		}
		
		/**
		 * 一次性设置图形项多个样式
		 * @param	stylesObj	<Object>样式对象，如果为null则恢复默认样式
		 */
		public function setItemStyles(stylesObj:Object):void {
			if (stylesObj == null) {
				_itemStylesCache = {};
			} else {
				for (var key:String in stylesObj) {
					_itemStylesCache[key] = stylesObj[key];
				}
			}
			for each (var item:GraphItem in _items) {
				item.setStyles(_itemStylesCache);
			}
		}
		
		/**
		 *	获取图形项的数量
		 */
		public function get numItems():uint {
			validateAll();
			
			return _items ? _items.length : 0;
		}
		
		/**
		 *	根据索引获取一个图形项的引用
		 *	@param 	index	<uint>索引
		 *	@param			<GraphItem>索引对应的图形项
		 */
		public function getItem(index:uint):GraphItem {
			validateAll();
			
			return _items[index];
		}
		
		/**
		 *	强调某一个图形项
		 *	@param 	index	<uint>索引
		 */
		public function emphasizeItem(index:uint):void {
			validateAll();
			
			if (_items) {
				var item:GraphItem = _items[index];
				if (item) {
					item.emphasize();
				}
			}
		}
		
		/**
		 *	让某一个图形项恢复正常显示
		 *	@param 	index	<uint>索引
		 */
		public function normalizeItem(index:uint):void {
			validateAll();
			
			if (_items) {
				var item:GraphItem = _items[index];
				if (item) {
					item.normalize();
				}
			}
		}
		
		/**
		 *	让所有图形项恢复正常显示
		 */
		public function normalizeAllItems():void {
			validateAll();
			
			for each (var item:GraphItem in _items) {
				item.normalize();
			}
		}
		
		/**
		 *	显示某一个图形项
		 *	@param 	index	<uint>索引
		 */
		public function showItem(index:uint):void {
			validateAll();
			
			if (_items) {
				var item:GraphItem = _items[index];
				if (item) {
					item.visible = true;
				}
			}
		}
		
		/**
		 *	隐藏某一个图形项
		 *	@param 	index	<uint>索引
		 */
		public function hideItem(index:uint):void {
			validateAll();
			
			if (_items) {
				var item:GraphItem = _items[index];
				if (item) {
					item.visible = false;
				}
			}
		}
		
		/**
		 *	显示所有图形项
		 */
		public function showAllItems():void {
			validateAll();
			
			for each (var item:GraphItem in _items) {
				item.visible = true;
			}
		}
		
		/**
		 *	隐藏所有图形项
		 */
		public function hideAllItems():void {
			//validateAll();
			
			for each (var item:GraphItem in _items) {
				item.visible = false;
			}
		}
		
		/**
		 *	@private
		 */
		override public function validateAll(evt:Event = null):void {
			super.validateAll(evt);
			
			for each (var item:GraphItem in _items) {
				item.validateNow();
			}
		}
	}

}

