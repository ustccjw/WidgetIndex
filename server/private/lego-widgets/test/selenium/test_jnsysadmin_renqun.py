from selenium import selenium
import unittest, time, re

class jnsysadmin_renqun(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://jntest.baidu.com:8088/")
        self.selenium.start()
    
    def test_jnsysadmin_renqun(self):
        sel = self.selenium
        sel.open("/")
        sel.type("username", "jnsysadmin")
        sel.type("password", "Abc123")
        sel.type("verify-code", "1111")
        sel.click("adm-button")
        for i in range(60):
            try:
                if sel.is_element_present("css=div.coup-summary-wrap"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"人群管理", sel.get_text(u"link=人群管理"))
        sel.click(u"link=人群管理")
        for i in range(60):
            try:
                if sel.is_element_present("css=#formSearch_createSPeoplelabel > nobr"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"添加标准人群", sel.get_text("css=#formSearch_createSPeoplelabel > nobr"))
        sel.click(u"link=退出")
        sel.wait_for_page_to_load("30000")
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
