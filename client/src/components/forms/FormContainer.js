// import { Box } from "@mui/system";
// import EditSaveButton from "./EditSaveButton";
// import { useState } from "react";
// import { Formik } from "formik";

// export default function FormContainer({textarea, text, formValues, schemaRules, formSubmitFunction, bIsUserProfile}){
//     //set the editing state of the description field
//     const [bIsEditing, setIsEditing] = useState(false);

//     //toggle the description editing state
//     function toggleEdit(){
//         return setIsEditing(!bIsEditing);
//     }

//     //submit the description 
//     function submitDescriptionForm(values){
//         if(bIsEditing){
//             toggleEdit();
//             formSubmitFunction(values);
//         }
//         else{
//             return toggleEdit();
//         }
//     }

//     return (
//         <Box sx={{m:2}}>
//             <Formik
//                 initialValues={formValues}
//                 validationSchema={schemaRules}
//                 onSubmit={submitDescriptionForm}
//             >
//                 {formik => (
//                     <Box
//                         component="form"
//                         onSubmit={(e)=>{
//                             e.preventDefault()
//                             formik.handleSubmit();
//                         }}
//                     >
//                         <EditSaveButton title="Description" bIsEditing={bIsEditing} bIsUserProfile={bIsUserProfile}/>

//                         {bIsEditing ? 
//                             textarea
//                             :
//                             text
//                         }
//                     </Box>
//                 )}
//             </Formik>
//         </Box>
//     )
// }