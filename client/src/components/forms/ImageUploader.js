import { useState } from "react";
import { imagesRef} from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Box } from "@mui/system";
import LinearProgress from '@mui/material/LinearProgress';
import { useMutation } from "@apollo/client";
import { ADD_PROFILE_PIC } from "../../utils/mutations";
import { Button, Typography } from "@mui/material";

export default function ImageUploader({member, modalOpen}){

    //define the mutation to add a profile picture to the logged in user
    const [addProfilePic] = useMutation(ADD_PROFILE_PIC, {
        onCompleted: () => {
            setStatus('Upload Complete');
            setTimeout(()=>modalOpen(false), 2000);
        },
        onError: () => setStatus('Upload Failed')
    });

    //define state to hold the supplied file
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');

    //set the current file whenever the file input is changed
    function handleChange(e){
        setProgress(0);
        setStatus('');

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
                //keep record of the upload progress and continually set state
                const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(prog);
            },
            (error) => {
                switch(error.code){
                    case 'storage/unauthorized':
                        setStatus('User Not Authorized');
                        break;
                    case 'storage/cancelled':
                        setStatus('Upload Cancelled');
                        break;
                    case 'storage/unknown':
                        setStatus('Upload Failed');
                        console.log(error.serverResponse);
                        break;
                    default:
                        break;
                }
            },
            async () => {
                //on success, get the download url of the picture 
                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)

                //set the image url of the user in the database
                addProfilePic({variables: {url: downloadUrl}});
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
            <LinearProgress variant="determinate" value={progress} sx={{mb: 2}}/>
            {status && <Typography variant="h6" mx='auto'>{status}</Typography>}
            {file && 
                <Box sx={{width: '50%', my: 2, mx: 'auto'}}>
                    <img src={window.URL.createObjectURL(file)} alt="thumbnail"></img>
                </Box>
            }
            <Box display='flex' justifyContent="center">
                <Button variant="contained" component="label" sx={{minWidth: "max-content", width: '40%', mr: 1}}>
                    Select Picture
                    <input type="file" id="upload" onChange={handleChange} name="upload" hidden/>
                </Button>
                <Button type="submit" color="secondary" variant="contained" sx={{minWidth: 'max-content', width: '40%', ml: 1}}>Save Picture</Button>
            </Box>
            
        </Box>
    )
}