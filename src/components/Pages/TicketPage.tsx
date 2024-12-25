import { useParams } from 'react-router-dom';
import { useBookingDetails } from '../../hooks/FetchBookings';
import CenteredPage from '../CenteredPage';
import { GridLoader } from 'react-spinners';
import { useThemeStore } from '../../context/ThemeContext';
import {QRCodeSVG} from 'qrcode.react';

import { MdOutlineCalendarMonth, MdOutlineDoubleArrow } from "react-icons/md";

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
            {startTime} <div className='flex'><MdOutlineDoubleArrow /><MdOutlineDoubleArrow /><MdOutlineDoubleArrow /></div> {endTime}
        </div>
    );
};
export default function TicketPage(props: props) {
    const { ticketPropID } = props
    const { ticketID } = useParams();
    const ID = ticketPropID || ticketID
    console.log(ticketPropID, ticketID, ID);
    const url = `https://mal3aby.vercel.app/ticket/${ID}`

    const { theme } = useThemeStore();
    const { data, isLoading } = useBookingDetails(ID)
    if (!isLoading) {
        return (
            <div className='w-full'>
                <QRCodeSVG className='mx-auto' value={url} size={200} bgColor="#ffffff" fgColor="#000000" />
                <p className='text-center opacity-60 my-3'><a className='text-inherit hover:text-inherit' href={`https://mal3aby.vercel.app/ticket/${data._id}`}>Ticket No. : {data._id}</a></p>
                <div className='px-4 py-3 bg-blue-500 dark:bg-green-400 dark:bg-opacity-40 w-10/12 mx-auto rounded-2xl text-zinc-100 text-lg'>
                    <p className='flex items-center justify-center'><MdOutlineCalendarMonth className='me-3' />{data.date}</p>
                    <div className='flex'>
                        <TimeWithIcon timeString={data.time} />
                    </div>
                    <div className='flex items-center justify-between'>
                        <p>Location: </p>  <a href={data.location} target='_blank' className='flex hover:text-zinc-900 cursor-pointer border-transparent border-2 hover:border-blue-900 rounded-lg p-1 bg-opacity-95 bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100'><img src="https://ssniper.sirv.com/Mal3aby%20Project/google-maps.png" alt="location" /> <span className='ms-2 hidden sm:block'>Directions</span></a>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p>Ticket Price: </p>  <p>{data.price} Egp.</p>
                    </div>
                </div>

            </div>
        )
    } else {
        return (
            <CenteredPage>
                <h4 className="text-6xl mb-5 text-orange-700 dark:text-zinc-200 font-medium agu-display">
                    Loading
                </h4>
                <GridLoader size={25} color={theme === 'dark' ? 'white' : 'orange'} />
            </CenteredPage>
        )
    }
}
