import { Box } from "@mui/system";

export default function CarouselItem({children, width}){
    return (
        <Box 
            width={width}
            display='inline-flex'
            alignItems='center'
            justifyContent='center'
            bgcolor='secondary'
        >
            {children}
        </Box>
    )
}