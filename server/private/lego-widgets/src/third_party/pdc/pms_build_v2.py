#!/usr/bin/env python
#!-*- coding:utf-8 -*-
#!vim: set ts=4 sw=4 sts=4 tw=100 noet:
# ***************************************************************************
# 
# Copyright (c) 2011 Baidu.com, Inc. All Rights Reserved
# $Id: pms_build_v2.py 9415 2012-05-28 06:53:00Z liyubei $ 
# 看了一下http://fe.baidu.com/repos/doc/wpo/pms/compiler/pms_build_v2.py，貌似
# 不够用，写一个自己的build框架，基于HTMLParser的
# **************************************************************************/
 
 
 
import os
import sys
import logging
import codecs
import cStringIO

__author__ = 'leeight <liyubei@baidu.com>'
__date__ = '2011/11/15 14:20:01'
__revision = '$Revision: 9415 $'

from optparse import OptionParser
from HTMLParser import HTMLParser

def utf8(s):
  if isinstance(s, unicode):
    return s.encode("utf-8")
  assert isinstance(s, str)
  return s

class PMSBuilder(HTMLParser):
  def __init__(self, after_title_code, after_head_code,
      after_body_code, after_html_code):
    HTMLParser.__init__(self)
    self._in_script = False
    self._in_style = False
    self._after_title_code = after_title_code
    self._after_head_code = after_head_code
    self._after_body_code = after_body_code
    self._after_html_code = after_html_code
    self._html_text = cStringIO.StringIO()    # html代码

  def _get_buffer(self):
    return self._html_text

  def _handle_tag(self, tag, attrs, self_close = False):
    if tag == 'script':
      self._in_script = True
    elif tag == 'style':
      self._in_style = True

    buffer = self._get_buffer()
    buffer.write('<%s' % tag)
    for k, v in attrs:
      if v is None:
        buffer.write(' %s' % utf8(k))
      else:
        buffer.write(' %s="%s"' % (utf8(k), utf8(v).replace('"', '&quot;')))

    if self_close:
      buffer.write('/>')
    else:
      buffer.write('>')

  def handle_startendtag(self, tag, attrs):
    self._handle_tag(tag, attrs, True)

  def handle_starttag(self, tag, attrs):
    self._handle_tag(tag, attrs, False)

  def handle_endtag(self, tag):
    buffer = self._get_buffer()

    if tag == 'script':
      self._in_script = False
    elif tag == 'style':
      self._in_style = False

    buffer.write("</%s>" % tag)

    if tag == 'title':
      if self._after_title_code:
        buffer.write(self._after_title_code)
    elif tag == 'head':
      if self._after_head_code:
        buffer.write(self._after_head_code)
    elif tag == 'body':
      if self._after_body_code:
        buffer.write(self._after_body_code)
    elif tag == 'html':
      if self._after_html_code:
        buffer.write(self._after_html_code)

  def handle_charref(self, name):
    self._get_buffer().write('&#%s;' % name)

  def handle_entityref(self, name):
    # FIXME 测试用例没问题，真正的页面a.html跑不过，奇怪.
    if self._in_script or self._in_style:
      self._get_buffer().write('&%s' % name)
    else:
      self._get_buffer().write('&%s;' % name)

  def handle_comment(self, data):
    if data.startswith("[if ") and data.endswith("<![endif]"):
      # 保留条件注释
      self._get_buffer().write("<!--%s-->" % utf8(data))

  def handle_decl(self, decl):
    self._get_buffer().write("<!%s>" % utf8(decl))

  def handle_data(self, data):
    self._get_buffer().write(utf8(data))

  def get_html(self):
    html_text = self._html_text.getvalue()
    return html_text

def launch_builder(args, options):
  input = args[0]
  if not os.path.exists(input):
    logging.error("can't find the file = [%s]", input)
    sys.exit(1)

  if options.output is None:
    output = sys.stdout
  else:
    output = open(options.output, 'w')

  def get_code(input_file):
    if input_file is None or not os.path.exists(input_file):
      return None
    else:
      return "\n<script type=\"text/javascript\">\n%s\n</script>" % (open(input_file).read())

  after_title_code = get_code(options.after_title_file)
  after_head_code = get_code(options.after_head_file)
  after_body_code = get_code(options.after_body_file)
  after_html_code = get_code(options.after_html_file)

  contents = codecs.open(input, 'r', options.charset).read()
  builder = PMSBuilder(after_title_code, after_head_code,
      after_body_code, after_html_code)
  builder.feed(contents)

  output.write(builder.get_html())

def main():
  logging.basicConfig(format='pms_build_v2.py: %(message)s', level=logging.INFO)

  parser = OptionParser("Usage: pms_build_v2.py [options] file")
  parser.add_option("-c", "--charset", dest="charset", default="utf-8")
  parser.add_option("-o", "--output", dest="output")
  parser.add_option("--after_title_file", dest="after_title_file", help="after title script file")
  parser.add_option("--after_head_file", dest="after_head_file", help="after head script file")
  parser.add_option("--after_body_file", dest="after_body_file", help="after body script file")
  parser.add_option("--after_html_file", dest="after_html_file", help="after html script file")

  (options, args) = parser.parse_args()

  if len(args) <= 0:
    parser.print_help()
  else:
    launch_builder(args, options)

if __name__ == "__main__":
  main()
