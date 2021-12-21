import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Input,
  Image,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";

const Ask = () => {
  const [file, setFile] = useState<FileList | null>(null);
  const editorRef = useRef<any>(null);
  const cloudname = "dor0udr7t";
  const unsignedUploadPreset = "ansUUP";

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const ShowImage = () => {
    if (!file) return <></>;
    const imageFile = window.URL.createObjectURL(file[0]);
    return (
      <Image
        src={imageFile}
        alt="img preview"
        border="1px solid gray"
        rounded="lg"
        objectFit="fill"
        maxH="500px"
        mb="3"
      />
    );
  };

  const handleSubmit = async () => {
    if (!file || file.length === 0) return;
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
    console.log(data);
  };

  return (
    <VStack alignItems="flex-start" spacing="3">
      <Heading fontSize="3xl" color="black" py={2}>
        Ask a Question
      </Heading>
      <Box maxH="500px">{file && file.length > 0 && <ShowImage />}</Box>
      <Box w="full">
        <Flex alignItems="center" justifySelf="flex-start">
          <Tooltip label="Add Thumbnail" placement="top" fontSize="lg">
            <FormLabel
              htmlFor="image"
              rounded="full"
              border="1px solid gray"
              p="2"
              cursor="pointer"
            >
              <AiOutlinePlus />
            </FormLabel>
          </Tooltip>
          <Input
            type="text"
            bg="transparent"
            fontSize="2xl"
            color="blackAlpha.800"
            placeholder="Title..."
            variant="unstyled"
            border="none"
            radius="none"
            pb="2"
            autoFocus={true}
            fontWeight="bold"
            w="full"
          />
          <Input
            id="image"
            type="file"
            d="none"
            w="1"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              console.log(e.target.files);
              setFile(e.target.files);
            }}
          />
        </Flex>
      </Box>
      <Box>
        <Editor
          apiKey="hqszmtu5zxgdxmnelmwel30majicpz2iauxla23b0rewystb"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>Write your question here..</p>"
          init={{
            height: 500,
            width: 887.22,
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
              formData.append("cloud_name", cloudname);

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
      <Button onClick={log} w="full" colorScheme="brand">
        Ask the Question
      </Button>
    </VStack>
  );
};

export default Ask;
