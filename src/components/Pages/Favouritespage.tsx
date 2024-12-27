// import { useFavs } from "../../hooks/FetchFields";
import CenteredPage from "../CenteredPage";
import FieldItem from "../ui/FieldItem";
import FieldItemBox from "../ui/FieldItemBox";
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { Link } from "react-router-dom";
import { useUserFavsContext } from "../../context/UserContext";
import { response } from "../../types";
import LoadingPage from "./LoadingPage";
interface FavouritesPageProps {
    className?: string; // Optional className prop
}
export default function Favouritespage({ className }: FavouritesPageProps) {
    // const { userData } = useUserContext()
    const { favsList, favsLoading } = useUserFavsContext()
    // console.log(data?.items)
    if (favsLoading) {
        return (
            <LoadingPage />
        )
    }
    return (
        <div className={"flex mx-auto grow justify-center md:pt-4 maxWidth75vw " +className}>
            {favsList?.length != 0 ? (
                <>
                    <div className="static md:hidden">
                        {favsList?.map((item: response) => (
                            <FieldItem _id={item._id} key={item._id} type={item.type} address={item.address} className="my-2" Name={item.title} Icon={item.coverImage} location={item.location} price={item.price} />
                        ))}
                    </div>
                    <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {favsList?.map((item: response) => (
                            <FieldItemBox _id={item._id} key={item._id} type={item.type} address={item.address} className="my-2" Name={item.title} Icon={item.coverImage} location={item.location} price={item.price} />
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
