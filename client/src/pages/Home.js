import MemberCard from "../components/MemberCard";
import Box from "@mui/system/Box";

export default function Home(){
    return (
        <Box sx={{py:6, display: 'flex', justifyContent: 'center'}}>
            <Box sx={{m:5, display: {xs: 'none', lg: 'block'}}}><MemberCard/></Box>
            <Box sx={{m:5, transform: 'scale(1.2)'}}><MemberCard/></Box>
            <Box sx={{m:5, display: {xs: 'none', lg: 'block'}}}><MemberCard/></Box>
        </Box>
    )
}

