import { useState } from "react";
import { imagesRef} from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Box } from "@mui/system";
import LinearProgress from '@mui/material/LinearProgress';
import { useMutation } from "@apollo/client";
import { ADD_PROFILE_PIC } from "../../utils/mutations";

export default function ImageUploader({member}){

    //define the mutation to add a profile picture to the logged in user
    const [addProfilePic] = useMutation(ADD_PROFILE_PIC, {
        onCompleted: () => setComplete(true)
    });

    //define state to hold the supplied file
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [complete, setComplete] = useState(false);

    //set the current file whenever the file input is changed
    function handleChange(e){
        setProgress(0);
        setComplete(false);

        const givenFile = e.target.files[0];
        setFile(givenFile);
    }

    //called when the user saves the profile picture
    function handleSubmit(e){
        e.preventDefault();
        const metadata = { contentType: 'image/png'};
        const fileRef = ref(imagesRef, `${member.username}/` + file.name);
        const uploadTask = uploadBytesResumable(fileRef, file, metadata);

        uploadTask.on('state_changed',
            (snapshot) => {
                const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(prog);
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
                //on success, get the download url of the picture 
                getDownloadURL(uploadTask.snapshot.ref)
                .then(downloadUrl => {
                    console.log("image: " + downloadUrl);

                    //set the image url of the user in the database
                    addProfilePic({variables: {url: downloadUrl}});
                })
                .catch((error) => {
                    console.log(error);
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
            <LinearProgress variant="determinate" value={progress} />
            {complete && <h1>New Picture Uploaded.</h1>}
            <label htmlFor="upload">Select a profile picture: </label>
            <input type="file" id="upload" name="upload" onChange={handleChange}/>
            <button type="submit">Save</button>
        </Box>
    )
}