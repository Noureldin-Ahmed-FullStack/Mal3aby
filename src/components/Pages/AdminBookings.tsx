import { useUserContext } from '../../context/UserContext';
import { useAdminBookings } from '../../hooks/FetchBookings'
import { NiceDiv } from '../ui/NiceDiv'
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';
import BookingTicketInterface from '../ui/BookingTicketInterface';

export default function AdminBookings() {
  const { userData } = useUserContext();
  const { data, isLoading, isFetching, isError } = useAdminBookings(userData?._id)
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
        <h1 className='text-center mb-3'>Manage All bookings</h1>
        <div className='w-full grid gap-4 grid-cols-1 sm:grid-cols-2'>
          {data.map((bookingItem: any) => (
            <BookingTicketInterface key={bookingItem._id} {...bookingItem} userObj={userData}/>

          ))}

        </div>
      </NiceDiv>
    </div>
  )

}
