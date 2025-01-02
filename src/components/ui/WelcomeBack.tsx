import { Typography } from "@mui/material";
import { useUserContext } from "../../context/UserContext";
import { NiceDiv } from "./NiceDiv";
export default function WelcomeBack() {
    const { userData } = useUserContext();
    return (
        <NiceDiv className='w-full flex justify-center !bg-opacity-90 py-4 shadow-2xl'><Typography sx={{
            fontFamily: 'monospace',
            fontWeight: 900,
            fontSize: 18
        }}>Welcome Back {userData?.name}!</Typography></NiceDiv>
    )
}
