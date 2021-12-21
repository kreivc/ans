import {
  Box,
  Button,
  FormLabel,
  Heading,
  VStack,
  Input,
  Image,
  Flex,
  Tooltip,
  Divider,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import TagsInput from "../components/TagsInput";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/UserSlice";

const Ask = () => {
  const [file, setFile] = useState<FileList | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const cloudname = "dor0udr7t";
  const unsignedUploadPreset = "ansUUP";
  const editorRef = useRef<any>(null);
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const isLogged = Object.keys(user).length !== 0;

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

  const changeHandler = (value: string[]) => {
    setTags(value);
  };

  const askQuestion = async () => {
    if (!isLogged) {
      navigate("/login");
      return;
    }
    const body = editorRef.current.getContent();
    let image_url = "";

    if (file && file.length !== 0) {
      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("upload_preset", unsignedUploadPreset);
      formData.append("cloud_name", cloudname);

      const res: any = await axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
          formData
        )
        .catch((err) => console.log(err));

      image_url = res.data.secure_url;
    }

    const post: any = await axios
      .post(
        "/api/question/create",
        {
          title,
          body,
          image_url,
          question_tags: tags,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .catch((err) => console.log(err));

    navigate("/");
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
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            id="image"
            type="file"
            d="none"
            w="1"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFile(e.target.files);
            }}
          />
        </Flex>
      </Box>
      <Box w="887.22px" h="500px">
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
      <Flex w="full" flex={1} alignItems="flex-end">
        <Text fontSize="2xl" fontWeight="semibold" mb="2" mr="2">
          Tags:
        </Text>
        <TagsInput
          placeholder="Add tags.."
          onChange={changeHandler}
          defaultTags={tags}
        />
      </Flex>
      <Divider />
      <Button onClick={askQuestion} w="full" colorScheme="brand">
        Ask the Question
      </Button>
    </VStack>
  );
};

export default Ask;
