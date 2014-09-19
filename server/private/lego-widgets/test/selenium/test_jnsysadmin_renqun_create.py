from selenium import selenium
import unittest, time, re

class jnsysadmin_renqun_create(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://jntest.baidu.com:8088/")
        self.selenium.start()
    
    def test_jnsysadmin_renqun_create(self):
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
        sel.type("editPeopleForm_peopleName", u"你好吗？？？")
        sel.type("editPeopleForm_peopleSeedWord_text", "HELLO WORLD\n#include <stdio.h>\nint main(){\n  printf(\"hello world\\n\");\n  return 0;\n}")
        sel.click("css=nobr")
        for i in range(60):
            try:
                if sel.is_element_present("css=span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"你好吗？？？", sel.get_text("css=span.coup-ellipsis"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableSList_listTablecell0_2 > div.ui-table-cell-text"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"计算中...", sel.get_text("css=#tableSList_listTablecell0_2 > div.ui-table-cell-text"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableSList_listTablecell0_3 > div.ui-table-cell-text"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual("0", sel.get_text("css=#tableSList_listTablecell0_3 > div.ui-table-cell-text"))
        sel.click("css=#standardPeopleSideBar_standardPeopleTree_treenode1014 > div.ui-treeview-node-text > div.ui-treeview-left")
        sel.click("css=#formSearch_createSPeoplelabel > nobr")
        sel.type("editPeopleForm_peopleName", u"人群：￥#@”7&$<名称2")
        sel.type("editPeopleForm_peopleSeedWord_text", u"人群：￥#@”7&$<名称2")
        sel.click("css=nobr")
        for i in range(60):
            try:
                if sel.is_element_present("css=span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"人群：￥#@”7&$<名称2", sel.get_text("css=span.coup-ellipsis"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableSList_listTablecell0_1 > div.ui-table-cell-text > span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"更新人群", sel.get_text("css=#tableSList_listTablecell0_1 > div.ui-table-cell-text > span.coup-ellipsis"))
        sel.click("css=#formSearch_createSPeoplelabel > nobr")
        sel.type("editPeopleForm_peopleName", u"测试人群1234")
        sel.type("editPeopleForm_peopleSeedWord_text", u"测试人群1234测试人群1234测试人群1234测试人群1234测试人群1234")
        sel.click("css=nobr")
        for i in range(60):
            try:
                if sel.is_element_present("css=div.ui-table-cell-text"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"测试人群1234", sel.get_text("css=span.coup-ellipsis"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableSList_listTablecell0_1 > div.ui-table-cell-text > span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"更新人群", sel.get_text("css=#tableSList_listTablecell0_1 > div.ui-table-cell-text > span.coup-ellipsis"))
        sel.click("formSearch_createSPeople")
        sel.type("editPeopleForm_peopleName", u"测试人群名称长度123456789012")
        sel.type("editPeopleForm_peopleSeedWord_text", u"测试人群名称长度1234567890123456789")
        sel.click("css=nobr")
        for i in range(60):
            try:
                if sel.is_element_present("css=span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"测试人群名称长度123456789012", sel.get_text("css=span.coup-ellipsis"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableSList_listTablecell0_1 > div.ui-table-cell-text > span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"更新人群", sel.get_text("css=#tableSList_listTablecell0_1 > div.ui-table-cell-text > span.coup-ellipsis"))
        sel.click("formSearch_createSPeople")
        sel.click("css=nobr")
        for i in range(60):
            try:
                if sel.is_element_present("editPeopleForm_peopleNamevalidateText"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"目标人群名称不能为空", sel.get_text("editPeopleForm_peopleNamevalidateText"))
        for i in range(60):
            try:
                if sel.is_element_present("editPeopleForm_peopleSeedWordvalidateText"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"目标人群词库不能为空", sel.get_text("editPeopleForm_peopleSeedWordvalidateText"))
        sel.type("editPeopleForm_peopleName", u"测试人群名称长度123456789012")
        sel.type("editPeopleForm_peopleSeedWord_text", u"测试人群名称长度1234567890123456789")
        sel.click("editPeopleForm_btnSubmitlabel")
        for i in range(60):
            try:
                if sel.is_element_present("css=span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"测试人群名称长度123456789012", sel.get_text("css=span.coup-ellipsis"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableSList_listTablecell0_1 > div.ui-table-cell-text > span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"更新人群", sel.get_text("css=#tableSList_listTablecell0_1 > div.ui-table-cell-text > span.coup-ellipsis"))
        sel.click("css=#formSearch_createSPeoplelabel > nobr")
        sel.click("returnLink")
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
