package baidu.dv.grids {
	
	import flash.display.Shape;
	import flash.display.Graphics;
	import flash.text.TextField;
	import flash.geom.Point;
	
	import baidu.dv.core.DVBase;
	import baidu.dv.core.GridPlacement;
	import baidu.dv.core.LineStyle;

	/**
	 *  日期类目坐标网格
	 *  @author xiaokun
	 */
	public class DateCategoryGrid extends CategoryGrid {
		
		/**
		 *	时间精度－年
		 */
		public static const DATE_UTIL_YEAR:uint	= 9;
		
		/**
		 *	时间精度－季度
		 */
		public static const DATE_UTIL_QUARTER:uint = 8;
		
		/**
		 *	时间精度－月
		 */
		public static const DATE_UTIL_MONTH:uint = 7;
		
		/**
		 *	时间精度－日
		 */
		public static const DATE_UTIL_DAY:uint = 6;
		
		/**
		 *	时间精度－小时
		 */
		public static const DATE_UTIL_HOUR:uint = 5;
		
		/**
		 *	时间精度－十分钟
		 */
		public static const DATE_UTIL_TEN_MINUTE:uint = 4;
		
		/**
		 *	时间精度－分钟
		 */
		public static const DATE_UTIL_MINUTE:uint = 3;
		
		/**
		 *	时间精度－十秒
		 */
		public static const DATE_UTIL_TEN_SECOND:uint = 2;
		
		/**
		 *	时间精度－秒
		 */
		public static const DATE_UTIL_SECOND:uint = 1;
		
		
		//秒、分、时、天、周所分别对应的毫秒值
		protected static const VALUE_SECOND:Number 	= 1000;
		protected static const VALUE_MINUTE:Number 	= VALUE_SECOND * 60;
		protected static const VALUE_HOUR:Number	= VALUE_MINUTE * 60;
		protected static const VALUE_DAY:Number 	= VALUE_HOUR * 24;
		protected static const VALUE_WEEK:Number 	= VALUE_DAY * 7;
		
		//各显示粒度的上限所对应的每像素毫秒值
		protected static const LIMIT_UNIT_SECOND:Number 	= VALUE_SECOND / 30;
		protected static const LIMIT_UNIT_TEN_SECOND:Number = VALUE_SECOND / 5;
		protected static const LIMIT_UNIT_MINUTE:Number 	= VALUE_MINUTE / 30;
		protected static const LIMIT_UNIT_TEN_MINUTE:Number = VALUE_MINUTE / 5;
		protected static const LIMIT_UNIT_HOUR:Number 		= VALUE_HOUR / 30;
		protected static const LIMIT_UNIT_SIX_HOUR:Number 	= VALUE_HOUR / 6;
		protected static const LIMIT_UNIT_DAY:Number 		= VALUE_DAY / 30;
		protected static const LIMIT_UNIT_WEEK:Number 		= VALUE_DAY / 7.5;
		protected static const LIMIT_UNIT_MONTH:Number 		= VALUE_DAY / 1.5;
		protected static const LIMIT_UNIT_QUARTER:Number 	= VALUE_DAY * 1.3;
		protected static const LIMIT_UNIT_YEAR:Number 		= VALUE_DAY * 12;
		
		/**
		 *	@private
		 *	最小时间精度失效
		 */
		protected static const INVALID_TYPE_MIN_DATE_UTIL:String = "minDateUtil";
		
		/**
		 *	@private
		 *	最小时间精度
		 */
		protected var _minDateUtil:uint = DATE_UTIL_DAY;
		
		/**
		 *	@private
		 *	所有分割线的位置
		 */
		protected var _splitPositions:Array;
		
		/**
		 *	@private
		 *	所有文本标签的中心位置
		 */
		protected var _axisLabelCenterPositions:Array;
		
		/**
		 *	@private
		 *	所有文本标签的内容
		 */
		protected var _axisLabelTexts:Array;
		
		/**
		 *	@private
		 *	遮罩层
		 */
		protected var _maskLayer:Shape;
		
		/**
		 *	构造函数
		 */
		public function DateCategoryGrid() {
			super();
			
			_placement = GridPlacement.BOTTOM;
			_showSplitLine = true;
		}
		
		
		/**
		 *	设置坐标网格的位置，只支持GridPlacement.BOTTOM和GridPlacement.TOP
		 */
		override public function set placement(value:String):void {
			if (_placement == value) {
				return;
			}
			if (value != GridPlacement.TOP
			   && value != GridPlacement.BOTTOM) {
				throw new Error("The placement given is not valid");
				return;
			}
			
			_placement = value;
			invalidate(INVALID_TYPE_PLACEMENT);
			invalidate(INVALID_TYPE_UNIT_SIZE);
		}
		
		/**
		 *	获取/设置两最小时间精度，如DateCategoryGrid.Date_Util_DAY
		 */
		public function get minDateUtil():uint {
			return _minDateUtil;
		}
	
		public function set minDateUtil(value:uint):void {
			if ((value <= 0) || (value > DATE_UTIL_YEAR)) {
				throw new Error("The minDateUtil given is not valid");
			}
			
			if (_minDateUtil == value) {
				return;
			}

			_minDateUtil = value;
			invalidate(INVALID_TYPE_MIN_DATE_UTIL);
		}
		
		/**
		 *	@private
		 *	这里不对某些情况再做细分，比如仅仅改变tick的显示与否，因为这种行为不会高频发生，而每次判断都会带来代价,只把最高频的属性改变单独处理，比如size改变
		 */
		override protected function applyChanges():void {
			if (isInvalid(INVALID_TYPE_SIZE)) {
				drawMask();
			}
			
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
				if (_showSplitLine || _showAxisLabel || _showTick) {
					calculateDateSplit();
				}
				drawLines();
				if (_showAxisLabel && _axisLabels) {
					locateAxisLabels();
				}
			} else {
				if (isInvalid(INVALID_TYPE_UNIT_SIZE)) {
					calculateUnitSize();
				}
				if (_showSplitLine || _showAxisLabel || _showTick) {
					calculateDateSplit();
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
		 *	计算时间划分，为绘制分割线和生成、定位文本标签服务
		 */
		protected function calculateDateSplit():void {
			if (_data == null) {
				return;
			}
			
			_splitPositions = [];
			_axisLabelCenterPositions = [];
			_axisLabelTexts = [];
			
			var dateSpan:Number = _data[_data.length - 1].valueOf() - _data[0].valueOf();
			
			var startPos:Number = (_padding <= 1) ? _padding * _unitSize : _padding;
			var i:Number = 0;
			var len:Number = _data.length;
			var date:Date;
			var splitPosition:Number;
			var labelCenterPosition:Number;
			var labelText:String;
			var pixels:Number = (_placement == GridPlacement.BOTTOM || _placement == GridPlacement.TOP) ? _width : _height;
			if ((dateSpan < LIMIT_UNIT_SECOND * pixels) && (_minDateUtil <= DATE_UTIL_SECOND)) {					//按秒显示
				//trace("second");
				var currentMinute:Number = _data[0].minutes;
				for (i = 0; i < len; i++) {
					date = _data[i];
					labelCenterPosition = splitPosition = startPos + i * _unitSize;
					if (date.minutes != currentMinute) {
						labelText = date.minutes + ":" + date.seconds;
						currentMinute = date.minutes;
					} else {
						labelText = date.seconds + "";
					}
					_splitPositions.push(splitPosition);
					_axisLabelCenterPositions.push(labelCenterPosition);
					_axisLabelTexts.push(labelText);
				}
			} else if ((dateSpan < LIMIT_UNIT_TEN_SECOND * pixels) && (_minDateUtil <= DATE_UTIL_TEN_SECOND)) {		//间隔10秒显示，且秒数为10的整数倍
				//trace("10seconds");
				currentMinute = _data[0].minutes;
				for (i = 0; i < len; i++) {
					date = _data[i];
					if (date.seconds % 10 == 0) {
						labelCenterPosition = splitPosition = startPos + i * _unitSize;
						if (date.minutes != currentMinute) {
							labelText = date.minutes + ":" + date.seconds;
							currentMinute = date.minutes;
						} else {
							labelText = date.seconds + "";
						}
						_splitPositions.push(splitPosition);
						_axisLabelCenterPositions.push(labelCenterPosition);
						_axisLabelTexts.push(labelText);
					}
				}
			} else if ((dateSpan < LIMIT_UNIT_MINUTE * pixels) && (_minDateUtil <= DATE_UTIL_MINUTE)) {			//按分钟显示	
				//trace("minute");
				date = _data[0];
				var currentHour:Number = date.hours;
				if (_minDateUtil != DATE_UTIL_MINUTE) {
					currentMinute = date.minutes;
					_axisLabelTexts.push(date.minutes + "");		//第一个不完整的分割段，单独处理
					for (i = 1; i < len; i++) {
						date = _data[i];
						if (date.minutes != currentMinute) {
							splitPosition = startPos + i * _unitSize;
							if (date.hours != currentHour) {
								labelText = date.hours + ":" + date.minutes;
								currentHour = date.hours;
							} else {
								labelText = date.minutes + "";
							}
							_splitPositions.push(splitPosition);
							_axisLabelTexts.push(labelText);
							currentMinute = date.minutes;
						}
					}
					genLabelCenterPositionsBySplit();
				} else {
					for (i = 0; i < len; i++) {
						date = _data[i];
						labelCenterPosition = splitPosition = startPos + i * _unitSize;
						if (date.hours != currentHour) {
							labelText = date.hours + ":" + date.minutes;
							currentHour = date.hours;
						} else {
							labelText = date.minutes + "";
						}
						_splitPositions.push(splitPosition);
						_axisLabelCenterPositions.push(labelCenterPosition);
						_axisLabelTexts.push(labelText);
					}
				}
			} else if ((dateSpan < LIMIT_UNIT_TEN_MINUTE * pixels) && (_minDateUtil <= DATE_UTIL_TEN_MINUTE)) {		//间隔10分钟显示，且分界线是10的整数倍
				//trace("10minutes");
				date = _data[0];
				currentHour = date.hours;
				if (_minDateUtil != DATE_UTIL_TEN_MINUTE) {
					var currentTenMinute:Number = Math.floor(date.minutes / 10);
					if (currentTenMinute == 0) {
						labelText = date.hours + ":" + currentTenMinute + "0" + "-" + currentTenMinute + "9";
					} else {
						labelText = currentTenMinute + "0" + "-" + currentTenMinute + "9";
					}
					_axisLabelTexts.push(labelText);			//第一个不完整的分割段，单独处理
					for (i = 1; i < len; i++) {
						date = _data[i];
						var tenMinute:Number = Math.floor(date.minutes / 10);
						if (tenMinute != currentTenMinute) {
							splitPosition = startPos + i * _unitSize;
							if (date.hours != currentHour || tenMinute == 0) {
								labelText = date.hours + ":" + tenMinute + "0" + "-" + tenMinute + "9";
								currentHour = date.hours;
							} else {
								labelText = tenMinute + "0" + "-" + tenMinute + "9";
							}
							_splitPositions.push(splitPosition);
							_axisLabelTexts.push(labelText);
							currentTenMinute = tenMinute;
						}
					}
					genLabelCenterPositionsBySplit();
				} else {
					for (i = 0; i < len; i++) {
						date = _data[i];
						if (date.minutes % 10 == 0) {
							labelCenterPosition = splitPosition = startPos + i * _unitSize;
							if (date.hours != currentHour) {
								labelText = date.hours + ":" + date.minutes;
								currentHour = date.hours;
							} else {
								labelText = date.minutes + "";
							}
							_splitPositions.push(splitPosition);
							_axisLabelCenterPositions.push(labelCenterPosition);
							_axisLabelTexts.push(labelText);
						}
					}
				}
			} else if ((dateSpan < LIMIT_UNIT_HOUR * pixels) && (_minDateUtil <= DATE_UTIL_HOUR)) {				//按小时显示
				//trace("hour");
				date = _data[0];
				currentHour = date.hours;
				var currentDate:Number = date.date;
				if (_minDateUtil != DATE_UTIL_HOUR) {
					_axisLabelTexts.push(date.hours + "");		//第一个不完整的分割段，单独处理
					for (i = 1; i < len; i++) {
						date = _data[i];
						if (date.hours != currentHour) {
							splitPosition = startPos + i * _unitSize;
							if (date.date != currentDate) {
								labelText = date.date + "日" + date.hours;
								currentDate = date.date;
							} else {
								labelText = date.hours + "";
							}
							_splitPositions.push(splitPosition);
							_axisLabelTexts.push(labelText);
							currentHour = date.hours;
						}
					}
					genLabelCenterPositionsBySplit();
				} else {
					for (i = 0; i < len; i++) {
						date = _data[i];
						labelCenterPosition = splitPosition = startPos + i * _unitSize;
						if (date.date != currentDate) {
							labelText = date.date + "日" + date.hours;
							currentDate = date.date;
						} else {
							labelText = date.hours + "";
						}
						_splitPositions.push(splitPosition);
						_axisLabelCenterPositions.push(labelCenterPosition);
						_axisLabelTexts.push(labelText);
					}
				}
			} else if ((dateSpan < LIMIT_UNIT_SIX_HOUR * pixels) && (_minDateUtil <= DATE_UTIL_HOUR)) {			//间隔6小时显示，且小时数为6的整数倍
				//trace("6hours");
				date = _data[0];
				var currentSixHour:Number = Math.floor(date.hours / 6);
				currentDate = date.date;
				_axisLabelTexts.push(currentSixHour * 6  + "-" + (currentSixHour * 6 + 5));			//第一个不完整的分割段，单独处理
				for (i = 1; i < len; i++) {
					date = _data[i];
					var sixHour:Number = Math.floor(date.hours / 6);
					if (sixHour != currentSixHour) {
						splitPosition = startPos + i * _unitSize;
						if (date.date != currentDate) {
							labelText = date.date + "日" + date.hours + "-" + (date.hours + 5);
							currentDate = date.date;
						} else {
							labelText = date.hours + "-" + (date.hours + 5);
						}
						_splitPositions.push(splitPosition);
						_axisLabelTexts.push(labelText);
						currentSixHour = sixHour;
					}
				}
				genLabelCenterPositionsBySplit();
			} else if ((dateSpan < LIMIT_UNIT_DAY * pixels) && (_minDateUtil <= DATE_UTIL_DAY)) {					//按天显示
				//trace("day");
				date = _data[0];
				currentDate = date.date;
				var currentMonth:Number = date.month;
				if (_minDateUtil != DATE_UTIL_DAY) {
					_axisLabelTexts.push(date.date + "日");		//第一个不完整的分割段，单独处理
					for (i = 1; i < len; i++) {
						date = _data[i];
						if (date.date != currentDate) {
							splitPosition = startPos + i * _unitSize;
							if (date.month != currentMonth) {
								labelText = (date.month + 1) + "月" + date.date + "日";
								currentMonth = date.month;
							} else {
								labelText = date.date + "日";
							}
							_splitPositions.push(splitPosition);
							_axisLabelTexts.push(labelText);
							currentDate = date.date;
						}
					}
					genLabelCenterPositionsBySplit();
				} else {
					for (i = 0; i < len; i++) {
						date = _data[i];
						labelCenterPosition = splitPosition = startPos + i * _unitSize;
						if (date.month != currentMonth) {
							labelText = (date.month + 1) + "月" + date.date + "日";
							currentMonth = date.month;
						} else {
							labelText = date.date + "日";
						}
						_splitPositions.push(splitPosition);
						_axisLabelCenterPositions.push(labelCenterPosition);
						_axisLabelTexts.push(labelText);
					}
				}
			} else if ((dateSpan < LIMIT_UNIT_WEEK * pixels) && (_minDateUtil <= DATE_UTIL_DAY)) {				//按周显示
				//trace("week");
				date = _data[0];
				var currentDay:Number = date.day;
				if (currentDay == 0) {
					currentDay = 7;
				}
				currentMonth = date.month;
				if (_minDateUtil != DATE_UTIL_DAY) {
					var firstDateOfWeek:Date = new Date(date.fullYear, date.month, date.date - date.day + 1);
					var lastDateOfWeek:Date = new Date(date.fullYear, date.month, date.date - date.day + 7);
					if (firstDateOfWeek.month != lastDateOfWeek.month) {
						labelText = (firstDateOfWeek.month + 1) + "月" + firstDateOfWeek.date + "日-" 
									+ (lastDateOfWeek.month + 1) + "-月" + lastDateOfWeek.date + "日";
					} else {
						labelText = firstDateOfWeek.date + "日-" + lastDateOfWeek.date + "日";
					}
					_axisLabelTexts.push(labelText);			//第一个不完整的分割段，单独处理
					for (i = 1; i < len; i++) {
						date = _data[i];
						if (date.day < currentDay) {
							splitPosition = startPos + i * _unitSize;
							lastDateOfWeek = new Date(date.fullYear, date.month, date.date + 6);
							if (date.month != lastDateOfWeek.month) {
								labelText = (date.month + 1) + "月" + date.date + "日-" 
											+ (lastDateOfWeek.month + 1) + "月" + lastDateOfWeek.date + "日";
							} else {
								labelText = date.date + "日-" + lastDateOfWeek.date + "日";
							}
							_splitPositions.push(splitPosition);
							_axisLabelTexts.push(labelText);
						}	
						currentDay = date.day;
					}
					genLabelCenterPositionsBySplit();
				} else {																			//显示所有的周一
					for (i = 0; i < len; i++) {
						date = _data[i];
						if (date.day == 1) {
							labelCenterPosition = splitPosition = startPos + i * _unitSize;
							if (date.month != currentMonth) {
								labelText = (date.month + 1) + "月" + date.date + "日";
								currentMonth = date.month;
							} else {
								labelText = date.date + "日";
							}
							_splitPositions.push(splitPosition);
							_axisLabelCenterPositions.push(labelCenterPosition);
							_axisLabelTexts.push(labelText);
						}
					}
				}
			} else if ((dateSpan < LIMIT_UNIT_MONTH * pixels) && (_minDateUtil <= DATE_UTIL_MONTH)) {				//按月显示
				//trace("month");
				date = _data[0];
				currentMonth = date.month;
				var currentYear:Number = date.fullYear;
				if (_minDateUtil != DATE_UTIL_MONTH) {
					_axisLabelTexts.push((date.month + 1) + "月");		//第一个不完整的分割段，单独处理
					for (i = 1; i < len; i++) {
						date = _data[i];
						if (date.month != currentMonth) {
							splitPosition = startPos + i * _unitSize;
							if (date.fullYear != currentYear) {
								labelText = date.fullYear + "年" + (date.month + 1) + "月";
								currentYear = date.fullYear;
							} else {
								labelText = (date.month + 1) + "月";
							}
							_splitPositions.push(splitPosition);
							_axisLabelTexts.push(labelText);
							currentMonth = date.month;
						}
					}
					genLabelCenterPositionsBySplit();
				} else {
					for (i = 0; i < len; i++) {
						date = _data[i];
						labelCenterPosition = splitPosition = startPos + i * _unitSize;
						if (date.fullYear != currentYear) {
							labelText = date.fullYear + "年" + (date.month + 1) + "月";
							currentYear = date.fullYear;
						} else {
							labelText = (date.month + 1) + "月";
						}
						_splitPositions.push(splitPosition);
						_axisLabelCenterPositions.push(labelCenterPosition);
						_axisLabelTexts.push(labelText);
					}
				}
			} else if ((dateSpan < LIMIT_UNIT_QUARTER * pixels) && (_minDateUtil <= DATE_UTIL_MONTH)) {			//按季度显示
				//trace("quarter");
				date = _data[0];
				var currentQuarter:Number = Math.floor(date.month / 3);
				currentYear = date.fullYear;
				if (currentQuarter == 0) {
					labelText = currentYear + "年" + (currentQuarter * 3 + 1)  + "-" + (currentQuarter * 3 + 3) + "月";
				} else {
					labelText = (currentQuarter * 3 + 1)  + "-" + (currentQuarter * 3 + 3) + "月";
				}
				_axisLabelTexts.push(labelText);
				for (i = 1; i < len; i++) {
					date = _data[i];
					var quarter:Number = Math.floor(date.month / 3);
					if (quarter != currentQuarter) {
						splitPosition = startPos + i * _unitSize;
						currentYear = date.fullYear;
						if (quarter == 0) {
							labelText = currentYear + "年" + (quarter * 3 + 1)  + "-" + (quarter * 3 + 3) + "月";
						} else {
							labelText = (quarter * 3 + 1)  + "-" + (quarter * 3 + 3) + "月";
						}
						_splitPositions.push(splitPosition);
						_axisLabelTexts.push(labelText);
						currentQuarter = quarter;
					}
				}
				genLabelCenterPositionsBySplit();
			} else if ((dateSpan < LIMIT_UNIT_YEAR * pixels) && (_minDateUtil <= DATE_UTIL_YEAR)) {				//按年显示
				//trace("year");
				date = _data[0];
				currentYear = date.fullYear;
				if (_minDateUtil != DATE_UTIL_YEAR) {
					_axisLabelTexts.push(date.fullYear + "年");		//第一个不完整的分割段，单独处理
					for (i = 1; i < len; i++) {
						date = _data[i];
						if (date.fullYear != currentYear) {
							splitPosition = startPos + i * _unitSize;
							labelText = date.fullYear + "年";
							_splitPositions.push(splitPosition);
							_axisLabelTexts.push(labelText);
							currentYear = date.fullYear;
						}
					}
					genLabelCenterPositionsBySplit();
				} else {
					for (i = 0; i < len; i++) {
						date = _data[i];
						labelCenterPosition = splitPosition = startPos + i * _unitSize;
						labelText = date.fullYear + "年";
						_splitPositions.push(splitPosition);
						_axisLabelCenterPositions.push(labelCenterPosition);
						_axisLabelTexts.push(labelText);
					}
				}
			} else {
				//trace("wow");
			}
		}
		
		/**
		 *	@private
		 *	补全分割点并计算所有的文本标签中心点
		 *	采用的补全方式虽然不是很精确，不过这样效率最高，对结果影响也不大
		 */
		private function genLabelCenterPositionsBySplit():void {
			var splitLen:Number = _splitPositions.length;
			
			//添加第一条数据
			if (splitLen > 1) {
				var firstPosition:Number = _splitPositions[0] - (_splitPositions[1] - _splitPositions[0]);
				_splitPositions.unshift(firstPosition);
				splitLen++;
			} else {
				
			}
			
			//添加最后一条数据
			if (splitLen > 1) {
				var lastPosition:Number = 2 * _splitPositions[splitLen - 1] - _splitPositions[splitLen - 2];
				_splitPositions.push(lastPosition);
				splitLen++;
			} else {
				
			}
			
			//计算文本标签的中心点
			for (var i:Number = 0; i < splitLen - 1; i++) {
				var labelCenterPosition:Number = (_splitPositions[i + 1] + _splitPositions[i]) / 2;
				_axisLabelCenterPositions.push(labelCenterPosition);
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
			for each (var posX:Number in _splitPositions) {
				gp.moveTo(posX, 0);
				gp.lineTo(posX, _height);
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
				case GridPlacement.BOTTOM :
					for each (var posXB:Number in _splitPositions) {
						gp.moveTo(posXB, _height);
						gp.lineTo(posXB, _height + tickLength);
					}
					break;
				case GridPlacement.TOP :
					for each (var posXT:Number in _splitPositions) {
						gp.moveTo(posXT, _height);
						gp.lineTo(posXT, - tickLength);
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
			for each(var labelText:String in _axisLabelTexts) {
				label = new TextField();
				label.defaultTextFormat = _styles["axisLabelTextFormat"];
				label.autoSize = "left";
				if (_styles["axisLabelMultiline"]) {
					label.multiline = true;
					label.wordWrap = true;
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
			var labelPadding:Number = _styles["axisLabelPadding"];
			switch (_placement) {
				case GridPlacement.BOTTOM :
					for (var i:int = 0; i < len; i++) {
						var x:Number = _axisLabelCenterPositions[i];
						var label:TextField = _axisLabels[i];
						label.width = _unitSize;
						label.x = x - label.width / 2;
						label.y = _height + labelPadding;
					}
					break;
				case GridPlacement.TOP :
					for (i = 0; i < len; i++) {
						x = _axisLabelCenterPositions[i];
						label = _axisLabels[i];
						label.width = _unitSize;
						label.x = x - label.width / 2;
						label.y = - labelPadding - label.height;
					}
					break;
			}
		}
		
		/**
		 *	@private
		 *	绘制遮罩
		 */
		protected function drawMask():void {
			if (_maskLayer == null) {
				_maskLayer = new Shape();
				addChild(_maskLayer);
				this.mask = _maskLayer;
			}
			var gp:Graphics = _maskLayer.graphics;
			gp.clear();
			gp.beginFill(0xff0000, 1);
			gp.drawRect(0, - 100, _width, _height + 200);
			gp.endFill();
		}
	
	}

}