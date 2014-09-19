from selenium import selenium
import unittest, time, re

class jnsysadmin_post_message_with_long_body(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://jntest.baidu.com:8088/")
        self.selenium.start()
    
    def test_jnsysadmin_post_message_with_long_body(self):
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
        sel.type("form_txtTitle", "12345")
        sel.type("form_name", "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901")
        sel.click("css=nobr")
        sel.click("form_namevalidateText")
        for i in range(60):
            try:
                if sel.is_element_present("form_namevalidateText"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"正文长度不能大于1000", sel.get_text("form_namevalidateText"))
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
