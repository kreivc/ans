import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Input,
  Image,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

const Ask = () => {
  const [file, setFile] = useState<any | null>();
  const editorRef = useRef<any>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const ShowImage = () => {
    const imageFile = window.URL.createObjectURL(file[0]);
    return <Image src={imageFile} alt="img preview" />;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file[0]);
    const upload = await axios
      .post("https://api.imgur.com/3/image", {
        formData,
        headers: {
          Authorization: "CLient-ID 3e28a194c9022ae",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res: any) => res.json())
      .then((res) => {
        console.log("success", res.link);
      })
      .catch((err) => {
        console.log("Upload failed");
      });
    console.log("finish", upload);
  };

  return (
    <VStack justifyContent="flex-start">
      <Heading fontSize="3xl" color="black" py={2}>
        Ask a Question
      </Heading>
      <Box>{file && <ShowImage />}</Box>
      <FormControl as="form" onSubmit={handleSubmit}>
        <FormLabel htmlFor="image">+</FormLabel>
        <Input
          id="image"
          type="file"
          d="none"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFile(e.target.files)
          }
        />
        <Button type="submit">Submit</Button>
      </FormControl>
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
                .post("https://api.imgur.com/3/image", {
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
