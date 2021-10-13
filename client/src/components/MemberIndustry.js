import { Button, Box, Typography, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_INDUSTRIES } from "../utils/queries";
import { ADD_INDUSTRY_TO_MEMBER } from "../utils/mutations";
import Auth from '../utils/AuthService';

export default function MemberIndustry({industry, bIsUserProfile}){

    console.log(industry);

    //state to determine whether or not the user is editing the industry
    const [bIsEditing, setIsEditing] = useState(false);

    //state to hold the industry value, if the user has an industry set it, otherwise it is empty
    const [currentIndustry, setCurrentIndustry] = useState(industry || '');

    //Query the database for all the industries available
    const {data, loading} = useQuery(QUERY_INDUSTRIES);
    const industryArray = data?.industries || [];

    const [addIndustryToMember] = useMutation(ADD_INDUSTRY_TO_MEMBER);

    //toggle the editing status of the state
    function toggleEdit(){
        return setIsEditing(!bIsEditing);
    }

    function handleIndustryChange(event){
        return setCurrentIndustry(event.target.value);
    }

    async function handleIndustrySave(){
        //when the save button is clicked, toggle the edit button
        toggleEdit();

        //find the industry id by matching with the industry name
        let id;
        for(var i = 0; i<industryArray.length; i++){
            if(currentIndustry === industryArray[i].name){
                id = industryArray[i]._id
            }
        }
        
        //call the mustation to add industry to member with the authed username and found industry id
        const {data} = await addIndustryToMember({variables: {memberId: Auth.getProfile()._id, industryId: id}});
        return console.log(data);
    }

    if(loading) return <Box sx={{m:2}}><Typography variant="h4">Loading...</Typography></Box>

    return (
        <Box sx={{m:2, display: 'flex'}}>
            {bIsEditing ? 
                <TextField
                    id="industry-selector"
                    select
                    label="Industry"
                    value={currentIndustry}
                    onChange={handleIndustryChange}
                >
                    {industryArray.map(industry => (
                        <MenuItem key={industry._id} value={industry.name}>
                            {industry.name}
                        </MenuItem>
                    ))}
                </TextField>
                : 
                <Typography variant="h4">{currentIndustry ? currentIndustry : 'Add an industry!'}</Typography>
            }
            {bIsUserProfile && Auth.UserLoggedIn() ? 
                <>
                    {bIsEditing?
                        <Button color="secondary" size="small" sx={{mx: 2}} onClick={handleIndustrySave}>save</Button> 
                        :
                        <Button color="secondary" size="small" sx={{mx: 2}} onClick={toggleEdit}>edit</Button> 
                    }
                </>
                : 
                null
            }
        </Box>
    );
};