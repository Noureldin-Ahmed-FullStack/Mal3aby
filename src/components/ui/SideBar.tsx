import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import DensityMediumOutlinedIcon from '@mui/icons-material/DensityMediumOutlined';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { BottomNavigationAction } from '@mui/material';
import { useThemeStore } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SideBar() {
    const { theme,ToggleTheme } = useThemeStore();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                    <ListItem className='text-inherit' component={Link} to="profile" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary={"profile"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem className='text-inherit' component={Link} to="customer-service" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <SupportAgentIcon />
                            </ListItemIcon>
                            <ListItemText primary={"customer service"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem className='text-inherit' component={Link} to="bookings" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <EditCalendarIcon />
                            </ListItemIcon>
                            <ListItemText primary={"bookings"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem className='text-inherit' component={Link} to="social" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <NewspaperIcon />
                            </ListItemIcon>
                            <ListItemText primary={"social"} />
                        </ListItemButton>
                    </ListItem>
            </List>
            <Divider />
            <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={ToggleTheme}>
                            <ListItemIcon>
                                {theme == "light"? <WbSunnyIcon /> : <DarkModeIcon />}
                            </ListItemIcon>
                            <ListItemText primary={"Change theme"} />
                        </ListItemButton>
                    </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            {/* <Button onClick={toggleDrawer("right", true)}>openDrawer</Button> */}
            <BottomNavigationAction
                showLabel
                // component={Button}
                onClick={toggleDrawer("right", true)}
                sx={{
                    "&:focus, &:focus-visible": {
                        outline: "none", // Remove focus outline
                        border: "none", // Ensure no border is added
                    },
                    "&:hover": {
                        color: "primary.main", // Change this to your desired hover color
                    },
                }} label="Settings" icon={<DensityMediumOutlinedIcon />} />
            <SwipeableDrawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
                onOpen={toggleDrawer("right", true)}
            >
                {list("right")}
            </SwipeableDrawer>
        </>
    );
}
