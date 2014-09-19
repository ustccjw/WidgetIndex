package baidu.dv.grids {
	
	import flash.display.Sprite;
	import flash.display.Shape;
	import flash.display.Graphics;
	import flash.text.TextField;
	
	import baidu.lib.utils.NumberFormatter;
	import baidu.dv.core.Grid;
	import baidu.dv.core.GridPlacement;
	import baidu.dv.core.LineStyle;
	
	
	/**
	 *  数值坐标网格
	 *  @author xiaokun
	 */
	public class ValueGrid extends Grid {
		
		/**
		 *	@private
		 *	指定的最大值失效
		 */
		protected static const INVALID_TYPE_ASSIGNED_MAX_VALUE:String = "assignedMaxValue";
		
		/**
		 *	@private
		 *	指定的最小值失效
		 */
		protected static const INVALID_TYPE_ASSIGNED_MIN_VALUE:String = "assignedMinValue";
		
		/**
		 *	@private
		 *	原始数据的最大值失效
		 */
		protected static const INVALID_TYPE_RAW_MAX_VALUE:String = "rawMaxValue";
		
		/**
		 *	@private
		 *	原始数据的最小值失效
		 */
		protected static const INVALID_TYPE_RAW_MIN_VALUE:String = "rawMinValue";
		
		/**
		 *	@private
		 *	原始数据最大值与最终最大值之间的差额失效
		 */
		protected static const INVALID_TYPE_GAP_OF_MAX:String = "gapOfMax";
		
		/**
		 *	@private
		 *	原始数据最小值与最终最小值之间的差额失效
		 */
		protected static const INVALID_TYPE_GAP_OF_MIN:String = "gapOfMin";
		
		/**
		 *	@private
		 *	分割数目失效
		 */
		protected static const INVALID_TYPE_SPLIT_NUMBER:String = "splitNumber";
		
		/**
		 *	@private
		 *	坐标文本对应的数值相对10的幂失效
		 */
		protected static const INVALID_TYPE_AXIS_LABEL_POWER:String = "axisLabelPower";
		
		/**
		 *	@private
		 *	坐标文本标签的格式化模板失效
		 */
		protected static const INVALID_TYPE_AXIS_LABEL_TEMPLATE:String = "axisLabelTemplate";
		
		/**
		 *	@private
		 *	是否显示最后一条分割线失效
		 */
		protected static const INVALID_TYPE_SHOW_LAST_SPLIT_LINE:String = "showLastSplitLine";
		
		/**
		 *	@private
		 *	是否显示第一个坐标轴文本失效
		 */
		protected static const INVALID_TYPE_SHOW_FIRST_AXIS_LABEL:String = "showFirstAxisLabel";

		/**
		 *	@private
		 *	对应的类目坐标网格的位置失效
		 */
		protected static const INVALID_TYPE_CATEGORY_GRID_PLACEMENT:String = "categoryGridPlacement";
		
		
		/**
		 *	@private
		 *	指定的最大值
		 */
		protected var _assignedMaxValue:Number;
		
		/**
		 *	@private
		 *	指定的最小值
		 */
		protected var _assignedMinValue:Number;
		
		/**
		 *	@private
		 *	原始数据的最大值
		 */
		protected var _rawMaxValue:Number;
		
		/**
		 *	@private
		 *	原始数据的最小值
		 */
		protected var _rawMinValue:Number;
		
		/**
		 *	@private
		 *	原始数据最大值与最终最大值之间的差额，此数值为差额相比最大最小值之差的百分比
		 */
		protected var _gapOfMax:Number = 0;
		
		/**
		 *	@private
		 *	原始数据最小值与最终最小值之间的差额，此数值为差额相比最大最小值之差的百分比
		 */
		protected var _gapOfMin:Number = 0;
		
		/**
		 *	@private
		 *	最终的最大值
		 */
		protected var _finalMaxValue:Number;
		
		/**
		 *	@private
		 *	最终的最小值
		 */
		protected var _finalMinValue:Number;
		
		/**
		 *	@private
		 *	当前的分割数目
		 */
		protected var _splitNumber:int = 5;
		
		/**
		 *	@private
		 *	每个分割对应的像素值
		 */
		protected var _splitSize:Number;

		/**
		 *	@private
		 *	坐标文本对应的数值相对10的幂
		 */
		protected var _axisLabelPower:int = 0;
		
		/**
		 *	@private
		 *	坐标轴文本标签的格式化模板
		 */
		protected var _axisLabelTemplate:String;
		
		/**
		 *	@private
		 *	分割对应的值
		 */
		protected var _splitValue:Number;
		
		/**
		 *	@private
		 *	是否显示最后一条分割线
		 */
		protected var _showLastSplitLine:Boolean = false;
		
		/**
		 *	@private
		 *	是否显示第一个坐标轴文本标签
		 */
		protected var _showFirstAxisLabel:Boolean = true;
		
		/**
		 *	@private
		 *	配对的类目坐标网格的位置
		 */
		protected var _categoryGridPlacement:String = GridPlacement.BOTTOM;
		
		/**
		 *	构造函数
		 */
		public function ValueGrid() {
			super();
			
			_placement = GridPlacement.LEFT;
		}
		
		/**
		 *	此方法不做任何操作，设置数据请设置rawMaxValue和rawMinValue
		 */
		override public function set data(value:*):void {
			
		}
		
		/**
		 *	设置原始数据的最大值
		 */
		public function set rawMaxValue(value:Number):void {
			if (isNaN(value) || _rawMaxValue == value) {
				return;
			}
			
			_rawMaxValue = value;
			invalidate(INVALID_TYPE_RAW_MAX_VALUE);
			invalidate(Grid.INVALID_TYPE_UNIT_SIZE);
		}
		
		/**
		 *	设置原始数据的最小值
		 */
		public function set rawMinValue(value:Number):void {
			if (isNaN(value) || _rawMinValue == value) {
				return;
			}
			
			_rawMinValue = value;
			invalidate(INVALID_TYPE_RAW_MIN_VALUE);
			invalidate(Grid.INVALID_TYPE_UNIT_SIZE);
		}
		
		/**
		 *	获取/设置原始数据最大值与最终最大值之间的差额，此数值代表百分比
		 */
		public function get gapOfMax():Number {
			return _gapOfMax;
		}
		
		public function set gapOfMax(value:Number):void {
			if (isNaN(value) || _gapOfMax == value) {
				return;
			}
			
			_gapOfMax = value;
			invalidate(INVALID_TYPE_GAP_OF_MAX);
			invalidate(Grid.INVALID_TYPE_UNIT_SIZE);
		}
		
		/**
		 *	获取/设置原始数据最小值与最终最小值之间的差额，此数值代表百分比
		 */
		public function get gapOfMin():Number {
			return _gapOfMin;
		}
		
		public function set gapOfMin(value:Number):void {
			if (isNaN(value) || _gapOfMin == value) {
				return;
			}
			
			_gapOfMin = value;
			invalidate(INVALID_TYPE_GAP_OF_MIN);
			invalidate(Grid.INVALID_TYPE_UNIT_SIZE);
		}
		
		/**
		 *	获取/指定最大值，不指定就按给定数据自适应
		 */
		public function get assignedMaxValue():Number {
			return _assignedMaxValue;
		}
		
		public function set assignedMaxValue(value:Number):void {
			if (_assignedMaxValue == value) {
				return;
			}
			
			_assignedMaxValue = value;
			invalidate(Grid.INVALID_TYPE_UNIT_SIZE);
		}
		
		/**
		 *	获取/指定最小值，不指定就按给定数据自适应
		 */
		public function get assignedMinValue():Number {
			return _assignedMinValue;
		}
		
		public function set assignedMinValue(value:Number):void {
			if (_assignedMinValue == value) {
				return;
			}
			
			_assignedMinValue = value;
			invalidate(Grid.INVALID_TYPE_UNIT_SIZE);
		}
		
		/**
		 *	获取最终的最大值
		 */
		public function get maxValue():Number {
			if (isInvalid(INVALID_TYPE_UNIT_SIZE)) {
				calculateUnitSize();
				resetInvalidHash(INVALID_TYPE_UNIT_SIZE);
			}
			return _finalMaxValue;
		}
		
		/**
		 *	获取最终的最小值
		 */
		public function get minValue():Number {
			if (isInvalid(INVALID_TYPE_UNIT_SIZE)) {
				calculateUnitSize();
				resetInvalidHash(INVALID_TYPE_UNIT_SIZE);
			}
			return _finalMinValue;
		}
		
		/**
		 *	获取/指定最小值，不指定就按给定数据自适应
		 */
		public function get splitNumber():int {
			return _splitNumber;
		}
		
		public function set splitNumber(value:int):void {
			if (isNaN(value) || _splitNumber == value || value <= 0) {
				return;
			}
			
			_splitNumber = value;
			invalidate(INVALID_TYPE_SPLIT_NUMBER);
		}
		
		/**
		 *	设置坐标轴文本对应的数值相对10的幂<br/>
		 *	用于让坐标文本显示按需取整，比如设为2的时候，所有的坐标文本都会是100、200、300之类
		 */
		public function set axisLabelPower(value:int):void {
			if (isNaN(value) || _axisLabelPower == value) {
				return;
			}
			
			_axisLabelPower = value;
			invalidate(INVALID_TYPE_AXIS_LABEL_POWER);
		}
		
		/**
		 *	设置坐标轴文本标签的格式化模板
		 *	@see baidu.lib.utils.NumberFormatter
		 */
		public function set axisLabelTemplate(value:String):void {
			if (_axisLabelTemplate == value) {
				return;
			}
			
			_axisLabelTemplate = value;
			invalidate(INVALID_TYPE_AXIS_LABEL_TEMPLATE);
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
		 *	获取/设置是否显示第一个坐标轴文本
		 */
		public function get showFirstAxisLabel():Boolean {
			return _showFirstAxisLabel;
		}
		
		public function set showFirstAxisLabel(value:Boolean):void {
			if (_showFirstAxisLabel == value) {
				return;
			}
			
			_showFirstAxisLabel = value;
			invalidate(INVALID_TYPE_SHOW_FIRST_AXIS_LABEL);
		}
		
		/**
		 *	获取/设置对应的类目坐标网格的位置，此属性会影响坐标文本标签的排列顺序
		 */
		public function get categoryGridPlacement():String {
			return _categoryGridPlacement;
		}
		
		public function set categoryGridPlacement(value:String):void {
			if (_categoryGridPlacement == value) {
				return;
			}
			
			_categoryGridPlacement = value;
			invalidate(INVALID_TYPE_CATEGORY_GRID_PLACEMENT);
		}
		
		/**
		 *	根据一个位置获取对应的值
		 *	@param position	<Number>位置
		 *	@return 		<Number>对应的值
		 */
		public function getValueByPosition(position:Number):Number {
			if (isInvalid(INVALID_TYPE_UNIT_SIZE)) {
				calculateUnitSize();
			}
			var value:Number;
			if (_placement == GridPlacement.LEFT || _placement == GridPlacement.RIGHT) {
				if (_categoryGridPlacement == GridPlacement.BOTTOM) {
					value = (_height - position) / _unitSize + _finalMinValue;
				} else {
					value = position / _unitSize;
				}
			} else {
				if (_categoryGridPlacement == GridPlacement.LEFT) {
					value = position / _unitSize;
				} else {
					value = (_width - position) / _unitSize + _finalMinValue;
				}
			}
			return value;
		}
		
		/**
		 *	根据一个值获取对应的位置
		 *	@param value	<Number>值
		 *	@return 		<Number>值对应的位置
		 */
		public function getPositionByValue(value:Number):Number {
			if (isInvalid(INVALID_TYPE_UNIT_SIZE)) {
				calculateUnitSize();
			}
			var position:Number;
			if (_placement == GridPlacement.LEFT || _placement == GridPlacement.RIGHT) {
				if (_categoryGridPlacement == GridPlacement.BOTTOM) {
					position = _height - (value - _finalMinValue) * _unitSize;
				} else {
					position = value * _unitSize;
				}
			} else {
				if (_categoryGridPlacement == GridPlacement.LEFT) {
					position = value * _unitSize;
				} else {
					position = _width - (value - _finalMinValue) * _unitSize;
				}
			}
			return position;
		}
		
		/**
		 *	@private
		 */
		override protected function applyChanges():void {
			if (isNaN(_rawMinValue) || isNaN(_rawMaxValue)) {
				if (isNaN(_assignedMinValue) || isNaN(_assignedMaxValue)) {
					calculateSplitSize();
					drawLines();
					return;
				}
			}
			
			if (isInvalid(INVALID_TYPE_UNIT_SIZE)) {
				calculateUnitSize();
			}
			calculateSplitSize();
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
				if (_axisLabels == null || isInvalid(INVALID_TYPE_SPLIT_NUMBER)) {
					genAxisLabels();
				}
				refreshAxisLabelText();
				locateAxisLabels();
				for each (var label:TextField in _axisLabels) {
					label.visible = true;
				}
				if (!_showFirstAxisLabel) {
					_axisLabels[0].visible = false;
				}
			} else {
				if (_axisLabels) {
					for each (label in _axisLabels) {
						label.visible = false;
					}
				}
			}
		}

		/**
		 *	@private
		 *	除了计算每个计算单位对应的像素值，还计算分割对应的像素值和最终的最大最小值
		 */
		override protected function calculateUnitSize():void {	
			if (isNaN(_rawMinValue) || isNaN(_rawMaxValue)) {
				if (isNaN(_assignedMinValue) || isNaN(_assignedMaxValue)) {
					return;
				}
			}
			
			var p:Number = Math.pow(10, _axisLabelPower);

			if (!isNaN(_assignedMinValue)) {		//如果指定了最小值
				_finalMinValue = _assignedMinValue;
			} else {								//没有指定最小值
				_finalMinValue = _rawMinValue - _gapOfMin * (_rawMaxValue - _rawMinValue);
				_finalMinValue = Math.floor(_finalMinValue / p) * p;
			}
			if (!isNaN(_assignedMaxValue)) {		//如果指定了最大值
				_finalMaxValue = _assignedMaxValue;
				if (isNaN(_assignedMinValue)) {		//如果没有指定最小值
					if (_rawMinValue != _rawMaxValue) {	//最大最小值不相等
						_splitValue = (_finalMaxValue - _finalMinValue) / _splitNumber;
					} else {							//最大最小值相等
						_splitValue = (_assignedMaxValue - _rawMaxValue) * 2 / _splitNumber;
					}
					_splitValue = Math.ceil(_splitValue / p) * p;
					_finalMinValue = _finalMaxValue - _splitNumber * _splitValue;
				} else {							//如果指定了最小值
					_splitValue = (_finalMaxValue - _finalMinValue) / _splitNumber;
				}
			} else {								//没有指定最大值
				if (_rawMinValue != _rawMaxValue) {		//最大最小值不相等
					_finalMaxValue = _rawMaxValue + _gapOfMax * (_rawMaxValue - _rawMinValue);
					_splitValue = (_finalMaxValue - _finalMinValue) / _splitNumber;
					_splitValue = Math.ceil(_splitValue / p) * p;
				} else {								//最大最小值相等
					if (isNaN(_assignedMinValue)) {	//如果没有指定最小值
						_splitValue = p;
						var centerValue:Number = Math.ceil(_rawMinValue / p) * p;
						var centerSplitIndex:int = Math.round(_splitNumber / 2);
						_finalMinValue = centerValue - _splitValue * centerSplitIndex;
					} else {						//如果指定了最小值
						if (_rawMinValue == _assignedMinValue) {
							_splitValue = p;
						} else {
							_splitValue = (_rawMinValue - _assignedMinValue) * 2 / _splitNumber;
							_splitValue = Math.ceil(_splitValue / p) * p;
						}
					}
				}	
				_finalMaxValue = _finalMinValue + _splitNumber * _splitValue;
			}

			var length:Number;
			if (_placement == GridPlacement.LEFT || _placement == GridPlacement.RIGHT) {
				length = _height;
			} else {
				length = _width;
			}
			_unitSize = length / (_finalMaxValue - _finalMinValue);
		}

		/**
		 *	@private
		 *	计算分割的像素值
		 */
		protected function calculateSplitSize():void {
			if (_placement == GridPlacement.TOP || _placement == GridPlacement.BOTTOM) {
				_splitSize = _width / _splitNumber;
			} else {
				_splitSize = _height / _splitNumber;
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

			var len:int = (_showLastSplitLine) ? (_splitNumber + 1) : _splitNumber;
			if (_placement == GridPlacement.BOTTOM || _placement == GridPlacement.TOP) {
				if (_categoryGridPlacement == GridPlacement.RIGHT) {
					for (var i:int = 1; i < len; i++) {
						var x:Number = _width - i * _splitSize;
						gp.moveTo(x, 0);
						gp.lineTo(x, _height);
					}
				} else {
					for (i = 1; i < len; i++) {
						x = i * _splitSize;
						gp.moveTo(x, 0);
						gp.lineTo(x, _height);
					}
				}
			} else {
				if (_categoryGridPlacement == GridPlacement.TOP) {
					for (i = 1; i < len; i++) {
						var y:Number = i * _splitSize;
						gp.moveTo(0, y);
						gp.lineTo(_width, y);
					}
				} else {
					for (i = 1; i < len; i++) {
						y = _height - i * _splitSize;
						gp.moveTo(0, y);
						gp.lineTo(_width, y);
					}
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

			var tickLength:Number = _styles["tickLength"];
			switch (_placement) {
				case GridPlacement.LEFT :
					for (i = 1; i < _splitNumber; i++) {
						var y:Number = i * _splitSize;
						gp.moveTo(0, y);
						gp.lineTo(- tickLength, y);
					}
					break;
				case GridPlacement.RIGHT :
					for (i = 1; i < _splitNumber; i++) {
						y = i * _splitSize;
						gp.moveTo(_width, y);
						gp.lineTo(_width + tickLength, y);
					}
					break;
				case GridPlacement.BOTTOM :
					for (var i:int = 1; i < _splitNumber; i++) {
						var x:Number = i * _splitSize;
						gp.moveTo(x, _height);
						gp.lineTo(x, _height + tickLength);
					}
					break;
				case GridPlacement.TOP :
					for (i = 1; i < _splitNumber; i++) {
						x = i * _splitSize;
						gp.moveTo(x, _height);
						gp.lineTo(x, - tickLength);
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
			var len:int = (_showLastSplitLine) ? (_splitNumber + 1) : _splitNumber;
			for (var i:int = 0; i < len; i++) {
				label = new TextField();
				label.defaultTextFormat = _styles["axisLabelTextFormat"];
				label.autoSize = "left";
				if (_styles["axisLabelMultiline"]) {
					label.multiline = true;
					label.wordWrap = true;
				}
				addChild(label);
				_axisLabels.push(label);
			}
		}

		/**
		 *	@private
		 * 刷新坐标轴文本标签的内容
		 */
		protected function refreshAxisLabelText():void {
			for (var i:int = 0, len:int = _axisLabels.length; i < len; i++) {
				var label:TextField = _axisLabels[i];
				var value:Number = _finalMinValue + i * _splitValue;
				var text:String;
				if (_axisLabelTemplate) {
					text = NumberFormatter.format(value, _axisLabelTemplate);
				} else {
					// chenchao edit
					if (value >= 1) {
						text = Math.ceil(value).toString();
					} else {
						text = String(value.toFixed(2));
					}
				}
				label.text = text;
			}
		}
			
		/**
		 *	@private
		 */
		override protected function locateAxisLabels():void {
			var len:int = _axisLabels.length;
			var labelPadding:Number = _styles["axisLabelPadding"];
			switch (_placement) {
				case GridPlacement.LEFT :
					for (i = 0; i < len; i++) {
						var y:Number;
						if (_categoryGridPlacement == GridPlacement.TOP) {
							y = i * _splitSize;
						} else {
							y = _height - i * _splitSize; 
						}
						var label:TextField = _axisLabels[i];
						label.x = - labelPadding - label.width;
						label.y = y - label.textHeight / 2;
					}
					break;
				case GridPlacement.RIGHT :
					for (i = 0; i < len; i++) {
						if (_categoryGridPlacement == GridPlacement.TOP) {
							y = i * _splitSize;
						} else {
							y = _height - i * _splitSize; 
						}
						label = _axisLabels[i];
						label.x = _width + labelPadding;
						label.y = y - label.textHeight / 2;
					}
					break;
				case GridPlacement.BOTTOM :
					for (var i:int = 0; i < len; i++) {
						var x:Number;
						if (_categoryGridPlacement == GridPlacement.RIGHT) {
							x = _width - i * _splitSize;
						} else {
							x = i * _splitSize; 
						}
						label = _axisLabels[i];
						label.width = _splitSize;
						label.x = x - label.width / 2;
						label.y = _height + labelPadding;
					}
					break;
				case GridPlacement.TOP :
					for (i = 0; i < len; i++) {
						if (_categoryGridPlacement == GridPlacement.RIGHT) {
							x = _width - i * _splitSize;
						} else {
							x = i * _splitSize; 
						}
						label = _axisLabels[i];
						label.width = _splitSize;
						label.x = x - label.width / 2;
						label.y = - labelPadding - label.height;
					}
					break;
			}
		}
	}

}

