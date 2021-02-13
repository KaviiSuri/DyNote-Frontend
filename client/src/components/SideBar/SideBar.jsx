import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  Stack,
  Avatar,
  Box,
  Badge,
  Flex,
  Text,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { RiMenu2Line } from "react-icons/ri";
import { BsChevronExpand } from "react-icons/bs";
import { VscVmActive } from "react-icons/vsc";

import "./SideBar.css";
import React from "react";
import AddWorkSpace from "../AddWorkSpace/AddWorkSpace";
import AddNoteBook from "../AddNoteBook/AddNoteBook";
import NoteBooks from "../NoteBooks/NoteBooks";
import { useAuth } from "../../providers/authProvider";
const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { firebaseUser, logout } = useAuth();
  return (
    <>
      <Button
        className="sidebar__button"
        pos="fixed"
        zIndex={2}
        variant="ghost"
        bg="brand.light"
        borderRadius="0px"
        fontSize="md"
        _focus={{
          boxShadow:
            "0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)",
        }}
        onClick={onOpen}
      >
        <RiMenu2Line size="16px" />
      </Button>
      <Drawer
        placement="left"
        textStyle="default"
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="brand.dark"
            >
              <Menu>
                <MenuButton
                  as={Button}
                  textStyle="default"
                  _hover={{ bg: "transparent" }}
                  width="100%"
                  _active={{
                    bg: "transparent",
                    transform: "scale(0.98)",
                    borderColor: "#bec3c9",
                  }}
                  _focus={{
                    boxShadow:
                      "0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)",
                  }}
                  textTransform="uppercase"
                  borderRadius="0px"
                  bg="brand.dark"
                  textAlign="left"
                  color="white"
                  leftIcon={<VscVmActive color="green"/>}
                  rightIcon={<BsChevronExpand />}>
                    WEBDEV
                  </MenuButton>
                  <MenuList fontSize="sm" width="118.7%"  textTransform="uppercase" bg="brand.light" borderRadius="none" >
                    <MenuItem textAlign="center"   textTransform="uppercase" >
                      <Text textAlign="center" width="100%">
                      Machine Learning
                      </Text>
                      </MenuItem>
                  <AddWorkSpace/>
                  </MenuList>
                </Menu>
          
              </DrawerHeader>
              <DrawerBody bg="brand.dark">

              

              <Stack mt="12" spacing="10">
                <AddNoteBook/>
                  <NoteBooks/>
          
              </Stack>
            </DrawerBody>
            <Divider />
            <DrawerFooter bg="brand.dark" color="brand.light" alignItems="left">
              <Flex width="100%" alignItems="left">
                <Avatar
                  src={
                    firebaseUser && firebaseUser.photoURL
                      ? firebaseUser.photoURL
                      : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
                  }
                />
                <Spacer />
                <Box ml="3">
                  <Text fontWeight="bold">
                    {firebaseUser && firebaseUser.displayName
                      ? firebaseUser.displayName
                      : "Darsh Kaushik"}
                    <Badge
                      ml="1"
                      sx={{ cursor: "pointer" }}
                      colorScheme="red"
                      onClick={logout}
                    >
                      logout
                    </Badge>
                  </Text>
                  <Text fontSize="sm">
                    {firebaseUser && firebaseUser.email
                      ? firebaseUser.email
                      : "xyz@gmail.com"}
                  </Text>
                </Box>
              </Flex>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default SideBar;
