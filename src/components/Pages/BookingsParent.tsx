import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import CenteredPage from "../CenteredPage";
import UserBookings from "./UserBookings";
import OwnerBookings from "./OwnerBookings";
import AdminBookings from "./AdminBookings";
import LoginFirstPage from "./LoginFirstPage";

export default function BookingsParent() {
    const { userData } = useUserContext();
    console.log(userData);

    if (!userData) {
        return <CenteredPage>
            <div className='flex flex-col'>
                <img src="https://ssniper.sirv.com/Mal3aby%20Project/Forgot%20password-rafiki.svg" alt="Login first" />
                <a className="text-sm" href="https://storyset.com/online" target="_blank">illustration by Storyset</a>
                You need to login to access this page
                <Link to={"/sign-up"} className='w-full mt-5 px-4 py-4 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:text-white'>Log-in</Link>
            </div>
        </CenteredPage>
    }
    switch (userData.role) {
        case "admin":
            return <AdminBookings />
        case "owner":
            return <OwnerBookings />
        case "user":
            return <UserBookings />
        default:
            return <LoginFirstPage />
    }
}
