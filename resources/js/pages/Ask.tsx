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
  createStandaloneToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios, { AxiosRequestConfig } from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import TagsInput from "../components/TagsInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/UserSlice";
import { validateForm } from "../utils";
import theme from "../utils/theme";

export type TagsProps = {
  created_at: Date;
  question_id: number;
  tag: {
    id: number;
    tag_name: string;
    created_at: Date;
    updated_at: Date;
  };
  tag_id: 15;
  updated_at: Date;
};

type UpdateProps = {
  id: number;
  title: string;
  body: string;
  image_url: string;
  question_tag: TagsProps[];
};

const Ask = () => {
  const location = useLocation();
  const updateQuestion: UpdateProps | undefined = location.state?.update;
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<FileList | null>(null);
  const [title, setTitle] = useState(updateQuestion?.title || "");
  const [tags, setTags] = useState<string[]>(
    updateQuestion?.question_tag.map((tag) => tag.tag.tag_name) || []
  );
  const cloudname = "dor0udr7t";
  const unsignedUploadPreset = "ansUUP";
  const editorRef = useRef<any>(null);
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const isLogged = Object.keys(user).length !== 0;
  const toast = createStandaloneToast({ theme: theme });
  const editorWidth = useBreakpointValue({ base: "333px", md: "887.22px" });
  const editorHeight = "500px";

  const ShowImage = () => {
    let imageFile: string = "";
    if (file && file.length > 0) {
      imageFile = window.URL.createObjectURL(file[0]);
    } else if (updateQuestion) {
      imageFile = updateQuestion.image_url;
    }
    if (!imageFile) return <></>;

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
    setIsLoading(true);

    if (!isLogged) {
      toast({
        title: "Not Authorized!",
        description: "Login to continue.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
      setIsLoading(false);
      return;
    }
    const body = editorRef.current.getContent();

    const validateData = validateForm(title, body, tags);
    if (validateData.status === "error") {
      toast({
        title: validateData.title,
        description: validateData.description,
        status: validateData.status,
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

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
    } else if (updateQuestion) {
      image_url = updateQuestion?.image_url;
    }

    const axiosConfig: AxiosRequestConfig<any> = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    const update = updateQuestion
      ? async (data: any) => {
          return await axios.put(
            `/api/question/update/${updateQuestion.id}`,
            data,
            axiosConfig
          );
        }
      : async (data: any) => {
          return await axios.post(`/api/question/create`, data, axiosConfig);
        };

    const updateResult = await update({
      title,
      body,
      image_url,
      question_tags: tags,
    });

    setIsLoading(false);
    navigate(`/question/${updateResult.data.question.id}`);
  };

  return (
    <VStack alignItems="flex-start" spacing="3" w={editorWidth}>
      <Heading fontSize="3xl" color="black" py={2}>
        Ask a Question
      </Heading>
      <Box maxH="500px">
        <ShowImage />
      </Box>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            id="image"
            type="file"
            accept="image/*"
            d="none"
            w="1"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFile(e.target.files);
            }}
          />
        </Flex>
      </Box>
      <Box w={editorWidth} h={editorHeight}>
        <Editor
          apiKey="hqszmtu5zxgdxmnelmwel30majicpz2iauxla23b0rewystb"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={
            updateQuestion
              ? updateQuestion.body
              : "<p>Write your question here..</p>"
          }
          init={{
            height: editorHeight,
            width: editorWidth,
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
      <Button
        onClick={askQuestion}
        isLoading={isLoading}
        w="full"
        colorScheme="brand"
      >
        {updateQuestion ? "Update Question" : "Ask the Question"}
      </Button>
    </VStack>
  );
};

export default Ask;
