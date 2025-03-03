import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import DensityMediumOutlinedIcon from '@mui/icons-material/DensityMediumOutlined';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import TranslateIcon from '@mui/icons-material/Translate';
import ListItemButton from '@mui/material/ListItemButton';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ListItemIcon from '@mui/material/ListItemIcon';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { Badge, BottomNavigationAction } from '@mui/material';
import { useThemeStore } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SideBar() {
    const { theme, ToggleTheme } = useThemeStore();
    const { lang, ToggleLanguage } = useLanguageStore();
    const { t } = useTranslation("global");
    const sidebarText: string[] = t('sidebar', { returnObjects: true }) as string[];
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
                        <ListItemText primary={sidebarText[0]} />
                    </ListItemButton>
                </ListItem>
                <ListItem className='text-inherit' component={Link} to="customer-service" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SupportAgentIcon />
                        </ListItemIcon>
                        <ListItemText primary={sidebarText[1]} />
                    </ListItemButton>
                </ListItem>
                <ListItem className='text-inherit' component={Link} to="myBookings" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <EditCalendarIcon />
                        </ListItemIcon>
                        <ListItemText primary={sidebarText[2]} />
                    </ListItemButton>
                </ListItem>
                <ListItem className='text-inherit' component={Link} to="social" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <QuestionAnswerIcon />
                        </ListItemIcon>
                        <ListItemText primary={sidebarText[3]} />
                    </ListItemButton>
                </ListItem>
                <ListItem className='text-inherit' component={Link} to="news" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <NewspaperIcon />
                        </ListItemIcon>
                        <ListItemText primary={sidebarText[4]} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={ToggleTheme}>
                        <ListItemIcon>
                            {theme == "light" ? <WbSunnyIcon /> : <DarkModeIcon />}
                        </ListItemIcon>
                        <ListItemText primary={sidebarText[5]} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={ToggleLanguage}>
                        <ListItemIcon>
                            {lang == "en" ?
                                <Badge badgeContent={"en"} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }} color="primary"><TranslateIcon /></Badge> : <Badge badgeContent={"ع"} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }} color="primary"><TranslateIcon /></Badge>}
                        </ListItemIcon>
                        <ListItemText primary={sidebarText[6]} />
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
                }} label={sidebarText[7]} icon={<DensityMediumOutlinedIcon />} />
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
