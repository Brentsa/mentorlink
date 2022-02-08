import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux'
import { closeSnackbar } from '../../redux/slices/snackbarSlice';
import { forwardRef } from 'react';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function BasicSnackbar(){
    const open = useSelector((state) => state.snackbar.open);
    const message = useSelector((state) => state.snackbar.message);
    const dispatch = useDispatch();
    
    function handleClose(){
        return dispatch(closeSnackbar())
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%'}} color="secondary">
                {message}
            </Alert>
        </Snackbar>
    )
}