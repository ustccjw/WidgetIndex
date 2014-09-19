[
    {
        "name": "dragdrop",
        "displayName": "拖拽",
        "display": "toggle-block",
        "datatype": "OBJECT",
        "items": [
            {
                "name": "options",
                "displayName": "options",
                "datatype": "LIST",
                "items": [
                    {
                        "name": "text",
                        "displayName": "文本",
                        "tip": "文本",
                        "datatype": "STRING",
                        "rules": {
                            "required": true,
                            "maxByteLength": 8,
                            "stringType": "NUMBER"
                        },
                        "extraAttr": {
                            "filters": "float"
                        },
                        "multiline": false
                    }
                ],
                "rules": {
                    "minCount": 3,
                    "maxCount": 3
                },
                "extraAttr": {
                    "initialCount": 3
                }
            }
        ]
    }
]
/**
 * Created by 00000000000000000000 on 14-5-20.
 */
