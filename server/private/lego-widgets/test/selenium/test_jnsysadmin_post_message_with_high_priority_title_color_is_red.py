from selenium import selenium
import unittest, time, re

class jnsysadmin_post_message_with_high_priority_title_color_is_red(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://jntest.baidu.com:8088/")
        self.selenium.start()
    
    def test_jnsysadmin_post_message_with_high_priority_title_color_is_red(self):
        sel = self.selenium
        for i in range(60):
            try:
                if sel.is_element_present(u"link=消息中心"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        sel.click(u"link=消息中心")
        for i in range(60):
            try:
                if sel.is_element_present("css=#btnCreatelabel > nobr"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        sel.click("css=#btnCreatelabel > nobr")
        sel.click("form_rbgMessageLevel_rb1")
        sel.type("form_txtTitle", u"红色的标题")
        sel.type("form_name", u"你好吗？")
        sel.click("css=nobr")
        for i in range(60):
            try:
                if sel.is_element_present("css=#list_listTablecell0_1 > div.ui-table-cell-text"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"红色的标题", sel.get_text("css=#list_listTablecell0_1 > div.ui-table-cell-text"))
        sel.click("css=#list_listTablecell0_4 > div.ui-table-cell-text")
        sel.click("css=#list_listTablecell0_4 > div.ui-table-cell-text")
        sel.click("css=#list_listTablecell0_4 > div.ui-table-cell-text")
        for i in range(60):
            try:
                if sel.is_element_present("css=#list_listTablecell0_4 > div.ui-table-cell-text"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"你好吗？", sel.get_text("css=#list_listTablecell0_4 > div.ui-table-cell-text"))
        sel.click("css=#list_listTablecell0_3 > div.ui-table-cell-text")
        sel.click("css=#list_listTablecell0_3 > div.ui-table-cell-text")
        for i in range(60):
            try:
                if sel.is_element_present("css=#list_listTablecell0_3 > div.ui-table-cell-text"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"重要", sel.get_text("css=#list_listTablecell0_3 > div.ui-table-cell-text"))
        sel.click(u"link=退出")
        sel.wait_for_page_to_load("30000")
        for i in range(60):
            try:
                if sel.is_element_present("link12"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        sel.type("username", "jnader1")
        sel.type("password", "Abc123")
        sel.type("verify-code", "1111")
        sel.click("adm-button")
        for i in range(60):
            try:
                if sel.is_element_present("css=li.importantNews"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"红色的标题", sel.get_text("css=li.importantNews"))
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
