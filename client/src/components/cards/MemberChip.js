import { Avatar, Chip } from "@mui/material";

export function MemberChip({username}){

    return (
        <Chip
            avatar={<Avatar alt="Natacha" src={`https://i.pravatar.cc/40?u=${username}`} />}
            label={username ?? "Avatar"}
            color="secondary"
            component="a" 
            href={`/dashboard/${username}`}
            clickable
            sx={{width: "fit-content", margin: .4}}
        />
    )
}