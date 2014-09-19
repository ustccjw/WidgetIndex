package baidu.lib.locale {
	import baidu.lib.utils.DateFormatter;

	import flash.globalization.DateTimeFormatter;
	import flash.system.ApplicationDomain;
	/**
	 * @author liu_yang
	 */
	public class FormatterManager {
		
		/**
		 * 根据当前的地区语言格式化时间，
		 * @author liu_yang
		 * 在FP10.1下，如果只需要显示日期，那么给timeStyle赋值为DateTimeStyle.NONE;如果只需要显示时间，则类似地给dateStyle赋值
		 * 
		 * @param date 需要格式化的日期对象
		 * @param dateStyle 日期格式化样式，请使用DateTimeStyle中的常量，在10.1以下无效
		 * @param timeStyle 时间格式化样式，请使用DateTimeStyle中的常量，在10.1以下无效
		 * 
		 * @example FormatterManager.formatDateTime(new Date()); 中文环境下在10.1及以上返回"2011年2月18日 15:03:12"，在10.1以下返回2011-02-18
		 * 
		 */
		public static function formatDateTime(date:Date,dateStyle:String = "long",timeStyle:String="long"):String{
			if(ApplicationDomain.currentDomain.hasDefinition("flash.globalization.DateTimeFormatter")){
				//在FP10.1中，使用内建方法
				var dateTimeFormatter:DateTimeFormatter = new DateTimeFormatter(LocaleManager.defaultLocale,dateStyle,timeStyle);
				return dateTimeFormatter.format(date);
			}else{
				//如果低于10.1，简单处理
				var locale:Array = LocaleManager.normalizeLocaleTag(LocaleManager.defaultLocale).split("_");
				var lang:String = locale[0];
				var country:String = locale[1];
				
				if(lang == "zh"){
					//中文
					return DateFormatter.format(date, "YYYY-MM-DD");
				}else if(lang == "en" && country=="GB"){
					//英国
					return DateFormatter.format(date, "DD/MM/YYYY");
				}else{
					//美国及其他
					return DateFormatter.format(date, "MM/DD/YYYY");
				}
			}
		}
	}
}
