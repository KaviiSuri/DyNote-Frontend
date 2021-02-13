import React from 'react'
import { Link } from 'react-router-dom';
import {IoMdAddCircle} from "react-icons/io"
import "../ScrollCard.css"
import "./main.css"
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
const ScrollCard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return ( <>
    <Link onClick={onOpen} className="scroll__cardcontainer">
        <div  className="scroll__thumbnail">
            <IoMdAddCircle size="3vw" color="#0DBFBE" />
        </div>
        <h4>CREATE NEW SCROLL</h4>
    </Link>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </> );
}
 
export default ScrollCard;