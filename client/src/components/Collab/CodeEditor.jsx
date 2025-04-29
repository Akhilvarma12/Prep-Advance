import React, { useEffect, useRef } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";

function CodeEditor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const editor = CodeMirror.fromTextArea(document.getElementById("realTimeEditor"), {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        lineWrapping: true,
        styleActiveLine: true,
      });

      // Increase the font size here
      const style = editor.getWrapperElement().style;
      style.fontSize = "24px";  // You can adjust this to your preferred font size
      editor.setSize("100%", "600px");

      // for code sync
      editorRef.current = editor;

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit("code-change", {
            roomId,
            code,
          });
        }
      });
    };

    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("code-change", ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off("code-change");
    };
  }, [socketRef.current]);

  return (
    <div style={{ height: "600px", width: "100%" }}>
      <textarea id="realTimeEditor"></textarea>
    </div>
  );
}

export default CodeEditor;
