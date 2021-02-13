import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import {AiFillCaretRight} from "react-icons/ai"
import ScrollCard from '../../components/ScrollCard/ScrollCard';
import CreateScrollCard from '../../components/ScrollCard/CreateScrollCard/CreateScrollCard';

import "./scrolls.css"
const Scrolls = () => {
    return ( <>
    <div className="scrolls__header">
        <div className="scrolls__icon">
            <AiFillCaretRight size="25px" />
        </div>
        <h1>SCROLLS</h1>
        <span className="scrolls__underlinedecor"></span>
    </div>
    <SimpleGrid mt="20" columns={[3 ,4, 4]} spacing="10">
        <ScrollCard/>
        {/* <ScrollCard/> 
        <ScrollCard/>
        <ScrollCard/>
        <ScrollCard/> 
        <ScrollCard/> */}
        <CreateScrollCard />
    </SimpleGrid>
    </> );
}
 
export default Scrolls;