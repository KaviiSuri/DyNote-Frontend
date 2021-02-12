import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Tooltip,
    MenuButton,
    MenuList,
    MenuItem,
    Menu,
  } from "@chakra-ui/react";
  import {RiMenu2Line} from 'react-icons/ri';
  import {BsChevronExpand} from 'react-icons/bs';

  import "./SideBar.css"
import React from 'react'
const SideBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return ( <>
        <Button className="sidebar__button" 
        variant="ghost" 
        bg="brand.light"
        borderRadius="0px" 
        fontSize="md"
        _focus={{
          boxShadow:
            "0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)",
        }}
        onClick={onOpen}>
        <RiMenu2Line size="2vw"/>
        </Button>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerHeader bg="brand.dark">
              <Tooltip label="WorkSpaces" fontSize="md">
              <Menu>
  <MenuButton as={Button} rightIcon={<BsChevronExpand />}>
    Actions
  </MenuButton>
  <MenuList>
    <MenuItem>Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Attend a Workshop</MenuItem>
  </MenuList>
</Menu>
              </Tooltip>
              </DrawerHeader>
              <DrawerBody bg="brand.dark">
             
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </> );
}
 
export default SideBar;