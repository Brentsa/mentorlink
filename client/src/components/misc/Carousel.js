import MemberCard from "../cards/MemberCard";
import Box from "@mui/system/Box";
import { randNumBetween } from "../../utils/helpers";
import { IconButton } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { shuffleObjArray } from "../../utils/helpers";
import { useState } from "react";

export default function Carousel({members}){

    console.log(members)

    //create a state of random members
    const [randMember] = useState(shuffleObjArray(members))

    //create a state that holds the position of the 3 shown members in the carousel
    const [shownMembers, setShownMembers] = useState([randMember[0], randMember[1], randMember[2]])

    console.log(randMember);
    console.log(shownMembers)

    function shiftLeft(event){
        console.log('left');
    }

    function shiftRight(event){
        console.log('right');
    }

    return (
        <Box sx={{py:6}} display='flex' justifyContent="center" alignItems='center'>
            <Box><IconButton size="large" color="secondary" onClick={shiftLeft}><KeyboardDoubleArrowLeftIcon fontSize="large"/></IconButton></Box>

            <Box display='flex' justifyContent='center'>
                <Box sx={{m:4, transform: 'scale(0.7)', display: {xs: 'none', lg: 'block'}}}><MemberCard member={shownMembers[0]}/></Box>
                <Box sx={{m:4}}><MemberCard member={shownMembers[1]}/></Box>
                <Box sx={{m:4, transform: 'scale(0.7)', display: {xs: 'none', lg: 'block'}}}><MemberCard member={shownMembers[2]}/></Box>
            </Box>   

            <Box><IconButton size="large" color="secondary" onClick={shiftRight}><KeyboardDoubleArrowRightIcon fontSize="large"/></IconButton></Box>
        </Box>
    )
}