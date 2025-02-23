import LinkIcon from '@mui/icons-material/Link';
import { QRCodeSVG } from 'qrcode.react';
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth, MdOutlinePaid } from "react-icons/md";
import { NiceDiv } from './NiceDiv'
import { Button } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { response, userType } from '../../types';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
interface props {
    _id: string
    owner: string
    userID: userType
    title: string
    date: string
    time: string
    status: string
    location: string
    scanned: boolean
    clientPhone: string
    fieldID: response
    userObj: userType
}
export default function BookingTicketInterface(props: props) {
    console.log(props);

    const queryClient = useQueryClient();
    const [PendingRequest, setPendingRequest] = useState(false);
    const BaseURL = import.meta.env.VITE_BASE_URL;
    const cancelBooking = async (id: string) => {
        setPendingRequest(true)
        try {
            const response = await axios.put(BaseURL + 'cancelBooking/' + id + '/' + props.userObj?._id)
            await queryClient.refetchQueries({ queryKey: ['bookingOfAdmin' + props.userObj?._id] });
            await queryClient.refetchQueries({ queryKey: ['bookingOfUser' + props.userObj?._id] });
            console.log(response.data);

            setPendingRequest(false)
        } catch (error) {
            const axiosError = error as AxiosError;
            toast.error(axiosError.response?.data as string, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setPendingRequest(false)

        }
    }
    return (
        <NiceDiv key={props._id}>
            <div className='flex justify-between'>
                <p>Field Name</p>
                <p>{props.fieldID?.title}</p>
            </div>
            <div className='flex justify-between'>
                <p>Ticket</p>
                <div>
                    <a className='text-end text-inherit hover:text-inherit' href={`https://captain-masr.vercel.app/ticket/${props?._id}`}>{props?._id}<LinkIcon /></a>
                </div>
            </div>
            <div className='flex justify-between'>
                <div>
                    <p className='flex items-center'><MdOutlineCalendarMonth className='me-2' /> Date: {props?.date}</p>
                    <p className='flex items-center'><IoTimeOutline className='me-2' />Time: {props?.time}</p>
                    <p className='flex items-center'><IoTimeOutline className='me-2' />Cleint's phone: {props?.clientPhone}</p>
                    <p className='flex items-center'><IoTimeOutline className='me-2' />Owner's phone: {props.fieldID?.ownerPhone}</p>
                    {props.scanned ? <p className='text-green-700'>Scanned</p> : <p className='text-red-700'>un-scanned</p>}

                    <p className={`flex items-center text-green-700 ` + (props.status == "cancelled" && "text-red-700")}><MdOutlinePaid className='me-2' />status: {props.status}</p>
                    <div className='flex items-center justify-between'>
                        <a href={props.location} target='_blank' className='flex mt-1 hover:text-zinc-200 cursor-pointer border-transparent border-2 hover:border-blue-900 rounded-lg p-1 bg-opacity-95 bg-zinc-900 text-zinc-100'><img src="https://ssniper.sirv.com/Mal3aby%20Project/google-maps.png" alt="location" /> <span className='ms-2'>Directions</span></a>
                    </div>


                </div>
                <div>
                    <a href={`https://captain-masr.vercel.app/ticket/${props._id}`}><QRCodeSVG className='mx-auto' value={`https://captain-masr.vercel.app/ticket/${props._id}`} size={100} bgColor="#ffffff" fgColor="#000000" /></a>
                </div>

            </div>
            {((props.userObj.role == "admin" || props.userObj._id == props.userID._id) && props.status != 'cancelled') && <div className='mt-2'>
                <Button onClick={() => cancelBooking(props._id)} variant="outlined" color="error" fullWidth disabled={PendingRequest}>
                    Cancel This booking
                </Button>
            </div>}
        </NiceDiv>
    )
}
