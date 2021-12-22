import {
  Button,
  createStandaloneToast,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/UserSlice";

type ModalProps = {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  from: string;
};

export default function Modal(props: ModalProps) {
  const user = useAppSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);
  const toast = createStandaloneToast();
  const navigate = useNavigate();

  const deleteQuestion = async () => {
    setIsLoading(true);
    const response = await axios
      .delete(`/api/question/delete/${props.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .catch((err) => console.log(err));

    if (response) {
      toast({
        title: "Question deleted",
        description: "Your question has been deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      props.onClose();
    } else {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoading(false);
    props.from === "Explore" ? navigate(0) : navigate("/explore");
  };

  return (
    <ChakraModal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Delete{" "}
          <Text as="span" color="brand.500">
            {props.title}
          </Text>{" "}
          Permanently?
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="semibold" mb="1rem">
            When you a delete a question permanently, it will be gone forever.
            You can't undo this action, so be careful. Are you sure you want to
            delete this question?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="brand"
            mr={3}
            onClick={deleteQuestion}
            isLoading={isLoading}
          >
            Yes
          </Button>
          <Button variant="ghost" onClick={props.onClose} isLoading={isLoading}>
            Never Mind
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
}
