from selenium import selenium
import unittest, time, re

class jnsysadmin_renqun_columns(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://jntest.baidu.com:8088/")
        self.selenium.start()
    
    def test_jnsysadmin_renqun_columns(self):
        sel = self.selenium
        sel.open("/")
        sel.type("username", "jnsysadmin")
        sel.type("password", "Abc123")
        sel.type("verify-code", "1111")
        sel.click("adm-button")
        for i in range(60):
            try:
                if sel.is_element_present(u"link=人群管理"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        sel.click(u"link=人群管理")
        for i in range(60):
            try:
                if sel.is_element_present("tableSList_listTabletitleCell0"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"目标人群名称", sel.get_text("tableSList_listTabletitleCell0"))
        for i in range(60):
            try:
                if sel.is_element_present("tableSList_listTabletitleCell1"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"所属分类", sel.get_text("tableSList_listTabletitleCell1"))
        self.assertEqual(u"覆盖度", sel.get_text("tableSList_listTabletitleCell2"))
        self.assertEqual(u"计划数量", sel.get_text("tableSList_listTabletitleCell3"))
        self.assertEqual(u"商品数量", sel.get_text("tableSList_listTabletitleCell4"))
        self.assertEqual(u"点击次数", sel.get_text("tableSList_listTabletitleCell5"))
        self.assertEqual(u"展现次数", sel.get_text("tableSList_listTabletitleCell6"))
        self.assertEqual(u"点击率", sel.get_text("tableSList_listTabletitleCell7"))
        self.assertEqual(u"操作", sel.get_text("tableSList_listTabletitleCell8"))
        for i in range(60):
            try:
                if sel.is_element_present("formSearch_peopleKeyword"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        for i in range(60):
            try:
                if sel.is_element_present("css=#formSearch_createSPeoplelabel > nobr"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        sel.click("css=#formSearch_createSPeoplelabel > nobr")
        sel.type("editPeopleForm_peopleName", "SEARCH_ME_HAHAHA")
        sel.type("editPeopleForm_peopleSeedWord_text", "SEARCH_ME_HAHAHASEARCH_ME_HAHAHASEARCH_ME_HAHAHA")
        sel.click("editPeopleForm_btnSubmitlabel")
        for i in range(60):
            try:
                if sel.is_element_present("css=div.ui-table-cell-text"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual("SEARCH_ME_HAHAHA", sel.get_text("css=span.coup-ellipsis"))
        sel.type("formSearch_peopleKeyword", "SEARCH_ME_HAHAHA")
        sel.click("css=#formSearch_searchSubmitlabel > nobr")
        for i in range(60):
            try:
                if sel.is_element_present("css=span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual("SEARCH_ME_HAHAHA", sel.get_text("css=span.coup-ellipsis"))
        sel.type("formSearch_peopleKeyword", "NO_SUCH_ROW")
        sel.click("css=#formSearch_searchSubmitlabel > nobr")
        for i in range(60):
            try:
                if sel.is_element_present("css=div.coup-list-nodata"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"未找到符合条件的结果！", sel.get_text("css=div.coup-list-nodata"))
        sel.click(u"link=退出")
        sel.wait_for_page_to_load("30000")
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
