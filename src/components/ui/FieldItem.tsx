import Grid from '@mui/material/Grid2';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { useUserContext, useUserFavsContext } from "../../context/UserContext";
const BaseURL = import.meta.env.VITE_BASE_URL;
import axios from 'axios';
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
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
    const { currentPath } = useAppContext()
    const { favsList } = useUserFavsContext();
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
        <Grid columns={10} container className={'relative transition-all ease-in bg-zinc-100 bg-opacity-50 dark:bg-opacity-30 dark:bg-black w-full text-black dark:text-slate-300 rounded-2xl py-3 px-4 md:px-6 shadow-lg hover:shadow-2xl border dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] ' + className}>
            {/* <div className='absolute right-5'><FavoriteBorderIcon className="cursor-pointer"/></div> */}
            <Grid size={3} className="flex items-center"><img className='w-100 rounded aspect-square object-cover' src={Icon} alt={Name} /></Grid>
            <Grid size={6}>
                <div className='flex flex-col ps-3 h-full sm:text-lg'>
                    <p>Name: {Name}</p>
                    <p><a href={location} target="_blank">{address}<LocationOnIcon /></a></p>
                    <p>{price} EGP per hour <LocalActivityIcon /></p>
                </div>
            </Grid>
            <Grid className="justify-end flex" size={1}><div>{favContains(_id) ? <IconButton className='!text-red-700 dark:!text-inherit' onClick={() => removeFav(userData?._id, _id)} sx={{ marginRight: "-10px" }} aria-label="add to Favourites"><FavoriteIcon className="cursor-pointer" /></IconButton> : <IconButton onClick={() => addFav(userData?._id, _id)} sx={{ marginRight: "-10px" }} aria-label="add to Favourites"><FavoriteBorderIcon className="cursor-pointer" /></IconButton>}</div></Grid>
            <Grid size={10}><div className='mt-1 h-full flex items-center justify-between'>{currentPath == "/favourites" ? <Link className='dark:text-zinc-200' to={'/' + type}>browse more {type}</Link> : <div></div>}<Link to={"/field/"+ _id} className="px-4 py-2 hover:text-zinc-300 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold" >Details</Link></div></Grid>
        </Grid>
    )
}
