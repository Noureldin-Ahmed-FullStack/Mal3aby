import { Outlet } from "react-router-dom"
import { FloatingNav } from "./components/ui/floating-navbar"
import OpenIconSpeedDial from "./components/ui/SpeedDial"
import { useUserContext } from "./context/UserContext";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
function App() {
  const BaseURL = import.meta.env.VITE_BASE_URL;
  const { isLoaded, isSignedIn, user } = useUser();
  const { setUserData } = useUserContext();

  const navbarItems = [
    { name: 'Home', link: 'home' }, { name: 'social', link: 'social' }, { name: 'News', link: 'News' }, { name: 'Managment', link: 'Managment' }
  ]
  useEffect(() => {
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
    <div className="grow flex flex-col">
      <FloatingNav navItems={navbarItems} />
      <Outlet />
      <OpenIconSpeedDial />
    </div>
  )
}

export default App
