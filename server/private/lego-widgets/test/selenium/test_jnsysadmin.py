# *-* coding:utf-8
from selenium import selenium
import unittest, time, re

class Hello(unittest.TestCase):
    def login(self):
      sel = self.selenium
      sel.open("/")
      sel.type("username", "jnsysadmin")
      sel.type("password", "Abc123")
      sel.type("verify-code", "1111")
      sel.click("adm-button")
      for i in range(60):
          try:
              if sel.is_visible("css=#accountBreadCrumb > span"): break
          except: pass
          time.sleep(1)
      else: self.fail("time out")
      self.assertEqual(u"所有广告主", sel.get_text("css=#accountBreadCrumb > span"))

    def logout(self):
      sel = self.selenium
      sel.click(u"link=退出")
      sel.wait_for_page_to_load("30000")
      for i in range(60):
          try:
              if sel.is_element_present("link12"): break
          except: pass
          time.sleep(1)
      else: self.fail("time out")
      self.assertEqual("API", sel.get_text("link12"))

    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://jntest.baidu.com:8088/")
        self.selenium.start()
        self.login()
 
    def test_a1(self):
      self.assertEqual("1", "1")

    def test_a2(self):
        sel = self.selenium
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
        sel.type("editPeopleForm_peopleName", u"合理咯")
        sel.click("css=div.ui-select-arrow")
        sel.click("editPeopleForm_matchDegreeitem2")
        sel.click("css=div.ui-select-arrow")
        sel.click("editPeopleForm_matchDegreeitem0")
        sel.type("editPeopleForm_peopleSeedWord_text", "1\n2\n3\n4\n5\n6\n7\n8")
        sel.click("css=#editPeopleForm_btnSubmitlabel > nobr")
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableDList_listTablecell0_2 > div.ui-table-cell-text > span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual("1;2;3;4;5;6;7;8", sel.get_text("css=#tableDList_listTablecell0_2 > div.ui-table-cell-text > span.coup-ellipsis"))
    
    def tearDown(self):
        self.logout()
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
