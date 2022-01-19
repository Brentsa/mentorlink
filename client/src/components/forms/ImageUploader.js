import { useState } from "react";
import { imagesRef} from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { Box } from "@mui/system";

export default function ImageUploader({member}){

    // const userStorageRef = ref(imagesRef, `${member.username}`);
    // console.log(userStorageRef);

    const [file, setFile] = useState(null);

    function handleChange(e){
        const givenFile = e.target.files[0];
        setFile(givenFile);
    }

    function handleSubmit(e){
        e.preventDefault();
        const metadata = { contentType: 'image/png'};
        const fileRef = ref(imagesRef, `${member.username}/` + file.name);
        const uploadTask = uploadBytesResumable(fileRef, file, metadata);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            },
            (error) => {
                switch(error.code){
                    case 'storage/unauthorized':
                        console.log('User not authorized.')
                        break;
                    case 'storage/cancelled':
                        console.log('Upload cancelled.')
                        break;
                    case 'storage/unknown':
                        console.log(error.serverResponse);
                        break;
                    default:
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
                    console.log("image: " + downloadUrl);
                });
            }
        )
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            display='flex'
            flexDirection='column'
        >
            <label htmlFor="upload">Select a profile picture: </label>
            <input type="file" id="upload" name="upload" onChange={handleChange}/>
            <button type="submit">Save</button>
        </Box>
    )
}