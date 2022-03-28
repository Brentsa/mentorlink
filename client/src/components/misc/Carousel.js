import Box from "@mui/system/Box";
import { IconButton } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import React, { useEffect, useState } from "react";

export default function Carousel({children, numItemsShown}){

    //initialize states for the carousel item index, left button active state, and right button active state
    const [itemIndex, setShownMember] = useState(0);
    const [lbActive, setLbActive] = useState(false);
    const [rbActive, setRbActive] = useState(false);

    //init states for carousel auto shifting, reverse the direction and pause the auto shifting
    const [reverse, setReverse] = useState(false);
    const [paused, setPaused] = useState(false)

    function shiftLeft(){
        //shift the shown member left if the index isn't the first member
        setShownMember(itemIndex === 0 ? itemIndex : itemIndex - 1);
    }

    function shiftRight(){
        //shift the shown member right if the index isn't the last member
        setShownMember(itemIndex === children.length - numItemsShown ? itemIndex : itemIndex + 1);
    }

    useEffect(() => {
        //set the buttons' active states depending on current index
        switch(itemIndex){
            case 0:
                setLbActive(false);
                setRbActive(true);
                break;
            case children.length - numItemsShown:
                setLbActive(true);
                setRbActive(false);
                break;
            default:
                setLbActive(true);
                setRbActive(true);
                break;
        }
    }, [itemIndex, children, numItemsShown])

    useEffect(() => {
        //auto shift the carousel every 3 seconds when the component mounts
        const interval = setInterval(() => {
            //auto shift the carousel if it isn't paused
            if(!paused){
                //reverse the direction of the carousel auto movement if it hits either end 
                itemIndex >= children.length - numItemsShown && setReverse(true);
                itemIndex <= 0 && setReverse(false);

                //shift the carousel in a left or right direction
                !reverse ? shiftRight() : shiftLeft();
            }
        }, 3000)
        
        //clear the interval when the component unmounts
        return () => interval && clearInterval(interval);
    })

    return (
        <Box 
            component='div'
            display="flex" 
            justifyContent='center' 
            alignItems='center' 
            position='relative' 
            mt={{xs: 8, sm: 2}}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <Box position='absolute' left={{xs: '20%', sm: '-80px'}} top={{xs: '-60px', sm: '45%'}}>
                <IconButton size="large" color="secondary" onClick={shiftLeft} disabled={!lbActive}>
                    <KeyboardDoubleArrowLeftIcon fontSize="large"/>
                </IconButton>
            </Box>

            <Box sx={{overflow: 'hidden'}} width={{xs: "90vw", sm: "70vw", xl: "60vw"}}>
                <Box sx={{whiteSpace: 'nowrap', transition: 'transform 0.8s', transform: `translateX(-${itemIndex * (100/numItemsShown)}%)`}}>
                    {React.Children.map(children, child => {
                        return React.cloneElement(child, {width: `${100/numItemsShown}%`});
                    })}
                </Box>
            </Box>

            <Box position='absolute' right={{xs: '20%', sm: '-80px'}} top={{xs: '-60px', sm: '45%'}}>
                <IconButton size="large" color="secondary" onClick={shiftRight} disabled={!rbActive}>
                    <KeyboardDoubleArrowRightIcon fontSize="large"/>
                </IconButton>
            </Box>
        </Box>
    )
}