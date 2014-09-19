[{
    "name": "h1",
    "displayName": "头部模块",
    "datatype": "OBJECT",
    "display": "toggle-block",
    "items": [{
        "name": "title",
        "displayName": "标题",
        "defaultValue": "",
        "datatype": "HTML",
        "rules": {
            "required": true,
            "minTextByteLength": 12,
            "maxTextByteLength": 60,
            "tagList": {
                "em": {
                    "minTextByteLength": 2,
                    "maxTextByteLength": 12,
                    "minCount": 1,
                    "maxCount": 1
                }
            }
        },
        "extraAttr": {
            "editorConfig": {
                "tools": [
                    "emphasize"
                ],
                "style": "html {-webkit-box-shadow: 1px 1px 1px -1px rgba(0, 0, 0, 0.3) inset;-moz-box-shadow: 1px 1px 1px -1px rgba(0, 0, 0, 0.3) inset;box-shadow: 1px 1px 1px -1px rgba(0, 0, 0, 0.3) inset;color:#333;padding:2px 4px;}body {line-height:22px;font-family:Helvetica,Arial,sans-serif;}em {color: red;font-style: normal;}"
            },
            "tagList": {
                "em": {
                    "isAllowNoContent": false,
                    "isSimpleTag": false
                }
            }
        },
        "tip": "请输入标题，最少6个汉字，最多30个汉字",
        "multiline": false
    }, {
        "name": "rcv_url",
        "displayName": "标题链接",
        "tip": "http://",
        "datatype": "STRING",
        "rules": {
            "required": true,
            "maxByteLength": 255
        },
        "extraAttr": {},
        "multiline": false
    }, {
        "name": "description_rcv_html",
        "displayName": "描述",
        "defaultValue": "",
        "tip": "描述为190~230个字节(95~115汉字)，<a href=\"http://baidu.com\">链接词</a>最多5个，每个链接词最多6个汉字",
        "datatype": "HTML",
        "rules": {
            "required": true,
            "minTextByteLength": 190,
            "maxTextByteLength": 230,
            "tagList": {
                "a": {
                    "maxTextByteLength": 20,
                    "maxCount": 5
                }
            }
        },
        "multiline": true,
        "extraAttr": {
            "editorConfig": {
                "tools": [
                    "link"
                ],
                "style": "html {-webkit-box-shadow: 1px 1px 1px -1px rgba(0, 0, 0, 0.3) inset;-moz-box-shadow: 1px 1px 1px -1px rgba(0, 0, 0, 0.3) inset;box-shadow: 1px 1px 1px -1px rgba(0, 0, 0, 0.3) inset;color:#333;padding:2px 4px;}body {line-height:22px;font-family:Helvetica,Arial,sans-serif;}em {color: red;font-style: normal;}"
            },
            "tagList": {
                "a": {
                    "attributeRules": {
                        "href": {
                            "isAllowNoValue": false,
                            "isRequired": true,
                            "valueType": "url"
                        },
                        "target": {
                            "defaultValue": "_blank",
                            "isAllowNoValue": false,
                            "isRequired": false
                        }
                    },
                    "isAllowNoContent": false,
                    "isSimpleTag": false,
                    "requiredAttributes": [
                        "target",
                        "href"
                    ]
                }
            }
        }
    }, {
        "name": "logo",
        "displayName": "Logo图片",
        "defaultValue": "http://dummyimage.com/90x90/ddd/333.jpg",
        "datatype": "UPLOAD",
        "rules": {
            "required": true
        },
        "extraAttr": {
            "maxSize": 5,
            "width": 90,
            "height": 90,
            "ext": "jpg,jpeg,png,gif",
            "fileType": "IMAGE"
        }
    }, {
        "name": "logo_rcv_url",
        "displayName": "Logo跳转地址",
        "datatype": "STRING",
        "rules": {
            "required": true,
            "stringType": "URL",
            "maxTextByteLength": 255
        },
        "extraAttr": {},
        "tip": "http://",
        "multiline": false
    }, {
        "name": "site",
        "displayName": "官网地址",
        "defaultValue": "",
        "datatype": "STRING",
        "rules": {
            "required": true,
            "maxByteLength": 40
        },
        "extraAttr": {},
        "tip": "www.baidu.com",
        "multiline": false
    }],
    "rules": {}
}, {
    "name": "image_normal",
    "displayName": "产品图片",
    "datatype": "OBJECT",
    "display": "toggle-block",
    "items": [{
        "name": "options",
        "displayName": "产品图片",
        "datatype": "LIST",
        "descriptionTip": "视频个数和图片个数保持一致",
        "rules": {
            "minCount": 5,
            "maxCount": 5
        },
        "items": [{
            "name": "img_url",
            "displayName": "图片",
            "defaultValue": "",
            "tip": "http://dummyimage.com/90x60/ddd/333.jpg",
            "datatype": "UPLOAD",
            "rules": {
                "required": true
            },
            "extraAttr": {
                "fileType": "IMAGE",
                "width": 90,
                "height": 60,
                "maxSize": 5,
                "ext": "jpg"
            }
        }]
    }]
}, {
    "name": "tabs",
    "displayName": "Tabs",
    "datatype": "OBJECT",
    "display": "toggle-block",
    "items": [{
        "name": "interval_time",
        "displayName": "tab切换时间间隔",
        "defaultValue": "5000000000",
        "datatype": "HIDDEN",
        "rules": {},
        "extraAttr": {},
        "tip": "tab切换时间间隔（单位：毫秒）",
        "multiline": false
    }, {
        "name": "width",
        "displayName": "tab宽度",
        "defaultValue": "500",
        "datatype": "HIDDEN",
        "rules": {},
        "extraAttr": {},
        "tip": "",
        "multiline": false
    }, {
        "name": "default_index",
        "displayName": "默认展现tab的索引",
        "defaultValue": "2",
        "datatype": "STRING",
        "display": "none",
        "rules": {
            "stringType": "NUMBER"
        },
        "extraAttr": {
            "filters": "float"
        },
        "tip": "索引从0开始，在选择不随机展现tab时生效",
        "multiline": false
    }, {
        "name": "options",
        "displayName": "tab内容",
        "datatype": "LIST",
        "rules": {
            "minCount": 5,
            "maxCount": 5
        },
        "items": [{
            "name": "tab_title",
            "displayName": "tab项标题",
            "defaultValue": "",
            "datatype": "STRING",
            "rules": {
                "minTextByteLength": 1,
                "maxTextByteLength": 12,
                "required": true
            },
            "extraAttr": {},
            "tip": "",
            "multiline": false
        }],
        "tip": "标题",
        "extraAttr": {}
    }]
}, {
    "name": "fwc",
    "displayName": "浮层背景",
    "datatype": "OBJECT",
    "display": "toggle-block",
    "rules": {},
    "items": [{
        "name": "options",
        "displayName": "浮层背景",
        "datatype": "LIST",
        "display": "toggle-block",
        "rules": {
            "minCount": 5,
            "maxCount": 5
        },
        "items": [{
            "name": "width",
            "displayName": "浮层宽度",
            "defaultValue": "720",
            "datatype": "HIDDEN",
            "rules": {},
            "extraAttr": {
                "filters": "int"
            },
            "tip": "",
            "multiline": false
        }, {
            "name": "height",
            "displayName": "浮层高度",
            "defaultValue": "420",
            "datatype": "HIDDEN",
            "rules": {},
            "extraAttr": {
                "filters": "int"
            },
            "tip": "",
            "multiline": false
        }, {
            "name": "float_bg",
            "displayName": "浮层背景",
            "datatype": "OBJECT",
            "items": [{
                "name": "src",
                "displayName": "浮层背景图",
                "defaultValue": "",
                "datatype": "UPLOAD",
                "tip": "",
                "rules": {
                    "required": true
                },
                "extraAttr": {
                    "fileType": "IMAGE",
                    "width": 720,
                    "height": 420,
                    "maxSize": 50,
                    "ext": "jpg"
                }
            }, {
                "name": "rcv_url",
                "displayName": "浮层跳转地址",
                "defaultValue": "",
                "tip": "http://",
                "datatype": "STRING",
                "rules": {
                    "required": true,
                    "stringType": "URL",
                    "maxTextByteLength": 255
                },
                "multiline": false
            }]
        }]
    }]
}, {
    "name": "fwc_cont",
    "displayName": "浮层内容",
    "defaultValue": "",
    "display": "toggle-block",
    "datatype": "OBJECT",
    "items": [{
        "name": "options",
        "displayName": "浮层内容",
        "datatype": "LIST",
        "rules": {
            "minCount": 5,
            "maxCount": 5
        },
        "items": [{
            "name": "content",
            "displayName": "浮层内容",
            "defaultValue": "true",
            "datatype": "ALTERNATIVE",
            "rules": {},
            "enumValues": [{
                "value": "false",
                "displayValue": "无内容",
                "items": []
            }, {
                "value": "image",
                "displayValue": "图片",
                "items": [{
                    "name": "src",
                    "displayName": "图片",
                    "defaultValue": "",
                    "datatype": "UPLOAD",
                    "rules": {},
                    "extraAttr": {
                        "fileType": "IMAGE",
                        "width": 400,
                        "height": 250,
                        "maxSize": 50,
                        "ext": "jpg,gif,png"
                    }
                }, {
                    "name": "rcv_url",
                    "displayName": "图片链接地址",
                    "defaultValue": "",
                    "datatype": "STRING",
                    "rules": {
                        "stringType": "URL",
                        "required": true,
                        "maxByteLength": 255
                    },
                    "extraAttr": {},
                    "tip": "",
                    "multiline": false
                }]
            }, {
                "value": "video",
                "displayValue": "视频",
                "items": [{
                    "name": "width",
                    "displayName": "宽度",
                    "defaultValue": "400",
                    "datatype": "HIDDEN",
                    "rules": {},
                    "extraAttr": {
                        "filters": "int"
                    },
                    "tip": "",
                    "multiline": false
                }, {
                    "name": "height",
                    "displayName": "高度",
                    "defaultValue": "250",
                    "datatype": "HIDDEN",
                    "rules": {},
                    "extraAttr": {
                        "filters": "int"
                    },
                    "tip": "",
                    "multiline": false
                }, {
                    "name": "rcv_url",
                    "displayName": "视频跳转链接地址",
                    "defaultValue": "",
                    "datatype": "STRING",
                    "rules": {
                        "stringType": "URL",
                        "required": true,
                        "maxByteLength": 255
                    },
                    "extraAttr": {},
                    "tip": "",
                    "multiline": false
                }, {
                    "name": "is_play",
                    "displayName": "is_play",
                    "defaultValue": true,
                    "datatype": "HIDDEN",
                    "rules": {},
                    "extraAttr": {}
                }, {
                    "name": "video_url",
                    "displayName": "视频文件",
                    "defaultValue": "",
                    "datatype": "UPLOAD",
                    "rules": {
                        "required": true
                    },
                    "extraAttr": {
                        "fileType": "FLV",
                        "maxSize": 500,
                        "ext": "flv"
                    }
                }, {
                    "name": "ipad_img",
                    "displayName": "ipad替换图片",
                    "defaultValue": "",
                    "datatype": "UPLOAD",
                    "rules": {},
                    "extraAttr": {
                        "fileType": "IMAGE",
                        "width": 400,
                        "height": 250,
                        "maxSize": 50,
                        "ext": "jpg"
                    }
                }]
            }, {
                "value": "flash",
                "displayValue": "FLASH",
                "items": [{
                    "name": "width",
                    "datatype": "HIDDEN",
                    "defaultValue": 400
                }, {
                    "name": "height",
                    "datatype": "HIDDEN",
                    "defaultValue": 250
                }, {
                    "name": "src",
                    "displayName": "Flash地址",
                    "datatype": "UPLOAD",
                    "rules": {
                        "required": true,
                        "stringType": "URL"
                    },
                    "extraAttr": {
                        "fileType": "FLASH",
                        "width": 400,
                        "height": 250,
                        "maxSize": 100,
                        "ext": "swf"
                    }
                }, {
                    "name": "link_rcv_url",
                    "displayName": "跳转链接（可选）",
                    "datatype": "STRING",
                    "tip": "http://",
                    "rules": {
                        "stringType": "URL",
                        "maxTextByteLength": 255
                    },
                    "extraAttr": {}
                }, {
                    "name": "ipad_img",
                    "displayName": "iPad替代图片（可选）",
                    "datatype": "UPLOAD",
                    "rules": {},
                    "extraAttr": {
                        "width": 400,
                        "height": 250,
                        "maxSize": 100,
                        "ext": "jpg,jpeg"
                    }
                }, {
                    "name": "ipad_link_rcv_url",
                    "displayName": "iPad跳转链接（可选）",
                    "datatype": "STRING",
                    "tip": "http://",
                    "rules": {
                        "stringType": "URL",
                        "maxTextByteLength": 255
                    },
                    "extraAttr": {}
                }]
            }]
        }],
        "tip": "",
        "extraAttr": {}
    }]
}, {
    "name": "section",
    "displayName": "栏目",
    "datatype": "OBJECT",
    "display": "toggle-block",
    "tip": "栏目+详情描述，一共最多5行。",
    "rules": {},
    "items": [{
        "name": "options",
        "displayName": "栏目",
        "datatype": "LIST",
        "rules": {
            "minCount": 5,
            "maxCount": 5
        },
        "items": [{
            "name": "options",
            "displayName": "栏目行",
            "datatype": "LIST",
            "display": "toggle-block",
            "rules": {
                "minCount": 1,
                "maxCount": 4
            },
            "items": [{
                "name": "icon_url",
                "displayName": "栏目项前面小图标",
                "defaultValue": "http://bcscdn.baidu.com/adtest/d6e90c7b1cb759e711ebf0794e084b3f.gif",
                "datatype": "HIDDEN",
                "rules": {},
                "extraAttr": {},
                "tip": "",
                "multiline": false
            }, {
                "name": "text",
                "displayName": "栏目标题",
                "defaultValue": "",
                "datatype": "HTML",
                "rules": {
                    "required": true,
                    "minTextByteLength": 8,
                    "maxTextByteLength": 40
                },
                "extraAttr": {
                    "editorConfig": {
                        "tools": [
                            "emphasize"
                        ],
                        "style": "html {-webkit-box-shadow: 1px 1px 1px -1px rgba(0, 0, 0, 0.3) inset;-moz-box-shadow: 1px 1px 1px -1px rgba(0, 0, 0, 0.3) inset;box-shadow: 1px 1px 1px -1px rgba(0, 0, 0, 0.3) inset;color:#333;padding:2px 4px;}body {line-height:22px;font-family:Helvetica,Arial,sans-serif;}em {color: red;font-style: normal;}"
                    },
                    "tagList": {
                        "em": {
                            "isAllowNoContent": false,
                            "isSimpleTag": false
                        }
                    }
                },
                "tip": "栏目标题",
                "multiline": false
            }, {
                "name": "text_rcv_url",
                "displayName": "文字URL",
                "defaultValue": "",
                "datatype": "STRING",
                "rules": {
                    "stringType": "URL",
                    "required": true
                },
                "extraAttr": {},
                "tip": "http://",
                "multiline": false
            }, {
                "name": "detail",
                "displayName": "Tabs",
                "datatype": "OBJECT",
                "items": [{
                    "name": "text",
                    "displayName": "描述文字",
                    "defaultValue": "",
                    "datatype": "STRING",
                    "rules": {
                        "minTextByteLength": 20,
                        "maxTextByteLength": 60
                    },
                    "extraAttr": {},
                    "tip": "",
                    "multiline": false
                }]
            }]
        }]
    }]
}]