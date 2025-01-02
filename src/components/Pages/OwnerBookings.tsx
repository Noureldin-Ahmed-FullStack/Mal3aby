import { useUserContext } from '../../context/UserContext';
import { useOwnerBookings } from '../../hooks/FetchBookings'
import { NiceDiv } from '../ui/NiceDiv'
import LinkIcon from '@mui/icons-material/Link';
import { QRCodeSVG } from 'qrcode.react';
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md";
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';

export default function OwnerBookings() {
  const { userData } = useUserContext();
  const { data, isLoading, isFetching, isError } = useOwnerBookings(userData?._id)
  console.log(data);
  if (isLoading || isFetching || !userData) {
    return <LoadingPage />
  }
  if (isError) {
    return <ErrorPage />
  }

  return (
    <div className='maxWidth75vw mx-auto pt-7 text-zinc-800 dark:text-zinc-300'>
      <NiceDiv>
      <h1 className='text-center mb-3'>Manage Your bookings</h1>
        <div className='w-full grid gap-4 grid-cols-1 sm:grid-cols-2'>
          {data.map((bookingItem: any) => (
            <NiceDiv key={bookingItem._id}>
              <div className='flex justify-between'>
                <p>Field Name</p>
                <p>{bookingItem.fieldID.title}</p>
              </div>
              <div className='flex justify-between'>
                <p>Ticket</p>
                <div>
                  <a className='text-end text-inherit hover:text-inherit' href={`https://mal3aby.vercel.app/ticket/${bookingItem._id}`}>{bookingItem._id}<LinkIcon /></a>
                </div>
              </div>
              <div className='flex justify-between'>
                <div>
                  <p className='flex items-center'><MdOutlineCalendarMonth className='me-2' /> Date: {bookingItem.date}</p>
                  <p className='flex items-center'><IoTimeOutline className='me-2' />Time: {bookingItem.time}</p>
                  {bookingItem.scanned ? <p className='text-green-700'>Scanned</p> : <p className='text-red-700'>un-scanned</p>}
                  <div className='flex items-center justify-between'>
                    <a href={bookingItem.fieldID.location} target='_blank' className='flex mt-1 hover:text-zinc-200 cursor-pointer border-transparent border-2 hover:border-blue-900 rounded-lg p-1 bg-opacity-95 bg-zinc-900 text-zinc-100'><img src="https://ssniper.sirv.com/Mal3aby%20Project/google-maps.png" alt="location" /> <span className='ms-2'>Directions</span></a>
                  </div>

                </div>
                <div>
                  <a href={`https://mal3aby.vercel.app/ticket/${bookingItem._id}`}><QRCodeSVG className='mx-auto' value={`https://mal3aby.vercel.app/ticket/${bookingItem._id}`} size={100} bgColor="#ffffff" fgColor="#000000" /></a>
                </div>
              </div>
            </NiceDiv>
          ))}

        </div>
      </NiceDiv>
    </div>
  )

}
