import { Outlet, useLocation } from "react-router-dom"
import { FloatingNav } from "./components/ui/floating-navbar"
// import OpenIconSpeedDial from "./components/ui/SpeedDial"
import { useUserContext, useUserFavsContext } from "./context/UserContext";
import { useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useAppContext } from "./context/AppContext";
import TabLayout from "./components/TabLayout";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { useThemeStore } from "./context/ThemeContext";
import { useFavs } from "./hooks/FetchFields";
import { useTranslation } from "react-i18next";
import Footer from "./components/Pages/Footer";
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
  const { userData, setUserData } = useUserContext();
  const { setfavsList, setfavsLoading } = useUserFavsContext();

  const { data, isFetching, isLoading } = useFavs(userData?._id)

  useEffect(() => {
    console.log(data?.items, !isLoading, !isFetching, userData);

    if (data?.items && !isLoading && !isFetching && userData) {
      setfavsList(data.items);
      setfavsLoading(false)
      // console.log(data.items);
    }
    if (!data?.items && !isLoading && !isFetching && !userData) {
      setfavsList([]);
      setfavsLoading(false)
      // console.log(data.items);
    }
  }, [data, setfavsList])

  const { theme } = useThemeStore();
  const BaseURL = import.meta.env.VITE_BASE_URL;
  const { isLoaded, isSignedIn, user } = useUser();
  const { setcurrentDevice, currentDevice, setcurrentPath } = useAppContext();

  const { t } = useTranslation("global");
  const navText: string[] = t('nav', { returnObjects: true }) as string[];
  const ref = useRef<HTMLDivElement>(null);
  const navbarItems = [
    { name: navText[0], link: 'home' }, { name: navText[1], link: 'favourites' }, { name: navText[2], link: 'social' }, { name: navText[3], link: 'News' }, { name: navText[4], link: 'Profile' }
  ]
  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });
  const location = useLocation();




  useEffect(() => {
    setcurrentPath(location.pathname);
  }, [location]);
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
      axios
        .post(`${BaseURL}signUp`, bodyData)
        .then((response) => {
          // console.log("Success:", response.data.userData);
          setUserData(response.data.userData)

        }).catch((error) => {
          console.log(error);
        })
    }

  }, [isLoaded, isSignedIn, user])

  return (
    <Box className='flex !bg-fixed bg-gradient-to-tr from-stone-300 from-0% via-amber-100 to-emerald-100 dark:bg-gradient-to-tr dark:from-gray-900 dark:via-zinc-800 dark:to-gray-600 grow flex-col' ref={ref}>
      <ThemeProvider theme={darkTheme}>
        {currentDevice == "Other" && <FloatingNav navItems={navbarItems} />}
        <Outlet />
        {currentDevice != "Other" && <TabLayout />}
        {/* <OpenIconSpeedDial /> */}
        
        {currentDevice == "Other" && <Footer />}
      </ThemeProvider>

    </Box>
  )
}

export default App
