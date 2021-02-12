import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import React from 'react'
const NoteBooks = () => {
    return (<Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem  border="none"
         _focus={{
            boxShadow:
              "0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)",
          }}
        >
          <h2>
            <AccordionButton  _focus={{
            boxShadow:
              "0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)",
          }}>
              <Box  _focus={{
            boxShadow:
              "0 0 0px 0px rgba(88, 144, 255, 0), 0 1px 1px rgba(0, 0, 0, 0)",
          }} color="white" flex="1" textAlign="center">
                FrontEnd Development
              </Box>
       
            </AccordionButton>
          </h2>
          <AccordionPanel textAlign="center" color="white" pb={4}>
    Hello
          </AccordionPanel>
        </AccordionItem>
      
      </Accordion> );
}
 
export default NoteBooks;