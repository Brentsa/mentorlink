import MemberCard from "../cards/MemberCard";
import Box from "@mui/system/Box";
import { randNumBetween } from "../../utils/helpers";
import { IconButton } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { shuffleObjArray } from "../../utils/helpers";
import React, { Children, useState } from "react";
import CarouselItem from "./CarouselItem";

export default function Carousel({members, children}){

    //create a state of random members
    //const [randMember] = useState(shuffleObjArray(members));

    //create a state that holds the position of the 3 shown members in the carousel
    //const [shownMembers, setShownMembers] = useState([0, 1, 2]);

    //shift the positions of the carousel members left
    // function shiftLeft(){
    //     //create a copy of the current shown member positions
    //     let newPositions = [...shownMembers];

    //     for(var i = 0; i < newPositions.length; i++){
    //         //increase the position by 1 space and if the end of the array is reached set index to 0
    //         newPositions[i] = newPositions[i] === randMember.length - 1 ? 0 : newPositions[i] + 1; 
    //     }

    //     //update the state that holds the member indexes
    //     setShownMembers(newPositions);
    // }

    //shift the positions of the carousel members right
    // function shiftRight(){
    //     //create a copy of the current shown member positions
    //     let newPositions = [...shownMembers];

    //     for(var i = 0; i < newPositions.length; i++){
    //         //decrease the position by 1 space and if the front of the array is reached change the index to the end
    //         newPositions[i] = newPositions[i] === 0 ? randMember.length - 1 : newPositions[i] - 1; 
    //     }

    //     //update the state that holds the member indexes
    //     setShownMembers(newPositions);
    // }

    const [shownMember, setShownMember] = useState(0);

    function shiftLeft(){
        setShownMember(shownMember === 0 ? children.length - 1 : shownMember - 1);
    }

    function shiftRight(){
        setShownMember(shownMember === children.length -1 ? 0 : shownMember + 1);
    }

    return (
        <Box display="flex" justifyContent='center' alignItems='center'>
            <Box><IconButton size="large" color="secondary" onClick={shiftLeft}><KeyboardDoubleArrowLeftIcon fontSize="large"/></IconButton></Box>
            <Box sx={{overflow: 'hidden'}} width="60vw">

                <Box sx={{whiteSpace: 'nowrap', transition: 'transform 0.6s', transform: `translateX(-${shownMember * 100}%)`}}>
                    {React.Children.map(children, (child, index) => {
                        return React.cloneElement(child, {width: '100%'});
                    })}
                </Box>
            </Box>
            <Box><IconButton size="large" color="secondary" onClick={shiftRight}><KeyboardDoubleArrowRightIcon fontSize="large"/></IconButton></Box>
        </Box>
    )
}