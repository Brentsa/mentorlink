import { QUERY_MEMBERS } from "../utils/queries"
import { useQuery } from "@apollo/client";
import { useDispatch } from 'react-redux'
import { saveMemberQuery } from "../redux/slices/memberSlice";
import { useEffect } from "react";
import { switchPage } from "../redux/slices/pageSlice";
import HomeHeader from "../components/layout/HomeHeader";
import Carousel from "../components/misc/Carousel";
import MemberCard from "../components/cards/MemberCard";
import CarouselItem from "../components/misc/CarouselItem";
import { CircularProgress, useMediaQuery } from "@mui/material";
import { shuffleObjArray } from "../utils/helpers";

export default function Home(){
    const dispatch = useDispatch();

    //determine the screen size for dependant components 
    const isBelowMDScreen = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isBelowLGScreen = useMediaQuery(theme => theme.breakpoints.down('lg'));

    function returnCarouselSize(){
        //return number of items to show in the carousel based on screen size
        if(isBelowMDScreen) 
            return 1;
        else if(isBelowLGScreen) 
            return 2;
        else 
            return 3;
    }

    //when search loads, query members to display
    const {data} = useQuery(QUERY_MEMBERS);

    useEffect(() => {
        if(data) dispatch(saveMemberQuery(data.members))

        //when arriving on the page set the current page state, mainly for logging out state functionality
        dispatch(switchPage("home"));
    })

    return (
        <>
            <HomeHeader/>
            {data ?
                <Carousel numItemsShown={returnCarouselSize()}>
                    {   //shuffle the member array and then spread the members as carousel items 
                        shuffleObjArray(data.members).map((member, i) => <CarouselItem key={i}><MemberCard member={member}/></CarouselItem>)
                    }
                </Carousel>
                :
                <CircularProgress color="primary"/>
            }
            
        </>
    )
}

