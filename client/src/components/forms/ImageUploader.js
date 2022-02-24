import { useState } from "react";
import { imagesRef} from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Box } from "@mui/system";
import LinearProgress from '@mui/material/LinearProgress';
import { useMutation } from "@apollo/client";
import { ADD_PROFILE_PIC } from "../../utils/mutations";
import { Button, Typography } from "@mui/material";

export default function ImageUploader({member, setMember, modalClose, setCanClose}){

    //define state to hold the supplied file
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');

    //define the mutation to add a profile picture to the logged in user
    const [addProfilePic] = useMutation(ADD_PROFILE_PIC, {
        onCompleted: data => {
            //set the status message indicating the upload is done
            setStatus('Upload Complete');

            //allow the modal to close once the upload is finished
            setCanClose(true);

            //update the member state's profile picture url
            setMember({...member, profilePicture: data.addProfilePic.profilePicture});

            //close the modal after 2 seconds
            setTimeout(()=> modalClose(), 2000);
        },
        onError: () => {
            //set the status indicating an error
            setStatus('Upload Failed')

            //allow the modal to close once the upload is finished
            setCanClose(true);
        }
    });

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

        //When the image is submitted, the modal cannot close until it has been resolved
        setCanClose(false);

        //set firebase data: specify the content being stored, reference to the storage, and type of upload task
        const metadata = { contentType: 'image/png'};
        const fileRef = ref(imagesRef, `${member.username}/` + file.name);
        const uploadTask = uploadBytesResumable(fileRef, file, metadata);

        //Begin uploading the image to firebase
        uploadTask.on('state_changed',
            snapshot => {
                //keep record of the upload progress and continually set state
                const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(prog);
            },
            error => {
                //modal can close on error
                setCanClose(true);

                //set the error based on the firebase response
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