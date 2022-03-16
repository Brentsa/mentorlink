import Box from "@mui/system/Box";
import { IconButton } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import React, { useEffect, useState } from "react";

export default function Carousel({children}){

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

    const [itemIndex, setShownMember] = useState(0);
    const [lbActive, setLbActive] = useState(false);
    const [rbActive, setRbActive] = useState(false);

    function shiftLeft(){
        //shift the shown member left if the index isn't the first member
        setShownMember(itemIndex === 0 ? children.length - 1 : itemIndex - 1);
    }

    function shiftRight(){
        //shift the shown member right if the index isn't the last member
        setShownMember(itemIndex === children.length -1 ? 0 : itemIndex + 1);
    }

    useEffect(() => {
        //set the buttons' active states depending on current index
        switch(itemIndex){
            case 0:
                setLbActive(false);
                setRbActive(true);
                break;
            case children.length - 1:
                setLbActive(true);
                setRbActive(false);
                break;
            default:
                setLbActive(true);
                setRbActive(true);
                break;
        }
    }, [itemIndex, children])

    return (
        <Box display="flex" justifyContent='center' alignItems='center'>
            <Box>
                <IconButton size="large" color="secondary" onClick={shiftLeft} disabled={!lbActive}>
                    <KeyboardDoubleArrowLeftIcon fontSize="large"/>
                </IconButton>
            </Box>

            <Box sx={{overflow: 'hidden'}} width="60vw">
                <Box sx={{whiteSpace: 'nowrap', transition: 'transform 0.6s', transform: `translateX(-${itemIndex * 100}%)`}}>
                    {React.Children.map(children, (child, index) => {
                        return React.cloneElement(child, {width: '100%'});
                    })}
                </Box>
            </Box>

            <Box>
                <IconButton size="large" color="secondary" onClick={shiftRight} disabled={!rbActive}>
                    <KeyboardDoubleArrowRightIcon fontSize="large"/>
                </IconButton>
            </Box>
        </Box>
    )
}