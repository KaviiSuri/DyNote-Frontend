import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useRef } from "react";
import { rootUrl } from "../../config";
import { IoIosAdd } from "react-icons/io";
import { useAuth } from "../../providers/authProvider";
import { useWorkspace } from "../../providers/workspaceProvider";
const AddNoteBook = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nameRef = useRef();
  const { firebaseUser } = useAuth();
  const {
    workspaceData,
    currentWorkspaceId,
    setWorkspaceData,
  } = useWorkspace();
  const onSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${rootUrl}/notebook`,
        {
          name: nameRef.current.value,
          workspace_id: currentWorkspaceId,
        },
        {
          headers: {
            firebase_token: await firebaseUser.getIdToken(),
          },
        }
      );
      const newNotebookArr = workspaceData.notebooks.map((nb) => ({ ...nb }));
      newNotebookArr.push(data);
      setWorkspaceData({ ...workspaceData, notebooks: newNotebookArr });
      onClose();
    } catch (error) {
      console.log(error);
      if (error.response) console.log(error.response.data);
      onClose();
    }
  };
  return (
    <>
      <Button
        color="white"
        bg="brand.medium"
        _hover={{ bg: "brand.highlight" }}
        _focus={{
          boxShadow:
            "0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)",
        }}
        _active={{ bg: "none" }}
        leftIcon={<IoIosAdd size="20px" />}
        onClick={onOpen}
      >
        ADD NOTEBOOK
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Notebook</ModalHeader>
          <ModalCloseButton
            _focus={{
              boxShadow:
                "0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)",
            }}
          />
          <ModalBody>
            <Input
              _focus={{
                boxShadow:
                  "0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)",
              }}
              placeholder="NoteBook Title"
              ref={nameRef}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              _focus={{
                boxShadow:
                  "0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)",
              }}
              _hover={{ bg: "brand.highlight" }}
              bg="brand.medium"
              color="white"
              mr={3}
              onClick={onSubmit}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNoteBook;
