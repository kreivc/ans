import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

const Ask = () => {
  const editorRef = useRef<any>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <VStack justifyContent="flex-start">
      <Heading fontSize="3xl" color="black" py={2}>
        Ask a Question
      </Heading>
      <Box>
        <Editor
          apiKey="hqszmtu5zxgdxmnelmwel30majicpz2iauxla23b0rewystb"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount image",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | image media",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            images_upload_handler: async (blobInfo, success, failure) => {
              console.log(blobInfo);
              const formData = new FormData();
              formData.append("image", blobInfo.blob(), blobInfo.filename());
              const upload = await axios
                .post("https://api.imgur.com/3/upload", {
                  formData,
                  headers: {
                    Authorization: "CLient-ID 3e28a194c9022ae",
                  },
                })
                .then((res: any) => res.json())
                .then((res) => {
                  success(res.link);
                })
                .catch((err) => {
                  failure("Upload failed");
                });
              console.log(upload);
            },
          }}
        />
      </Box>
      <Box>
        <Button onClick={log}>Log</Button>
      </Box>
    </VStack>
  );
};
export default Ask;
