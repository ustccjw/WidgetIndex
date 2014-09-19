package baidu.lib.locale {
	import flash.utils.getDefinitionByName;

	/**
	 * @author Leon
	 */
	public class LocaleManager {
		public static var defaultLocale : String = "zh_CN";
		private static var resourceMapCache : Array = [];

		/**
		 * 获取已编译进swf的语言版本数组
		 * 
		 * @example trace(LocaleManager.availableLocales); 返回["zh_CN","en_US"] 
		 */
		public static function get availableLocales() : Array {
			var bundleInfoClass : Class = getDefinitionByName("_CompiledResourceBundleInfo") as Class;
			return bundleInfoClass.compiledLocales;
			// 随着以后FlexSDK的升级，可能有变化
		}

		/**
		 * 获取已编译进swf的资源包数组
		 * 
		 *  @example trace(LocaleManager.resourceBundleNames); 返回["StringResource","ClassResource"] 
		 */
		public static function get resourceBundleNames() : Array {
			var bundleInfoClass : Class = getDefinitionByName("_CompiledResourceBundleInfo") as Class;
			return bundleInfoClass.compiledResourceBundleNames;
			// 随着以后FlexSDK的升级，可能有变化
		}

		/**
		 * 返回统一的语言tag
		 * 由于"en_US"也可以写做"en-US"，为了程序处理需要要统一为下划线
		 * 
		 * @example trace(normalizeLocaleTag("en-US")); 返回"en_US"
		 */
		public static function normalizeLocaleTag(tag : String) : String {
			return tag.replace(/-/g, "_");
		}

		/**
		 * 获取字符串资源
		 */
		public static function getStringResource(key : String, locale : String = null) : String {
			var result : String = LocaleManager.getResource(key, locale, "StringResource");
			return result;
		}

		/**
		 * 获取类资源
		 */
		public static function getClassResource(key : String, locale : String = null) : Class {
			return LocaleManager.getResource(key, locale, "ClassResource") as Class;
		}

		/**
		 * 获取资源
		 * 
		 */
		public static function getResource(key : String, locale : String = null, bundleName : String = null) : * {
			// 如果没有指定locale，使用默认的,并且归一化
			locale = LocaleManager.normalizeLocaleTag(locale ? locale : defaultLocale);

			// 至少会有一个resourceBundle，如果没有指定，使用第一个
			if (!bundleName) {
				bundleName = LocaleManager.resourceBundleNames[0];
			}

			var result : * = key;
			// 首先检查cache
			// var mapkey : String = ([key, locale, bundleName]).join("-");//这样写效率要慢一些
			var mapkey : String = key + "-" + locale + "-" + bundleName;
			if (resourceMapCache[mapkey] != null) {
				result = resourceMapCache[mapkey];
			} else {
				try {
					var bundleClass : Class = getDefinitionByName(locale + "$" + bundleName + "_properties") as Class;
					var bundle : * = new bundleClass();
					// result = bundle.content[key] ? bundle.content[key] : key;
					if (bundle.content[key]) {
						result = bundle.content[key];
					}
				} catch(e : Error) {
					trace(e.getStackTrace());

					if (availableLocales.length == 1) {
						// 如果只有一种外国语言的话，直接使用这个
						result = getResource(key, availableLocales[0], bundleName);
					} else if (availableLocales.length > 1) {
						// 有多种外国语言，默认使用英语
						result = getResource(key, "en_US", bundleName);
					} else {
						// 都没有，只好使用原来的key，一般是汉语
						// result = key;
					}
				} finally {
					resourceMapCache[mapkey] = result;
					// 加入cache里
				}
			}

			return result;
		}
	}
}
