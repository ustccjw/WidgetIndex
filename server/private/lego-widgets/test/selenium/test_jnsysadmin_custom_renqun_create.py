from selenium import selenium
import unittest, time, re

class jnsysadmin_custom_renqun_create(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://jntest.baidu.com:8088/")
        self.selenium.start()
    
    def test_jnsysadmin_custom_renqun_create(self):
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
        sel.click("css=div.ui-select-arrow")
        sel.click("editPeopleForm_matchDegreeitem0")
        sel.type("editPeopleForm_peopleName", u"精确人群")
        sel.type("editPeopleForm_peopleSeedWord_text", u"这里是种子阿，哈哈哈哈哈哈哈哈哈")
        sel.click("editPeopleForm_btnSubmitlabel")
        for i in range(60):
            try:
                if sel.is_element_present("css=span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"精确人群", sel.get_text("css=span.coup-ellipsis"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableDList_listTablecell0_4 > div.ui-table-cell-text"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"精确", sel.get_text("css=#tableDList_listTablecell0_4 > div.ui-table-cell-text"))
        for i in range(60):
            try:
                if sel.is_element_present(u"link=编辑"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        sel.click(u"link=编辑")
        for i in range(60):
            try:
                if sel.is_element_present("editPeopleForm_peopleName"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        try: self.assertEqual(u"精确人群", sel.get_value("editPeopleForm_peopleName"))
        except AssertionError, e: self.verificationErrors.append(str(e))
        try: self.assertEqual(u"这里是种子阿，哈哈哈哈哈哈哈哈哈", sel.get_value("editPeopleForm_peopleSeedWord_text"))
        except AssertionError, e: self.verificationErrors.append(str(e))
        self.assertEqual(u"精确", sel.get_text("css=nobr"))
        sel.click("css=div.ui-select-arrow")
        sel.click("editPeopleForm_matchDegreeitem1")
        sel.click("css=#editPeopleForm_btnSubmitlabel > nobr")
        for i in range(60):
            try:
                if sel.is_element_present("css=span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"宽泛", sel.get_text("css=#tableDList_listTablecell0_4 > div.ui-table-cell-text"))
        self.assertEqual(u"精确人群", sel.get_text("css=span.coup-ellipsis"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#createDPeoplelabel > nobr"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        sel.click("css=#createDPeoplelabel > nobr")
        sel.type("editPeopleForm_peopleName", u"宽泛匹配")
        sel.type("editPeopleForm_peopleSeedWord_text", u"你好吗?")
        sel.click("css=#editPeopleForm_btnSubmitlabel > nobr")
        for i in range(60):
            try:
                if sel.is_element_present("css=span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"宽泛匹配", sel.get_text("css=span.coup-ellipsis"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableDList_listTablecell0_4 > div.ui-table-cell-text"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"宽泛", sel.get_text("css=#tableDList_listTablecell0_4 > div.ui-table-cell-text"))
        sel.click("css=#createDPeoplelabel > nobr")
        sel.click("editPeopleForm_matchDegreetext")
        sel.click("editPeopleForm_matchDegreeitem2")
        sel.type("editPeopleForm_peopleName", u"不扩展人群")
        self.assertEqual(u"目标人群词库：", sel.get_text("editPeopleForm_seedWordTitle"))
        sel.type("editPeopleForm_peopleSeedWord_text", u"词库1，词库2")
        sel.click("css=#editPeopleForm_btnSubmitlabel > nobr")
        for i in range(60):
            try:
                if sel.is_element_present("css=span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"不扩展人群", sel.get_text("css=span.coup-ellipsis"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableDList_listTablecell0_2 > div.ui-table-cell-text > span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"词库1，词库2", sel.get_text("css=#tableDList_listTablecell0_2 > div.ui-table-cell-text > span.coup-ellipsis"))
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableDList_listTablecell0_4 > div.ui-table-cell-text"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"不扩展", sel.get_text("css=#tableDList_listTablecell0_4 > div.ui-table-cell-text"))
        sel.click("css=#createDPeoplelabel > nobr")
        for i in range(60):
            try:
                if sel.is_element_present("editPeopleForm_peopleName"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        sel.type("editPeopleForm_peopleName", u"乱码呀....")
        sel.type("editPeopleForm_peopleSeedWord_text", "!@#$%^&*()")
        sel.click("css=#editPeopleForm_btnSubmitlabel > nobr")
        for i in range(60):
            try:
                if sel.is_element_present("css=span.coup-ellipsis"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        self.assertEqual(u"乱码呀....", sel.get_text("css=#tableDList_listTablecell0_1 > div.ui-table-cell-text"))
        self.failUnless(re.search(r"^exact:!@#\$%^&[\s\S]*\(\)$", sel.get_text("css=#tableDList_listTablecell0_2 > div.ui-table-cell-text")))
        self.assertEqual(u"宽泛", sel.get_text("css=#tableDList_listTablecell0_4 > div.ui-table-cell-text"))
        sel.click("css=#createDPeoplelabel > nobr")
        for i in range(60):
            try:
                if sel.is_element_present("editPeopleForm_peopleName"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        sel.click("editPeopleForm_btnSubmitlabel")
        self.assertEqual(u"目标人群名称不能为空", sel.get_text("editPeopleForm_peopleNamevalidateText"))
        self.assertEqual(u"目标人群种子词或词库不能为空", sel.get_text("editPeopleForm_peopleSeedWordvalidateText"))
        sel.type("editPeopleForm_peopleName", u"乱码呀...")
        sel.type("editPeopleForm_peopleSeedWord_text", "12323\n435354\n3454545345\n345345435")
        sel.click("css=#editPeopleForm_btnSubmitlabel > nobr")
        for i in range(60):
            try:
                if sel.is_element_present("css=#tableDList_listTablecell0_1 > div.ui-table-cell-text"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        sel.click("css=span.coup-ellipsis")
        self.assertEqual(u"乱码呀...", sel.get_text("css=span.coup-ellipsis"))
        self.assertEqual("12323;435354;345454...", sel.get_text("css=#tableDList_listTablecell0_2 > div.ui-table-cell-text > span.coup-ellipsis"))
        self.assertEqual(u"宽泛", sel.get_text("css=#tableDList_listTablecell0_4 > div.ui-table-cell-text"))
        sel.click(u"link=退出")
        sel.wait_for_page_to_load("30000")
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
