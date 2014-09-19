package baidu.dv.graphs {
	
	import baidu.dv.core.LineStyle;
	import baidu.dv.graphs.PieItem;
	
	import flash.display.Graphics;
	import flash.display.Sprite;
	
	/**
	 * 该3D饼图区域块的厚度
	 */
	[Style(name = "pieThick", type = "Number")]
	
	/**
	 * 三维平面饼图更新升级
	 * @version	2011.04.15	
	 * @author	zhaoshu
	 */
	public class PieItem3D extends PieItem {
		
		/**
		 * @private
		 * 饼图的厚度
		 */
		private var _pieThick:Number;
		
		/**
		 * @private
		 * 椭圆长轴
		 */
		private var _ellipseA:Number;
		
		/**
		 * @private
		 * 椭圆短轴
		 */
		private var _ellipseB:Number;
		
		/**
		 * 构造函数
		 */
		public function PieItem3D() {
			super();
		}
		
		/**
		 * @private
		 * 初始化变量
		 */
		override protected function initVars():void {
			super.initVars();
			
			_ellipseA = _data["radius"];
			_ellipseB = _ellipseA * 0.5;
			_pieThick = _styles["pieThick"] || _ellipseB * 0.4;
			
			_lX = (this._ellipseA / this._radius) * Math.cos(Math.PI * _centerAngle / 180);
			_lY = (this._ellipseB  / this._radius) * Math.sin(Math.PI * _centerAngle / 180);
			_distanceX = _lX * _emphasizeDistance * this._radius;
			_distanceY = _lY * _emphasizeDistance * this._radius;
		}
		
		/**
		 * @private 
		 * 绘制items
		 */
		override protected function drawPieItem():void {
			this._pieItem = new Sprite();
			this.addChild(this._pieItem);
			
			var color:int = this._styles["color"];
			var darkColor:int = getDarkColor(color);
			var gp:Graphics = this._pieItem.graphics;
			gp.lineStyle();
			
			if (!(_startAngle <= 90 && _endAngle >= 270)) {
				//内弧，即底面
				gp.beginFill(color);
				gp.moveTo(0, _pieThick);
				for (var step:Number = this._startAngle; step < this._endAngle; step += 0.1) {
					var px:Number = this._ellipseA * Math.cos(Math.PI * step / 180);
					var py:Number = this._ellipseB * Math.sin(Math.PI * step / 180) + _pieThick;
					gp.lineTo(px, py);
				}
				gp.endFill();
			}
			
			//画内侧面，即起始侧面
			gp.beginFill(darkColor);
			gp.moveTo(0, _pieThick);
			gp.lineTo(this._ellipseA * Math.cos(Math.PI * _startAngle / 180), this._ellipseB * Math.sin(Math.PI * _startAngle / 180) + _pieThick);
			gp.lineTo(this._ellipseA * Math.cos(Math.PI * _startAngle / 180), this._ellipseB * Math.sin(Math.PI * _startAngle / 180));
			gp.lineTo(0, 0);
			gp.endFill();
			
			if (!(_startAngle <= 90 && _endAngle >= 270)) {
				//画外侧面，即结束侧面
				gp.beginFill(darkColor);
				gp.moveTo(0, _pieThick);
				gp.lineTo(this._ellipseA * Math.cos(Math.PI * _endAngle / 180), this._ellipseB * Math.sin(Math.PI * _endAngle / 180) + _pieThick);
				gp.lineTo(this._ellipseA * Math.cos(Math.PI * _endAngle / 180), this._ellipseB * Math.sin(Math.PI * _endAngle / 180));
				gp.lineTo(0, 0);
				gp.endFill();
			}
			
			//画外弧侧面
			gp.beginFill(darkColor);
			gp.moveTo(this._ellipseA * Math.cos(Math.PI * _startAngle / 180), this._ellipseB * Math.sin(Math.PI * _startAngle / 180) + _pieThick);
			gp.lineTo(this._ellipseA * Math.cos(Math.PI * _startAngle / 180), this._ellipseB * Math.sin(Math.PI * _startAngle / 180));
			//在跨越0°和180°的时候，需要将外弧面分成两部分
			var twoPart:Boolean = false;
			for (step = this._startAngle; step < this._endAngle;) {
				px = this._ellipseA * Math.cos(Math.PI * step / 180);
				py = this._ellipseB * Math.sin(Math.PI * step / 180);
				gp.lineTo(px, py);
				if ((_startAngle <= 180 && step >= 180) || (_startAngle <= 360 && step >= 360)) {
					twoPart = true;
					gp.lineTo(this._ellipseA * Math.cos(Math.PI * step / 180), this._ellipseB * Math.sin(Math.PI * step / 180) + _pieThick);
					for (; step > this._startAngle; ) {
						gp.lineTo(this._ellipseA * Math.cos(Math.PI * step / 180), this._ellipseB * Math.sin(Math.PI * step / 180) + _pieThick);
						step -= 0.1;
					}
					break;
				}else {
					step += 0.1;
					continue;
				}
			}
			if (!twoPart) {
				gp.lineTo(this._ellipseA * Math.cos(Math.PI * _endAngle / 180), this._ellipseB * Math.sin(Math.PI * _endAngle / 180));
				gp.lineTo(this._ellipseA * Math.cos(Math.PI * _endAngle / 180), this._ellipseB * Math.sin(Math.PI * _endAngle / 180) + _pieThick);
				for (; step > this._startAngle; step -= 0.1) {
					gp.lineTo(this._ellipseA * Math.cos(Math.PI * step / 180), this._ellipseB * Math.sin(Math.PI * step / 180) + _pieThick);
				}
			}
			gp.lineTo(this._ellipseA * Math.cos(Math.PI * _startAngle / 180), this._ellipseB * Math.sin(Math.PI * _startAngle / 180) + _pieThick);
			gp.endFill();
			
			//画上表面
			gp.beginFill(color);
			gp.moveTo(0, 0);
			for (step = this._startAngle; step < this._endAngle; step += 0.1) {
				px = this._ellipseA * Math.cos(Math.PI * step / 180);
				py = this._ellipseB * Math.sin(Math.PI * step / 180);
				gp.lineTo(px, py);
			}
			gp.endFill();
		}
		
		/**
		 * @private
		 * 绘制标签与饼图区域块之间的连接线
		 */
		override protected function drawLabelLine(emphasized:Boolean = false):void {
			//重新绘制或者是删除连接细线
			if (this._showLabelLine) {
				//计算变量值
				if (!_startAngle) {
					initVars();
				}
				if (!_labelPoint) {
					calculateLabelPoint();
				}
				
				if (!_labelLine) {
					_labelLine = new Sprite();
				}
				var lgp:Graphics = _labelLine.graphics;
				lgp.clear();
				var lstyle:LineStyle = _styles["labelLineStyle"] as LineStyle;
				lgp.lineStyle(lstyle.thickness, lstyle.color, lstyle.alpha);
				
				//连接线起始点
				var ra:Number = _ellipseA * (1 + (emphasized ? _emphasizeDistance : 0));
				var rb:Number = _ellipseB * (1 + (emphasized ? _emphasizeDistance : 0));
				if (_area == 2 || _area == 3) {
					lgp.moveTo(ra * Math.cos(Math.PI * _centerAngle / 180), rb * Math.sin(Math.PI * _centerAngle / 180));
				}else {
					lgp.moveTo(ra * Math.cos(Math.PI * _centerAngle / 180), rb * Math.sin(Math.PI * _centerAngle / 180) + _pieThick);
				}
				
				//终点
				var tx:Number = _labelPoint.x;
				var ty:Number = _labelPoint.y;
				if (emphasized) {
					if (_area == 0 || _area == 3) {
						tx += 10;
					}else {
						tx -= 10;
					}
				}
				lgp.lineTo(tx, ty);
				
				//再加10像素横线
				if (_area == 0 || _area == 3) {
					tx += 10;
				}else {
					tx -= 10;
				}
				lgp.lineTo(tx, ty);
				
				//添加标签线
				this.addChildAt(_labelLine, 0);
				_labelLine.mouseEnabled = false;
			}else {
				if (_labelLine) {
					_labelLine = null;
					if (this.contains(_labelLine)) {
						this.removeChild(_labelLine);
					}
				}
			}
		}
		
		/**
		 * @private
		 * 获取比设置颜色稍微深一点的颜色值
		 */
		private function getDarkColor(color:uint):uint {
			var r:uint = color >> 16 & 0xFF / 1.3;
			var g:uint = color >> 8 & 0xFF / 1.3;
			var b:uint = color & 0xFF / 1.1;
			return r << 16 | g << 8 | b;
		}
		
	}
}