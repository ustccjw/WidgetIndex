from selenium import selenium
import unittest, time, re

class jnsysadmin_renqun_create_with_category(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://jntest.baidu.com:8088/")
        self.selenium.start()
    
    def test_jnsysadmin_renqun_create_with_category(self):
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
                if sel.is_element_present("css=#standardPeopleSideBar_standardPeopleTree_treenode1003 > div.ui-treeview-node-text > div.ui-treeview-left"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        sel.click("css=#standardPeopleSideBar_standardPeopleTree_treenode1003 > div.ui-treeview-node-text > div.ui-treeview-left")
        sel.click("css=#standardPeopleSideBar_standardPeopleTree_treenode1219 > div.ui-treeview-node-text > div.ui-treeview-left")
        sel.click("css=#standardPeopleSideBar_standardPeopleTree_treenode1221 > div.ui-treeview-node-text > div.ui-treeview-left")
        sel.click("css=#formSearch_createSPeoplelabel > nobr")
        sel.type("editPeopleForm_peopleName", u"目标人群分类")
        sel.type("editPeopleForm_peopleSeedWord_text", "google id good,\nbaidu is bad")
        sel.click("css=nobr")
        for i in range(60):
            try:
                if sel.is_element_present("css=span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"目标人群分类", sel.get_text("css=span.coup-ellipsis"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableSList_listTablecell0_1 > div.ui-table-cell-text > span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"农民工>employee>中学生", sel.get_text("css=#tableSList_listTablecell0_1 > div.ui-table-cell-text > span.coup-ellipsis"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableSList_listTablecell0_3 > div.ui-table-cell-text"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual("0", sel.get_text("css=#tableSList_listTablecell0_3 > div.ui-table-cell-text"))
        sel.click(u"link=退出")
        sel.wait_for_page_to_load("30000")
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
