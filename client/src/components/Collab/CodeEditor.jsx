import React, { useEffect, useRef } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";

function CodeEditor() {
  const editorRef = useRef(null);
  const cmInstanceRef = useRef(null); // track CodeMirror instance

  useEffect(() => {
    if (cmInstanceRef.current) return; // avoid initializing twice

    cmInstanceRef.current = CodeMirror.fromTextArea(editorRef.current, {
      mode: { name: "javascript", json: true },
      theme: "dracula",
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineNumbers: true,
    });

    cmInstanceRef.current.setSize(null, "100%");

    return () => {
      // Cleanup: Remove the editor if component unmounts
      if (cmInstanceRef.current) {
        cmInstanceRef.current.toTextArea();
        cmInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ height: "600px" }}>
      <textarea ref={editorRef}></textarea>
    </div>
  );
}

export default CodeEditor;
