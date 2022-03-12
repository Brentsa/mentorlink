import MemberCard from "../cards/MemberCard";
import Box from "@mui/system/Box";
import { randNumBetween } from "../../utils/helpers";
import { IconButton } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export default function Carousel({members}){

    console.log(members)

    function shiftLeft(event){
        console.log('left');
    }

    function shiftRight(event){
        console.log('right');
    }

    //return a random member
    function randomMember(membersArr){
        return membersArr[randNumBetween(0, membersArr.length-1)]
    }

    return (
        <Box sx={{py:6}} display='flex' justifyContent="center" alignItems='center'>
            <Box><IconButton size="large" color="secondary" onClick={shiftLeft}><KeyboardDoubleArrowLeftIcon fontSize="large"/></IconButton></Box>

            <Box display='flex' justifyContent='center'>
                <Box sx={{m:4, transform: 'scale(0.7)', display: {xs: 'none', lg: 'block'}}}><MemberCard member={randomMember(members)}/></Box>
                <Box sx={{m:4}}><MemberCard member={randomMember(members)}/></Box>
                <Box sx={{m:4, transform: 'scale(0.7)', display: {xs: 'none', lg: 'block'}}}><MemberCard member={randomMember(members)}/></Box>
            </Box>   

            <Box><IconButton size="large" color="secondary" onClick={shiftRight}><KeyboardDoubleArrowRightIcon fontSize="large"/></IconButton></Box>
        </Box>
    )
}