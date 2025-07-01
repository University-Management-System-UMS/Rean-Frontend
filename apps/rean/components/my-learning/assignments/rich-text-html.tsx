
export const richTextEditorHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      #toolbar {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: #f0f2f5;
        padding: 12px;
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }
        .ql-toolbar .ql-formats {
            margin-right: 10px;
        }
        .ql-toolbar button,
        .ql-toolbar select {
            font-size: 36px;
            height: 80px;
            width: 80px;
        }
      #editor-container {
       flex: 1;
       display: flex;
       flex-direction: column;
      }
      #editor {
        flex: 1;
        overflow-y: auto;
        font-size: 15px;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div id="toolbar">
     <span class="ql-formats">
      <select class="ql-header">
        <option selected></option>
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
      </select>
      </span>
      <span class="ql-formats">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-align" value=""></button>       
        <button class="ql-align" value="center"></button> 
        <button class="ql-align" value="right"></button>  
        <button class="ql-align" value="justify"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
      </span>
    </div>
    <div id="editor-container">
      <div id="editor"></div>
    </div>
    <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
    <script>
      const quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
          toolbar: '#toolbar'
        }
      });

      window.addEventListener("message", function(event) {
        if (event.data === "GET_CONTENT") {
          const content = quill.root.innerHTML;
          window.ReactNativeWebView.postMessage(content);
        }
      });
      document.addEventListener("message", function(event) {
        if (event.data === "GET_CONTENT") {
          const content = document.getElementById("editor").innerHTML;
          window.ReactNativeWebView.postMessage(content);
        }
      });
      window.ReactNativeWebView.onMessage = function(event) {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "SET_CONTENT" && data.html) {
            quill.root.innerHTML = data.html;
          }
        } catch (err) {
          console.error("Failed to parse injected content", err);
        }
      };
      window.onload = function() {
        setTimeout(function () {
          const height = document.body.scrollHeight;
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: "contentHeight", height }));
        }, 300);
      };
    </script>
  </body>
</html>
`;