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
import { IoMdAddCircle } from "react-icons/io";
import { useAuth } from "../../providers/authProvider";
const AddWorkSpace = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nameRef = useRef();
  const { firebaseUser, backendUser, setBackendUser } = useAuth();
  const onSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${rootUrl}/workspace`,
        {
          name: nameRef.current.value,
        },
        {
          headers: {
            firebase_token: firebaseUser ? await firebaseUser.getIdToken() : "",
          },
        }
      );
      const newWorkspaceArr = backendUser.workspaces.map((w) => ({ ...w }));
      newWorkspaceArr.push(data);
      setBackendUser({ ...backendUser, workspaces: newWorkspaceArr });
      onClose();
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      onClose();
    }
  };
  return (
    <>
      <Button
        color="white"
        bg="transparent"
        borderRadius="0px"
        ml="3"
        width="90%"
        _hover={{ bg: "none" }}
        _focus={{
          boxShadow:
            "0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)",
        }}
        _active={{ bg: "none" }}
        onClick={onOpen}
      >
        <IoMdAddCircle size="16px" />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create WorkSpace</ModalHeader>
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
              ref={nameRef}
              placeholder="Workspace Title"
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
              onClick={() => {
                onSubmit();
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddWorkSpace;

{
  /* <MenuItem textAlign="left"  textTransform="uppercase" >Machine Learning</MenuItem> */
}
{
  /* <Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Create WorkSpace</ModalHeader>
    <ModalCloseButton  _focus={{   boxShadow:"0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)"}} />
    <ModalBody>
    <Input  _focus={{   boxShadow:"0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)"}} placeholder="Workspace Title" />
    </ModalBody>

    <ModalFooter>
      <Button   _focus={{   boxShadow:"0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)"}}
    _hover={{bg:"brand.highlight"}} bg="brand.medium" color="white" mr={3} onClick={onClose}>
       Create
      </Button> */
}
{
  /* <MenuItem textAlign="left"  textTransform="uppercase" >Machine Learning</MenuItem> */
}
