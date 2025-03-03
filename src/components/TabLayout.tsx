import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SideBar from './ui/SideBar';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
const getPathIndex = (path: string | null) => {
    switch (path) {
        case "/":
            return 0
        case "/home":
            return 0
        case "/captain-masr":
            return 0
        case "/tournament":
            return 1
        case "/favourites":
            return 2
        default:
            return -1
    }
}
export default function TabLayout() {
    const { currentPath } = useAppContext();

    const { t } = useTranslation("global");
    const navText: string[] = t('nav', { returnObjects: true }) as string[];
    return (
        <>
        <div className='pb-20'></div>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={getPathIndex(currentPath)}
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
                        label={navText[0]} icon={<HomeOutlinedIcon />} />
                    <BottomNavigationAction
                        component={Link}
                        to='tournament'
                        sx={{
                            "&:focus, &:focus-visible": {
                                outline: "none", // Remove focus outline
                                border: "none", // Ensure no border is added
                            },
                        }} label={navText[1]} icon={<EmojiEventsOutlinedIcon />} />
                    <BottomNavigationAction
                        component={Link}
                        to='favourites'
                        sx={{
                            "&:focus, &:focus-visible": {
                                outline: "none", // Remove focus outline
                                border: "none", // Ensure no border is added
                            },
                        }} label={navText[2]} icon={<FavoriteBorderOutlinedIcon />} />
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
        </>
    );
}


