import { Box, Heading, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Ask = () => {
  const [content, setContent] = useState<any>("");
  console.log(content);
  return (
    <VStack justifyContent="flex-start">
      <Heading fontSize="3xl" color="black" py={2}>
        Ask a Question
      </Heading>
      <Box className="editor">
        <Editor
          editorState={content}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
        />
      </Box>
    </VStack>
  );
};

export default Ask;
