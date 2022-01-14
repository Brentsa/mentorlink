import { Button, Box, Typography, MenuItem, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_INDUSTRIES } from "../../utils/queries";
import { ADD_INDUSTRY_TO_MEMBER } from "../../utils/mutations";
import Auth from '../../utils/AuthService';
import {capFirstLetter} from '../../utils/helpers'

export default function MemberIndustry({member, setMember, bIsUserProfile}){
    const industryName = member?.industry?.name;

    //Query the database for all the industries available
    const {data, loading} = useQuery(QUERY_INDUSTRIES);
    const industryArray = useMemo(()=> data?.industries, [data]);
    
    //state to determine whether or not the user is editing the industry
    const [bIsEditing, setIsEditing] = useState(false);

    //state to control the industry selection when editing, default to none if no industry selected
    const [selectedIndustry, setSelectedIndustry] = useState(industryName);

    //Define the mutation to save an industry to a member
    const [addIndustryToMember] = useMutation(ADD_INDUSTRY_TO_MEMBER);

    //toggle the editing status of the state
    function toggleEdit(){
        return setIsEditing(!bIsEditing);
    }

    //called when the user selects a drop down menu option
    function handleIndustryChange(event){
        return setSelectedIndustry(event.target.value)
    }

    //called when the user saves the drop down menu selection
    function handleIndustrySave(event){

        let id;

        //find the industry id by matching with the industry name
        for(var i = 0; i<industryArray.length; i++){
            if(selectedIndustry === industryArray[i].name){
                id = industryArray[i]._id
            }
        }

        //when the save button is clicked, toggle the edit button
        toggleEdit();

        try{
            //call the mutation to add industry to member with the authed username and found industry id
            addIndustryToMember({variables: {memberId: Auth.getProfile()._id, industryId: id}});

            //after the back end industry save, update the member state
            return setMember({...member, industry: {_id: id, name: selectedIndustry}});
        }
        catch(err){
            //if the mutation doesnt work for whatever reason, notify the user of the error
            return alert(err.message);
        }
    }

    useEffect(()=>{
        //change the selected id from null to the first industry if the user doesnt have an industry
        if(!selectedIndustry && industryArray){
            setSelectedIndustry(selectedIndustry ?? industryArray[0].name)
        }
    }, [industryArray, selectedIndustry])

    if(loading) return <Box sx={{m:2}}><Typography variant="h4">Loading...</Typography></Box>

    return (
        <Box sx={{m:1, display: 'flex'}}>
            {bIsEditing ? 
                <TextField
                    id="industry-selector"
                    select
                    label="Industry"
                    value={selectedIndustry}
                    onChange={handleIndustryChange}
                >
                    {industryArray.map(industry => (
                        <MenuItem key={industry._id} value={industry.name}>
                            {capFirstLetter(industry.name)}
                        </MenuItem>
                    ))}
                </TextField>
                : 
                <Typography variant="h4">{
                    bIsUserProfile ? (
                        industryName ? capFirstLetter(industryName) : 'Add an industry!'
                    ) : (
                        industryName ? capFirstLetter(industryName) : null
                    )
                }</Typography>
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