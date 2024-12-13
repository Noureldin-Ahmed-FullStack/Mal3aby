import Grid from '@mui/material/Grid2';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
interface props {
    Name: string,
    Icon: string,
    price: string,
    location: string,
    className?: string
}
export default function FieldItem(props:props) {
    const {Icon,Name,location,price , className} = props
    return (
        <Grid columns={10} container className={'relative bg-zinc-100 bg-opacity-50 dark:bg-opacity-30 dark:bg-black w-full text-black dark:text-slate-300 rounded-2xl py-5 px-4 md:px-6 dark:hover:shadow-2xl border dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] ' + className}>
            {/* <div className='absolute right-5'><FavoriteBorderIcon className="cursor-pointer"/></div> */}
            <Grid size={3} className="flex items-center"><img className='w-100 rounded-full aspect-square object-cover' src={Icon} alt={Name} /></Grid>
            <Grid size={6}>
                <div className='flex flex-col ps-3 h-full sm:text-lg'>
                    <p>Name: {Name}</p>
                    <p>location: {location}</p>
                    <p>{price} EGP per hour <LocalActivityIcon /></p>
                </div>
            </Grid>
            <Grid className="justify-end flex" size={1}><FavoriteBorderIcon className="cursor-pointer"/></Grid>
            <Grid size={10}><div className=' h-full flex items-center justify-end'><button className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold" >Details</button></div></Grid>
        </Grid>
    )
}
