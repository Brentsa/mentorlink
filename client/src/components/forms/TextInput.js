import TextField from '@mui/material/TextField';
import {useField} from 'formik';

export default function TextInput({label, bIsEditing, variant, type, ...props}){
    const [field, meta] = useField(props);

    return (
        <TextField 
            label={label ?? null}
            color="primary"
            variant={variant ?? "standard"}
            type={type ?? "text"}
            margin="dense"
            InputProps={!bIsEditing ? {readOnly: true} : {}}
            {...props}
            {...field}
            error={meta.touched && meta.error ? true : false}
            helperText={meta.touched && meta.error ? meta.error: false}
        />
    );
};