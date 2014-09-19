package baidu.dv.graphs {
	import baidu.dv.core.GraphItem;
	import flash.display.Sprite;
	import flash.utils.getDefinitionByName;
	import flash.geom.ColorTransform;
	
	/**
	 * 地图区域填充颜色
	 */
	[Style(name = "fillColor", type = "uint")]
	
	/**
	 * 地图区域名称缩放比率
	 */
	[Style(name = "labelScale", type = "Number")]
	
	/**
	 * 地图区域透明度
	 */
	[Style(name = "fillAlpha", type = "Number")]
	
	/**
	 * 地图区域的边框颜色
	 */
	[Style(name = "borderColor", type = "uint")]
	
	/**
	 * 地图区域标签颜色
	 */
	[Style(name = "labelColor", type = "uint")]
	
	/**
	 * 地图区域点坐标
	 */
	[Style(name = "point", type = "Object")]
	
	/**
	 * 地图区域被强调颜色
	 */
	[Style(name = "emphasizedFillColor", type = "uint")]
	
	/**
	 * 地图区域被强调透明度
	 */
	[Style(name = "emphasizedFillAlpah", type = "Number")]
	
	/**
	 * 地图区域被强调边框颜色
	 */
	[Style(name = "emphasizedBorderColor", type = "uint")]
	
	/**
	 * 地图区域被强调标签颜色
	 */
	[Style(name = "emphasizedLabelColor", type = "uint")]
	
	/**
	 * 地图区域失效的填充颜色
	 */
	[Style(name = "disabledFillColor", type = "uint")]
	
	/**
	 * 地图区域失效的透明度
	 */
	[Style(name = "disabledFillAlpha", type = "Number")]
	
	/**
	 * 地图区域名称显示/隐藏
	 */
	[Style(name = "labelVisible", type = "Boolean")]
	
	/**
	 * 地图区域名称显示/隐藏
	 */
	[Style(name = "emphasizedLabelVisible", type = "Boolean")]
	
	/**
	 * 
	 */
	public class ChinaMapItem extends GraphItem {
		/**
		 * @private
		 * 区域颜色失效
		 */
		protected static const INVALID_FILL_COLOR:String = "fillColor";
		
		/**
		 * @private 
		 * 区域Label失效
		 */
		protected static const INVALID_LABLE_VISIBLE:String = "lableVisible";
		
		/**
		 * @private
		 * 该地图区域失效
		 */
		protected static const INVALID_MAP_DISABLE:String = "mapDisable";
		
		/**
		 * @private
		 * 该地图是否为失效
		 */
		private var _disabled:Boolean;
		
		/**
		 * @private
		 * 地图区域类
		 */
		private var INSTANCE_CLASS:Class;
		
		/**
		 * @private
		 * 地图实例
		 */
		private var _itemInstance:*;
		
		/**
		 * @private
		 */
		private static var shapeColor:ColorTransform = new ColorTransform();
		
		/**
		 * @private
		 */
		private static var borderColor:ColorTransform = new ColorTransform();
		
		/**
		 * @private
		 */
		private static var labelColor:ColorTransform = new ColorTransform();
		
		/**
		 * 构造函数
		 */
		public function ChinaMapItem() {
			super();
			
			//地图区域的显示可不需要设置任何参数
			invalidate("all");
		}
		
		/**
		 * @private
		 * 初始化样式
		 */
		override protected function initStyle():void {
			//默认常态样式
			_styles["fillColor"] = 0x6695D5;
			_styles["borderColor"] = 0xFFFFFF;
			_styles["labelColor"] = 0x000000;
			_styles["fillAlpha"] = 1;
			_styles["labelVisible"] = false;
			_styles["labelScale"] = 1;
			
			//默认强调样式
			_styles["emphasizedFillColor"] = 0xFFCC00;
			_styles["emphasizedBorderColor"] = 0xFFFFFF;
			_styles["emphasizedLabelColor"] = 0x000000;
			_styles["emphasizedFillAlpah"] = 1;
			_styles["emphasizedLabelVisible"] = false;
			
			//失效样式
			_styles["disabledFillColor"] = 0xCCCCCC;
			_styles["disabledFillAlpha"] = 1;
		}
		
		/**
		 * @private
		 */
		override protected function applyChanges():void {
			draw();
		}
		
		/**
		 * @private
		 */
		override protected function doEmphasize():void {
			draw();
		}
		
		/**
		 * @private
		 */
		override protected function doNormalize():void {
			draw();
		}
		
		/**
		 * 设置\获取该地图区域的
		 * @param	value
		 */
		public function set disabled(value:Boolean):void {
			if (value == _disabled) {
				return;
			}
			_disabled = value;
			invalidate(INVALID_MAP_DISABLE);
		}
		
		public function get disabled():Boolean {
			return _disabled;
		}
		
		/**
		 * 获取该地图区域焦点位置
		 * @param Object
		 */
		public function get point():Object {
			if (_itemInstance != null) {
				return { x:_itemInstance.point.x + _itemInstance.x, y:_itemInstance.point.y + _itemInstance.y};
			}else {
				return { x:0, y:0 };
			}
		}
		
		/**
		 * @private
		 */
		private function draw():void {
			//创建地图区域
			if (_itemInstance == null) {
				INSTANCE_CLASS = getDefinitionByName(_data) as Class;
				_itemInstance = new INSTANCE_CLASS();
				this.name = _data;
				addChild(_itemInstance);
			}
			
			//适用默认填充样式
			shapeColor.color = _styles["fillColor"];
			_itemInstance.shape.transform.colorTransform = shapeColor;
			_itemInstance.shape.alpha = _styles["fillAlpha"];
			
			//适用默认标签样式
			labelColor.color = _styles["labelColor"];
			_itemInstance.label.transform.colorTransform = labelColor;
			_itemInstance.label.visible = _styles["labelVisible"];
			_itemInstance.label.scaleX = _itemInstance.label.scaleY = _styles["labelScale"];
			
			//适用默认边框颜色
			borderColor.color = _styles["borderColor"];
			_itemInstance.border.transform.colorTransform = borderColor;
			
			if (_emphasized == true && _disabled != true) {
				//高亮填充颜色
				shapeColor.color = _styles["emphasizedFillColor"];
				_itemInstance.shape.transform.colorTransform = shapeColor;
				_itemInstance.shape.alpha = _styles["emphasizedFillAlpah"];
				
				//高亮标签
				labelColor.color = _styles["emphasizedLabelColor"];
				_itemInstance.label.transform.colorTransform = labelColor;
				_itemInstance.label.visible = _styles["emphasizedLabelVisible"];
				
				//高亮边框
				labelColor.color = _styles["emphasizedBorderColor"];
				_itemInstance.border.transform.colorTransform = labelColor;
				
			}else if(_emphasized == false && _disabled != true) {
				//适用默认填充样式
				shapeColor.color = _styles["fillColor"];
				_itemInstance.shape.transform.colorTransform = shapeColor;
				
				//适用默认标签样式
				labelColor.color = _styles["labelColor"];
				_itemInstance.label.transform.colorTransform = labelColor;
				_itemInstance.label.visible = _styles["labelVisible"];
				
				//适用默认边框颜色
				borderColor.color = _styles["borderColor"];
				_itemInstance.border.transform.colorTransform = borderColor;
				
				//适用默认透明度
				_itemInstance.shape.alpha = _styles["fillAlpha"];
			}else if (_disabled == true ) {
				//失效的填充颜色
				shapeColor.color = _styles["disabledFillColor"];
				_itemInstance.shape.transform.colorTransform = shapeColor;
				
				//失效的填充透明度
				_itemInstance.shape.alpha = _styles["disabledFillAlpha"];
			}
		}
	}
}