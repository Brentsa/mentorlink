import Box from "@mui/system/Box";
import { Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as Yup from 'yup';

export default function CreateGroupForm(){
    
    //called when the user clicks to create a mentor group
    function createGroup(){
        return console.log("Group created!");
    }

    return (
        <Formik 
            initialValues={{numMentees:5}} 
            validationSchema={Yup.object({numMentees: Yup.number().max(10, "10 mentees max").min(1, "Need at lease 1 mentee")})}
            onSubmit={(values)=>console.log(values)}
        >
            {formik => (
                <Box 
                    component="form" 
                    sx={{display: "flex", alignItems: "center"}}
                    onSubmit={e => {
                        e.preventDefault();
                        formik.handleSubmit();
                        createGroup();
                    }}
                >
                    <Button color="secondary" variant="contained" sx={{m: 2}} type="submit">Become Mentor</Button>
                    <TextField
                        sx={{width: 104}}
                        size="small"
                        id="numMentees"
                        label="# of Mentees"
                        type="number"
                        value={formik.values.numMentees}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
            )}
        </Formik>
    )
}