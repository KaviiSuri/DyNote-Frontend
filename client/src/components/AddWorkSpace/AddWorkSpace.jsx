import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import {IoIosAdd} from "react-icons/io"
const AddWorkSpace = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return ( <>
    <Button 
    color="white" 
    bg="brand.medium" 
    borderRadius="0px"
    ml="3"
    width="90%"
    _hover={{bg:"brand.highlight"}}   
    _focus={{   boxShadow:"0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)"}}
     _active={{bg:"none"}}
    leftIcon={<IoIosAdd size="20px"/>}        onClick={onOpen}>ADD WORKSPACE</Button>
 {/* <MenuItem textAlign="left"  textTransform="uppercase" >Machine Learning</MenuItem> */}
<Modal isOpen={isOpen} onClose={onClose}>
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
      </Button>
  
    </ModalFooter>
  </ModalContent>
</Modal>
    </> );
}
 
export default AddWorkSpace;