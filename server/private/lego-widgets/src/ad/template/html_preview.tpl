<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="author" content="data:text/plain;base64,bGVlaWdodEBnbWFpbC5jb20=" />
    <title>Lego Material Preview</title>
    <style type="text/css">
    fieldset, legend, pre {
      margin: 0;
      padding: 0;
    }
    fieldset {
      border: 1px solid green;
      margin-bottom: 10px;
    }
    legend {
      padding: 0.2em 0.5em;
      margin-left: 10px;
      border:1px solid green;
      color:green;
      font-size:90%;
    }
    fieldset.preview {
      padding: 10px;
    }
    fieldset.preview legend {
      margin-left: 0;
    }
    pre {
      padding: 10px 5px;
    }
    textarea {
        font-family: monospace;
        font-size: 14px;
        width: 600px;
        height: 300px;
        margin: 10px;
    }
    </style>
    <script type="text/javascript" src="http://s1.bdstatic.com/r/www/cache/ecom/esl/1-6-2/esl.js"></script>
  </head>
  <body>
    <fieldset class="preview">
      <legend>预览效果 ${username}@${create_time}</legend>
      <!--BEGIN 投放代码-->
      ${material_code}
      <!--END 投放代码-->
    </fieldset>

    <fieldset>
      <legend>投放代码</legend>
      <textarea readonly="readonly">${material_code}&lt;!-- ${username}@${create_time} --&gt;</textarea>
      <!--
      <strong>下载HTML代码</strong>
      <a href="${bcs_url}" download="${mcid}.html" target="_blank">${bcs_url}</a>
      -->
  </body>
</html>
