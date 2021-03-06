import { IconButton, Box, Typography, MenuItem, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_INDUSTRIES } from "../../utils/queries";
import { ADD_INDUSTRY_TO_MEMBER } from "../../utils/mutations";
import Auth from '../../utils/AuthService';
import {capFirstLetter, isUserProfile} from '../../utils/helpers'
import { useDispatch } from "react-redux";
import { openAndSetMessage } from "../../redux/slices/snackbarSlice";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';


export default function MemberIndustry({member, setMember, ...props}){
    const dispatch = useDispatch()

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
            setMember({...member, industry: {_id: id, name: selectedIndustry}});

            //Set snack bar success message and open it
            dispatch(openAndSetMessage("Industry Update Successful"))
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
        <Box display='flex' {...props}>
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
                <Typography variant="h5">{
                    isUserProfile(member.username) ? (
                        industryName ? capFirstLetter(industryName) : 'Add an industry!'
                    ) : (
                        industryName ? capFirstLetter(industryName) : null
                    )
                }</Typography>
            }
            {isUserProfile(member.username) && Auth.UserLoggedIn() ? 
                <>
                    {bIsEditing?
                        <IconButton color="secondary" size="large" sx={{marginLeft: 1}} onClick={handleIndustrySave}><SaveIcon fontSize="large"/></IconButton> 
                        :
                        <IconButton color="secondary" size="small" sx={{marginLeft: 1}} onClick={toggleEdit}><EditIcon/></IconButton> 
                    }
                </>
                : 
                null
            }
        </Box>
    );
};