package baidu.dv.graphs {
	
	import baidu.dv.core.GraphItem;
	import baidu.dv.core.LineStyle;
	
	import flash.display.Graphics;
	
	/**
	 * 填充颜色
	 */
	[Style(name="fillColor", type="uint")]
	
	/**
	 * 填充透明度
	 */
	[Style(name="fillAlpha", type="Number")]
	
	/**
	 * 边框样式
	 */
	[Style(name="borderStyle", type="baidu.dv.core.LineStyle")]
	
	
	/**
	 * 强调显示时的填充颜色
	 */
	[Style(name="emphasizedFillColor", type="uint")]
	
	/**
	 * 强调显示时的填充透明度
	 */
	[Style(name="emphasizedFillAlpha", type="Number")]
	
	/**
	 * 强调显示时的边框样式
	 */
	[Style(name="emphasizedBorderStyle", type="baidu.dv.core.LineStyle")]
	
	
	/**
	 *  3D柱状图形项
	 *  @author yang_dong@baidu.com
	 */
	public class BarItem3D extends GraphItem {
		
		/**
		 * 专用于3D图形项的图示数据perspective
		 * 所有数据的最大值
		 */
		protected var _allMaxValue:Number = int.MAX_VALUE;
		
		/**
		 * 专用于3D图形项的图示数据
		 * 所有数据的最小值
		 */
		protected var _allMixValue:Number = 0;
		
		/**
		 * 专用于3D图形项的图示数据
		 * 自身的数据
		 */
		protected var _selfValue:Number = 0;
		
		/**
		 * 专用于3D图形项的图示数据
		 * item所在的graph的_numSeries
		 */
		protected var _numSeries:uint = 0;
		
		/**
		 * 专用于3D图形项的图示数据
		 * item所在的graph的_numSeries
		 */
		protected var _dataLength:uint = 0;
		
		/**
		 * 专用于3D图形项的图示数据
		 * 侧面最里面的那个点离正面0点的距离高度
		 * 这个值每个item是一样
		 */
		protected var _sideAreaDeltHeight:Number = 0;
		
		/**
		 * 专用于3D图形项的图示数据
		 * 顶面最里面的那个点离正面0点的距离高度
		 * 这个值每个item不一样，数值越大这个越小，显示仰角
		 */
		protected var _topAreaDeltHeight:Number = 0;
		
		/**
		 * 专用于3D图形项的图示数据
		 * 侧面最里面的那个点偏离角度
		 * 这个值每个item不一样，中间为0，左-右+
		 */
		protected var _sideAreaAngle:Number = 0;
		
		/**
		 * 设置/获取所有数据最大值
		 */
		public function set allMaxValue(value:Number):void {
			_allMaxValue = value;
		}
		public function get allMaxValue():Number {
			return _allMaxValue;
		}
		
		/**
		 * 设置/获取所有数据最小值
		 */
		public function set allMinValue(value:Number):void {
			_allMixValue = value;
		}
		public function get allMinValue():Number {
			return _allMixValue;
		}
		
		/**
		 * 设置/获取自身数据
		 */
		public function set selfValue(value:Number):void {
			_selfValue = value;
		}
		public function get selfValue():Number {
			return _selfValue;
		}
		
		/**
		 * 设置获取item所在graph的_numSeries
		 * 根据_numSeries, index，计算透视数据旋转角度偏移量
		 */
		public function set numSeries(value:uint):void {
			_numSeries = value;
		}
		public function get numSeries():uint {
			return _numSeries;
		}
		
		/**
		 * 设置获取数据数组长度
		 */
		public function set dataLength(value:uint):void {
			_dataLength = value;
		}
		public function get dataLength():uint {
			return _dataLength;
		}
		
		/**
		 *	构造函数
		 */
		public function BarItem3D() {
			super();
			
			//因为BarItem可以不用设置任何参数即使用，所以这里设置一下失效
			invalidate("all");
		}

		/**
		 *  @private
		 */
		override protected function initStyle():void {	
			_styles["fillColor"] = 0x666666;
			_styles["fillAlpha"] = 1;
			_styles["emphasizedFillColor"] = 0x666666;
			_styles["emphasizedFillAlpha"] = 1;
		}
		
		/**
		 *	@private
		 */
		override protected function applyChanges():void {	
			draw();
		}

		/**
		 *	@private
		 */
		override protected function doEmphasize():void {
			draw();
		}

		/**
		 *	@private
		 */
		override protected function doNormalize():void {
			draw();
		}
		
		/**
		 *	@private
		 *	绘图
		 *  决定透视效果的3个量：侧面高度，顶面高度，两者角度
		 */
		protected function draw():void {
			
			//计算透视数据
			caculatePerspectiveData();
			
			graphics.clear();
			
			//透视参数
			var centerIndex:Number = _dataLength / 2;
			var groupIndex:int = Math.floor(_index / _numSeries);
			
			//四个顶点
			var p0:Object = {x:0, y:0};
			var p1:Object = {x:0, y:0};
			var p2:Object = {x:0, y:0};
			var p3:Object = {x:0, y:0};
			
			if (_emphasized) {
				
				var emphasizedStyle:LineStyle = _styles["emphasizedBorderStyle"];
				if (emphasizedStyle) {
					graphics.lineStyle(emphasizedStyle.thickness, emphasizedStyle.color, emphasizedStyle.alpha);
				} else {
					graphics.lineStyle();
				}
				
				//侧面
				graphics.beginFill(getLiteColor(_styles["emphasizedFillColor"]), _styles["emphasizedFillAlpha"]);
				if(groupIndex < centerIndex) {
					p0 = {x:_width, y:0};
					p1 = {x:_width, y:_height};
					p2 = {x:_width + _sideAreaDeltHeight * Math.tan(- _sideAreaAngle  * Math.PI / 180), y:_height - _sideAreaDeltHeight};
					p3 = {x:_width + _sideAreaDeltHeight * Math.tan(- _sideAreaAngle  * Math.PI / 180), y:- _topAreaDeltHeight};
				}else {
					p0 = {x:0, y:0};
					p1 = {x:0, y:_height};
					p2 = {x:- _sideAreaDeltHeight * Math.tan(_sideAreaAngle  * Math.PI / 180), y:_height - _sideAreaDeltHeight};
					p3 = {x:- _sideAreaDeltHeight * Math.tan(_sideAreaAngle  * Math.PI / 180), y:- _topAreaDeltHeight};
				}
				graphics.moveTo(p0.x, p0.y);
				graphics.lineTo(p1.x, p1.y);
				graphics.lineTo(p2.x, p2.y);
				graphics.lineTo(p3.x, p3.y);
				graphics.lineTo(p0.x, p0.y);
				
				//顶面
				graphics.beginFill(getDarkColor(_styles["emphasizedFillColor"]), _styles["emphasizedFillAlpha"]);
				if(groupIndex < centerIndex) {
					p0 = {x:0, y:0};
					p1 = {x:_width, y:0};
					p2 = {x:_width + _sideAreaDeltHeight * Math.tan(- _sideAreaAngle  * Math.PI / 180), y:- _topAreaDeltHeight};
					p3 = {x:_sideAreaDeltHeight * Math.tan(- _sideAreaAngle  * Math.PI / 180), y:- _topAreaDeltHeight};
				}else {
					p0 = {x:0, y:0};
					p1 = {x:_width, y:0};
					p2 = {x:_width - _sideAreaDeltHeight * Math.tan(_sideAreaAngle  * Math.PI / 180), y:- _topAreaDeltHeight};
					p3 = {x:- _sideAreaDeltHeight * Math.tan(_sideAreaAngle  * Math.PI / 180), y:- _topAreaDeltHeight};
				}
				graphics.moveTo(p0.x, p0.y);
				graphics.lineTo(p1.x, p1.y);
				graphics.lineTo(p2.x, p2.y);
				graphics.lineTo(p3.x, p3.y);
				graphics.lineTo(p0.x, p0.y);
				
				//正面
				graphics.beginFill(_styles["emphasizedFillColor"], _styles["emphasizedFillAlpha"]);
				graphics.drawRect(0, 0, _width, _height);
				
			} else {
				
				//边框线型
				var style:LineStyle = _styles["borderStyle"];
				if (style) {
					graphics.lineStyle(style.thickness, style.color, style.alpha);
				} else {
					graphics.lineStyle();
				}
				
				//侧面
				graphics.beginFill(getLiteColor(_styles["fillColor"]), _styles["fillAlpha"]);
				if(groupIndex < centerIndex) {
					p0 = {x:_width, y:0};
					p1 = {x:_width, y:_height};
					p2 = {x:_width + _sideAreaDeltHeight * Math.tan(- _sideAreaAngle  * Math.PI / 180), y:_height - _sideAreaDeltHeight};
					p3 = {x:_width + _sideAreaDeltHeight * Math.tan(- _sideAreaAngle  * Math.PI / 180), y:- _topAreaDeltHeight};
				}else {
					p0 = {x:0, y:0};
					p1 = {x:0, y:_height};
					p2 = {x:- _sideAreaDeltHeight * Math.tan(_sideAreaAngle  * Math.PI / 180), y:_height - _sideAreaDeltHeight};
					p3 = {x:- _sideAreaDeltHeight * Math.tan(_sideAreaAngle  * Math.PI / 180), y:- _topAreaDeltHeight};
				}
				graphics.moveTo(p0.x, p0.y);
				graphics.lineTo(p1.x, p1.y);
				graphics.lineTo(p2.x, p2.y);
				graphics.lineTo(p3.x, p3.y);
				graphics.lineTo(p0.x, p0.y);
				
				//顶面
				graphics.beginFill(getDarkColor(_styles["fillColor"]), _styles["fillAlpha"]);
				if(groupIndex < centerIndex) {
					p0 = {x:0, y:0};
					p1 = {x:_width, y:0};
					p2 = {x:_width + _sideAreaDeltHeight * Math.tan(- _sideAreaAngle  * Math.PI / 180), y:- _topAreaDeltHeight};
					p3 = {x:_sideAreaDeltHeight * Math.tan(- _sideAreaAngle  * Math.PI / 180), y:- _topAreaDeltHeight};
				}else {
					p0 = {x:0, y:0};
					p1 = {x:_width, y:0};
					p2 = {x:_width - _sideAreaDeltHeight * Math.tan(_sideAreaAngle  * Math.PI / 180), y:- _topAreaDeltHeight};
					p3 = {x:- _sideAreaDeltHeight * Math.tan(_sideAreaAngle  * Math.PI / 180), y:- _topAreaDeltHeight};
				}
				graphics.moveTo(p0.x, p0.y);
				graphics.lineTo(p1.x, p1.y);
				graphics.lineTo(p2.x, p2.y);
				graphics.lineTo(p3.x, p3.y);
				graphics.lineTo(p0.x, p0.y);
				
				//正面
				graphics.beginFill(_styles["fillColor"], _styles["fillAlpha"]);
				graphics.drawRect(0, 0, _width, _height);
				
				/*
				//临时参数 for test
				var angle:Number = 45;
				var delt:Number = _width / 4;
				
				//侧面，高度是一样的，角度不一样，决定侧面能看到的面积
				graphics.beginFill(getLiteColor(_styles["fillColor"]), _styles["fillAlpha"]);
				graphics.moveTo(_width, 0);
				graphics.lineTo(_width, _height);
				graphics.lineTo(_width + delt / Math.tan(angle  * Math.PI / 180), _height - delt);
				graphics.lineTo(_width + delt / Math.tan(angle  * Math.PI / 180), - delt);
				graphics.lineTo(_width, 0);
				
				//顶面，高度变化，角度变化，变化趋势与上述变化一致
				graphics.beginFill(getDarkColor(_styles["fillColor"]), _styles["fillAlpha"]);
				graphics.moveTo(0, 0);
				graphics.lineTo(_width, 0);
				graphics.lineTo(_width + delt / Math.tan(angle  * Math.PI / 180), - delt);
				graphics.lineTo(delt / Math.tan(angle  * Math.PI / 180), - delt);
				graphics.lineTo(0, 0);
				*/
				
			}
			
			graphics.endFill();
		}
		
		/**
		 * @private
		 * 获取比设置颜色稍微深一点的颜色值
		 */
		protected function getDarkColor(color:uint):uint {
			return changeBrightness(color, -30);
			/*
			var r:uint = color >> 16 & 0xFF / 1.2;
			var g:uint = color >> 8 & 0xFF / 1.2;
			var b:uint = color & 0xFF / 1.2;
			return r << 16 | g << 8 | b;
			*/
		}
		
		/**
		 * @private
		 * 获取比设置颜色稍微浅一点的颜色值
		 */
		protected function getLiteColor(color:uint):uint {
			return changeBrightness(color, 30);
		}
		
		/**
		 * 调整某个颜色的亮度
		 * rgb:以RGB模式表示的颜色值
		 * brite:亮度调整幅度0不变255全白-255全黑
		 */
		protected function changeBrightness(rgb:uint, brightness:Number):uint {
			var r:Number = Math.max(Math.min(((rgb >> 16) & 0xFF) + brightness, 255), 0);
			var g:Number = Math.max(Math.min(((rgb >> 8) & 0xFF) + brightness, 255), 0);
			var b:Number = Math.max(Math.min((rgb & 0xFF) + brightness, 255), 0);
			
			return (r << 16) | (g << 8) | b;
		} 
		
		/**
		 * 计算透视数据
		 * 所依据的量：min max self index numSeries dataLength
		 * 需要计算的量
		 * _topAreaDeltHeight, _sideAreaAngle, _sideAreaDeltHeight
		 */
		protected function caculatePerspectiveData():void {
			
			//侧面高度
			_sideAreaDeltHeight = _width / 4;
			
			//顶面高度
			//如果最低值为width，最高值为1/10width，其实就是对9/10width均分
			var deltD:Number = (_allMaxValue - _allMixValue) * 1.5;
			//_topAreaDeltHeight = (0.1 + 0.9 * _selfValue / deltD) * _width / 4;
			_topAreaDeltHeight = (0.9 - 0.8 * (_selfValue - _allMixValue) / deltD) * _width / 4;
			
			//侧面角度，这个角度有所在的index决定
			//角度不一定都是45评分，如果超过了10items，就按照len / 2 * 10
			var ANGLE_ALL:Number = ((_dataLength < 10)?(Math.floor(_dataLength / 2) * 10):(45));
			var centerIndex:Number = _dataLength / 2;
			var groupIndex:int = Math.floor(_index / _numSeries);
			if(_dataLength % 2 == 0) {
				centerIndex -= 0.5;
			}else {
				centerIndex = Math.floor(centerIndex);
			}
			_sideAreaAngle = (ANGLE_ALL / centerIndex) * (groupIndex - centerIndex);
			
		}
		
	}

}

