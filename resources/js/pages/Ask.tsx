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
  const cloudname = "dor0udr7t";
  const unsignedUploadPreset = "ansUUP";

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
    const upload = await fetch("https://api.imgur.com/3/image/", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Client-ID 3e28a194c9022ae",
      },
    });
    const data = await upload.json();
    console.log("finish", data);
  };

  return (
    <VStack justifyContent="flex-start">
      <Heading fontSize="3xl" color="black" py={2}>
        Ask a Question
      </Heading>
      <Box>{file && <ShowImage />}</Box>
      <Box as="form" onSubmit={handleSubmit}>
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
      </Box>
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
              const formData = new FormData();
              formData.append("file", blobInfo.blob(), blobInfo.filename());
              formData.append("upload_preset", unsignedUploadPreset);
              formData.append("cloud_name", cloudname); // TODO: Exposed External API. Should be internalized.

              try {
                const res = await axios.post(
                  `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
                  formData
                );
                success(res.data.secure_url);
              } catch (err) {
                if (typeof err === "string") {
                  failure("Upload failed: " + err);
                } else if (err instanceof Error) {
                  failure("Upload failed: " + err.message);
                } else {
                  failure("Uplaod failed.");
                  console.error(err);
                }
              }
            },
          }}
        />
      </Box>
      <Button onClick={log}>Log Data</Button>
      {/* <Button type="submit">Submit</Button> */}
    </VStack>
  );
};

export default Ask;
