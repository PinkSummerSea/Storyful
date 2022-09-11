import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
const config = {
  buttons: ["bold", "italic", "link", "unlink", "underline", "source"],
};

const RichTextArea = ({ initialValue, getValue }) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={initialValue}
      config={config}
      tabIndex={1}
      //   onBlur={(newContent) => getValue(newContent)}
      onChange={(newContent) => getValue(newContent)}
    />
  );
};

export default RichTextArea