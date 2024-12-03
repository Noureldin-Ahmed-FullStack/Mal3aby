import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useThemeStore } from '../../context/ThemeContext';
import CloseIcon from '@mui/icons-material/Close';
const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
];

export default function OpenIconSpeedDial() {

    const { ToggleTheme, theme } = useThemeStore();
    return (
        <Box className="">
            <SpeedDial
                ariaLabel="SpeedDial"
                FabProps={{ className: 'mySpeedDial' }}
                sx={{ position: 'fixed', bottom: 16, right: 16 ,
                    '& .MuiFab-root:focus': {
                        outline: 'none',
                        boxShadow: 'none',
                    },
                    '& .MuiFab-root:active': {
                        outline: 'none',
                        boxShadow: 'none',
                    },
                }}
                icon={<SpeedDialIcon icon={<SettingsIcon />} openIcon={<CloseIcon />} />}
            >
                <SpeedDialAction
                    tooltipTitle='Dark Theme'
                    onClick={ToggleTheme}
                    icon={theme == 'dark' ? <DarkModeOutlinedIcon /> : <DarkModeIcon />}
                />
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
