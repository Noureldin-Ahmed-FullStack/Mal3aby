import { Outlet } from "react-router-dom"
import { FloatingNav } from "./components/ui/floating-navbar"
// import OpenIconSpeedDial from "./components/ui/SpeedDial"
import { useUserContext } from "./context/UserContext";
import { useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useAppContext } from "./context/AppContext";
import TabLayout from "./components/TabLayout";
import { Box, createTheme, ThemeProvider } from "@mui/material";
const detectDevice = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/android/.test(userAgent)) {
    return 'Android';
  } else if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'iOS';
  } else {
    return 'Other';
  }
}
function App() {
  const BaseURL = import.meta.env.VITE_BASE_URL;
  const { isLoaded, isSignedIn, user } = useUser();
  const { setUserData } = useUserContext();
  const { setcurrentDevice, currentDevice } = useAppContext();

  const ref = useRef<HTMLDivElement>(null);
  const navbarItems = [
    { name: 'Home', link: 'home' }, { name: 'social', link: 'social' }, { name: 'News', link: 'News' }, { name: 'Managment', link: 'Managment' }
  ]
  const darkTheme = createTheme({
      palette: {
          mode: 'dark',
      },
  });
  useEffect(() => {
    const device = detectDevice();
    setcurrentDevice(device)
    if (!user && !isSignedIn) {
      setUserData(null)
      return
    } else {

      const bodyData = {
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        _id: user.id,
        userPFP: user.imageUrl,
      }
      console.log(bodyData);

      axios
        .post(`${BaseURL}signUp`, bodyData)
        .then((response) => {
          console.log("Success:", response.data.userData);
          setUserData(response.data.userData)
        }).catch((error) => {
          console.log(error);
        })
    }
  }, [isLoaded, isSignedIn, user])

  return (
    <Box className='flex grow flex-col' ref={ref}>
      <ThemeProvider theme={darkTheme}>
        {currentDevice == "Other" && <FloatingNav navItems={navbarItems} />}
        <Outlet />
        {currentDevice == "Other" && <TabLayout />}
        {/* <OpenIconSpeedDial /> */}
      </ThemeProvider>

    </Box>
  )
}

export default App
