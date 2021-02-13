import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { AiFillCaretRight } from "react-icons/ai";
import ScrollCard from "../../components/ScrollCard/ScrollCard";
import CreateScrollCard from "../../components/ScrollCard/CreateScrollCard/CreateScrollCard";

import "./scrolls.css";
import { useNotebook } from "../../providers/notebookProvider";
const Scrolls = () => {
  const { notebookData } = useNotebook();
  return (
    <>
      <div className="scrolls__header">
        <div className="scrolls__icon">
          <AiFillCaretRight size="25px" />
        </div>
        <h1 style={{textTransform:"uppercase"}} >{notebookData && notebookData.name}</h1>
        <span className="scrolls__underlinedecor"></span>
      </div>
      <SimpleGrid mt="20" columns={[3, 4, 4]} spacing="10">
        {notebookData &&
          notebookData.scrolls &&
          notebookData.scrolls.map((sc) => {
            return <ScrollCard scroll={sc} />;
          })}
        <CreateScrollCard />
      </SimpleGrid>
    </>
  );
};

export default Scrolls;
