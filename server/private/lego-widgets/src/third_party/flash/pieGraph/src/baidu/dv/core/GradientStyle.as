package baidu.dv.core {
	import flash.geom.Matrix;

	/**
	 *  渐变样式
	 *  @author zhaoshu
	 */
	public class GradientStyle {
		
		/**
		 *  用于指定要使用哪种渐变类型的 GradientType 类的值：GradientType.LINEAR 或 GradientType.RADIAL 
		 */		
		public var type:String;
		
		/**
		 *	要在渐变中使用的 RGB 十六进制颜色值数组(如果数组中只有一种颜色，则按此颜色默认过渡)
		 */
		public var colors:Array;
		
		/**
		 *	colors 数组中对应颜色的 alpha 值数组
		 */
		public var alphas:Array;
		
		/**
		 *	颜色分布比例的数组
		 */
		public var ratios:Array;
		
		/**
		 *	一个由 flash.geom.Matrix 类定义的转换矩阵
		 */
		public var matrix:Matrix;
		
		/**
		 *	用于指定要使用哪种 spread 方法的 SpreadMethod 类的值：SpreadMethod.PAD、SpreadMethod.REFLECT 或 SpreadMethod.REPEAT
		 */
		public var spreadMethod:String;
		
		/**
		 *	用于指定要使用哪个值的 InterpolationMethod 类的值：InterpolationMethod.linearRGB 或 InterpolationMethod.RGB 
		 */
		public var interpolationMethod:String;
		
		/**
		 *	一个控制渐变的焦点位置的数字 
		 */
		public var focalPointRatio:Number;
		
		public function GradientStyle(colors:Array, type:String = "linear", alphas:Array = null, ratios:Array = null, matrix:Matrix = null, spreadMethod:String = "pad", interpolationMethod:String = "rgb", focalPointRatio:Number = 0) {
			this.colors = colors;
			this.type = type;
			this.alphas = alphas;
			this.ratios = ratios;
			this.matrix = matrix;
			this.spreadMethod = spreadMethod;
			this.interpolationMethod = interpolationMethod;
			this.focalPointRatio = focalPointRatio;
			
			if(colors.length == 1){
				this.colors = [changeBrightness(colors[0], 50), colors[0]];
			}
		}
		
		/**
		 * 调整某个颜色的亮度
		 * rgb:以RGB模式表示的颜色值
		 * brite:亮度调整幅度0不变255全白-255全黑
		 */
		public static function changeBrightness(rgb:uint, brightness:Number):uint {
			var r:Number = Math.max(Math.min(((rgb >> 16) & 0xFF) + brightness, 255), 0);
			var g:Number = Math.max(Math.min(((rgb >> 8) & 0xFF) + brightness, 255), 0);
			var b:Number = Math.max(Math.min((rgb & 0xFF) + brightness, 255), 0);
			
			return (r << 16) | (g << 8) | b;
		} 
	}

}

