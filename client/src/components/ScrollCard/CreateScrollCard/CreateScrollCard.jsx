import React, { useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { rootUrl } from "../../../config";
import { IoMdAddCircle } from "react-icons/io";
import "../ScrollCard.css";
import "./main.css";
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
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useWorkspace } from "../../../providers/workspaceProvider";
import { useNotebook } from "../../../providers/notebookProvider";
import { useAuth } from "../../../providers/authProvider";
const ScrollCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { firebaseUser } = useAuth();
  const nameRef = useRef();
  const vidLinkRef = useRef();
  const {
    workspaceData,
    currentWorkspaceId,
    setWorkspaceData,
  } = useWorkspace();

  const onSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${rootUrl}/scroll`,
        {
          name: nameRef.current.value,
          // workspace_id: currentWorkspaceId,
          notebook_id: currentNotebookId,
          vid_link: vidLinkRef.current.value,
        },
        {
          headers: {
            firebase_token: firebaseUser ? await firebaseUser.getIdToken() : "",
          },
        }
      );
      const newNotebookArr = workspaceData.notebooks.map((nb) => ({ ...nb }));
      // const restNotebookArr = newNotebookArr.filter(nb => nb._id !== currentNotebookId)
      newNotebookArr
        .find((nb) => nb._id === currentNotebookId)
        .scrolls.push(data);
      // newNotebookArr.push({ _id: data._id, name: data.name });
      setWorkspaceData({ ...workspaceData, notebooks: newNotebookArr });
      onClose();
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      onClose();
    }
  };
  const { currentNotebookId } = useNotebook();
  return (
    <>
      <Link onClick={onOpen} className="scroll__cardcontainer">
        <div className="scroll__thumbnail">
          <IoMdAddCircle size="3vw" color="#0DBFBE" />
        </div>
        <h4>CREATE NEW SCROLL</h4>
      </Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ADD SCROLL</ModalHeader>
          <ModalCloseButton
            _focus={{
              boxShadow:
                "0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)",
            }}
          />
          <ModalBody>
            <Stack spacing={5}>
              <Input
                _focus={{
                  boxShadow:
                    "0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)",
                }}
                placeholder="SCROLL TITLE"
                ref={nameRef}
              />
              <Input
                _focus={{
                  boxShadow:
                    "0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)",
                }}
                ref={vidLinkRef}
                placeholder="VIDEO LINK"
              />
            </Stack>
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
              ADD
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScrollCard;
