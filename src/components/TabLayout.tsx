import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { Link, useLocation } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SideBar from './ui/SideBar';
const getPathIndex = (path: string) => {
    switch (path) {
        case "/":
            return 0
        case "/home":
            return 0
        case "/Mal3aby":
            return 0
        case "/home":
            return 0
        case "/home":
            return 0
        default:
            return -1
    }
}
export default function TabLayout() {
    const [value, setValue] = React.useState(0);
    const location = useLocation()
    React.useEffect(() => {
        const currentPath = location.pathname
        console.log(currentPath);

        const pathInd = getPathIndex(currentPath)
        setValue(pathInd)
    }, [location.pathname])



    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
            >
                <BottomNavigationAction
                    component={Link}
                    to='home'
                    sx={{
                        "&:focus, &:focus-visible": {
                            outline: "none", // Remove focus outline
                            border: "none", // Ensure no border is added
                        },
                    }}
                    label="Home" icon={<HomeOutlinedIcon />} />
                <BottomNavigationAction
                    component={Link}
                    to='tournament'
                    sx={{
                        "&:focus, &:focus-visible": {
                            outline: "none", // Remove focus outline
                            border: "none", // Ensure no border is added
                        },
                    }} label="Tournament" icon={<EmojiEventsOutlinedIcon />} />
                <BottomNavigationAction
                    component={Link}
                    to='favourites'
                    sx={{
                        "&:focus, &:focus-visible": {
                            outline: "none", // Remove focus outline
                            border: "none", // Ensure no border is added
                        },
                    }} label="Favourites" icon={<FavoriteBorderOutlinedIcon />} />
                {/* <BottomNavigationAction
                    component={Button}
                    sx={{
                        "&:focus, &:focus-visible": {
                            outline: "none", // Remove focus outline
                            border: "none", // Ensure no border is added
                        },
                    }} label="Settings" icon={<DensityMediumOutlinedIcon />} /> */}
                    <SideBar />
            </BottomNavigation>
        </Paper>
    );
}


