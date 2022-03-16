import Box from "@mui/system/Box";
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

export default function Home(){
    const dispatch = useDispatch();

    //when search loads, query members to display
    const {data, loading} = useQuery(QUERY_MEMBERS);

    useEffect(() => {
        if(data) dispatch(saveMemberQuery(data.members))

        //when arriving on the page set the current page state, mainly for logging out state functionality
        dispatch(switchPage("home"));
    })

    if(loading) return <Box>Loading...</Box>;

    return (
        <>
            <HomeHeader/>
            <Carousel numItemsShown={3}>
                {data.members.map((member, i) => <CarouselItem key={i}><MemberCard member={member}/></CarouselItem>)}
            </Carousel>
        </>
    )
}

