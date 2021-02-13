import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import { useWorkspace } from "../../providers/workspaceProvider";
import { useNotebook } from "../../providers/notebookProvider";
import { useScroll } from "../../providers/scrollProvider";
import "./NoteBooks.css"
const NoteBooks = () => {
  const { workspaceData } = useWorkspace();
  const { currentNotebookId, setCurrentNotebookId } = useNotebook();
  const { currentScrollId } = useScroll();
  const getDefaultIndex = () => {
    let index = 0;
    if (workspaceData && workspaceData.notebooks) {
      index = Math.max(
        0,
        workspaceData.notebooks.findIndex((nb) => nb._id === currentNotebookId)
      );
    }
    return [index];
  };
  return (
    <Accordion defaultIndex={getDefaultIndex()} allowMultiple>
      {workspaceData &&
        workspaceData.notebooks &&
        workspaceData.notebooks.map((nb) => {
          return (
            <AccordionItem
              border="none"
              _focus={{
                boxShadow:
                  "0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)",
              }}
            >
              <h2>
                <AccordionButton
                  _focus={{
                    boxShadow:
                      "0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)",
                  }}
                  onClick={() => {
                    setCurrentNotebookId(nb._id);
                  }}
                >
                  <Box
                    _focus={{
                      boxShadow:
                        "0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)",
                    }}
                    color="white"
                    flex="1"
                    textStyle="default"
                    textTransform="uppercase"
                    textAlign="left"
                  >
                    {nb.name}
                    <Badge ml="1" mb="1" colorScheme="transparent">
                      <AiFillCaretDown />
                    </Badge>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel
                textTransform="uppercase"
                textAlign="center"
                color="white"
                pb={4}
              >
              <Stack spacing="3">
                {nb &&
                  nb.scrolls &&
                  nb.scrolls.map((sc) => {
                    return (
                      <Link
                        to={`/workspace/scroll/${sc._id}`}
                        className={
                          "notebook__link" +
                          (sc._id === currentScrollId
                            ? " notebook__active"
                            : "")
                        }
                      >
                        {sc.name}
                      </Link>
                    );
                  })}
                </Stack>
               
              </AccordionPanel>
            </AccordionItem>
          );
        })}
    </Accordion>
  );
};

export default NoteBooks;
