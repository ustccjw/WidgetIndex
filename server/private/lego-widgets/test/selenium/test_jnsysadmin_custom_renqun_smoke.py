from selenium import selenium
import unittest, time, re

class jnsysadmin_custom_renqun_smoke(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://jntest.baidu.com:8088/")
        self.selenium.start()
    
    def test_jnsysadmin_custom_renqun_smoke(self):
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
                if sel.is_element_present(u"link=自定义目标人群"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        sel.click(u"link=自定义目标人群")
        for i in range(60):
            try:
                if sel.is_element_present("css=#createDPeoplelabel > nobr"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        sel.click("css=#createDPeoplelabel > nobr")
        for i in range(60):
            try:
                if sel.is_element_present("editPeopleForm_peopleName"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        sel.type("editPeopleForm_peopleName", u"Test人群1")
        self.assertEqual(u"宽泛", sel.get_text("css=nobr"))
        sel.type("editPeopleForm_peopleSeedWord_text", u"你好吗？\n我很好？\no(∩∩)o...哈哈")
        sel.click("css=#editPeopleForm_btnSubmitlabel > nobr")
        for i in range(60):
            try:
                if sel.is_element_present("css=span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"Test人群1", sel.get_text("css=span.coup-ellipsis"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableDList_listTablecell0_2 > div.ui-table-cell-text > span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"你好吗？;我很好？;o(∩∩...", sel.get_text("css=#tableDList_listTablecell0_2 > div.ui-table-cell-text > span.coup-ellipsis"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableDList_listTablecell0_4 > div.ui-table-cell-text"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"宽泛", sel.get_text("css=#tableDList_listTablecell0_4 > div.ui-table-cell-text"))
        sel.click(u"link=退出")
        sel.wait_for_page_to_load("30000")
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
