from selenium import selenium
import unittest, time, re

class jnsysadmin_standard_renqun(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://jntest.baidu.com:8088/")
        self.selenium.start()
    
    def test_jnsysadmin_standard_renqun(self):
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
                if sel.is_element_present("peopleBreadCrumbCtner"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"标准目标人群", sel.get_text("css=#peopleBreadCrumb > span"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#formSearch_createSPeople > div.ui-button-bg-left"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        try: self.failUnless(sel.is_element_present("css=#formSearch_createSPeoplelabel > nobr"))
        except AssertionError, e: self.verificationErrors.append(str(e))
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableSList_listTabletitleCell8 > div.ui-table-hcell-text"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        try: self.failUnless(sel.is_element_present(u"link=编辑"))
        except AssertionError, e: self.verificationErrors.append(str(e))
        try: self.failUnless(sel.is_element_present(u"link=删除"))
        except AssertionError, e: self.verificationErrors.append(str(e))
        sel.click(u"link=退出")
        sel.wait_for_page_to_load("30000")
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
