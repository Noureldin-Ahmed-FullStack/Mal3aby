import { useParams } from 'react-router-dom';
import { useBookingDetails } from '../../hooks/FetchBookings';
import { QRCodeSVG } from 'qrcode.react';
import { IoTimeOutline } from "react-icons/io5";


import { MdOutlineCalendarMonth, MdOutlineDoubleArrow } from "react-icons/md";
import { useUserContext } from '../../context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingPage from './LoadingPage';

interface props {
    ticketPropID?: string
}
interface TimeWithIconProps {
    timeString: string; // The input string in the format "4 pm to 5 pm"
}

const TimeWithIcon: React.FC<TimeWithIconProps> = ({ timeString }) => {
    // Split the input string into parts
    const [startTime, endTime] = timeString.split("to");

    return (
        <div className="flex items-center gap-2 w-full justify-between">
            <div className='flex items-center'><IoTimeOutline />{startTime}</div> <div className='flex'><MdOutlineDoubleArrow /><MdOutlineDoubleArrow /><MdOutlineDoubleArrow /></div> <div className='flex items-center'><IoTimeOutline />{endTime}</div>
        </div>
    );
};
export default function TicketPage(props: props) {
    const BaseURL = import.meta.env.VITE_BASE_URL;
    const { userData } = useUserContext();
    const { ticketPropID } = props
    const { ticketID } = useParams();
    const ID = ticketPropID || ticketID
    console.log(ticketPropID, ticketID, ID);
    const url = `https://captain-masr.vercel.app/ticket/${ID}`


    const { data, isLoading } = useBookingDetails(ID)
    console.log(data);
    const setScanned = async () => {
        
        const body = {
            userID: data.userID._id,
            owner: data.owner,
        }
        try {
            const response = await axios.put(BaseURL + "booking/"+ID, body);
            console.log(response);
            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error("an error has occured", {
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
    if (!isLoading) {
        return (
            <div className='w-full'>
                <QRCodeSVG className='mx-auto' value={url} size={200} bgColor="#ffffff" fgColor="#000000" />
                <p className='text-center opacity-60 my-3'><a className='text-inherit hover:text-inherit' href={`https://captain-masr.vercel.app/ticket/${data._id}`}>Ticket No. : {data._id}</a></p>
                <div className='px-4 py-3 bg-blue-500 dark:bg-green-400 dark:bg-opacity-40 w-10/12 mx-auto rounded-2xl text-zinc-100 text-lg'>
                    <p className='flex items-center justify-center'><MdOutlineCalendarMonth className='me-3' />{data.date}</p>
                    <div className='flex'>
                        <TimeWithIcon timeString={data.time} />
                    </div>
                    <div className='flex items-center justify-between'>
                        <p>Location: </p>  <a href={data.fieldID.location} target='_blank' className='flex hover:text-zinc-900 cursor-pointer border-transparent border-2 hover:border-blue-900 rounded-lg p-1 bg-opacity-95 bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100'><img src="https://ssniper.sirv.com/Mal3aby%20Project/google-maps.png" alt="location" /> <span className='ms-2'>Directions</span></a>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p>Ticket Price: </p>  <p>{data.price} Egp.</p>
                    </div>
                </div>
                {data.owner == userData?._id && <div className='w-full flex justify-center'>
                    <button disabled={data.scanned} onClick={setScanned} className="w-72 mt-5 px-4 py-2 rounded-xl disabled:bg-green-700 disabled:opacity-40 bg-black dark:bg-white dark:text-black text-white text-xs font-bold">{data.scanned? "Scanned":"Confirm Scan"}</button>
                </div>}
            </div>
        )
    } else {
        return (
           <LoadingPage />
        )
    }
}
