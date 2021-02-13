import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import { useWorkspace } from "../../providers/workspaceProvider";
import { useNotebook } from "../../providers/notebookProvider";
const NoteBooks = () => {
  const { workspaceData } = useWorkspace();
  const { currentNotebookId, setCurrentNotebookId } = useNotebook();
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
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
                {nb.scrolls.map((sc) => {
                  return (
                    <Link
                      to={`/workspace/scroll/${sc._id}`}
                      className="notebook__link"
                    >
                      {sc.name}
                    </Link>
                  );
                })}
              </AccordionPanel>
            </AccordionItem>
          );
        })}
    </Accordion>
  );
};

export default NoteBooks;
