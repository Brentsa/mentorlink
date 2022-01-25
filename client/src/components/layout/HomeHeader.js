import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AuthService from "../../utils/AuthService";


export default function HomeHeader(){
    return (
        <Box display="flex" justifyContent="center" my={2} width="100%">
            <Paper 
                elevation={3} 
                component={Box} 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                sx={{p: 3, width: "50%", bgcolor:"tertiary.main"}}
            >
                <Typography variant="h4" component="p">
                    Welcome to Mentorlink!
                </Typography>
                {!AuthService.UserLoggedIn() &&
                    <>
                    <Typography variant="body" component="p" mb={2} mt={2}>
                        Mentorlink is a networing application that helps people connect with respected mentors in similar fields. 
                        You can become a member and join a mentor's group or become a mentor and start chatting with your group.
                    </Typography>
                    <Typography variant="body" component="p" mb={2}> 
                        This app was designed to be a platform where collaboration can occur and encourages mentor groups to connect in real life.
                        We hope that you can find the guidance you are looking for here.
                        Start your mentorship journey by registering today!
                    </Typography>
                    <Typography variant="h6" component="p">
                        Some of our members are below...
                    </Typography>
                    </>
                }
            </Paper>
        </Box>
    )
}