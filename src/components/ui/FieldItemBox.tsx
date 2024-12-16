import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from "@mui/material";
import { useUserContext, useUserFavsContext } from "../../context/UserContext";
const BaseURL = import.meta.env.VITE_BASE_URL;
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
interface props {
    _id: string,
    Name: string,
    type: string,
    Icon: string,
    price: string,
    location: string,
    address?: string,
    className?: string
}
export default function FieldItemBox(props: props) {
    const { Icon, Name, location, price, className, _id, type, address } = props
    const { userData } = useUserContext();
    const { favsList } = useUserFavsContext();
    const { currentPath } = useAppContext()
    const queryClient = useQueryClient();
    const favContains = (itemID: string) => {
        const item = favsList.find(item => item._id === itemID);
        if (item) {
            return true
        } else {
            return false
        }
    }
    const addFav = async (user_ID: string | undefined, Item_ID: string) => {
        if (user_ID != null || user_ID != undefined) {
            const res = await axios.put(BaseURL + "addFav/" + user_ID, { itemID: Item_ID });
            console.log(res);
            return queryClient.refetchQueries({ queryKey: ['favourites/' + user_ID] });
        } else {
            toast.error("Sign in first!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const removeFav = async (user_ID: string | undefined, Item_ID: string) => {
        if (user_ID != null || user_ID != undefined) {
            const res = await axios.put(BaseURL + "removeFav/" + user_ID, { itemID: Item_ID });
            console.log(res);
            return queryClient.refetchQueries({ queryKey: ['favourites/' + user_ID] });
        } else {
            toast.error("Sign in first!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    return (
        <CardContainer className={"w-full " + className}>
            <CardBody className="transition-all ease-in bg-zinc-100 bg-opacity-50 dark:bg-opacity-30 dark:bg-black relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] sm:w-[30rem] h-auto rounded-xl p-6 border ">
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white flex justify-between w-full"
                >
                    {Name}
                    {favContains(_id) ? <IconButton onClick={() => removeFav(userData?._id, _id)} className='!text-red-700 dark:!text-inherit' sx={{ marginRight: "-10px" }} aria-label="add to Favourites"><FavoriteIcon className="cursor-pointer" /></IconButton> : <IconButton onClick={() => addFav(userData?._id, _id)} sx={{ marginRight: "-10px" }} aria-label="add to Favourites"><FavoriteBorderIcon className="cursor-pointer" /></IconButton>}
                </CardItem>
                <CardItem
                    as="div"
                    translateZ="60"
                    className="flex w-full justify-between text-neutral-500 text-sm mt-2 dark:text-neutral-300"
                >
                    <div><a href={location} target="_blank">{address}<LocationOnIcon /></a></div>
                    <div>{price} EGP per hour <LocalActivityIcon /></div>
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                    <img
                        src={Icon}
                        // height="1000"
                        // width="1000"
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                    />
                </CardItem>
                <div className="flex justify-between items-center mt-4">
                    <div>{currentPath == "/favourites" ? <Link className='dark:text-zinc-200' to={'/' + type}>browse more {type}</Link> : <div></div>}</div>
                    <CardItem
                        translateZ={20}
                        as={Link}
                        to={"/field/" + _id}
                        className="px-4 py-2 rounded-xl hover:text-inherit bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                        Details
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    )
}
