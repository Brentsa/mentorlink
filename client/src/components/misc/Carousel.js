import MemberCard from "../cards/MemberCard";
import Box from "@mui/system/Box";
import { randNumBetween } from "../../utils/helpers";
import { IconButton } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { shuffleObjArray } from "../../utils/helpers";
import { useState } from "react";

export default function Carousel({members}){

    //create a state of random members
    const [randMember] = useState(shuffleObjArray(members));

    //create a state that holds the position of the 3 shown members in the carousel
    const [shownMembers, setShownMembers] = useState([0, 1, 2]);

    //shift the positions of the carousel members left
    function shiftLeft(){
        //create a copy of the current shown member positions
        let newPositions = [...shownMembers];

        for(var i = 0; i < newPositions.length; i++){
            //increase the position by 1 space and if the end of the array is reached set index to 0
            newPositions[i] = newPositions[i] === randMember.length - 1 ? 0 : newPositions[i] + 1; 
        }

        //update the state that holds the member indexes
        setShownMembers(newPositions);
    }

    //shift the positions of the carousel members right
    function shiftRight(){
        //create a copy of the current shown member positions
        let newPositions = [...shownMembers];

        for(var i = 0; i < newPositions.length; i++){
            //decrease the position by 1 space and if the front of the array is reached change the index to the end
            newPositions[i] = newPositions[i] === 0 ? randMember.length - 1 : newPositions[i] - 1; 
        }

        //update the state that holds the member indexes
        setShownMembers(newPositions);
    }

    return (
        <Box sx={{py:6}} display='flex' justifyContent="center" alignItems='center'>
            <Box><IconButton size="large" color="secondary" onClick={shiftLeft}><KeyboardDoubleArrowLeftIcon fontSize="large"/></IconButton></Box>

            <Box display='flex' justifyContent='center'>
                <Box sx={{m:4, transform: 'scale(0.7)', display: {xs: 'none', lg: 'block'}}}><MemberCard member={randMember[shownMembers[0]]}/></Box>
                <Box sx={{m:4}}><MemberCard member={randMember[shownMembers[1]]}/></Box>
                <Box sx={{m:4, transform: 'scale(0.7)', display: {xs: 'none', lg: 'block'}}}><MemberCard member={randMember[shownMembers[2]]}/></Box>
            </Box>   

            <Box><IconButton size="large" color="secondary" onClick={shiftRight}><KeyboardDoubleArrowRightIcon fontSize="large"/></IconButton></Box>
        </Box>
    )
}