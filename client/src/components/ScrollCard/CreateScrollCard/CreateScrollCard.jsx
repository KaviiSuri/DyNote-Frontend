import React from "react";
import { Link } from "react-router-dom";
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
const ScrollCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
              />
              <Input
                _focus={{
                  boxShadow:
                    "0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)",
                }}
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
              onClick={onClose}
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
