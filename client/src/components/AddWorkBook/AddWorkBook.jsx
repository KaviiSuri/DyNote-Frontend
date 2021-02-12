import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import {IoIosAdd} from "react-icons/io"
const AddWorkBook = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return ( <>
    <Button 
    color="white" 
    bg="brand.medium" 
    _hover={{bg:"brand.highlight"}}   
    _focus={{   boxShadow:"0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)"}}
     _active={{bg:"none"}}
    leftIcon={<IoIosAdd size="20px"/>} onClick={onOpen}>ADD NOTEBOOK</Button>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Modal Title</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
     ABC
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
 
export default AddWorkBook;