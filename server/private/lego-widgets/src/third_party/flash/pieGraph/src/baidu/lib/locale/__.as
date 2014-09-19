package baidu.lib.locale {
	/**
	 * @author liu_yang
	 */
	public function __(key:String) : * {
		return LocaleManager.getStringResource(key);
	}
	
}
