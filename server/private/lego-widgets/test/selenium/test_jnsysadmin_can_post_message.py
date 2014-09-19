from selenium import selenium
import unittest, time, re

class jnsysadmin_can_post_message(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://jntest.baidu.com:8088/")
        self.selenium.start()
    
    def test_jnsysadmin_can_post_message(self):
        sel = self.selenium
        sel.open("/")
        sel.type("username", "jnsysadmin")
        sel.type("password", "Abc123")
        sel.type("verify-code", "1111")
        sel.click("adm-button")
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
        for i in range(60):
            try:
                if sel.is_element_present(u"link=消息中心"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"新建消息", sel.get_text("css=#btnCreatelabel > nobr"))
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
