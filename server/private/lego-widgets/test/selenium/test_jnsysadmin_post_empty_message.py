from selenium import selenium
import unittest, time, re

class jnsysadmin_post_empty_message(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://jntest.baidu.com:8088/")
        self.selenium.start()
    
    def test_jnsysadmin_post_empty_message(self):
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
        sel.click("css=nobr")
        for i in range(60):
            try:
                if sel.is_element_present("form_txtTitlevalidateText"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"题目不能为空", sel.get_text("form_txtTitlevalidateText"))
        for i in range(60):
            try:
                if sel.is_element_present("form_namevalidateText"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"正文不能为空", sel.get_text("form_namevalidateText"))
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()