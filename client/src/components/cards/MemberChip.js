import { Avatar, Chip } from "@mui/material";


export function MemberChip({username}){

    return (
        <Chip
            avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
            label={username ?? "Avatar"}
            color="secondary"
        />
    )
}