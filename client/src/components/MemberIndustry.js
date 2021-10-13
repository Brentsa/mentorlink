import { Button, Box, Typography, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_INDUSTRIES } from "../utils/queries";

export default function MemberIndustry({industry, bIsUserProfile}){

    console.log(industry);

    //state to determine whether or not the user is editing the industry
    const [bIsEditing, setIsEditing] = useState(false);

    //state to hold the industry value, if the user has an industry set it, otherwise it is empty
    const [currentIndustry, setCurrentIndustry] = useState(industry || '');

    //Query the database for all the industries available
    const {data, loading} = useQuery(QUERY_INDUSTRIES);
    const industryArray = data?.industries || [];

    //toggle the editing status of the state
    function toggleEdit(){
        return setIsEditing(!bIsEditing);
    }

    function handleIndustryChange(event){
        console.log(event.target.value);
        let id;

        for(var i = 0; i<industryArray.length; i++){
            if(event.target.value === industryArray[i].name){
                id = industryArray[i]._id
            }
        }
        
        console.log(event.target.value + ' ' + id);
        return setCurrentIndustry(event.target.value);
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
            {bIsUserProfile ? 
                <Button color="secondary" size="small" sx={{mx: 2}} onClick={toggleEdit}>{!bIsEditing ? 'edit' : 'save'}</Button> 
                : 
                null
            }
        </Box>
    );
};