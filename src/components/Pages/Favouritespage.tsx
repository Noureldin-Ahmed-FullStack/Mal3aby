import { GridLoader } from "react-spinners";
// import { useFavs } from "../../hooks/FetchFields";
import { useThemeStore } from "../../context/ThemeContext";
import CenteredPage from "../CenteredPage";
import FieldItem from "../ui/FieldItem";
import FieldItemBox from "../ui/FieldItemBox";
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { Link } from "react-router-dom";
import { useUserFavsContext } from "../../context/UserContext";
import { response } from "../../types";

export default function FieldsPage() {
    // const { userData } = useUserContext()
    const { favsList , favsLoading } = useUserFavsContext()
    const { theme } = useThemeStore();
    // console.log(data?.items)
    if (favsLoading) {
        return (
            <CenteredPage>
                <h4 className="text-6xl mb-5 text-orange-700 dark:text-zinc-200 font-medium agu-display">Loading</h4>
                <GridLoader size={25} color={theme == 'dark' ? 'white' : 'orange'} />
            </CenteredPage>
        )
    }
    return (
        <div className="flex grow justify-center pt-24 md:pt-4 mb-20">
            {favsList?.length != 0 ? (
                <>
                    <div className="static md:hidden maxWidth75vw">
                        {favsList?.map((item: response) => (
                            <FieldItem _id={item._id} key={item._id} type={item.type} address={item.address}  className="my-2" Name={item.title} Icon={item.coverImage} location={item.location} price={item.price} />
                        ))}
                    </div>
                    <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-24 maxWidth75vw">
                        {favsList?.map((item: response) => (
                            <FieldItemBox _id={item._id} key={item._id} type={item.type} address={item.address}  className="my-2" Name={item.title} Icon={item.coverImage} location={item.location} price={item.price} />
                        ))}
                    </div>
                </>) : (
                <CenteredPage className="">
                    <h4 className="text-6xl mb-5 text-center text-orange-700 dark:text-zinc-200 font-medium agu-display">You have no favourites</h4>
                    <Link to="/"><p className="underline underline-offset-4 text-3xl mb-5 text-center text-blue-600 text-opacity-70 font-medium">Browse <KeyboardTabIcon /></p></Link>
                </CenteredPage>
            )}

        </div>
    )
}
