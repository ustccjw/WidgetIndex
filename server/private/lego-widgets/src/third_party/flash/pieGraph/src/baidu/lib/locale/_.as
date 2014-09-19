package baidu.lib.locale {
	/**
	 * @author liu_yang
	 */
	public function _(key:String) : * {
		return LocaleManager.getStringResource(key);
	}
}
