import storage from "../../firebase/config";
import { Box } from "@mui/system";

export default function ImageUploader(){

    //console.log(storage);

    return (
        <Box>
            <label htmlFor="upload">Select a profile picture: </label>
            <input type="file" id="upload" name="upload"/>
        </Box>
    )
}