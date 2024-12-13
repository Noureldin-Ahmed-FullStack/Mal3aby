import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
interface props {
    Name: string,
    Icon: string,
    price: string,
    location: string,
    className?: string
}
export default function FieldItemBox(props: props) {
    const { Icon, Name, location, price, className } = props
   
    return (
        <CardContainer className={"w-full " + className}>
            <CardBody className="bg-zinc-100 bg-opacity-50 dark:bg-opacity-30 dark:bg-black relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] sm:w-[30rem] h-auto rounded-xl p-6 border ">
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white flex justify-between w-full"
                >
                    {Name}
                    <div><FavoriteBorderIcon className="cursor-pointer" /></div>
                </CardItem>
                <CardItem
                    as="div"
                    translateZ="60"
                    className="flex w-full justify-between text-neutral-500 text-sm mt-2 dark:text-neutral-300"
                >
                    <div>{location}</div>
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
                    <div></div>
                    <CardItem
                        translateZ={20}
                        as="button"
                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                        Details
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    )
}
