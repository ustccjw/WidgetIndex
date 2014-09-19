package baidu.dv.grids {
	
	import flash.display.Shape;
	import flash.display.Graphics;
	import flash.text.TextField;
	import flash.geom.Point;
	
	import baidu.dv.core.DVBase;
	import baidu.dv.core.Grid;
	import baidu.dv.core.GridPlacement;
	import baidu.dv.core.LineStyle;

	/**
	 *  类目坐标网格
	 *  @author xiaokun
	 */
	public class CategoryGrid extends Grid {
		
		/**
		 *	@private
		 *	两边的空白大小失效
		 */
		protected static const INVALID_TYPE_PADDIG:String = "padding";
		
		/**
		 *	@private
		 *	当前的两边空白大小
		 */
		protected var _padding:Number = 0;
		/**
		 *	@private
		 *	是否显示最后一条分割线
		 */
		protected var _showLastSplitLine:Boolean = false;
		
		/**
		 *	构造函数
		 */
		public function CategoryGrid() {
			super();
			
			_placement = GridPlacement.BOTTOM;
			_showSplitLine = false;
		}
		
		/**
		 *	@private
		 *	是否显示最后一条分割线失效
		 */
		protected static const INVALID_TYPE_SHOW_LAST_SPLIT_LINE:String = "showLastSplitLine";
		
		/**
		 *	获取/设置两边的空白大小<br/>
		 *	不能是负数，如果value大于1， 则认为时像素值；如果小于等于1，则认为相对于unitSize的百分比
		 */
		public function get padding():Number {
			return _padding;
		}
	
		public function set padding(value:Number):void {
			if (isNaN(value) || _padding == value || value < 0) {
				return;
			}

			_padding = value;
			invalidate(INVALID_TYPE_PADDIG);
			invalidate(INVALID_TYPE_UNIT_SIZE);
		}
		
		/**
		 *	根据一个位置获得对应的索引值
		 *	@param position	<uint>位置
		 *	@return 		<Number>对应的索引值
		 */
		public function getIndexByPosition(position:Number):uint {
			if (isInvalid(INVALID_TYPE_UNIT_SIZE)) {
				calculateUnitSize();
			}
			var startPos:Number = (_padding <= 1) ? _padding * _unitSize : _padding;
			var index:int =  Math.round((position - startPos) / _unitSize);
			index = Math.max(index, 0);
			index = Math.min(index, _data.length - 1);
			return index;
		}
		
		/**
		 *	根据一个索引获得对应的位置
		 *	@param index	<uint>索引
		 *	@return 		<Number>索引对应的位置
		 */
		public function getPositionByIndex(index:uint):Number {
			if (isInvalid(INVALID_TYPE_UNIT_SIZE)) {
				calculateUnitSize();
			}
			var startPos:Number = (_padding <= 1) ? _padding * _unitSize : _padding;
			return startPos + _unitSize * index;
		}
		
		/**
		 *	获取/设置是否显示最后一条分割线，此属性也决定了此分割线对应的文本标签是否显示
		 */
		public function get showLastSplitLine():Boolean {
			return _showLastSplitLine;
		}
		
		public function set showLastSplitLine(value:Boolean):void {
			if (_showLastSplitLine == value) {
				return;
			}
			
			_showLastSplitLine = value;
			invalidate(INVALID_TYPE_SHOW_LAST_SPLIT_LINE);
		}
		
		/**
		 *	@private
		 *	这里不对某些情况再做细分，比如仅仅改变tick的显示与否，因为这种行为不会高频发生，而每次判断都会带来代价,只把最高频的属性改变单独处理，比如size改变
		 */
		override protected function applyChanges():void {
			if (_data == null) {
				if (_showAxisLine) {
					drawAxisLine();
				}
				return;
			}
			
			if (isInvalidOnly(INVALID_TYPE_SIZE) || isInvalidOnly(INVALID_TYPE_PADDIG)) {
				if (isInvalid(INVALID_TYPE_UNIT_SIZE)) {
					calculateUnitSize();
				}
				drawLines();
				if (_showAxisLabel && _axisLabels) {
					locateAxisLabels();
				}
			} else {
				if (isInvalid(INVALID_TYPE_UNIT_SIZE)) {
					calculateUnitSize();
				}
				drawLines();
				if (_showTick) {
					_ticksLayer.visible = true;
				} else {
					if (_ticksLayer) {
						_ticksLayer.visible = false;
					}
				}
				if (_showAxisLine) {
					_axisLineLayer.visible = true;
				} else {
					if (_axisLineLayer) {
						_axisLineLayer.visible = false;
					}
				}
				if (_showSplitLine) {
					_splitLineLayer.visible = true;
				} else {
					if (_splitLineLayer) {
						_splitLineLayer.visible = false;
					}
				}
				if (_showAxisLabel) {
					if (_data) {
						genAxisLabels();
						locateAxisLabels();
						for each (var label:TextField in _axisLabels) {
							label.visible = true;
						}
					}
				} else {
					if (_axisLabels) {
						for each (label in _axisLabels) {
							label.visible = false;
						}
					}
				}
			}
		}
		
		/**
		 *	@private
		 */
		override protected function calculateUnitSize():void {
			if (_data) {
				var length:Number;
				if (_placement == GridPlacement.TOP || _placement == GridPlacement.BOTTOM) {
					length = _width;
				} else {
					length = _height;
				}
				if (_padding <= 1) {
					_unitSize = length / (_data.length - 1 + 2 * _padding);
				} else {
					_unitSize = (length - 2 * _padding) / (_data.length - 1);
				}
			}
		}
		
		/**
		 *	@private
		 */
		override protected function drawSplitLine():void {
			if (_splitLineLayer == null) {
				_splitLineLayer = new Shape();
				addChildAt(_splitLineLayer, 0);
			}
			
			var gp:Graphics = _splitLineLayer.graphics;
			gp.clear();
			var style:LineStyle = _styles["splitLineStyle"];
			gp.lineStyle(style.thickness, style.color, style.alpha);
			
			var i:int = (_padding == 0) ? 1 : 0;
			var len:int = (_padding == 0) ? _data.length - 1 : _data.length;
			len = (_showLastSplitLine) ? len+1 : len;
			var startPos:Number = (_padding <= 1) ? _padding * _unitSize : _padding;
			if (_placement == GridPlacement.BOTTOM || _placement == GridPlacement.TOP) {
				for (; i < len; i++) {
					var x:Number = startPos + i * _unitSize;
					gp.moveTo(x, 0);
					gp.lineTo(x, _height);
				}
			} else {
				for (; i < len; i++) {
					var y:Number = startPos + i * _unitSize;
					gp.moveTo(0, y);
					gp.lineTo(_width, y);
				}
			}
		}
		
		/**
		 *	@private
		 */
		override protected function drawTicks():void {
			if (_ticksLayer == null) {
				_ticksLayer = new Shape();
				addChildAt(_ticksLayer, 0)
			}
			var gp:Graphics = _ticksLayer.graphics;
			gp.clear();
			var style:LineStyle = _styles["tickStyle"];
			gp.lineStyle(style.thickness, style.color, style.alpha);
			
			var i:int = (_padding == 0) ? 1 : 0;
			var len:int = (_padding == 0) ? _data.length - 1 : _data.length;
			var startPos:Number = (_padding <= 1) ? _padding * _unitSize : _padding;
			var tickLength:Number = _styles["tickLength"];
			switch (_placement) {
				case GridPlacement.BOTTOM :
					for (; i < len; i++) {
						var x:Number = startPos + i * _unitSize;
						gp.moveTo(x, _height);
						gp.lineTo(x, _height + tickLength);
					}
					break;
				case GridPlacement.TOP :
					for (; i < len; i++) {
						x = startPos + i * _unitSize;
						gp.moveTo(x, _height);
						gp.lineTo(x, - tickLength);
					}
					break;
				case GridPlacement.LEFT :
					for (; i < len; i++) {
						var y:Number = startPos + i * _unitSize;
						gp.moveTo(0, y);
						gp.lineTo(- tickLength, y);
					}
					break;
				case GridPlacement.RIGHT :
					for (; i < len; i++) {
						y = startPos + i * _unitSize;
						gp.moveTo(_width, y);
						gp.lineTo(_width + tickLength, y);
					}
					break;
			}
		}

		/**
		 *	@private
		 */
		override protected function genAxisLabels():void {
			if (_axisLabels) {
				for each (var label:TextField in _axisLabels) {
					if (this.contains(label)) {
						this.removeChild(label);
					}
				}
			}
			
			_axisLabels = [];
			for each(var labelText:String in _data) {
				label = new TextField();
				label.defaultTextFormat = _styles["axisLabelTextFormat"];
				label.autoSize = "left";
				if (_styles["axisLabelMultiline"]) {
					label.multiline = true;
					label.wordWrap = true;
				} else {
					label.multiline = false;
					label.wordWrap = false;
					label.width = _unitSize;
				}
				label.htmlText = labelText;			//使用html是为了获得更大的灵活性
				addChild(label);
				_axisLabels.push(label);
			}
		}
		
		/**
		 *	@private
		 */
		override protected function locateAxisLabels():void {
			var len:int = _axisLabels.length;
			var startPos:Number = (_padding <= 1) ? _padding * _unitSize : _padding;
			var labelPadding:Number = _styles["axisLabelPadding"];
			switch (_placement) {
				case GridPlacement.BOTTOM :
					for (var i:int = 0; i < len; i++) {
						var x:Number = startPos + i * _unitSize;
						var label:TextField = _axisLabels[i];
						label.width = _unitSize;
						label.x = x - label.width / 2;
						label.y = _height + labelPadding;
					}
					break;
				case GridPlacement.TOP :
					for (i = 0; i < len; i++) {
						x = startPos + i * _unitSize;
						label = _axisLabels[i];
						label.width = _unitSize;
						label.x = x - label.width / 2;
						label.y = - labelPadding - label.height;
					}
					break;
				case GridPlacement.LEFT :
					for (i = 0; i < len; i++) {
						var y:Number = startPos + i * _unitSize;
						label = _axisLabels[i];
						label.x = - labelPadding - label.width;
						label.y = y - label.textHeight / 2;
					}
					break;
				case GridPlacement.RIGHT :
					for (i = 0; i < len; i++) {
						y = startPos + i * _unitSize;
						label = _axisLabels[i];
						label.x = _width + labelPadding;
						label.y = y - label.textHeight / 2;
					}
					break;
			}
		}
	
	}

}