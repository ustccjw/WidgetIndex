from selenium import selenium
import unittest, time, re

class jnsysadmin_renqun_edit(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://jntest.baidu.com:8088/")
        self.selenium.start()
    
    def test_jnsysadmin_renqun_edit(self):
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
                if sel.is_element_present("css=#formSearch_createSPeoplelabel > nobr"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        sel.click("css=#formSearch_createSPeoplelabel > nobr")
        sel.type("editPeopleForm_peopleName", u"测试编辑<>&^>")
        sel.type("editPeopleForm_peopleSeedWord_text", "helloworld\nthis is a sentense.\nhahaha")
        sel.click("css=nobr")
        for i in range(60):
            try:
                if sel.is_element_present("css=span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"测试编辑<>&^>", sel.get_text("css=span.coup-ellipsis"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableSList_listTablecell0_2 > div.ui-table-cell-text"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"计算中...", sel.get_text("css=#tableSList_listTablecell0_2 > div.ui-table-cell-text"))
        for i in range(60):
            try:
                if sel.is_element_present(u"link=编辑"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        sel.click(u"link=编辑")
        for i in range(60):
            try:
                if sel.is_element_present("editPeopleForm_peopleName"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        try: self.assertEqual(u"测试编辑<>&^>", sel.get_value("editPeopleForm_peopleName"))
        except AssertionError, e: self.verificationErrors.append(str(e))
        try: self.assertEqual("helloworld\nthis is a sentense.\nhahaha", sel.get_value("editPeopleForm_peopleSeedWord_text"))
        except AssertionError, e: self.verificationErrors.append(str(e))
        sel.type("editPeopleForm_peopleName", u"测试编辑121212<>&^>")
        sel.click("css=nobr")
        for i in range(60):
            try:
                if sel.is_element_present("css=span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"测试编辑121212<>&^>", sel.get_text("css=span.coup-ellipsis"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableSList_listTablecell0_2 > div.ui-table-cell-text"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"计算中...", sel.get_text("css=#tableSList_listTablecell0_2 > div.ui-table-cell-text"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableSList_listTablecell0_1 > div.ui-table-cell-text"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual("", sel.get_text("css=#tableSList_listTablecell0_1 > div.ui-table-cell-text"))
        sel.click(u"link=退出")
        sel.wait_for_page_to_load("30000")
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
