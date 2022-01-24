import { Avatar, Chip } from "@mui/material";

export function MemberChip({mentee}){
    const {username, profilePicture} = mentee;

    return (
        <Chip
            avatar={<Avatar alt="Natacha" src={profilePicture ?? `https://i.pravatar.cc/40?u=${username}`} />}
            label={username ?? "Avatar"}
            color="secondary"
            component="a" 
            href={`/dashboard/${username}`}
            clickable
            sx={{width: "fit-content", margin: .4}}
        />
    )
}