package baidu.dv.core {

	import flash.display.Sprite;
	import flash.display.Shape;
	import flash.display.Graphics;
	import flash.text.TextFormat;
		
	/**
	 * 坐标轴样式
	 */
	[Style(name="axisLineStyle", type="baidu.dv.core.LineStyle")]
	
	/**
	 * 分割线样式
	 */
	[Style(name="splitLineStyle", type="baidu.dv.core.LineStyle")]
	
	/**
	 * 坐标轴小标记样式
	 */
	[Style(name="tickStyle", type="baidu.dv.core.LineStyle")]
	
	/**
	 * 坐标轴小标记样式
	 */
	[Style(name="tickLength", type="Number")]
	
	/**
	 * 坐标轴文本标签格式
	 */
	[Style(name="axisLabelTextFormat", type="flash.text.TextFormat")]
	
	/**
	 * 坐标轴文本标签与坐标轴的间距
	 */
	[Style(name="axisLabelPadding", type="Number")]
	
	/**
	 * 坐标轴文本标签是否多行
	 */
	[Style(name="axisLabelMultiline", type="Boolean")]
	

	/**
	 *  坐标网格基础类，除了包括坐标轴、坐标文本外还包括网格线。
	 *  @author xiaokun
	 */
	public class Grid extends DVBase {
		
		/**
		 *	@private
		 *	摆放位置失效
		 */
		protected static const INVALID_TYPE_PLACEMENT:String = "placement";
		
		/**
		 *	@private
		 *	是否显示坐标轴
		 */
		protected static const INVALID_TYPE_SHOW_AXIS_LINE:String = "showAxisLine";
		
		/**
		 *	@private
		 *	是否显示文本标签失效
		 */
		protected static const INVALID_TYPE_SHOW_AXIS_LABEL:String = "showAxisLabel";
		
		/**
		 *	@private
		 *	是否显示坐标轴小标记失效
		 */
		protected static const INVALID_TYPE_SHOW_TICK:String = "showTick";
		
		/**
		 *	@private
		 *	是否显示分割线失效
		 */
		protected static const INVALID_TYPE_SHOW_SPLIT_LINE:String = "showSplitLine";
		
		/**
		 *	@private
		 *	是否显示坐标轴小标记失效
		 */
		protected static const INVALID_TYPE_UNIT_SIZE:String = "unitSize";
		
		
		/**
		 *	@private
		 *	当前摆放位置
		 */
		protected var _placement:String = GridPlacement.BOTTOM;
	
		/**
		 *	@private
		 *	当前是否显示坐标轴文本标签
		 */
		protected var _showAxisLine:Boolean = true;
		
		/**
		 *	@private
		 *	当前是否显示坐标轴文本标签
		 */
		protected var _showAxisLabel:Boolean = true;
		
		/**
		 *	@private
		 *	当前是否显示坐标上的小标记
		 */
		protected var _showTick:Boolean = false;
		
		/**
		 *	@private
		 *	当前是否显示分割线
		 */
		protected var _showSplitLine:Boolean = true;
		
		/**
		 *	@private
		 *	每个基本单位对应的像素值
		 */
		protected var _unitSize:Number = 0;
		
		/**
		 *	@private
		 *	绘制坐标轴的图层
		 */
		protected var _axisLineLayer:Shape;
		
		/**
		 *	@private
		 *	绘制分割线的图层
		 */
		protected var _splitLineLayer:Shape;
		
		/**
		 *	@private
		 *	绘制坐标轴小标记的图层
		 */
		protected var _ticksLayer:Shape;
		
		/**
		 *	@private
		 *	所有的坐标轴文本标签
		 */
		protected var _axisLabels:Array;
		
		/**
		 *	构造函数
		 */
		public function Grid() {
			super();
		}
		

		/**
		 *  @private
		 */
		override public function set width(value:Number):void {
			super.width = value;
			
			invalidate(INVALID_TYPE_UNIT_SIZE);
		}
		
		/**
		 *  @private
		 */
		override public function set height(value:Number):void {
			super.height = value;
			
			invalidate(INVALID_TYPE_UNIT_SIZE);
		}

		/**
		 *	@private
		 */
		override public function set data(value:*):void {
			super.data = value;

			invalidate(INVALID_TYPE_UNIT_SIZE);
		}
		
		/**
		 *	获取/设置摆放位置
		 *	@see baidu.dv.core.GridPlacement
		 */
		public function get placement():String {
			return _placement;
		}
		
		public function set placement(value:String):void {
			if (_placement == value) {
				return;
			}
			if (value != GridPlacement.TOP
			   && value != GridPlacement.BOTTOM
			   && value != GridPlacement.LEFT
			   && value != GridPlacement.RIGHT) {
				throw new Error("The placement given is not valid");
				return;
			}
			
			_placement = value;
			invalidate(INVALID_TYPE_PLACEMENT);
			invalidate(INVALID_TYPE_UNIT_SIZE);
		}

		/**
		 *	获取/设置是否显示坐标轴
		 */
		public function get showAxisLine():Boolean {
			return _showAxisLine;
		}

		public function set showAxisLine(value:Boolean):void {
			if (_showAxisLine == value) {
				return;
			}

			_showAxisLine = value;
			invalidate(INVALID_TYPE_SHOW_AXIS_LINE);
		}

		
		/**
		 *	获取/设置是否显示坐标轴文本标签
		 */
		public function get showAxisLabel():Boolean {
			return _showAxisLabel;
		}
		
		public function set showAxisLabel(value:Boolean):void {
			if (_showAxisLabel == value) {
				return;
			}
			
			_showAxisLabel = value;
			invalidate(INVALID_TYPE_SHOW_AXIS_LABEL);
		}

		/**
		 *	获取/设置是否显示坐标轴上的小标记
		 */
		public function get showTick():Boolean {
			return _showTick;
		}

		public function set showTick(value:Boolean):void {
			if (_showTick == value) {
				return;
			}

			_showTick = value;
			invalidate(INVALID_TYPE_SHOW_TICK);
		}
		
		/**
		 *	获取/设置是否显示坐标轴上的小标记
		 */
		public function get showSplitLine():Boolean {
			return _showSplitLine;
		}

		public function set showSplitLine(value:Boolean):void {
			if (_showSplitLine == value) {
				return;
			}

			_showSplitLine = value;
			invalidate(INVALID_TYPE_SHOW_SPLIT_LINE);
		}

		/**
		 *	获得每个基本单位对应的像素值
		 */
		public function get unitSize():Number {
			if (isInvalid(INVALID_TYPE_UNIT_SIZE)) {
				calculateUnitSize();
				resetInvalidHash(INVALID_TYPE_UNIT_SIZE);
			}
			return _unitSize;
		}
		
		/**
		 *  @private
		 */
		override protected function initStyle():void {
			_styles["axisLineStyle"] = new LineStyle(0x888888, 1, 1);
			_styles["splitLineStyle"] = new LineStyle(0xdddddd, 1, 1);
			_styles["tickStyle"] = new LineStyle(0x999999, 1, 1);
			
			var tf:TextFormat = new TextFormat();
			tf.align = "center";
			_styles["axisLabelTextFormat"] = tf;
			_styles["axisLabelPadding"] = 2;
			_styles["axisLabelMultiline"] = false;
			
			_styles["tickLength"] = 4;
		}
		
		/**
		 *	@private
		 *	计算每个基本单位对应的像素值
		 */		
		protected function calculateUnitSize():void {
			
		}
		
		/**
		 *	@private
		 *	绘制所有线条
		 */
		protected function drawLines():void {
			if (_showAxisLine) {
				drawAxisLine();
			}
			if (_showSplitLine) {
				drawSplitLine();
			}
			if (_showTick) {
				drawTicks();
			}
		}
		
		/**
		 *	@private
		 *	绘制坐标轴
		 */
		protected function drawAxisLine():void {
			if (_axisLineLayer == null) {
				_axisLineLayer = new Shape();
				addChildAt(_axisLineLayer, 0);
			}
			var gp:Graphics = _axisLineLayer.graphics;
			gp.clear();
			
			var style:LineStyle = _styles["axisLineStyle"];
			gp.lineStyle(style.thickness, style.color, style.alpha);
			switch (_placement) {
				case GridPlacement.BOTTOM :
					gp.moveTo(0, _height);
					gp.lineTo(_width, _height);
					break;
				case GridPlacement.LEFT :
					gp.moveTo(0, 0);
					gp.lineTo(0, _height);
					break;
				case GridPlacement.RIGHT :
					gp.moveTo(_width, 0);
					gp.lineTo(_width, _height);
					break;
				case GridPlacement.TOP :
					gp.moveTo(0, 0);
					gp.lineTo(_width, 0);
					break;
			}
		}
		
		/**
		 *	@private
		 *	绘制分割线
		 */
		protected function drawSplitLine():void {
			
		}
		
		/**
		 *	@private
		 *	绘制坐标轴上的小标记
		 */
		protected function drawTicks():void {
			
		}

		/**
		 *	@private
		 *	生成坐标轴文本标签
		 */
		protected function genAxisLabels():void {
			
		}
		
		/**
		 *	@private
		 *	为每个坐标轴文本标签指定位置
		 */
		protected function locateAxisLabels():void {
			
		}
	
	}

}