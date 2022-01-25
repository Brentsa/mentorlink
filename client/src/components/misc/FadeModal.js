import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageUploader from '../forms/ImageUploader';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FadeModal({member, setMember}) {
  const [open, setOpen] = useState(false);
  const [canClose, setCanClose] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    canClose && setOpen(false);
  }


  return (
    <div>
      <Button onClick={handleOpen} color='secondary'>Edit Profile Picture</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Set a new profile picture!
            </Typography>
            <ImageUploader member={member} setMember={setMember} modalOpen={handleOpen} modalClose={handleClose} setCanClose={setCanClose}/>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}