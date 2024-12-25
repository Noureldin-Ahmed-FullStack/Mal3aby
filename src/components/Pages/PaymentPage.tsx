import { useSearchParams } from 'react-router-dom';
import { NiceDiv } from '../ui/NiceDiv';
import { useBookingDetails } from '../../hooks/FetchBookings';
import CenteredPage from '../CenteredPage';
import { GridLoader } from 'react-spinners';
import { useThemeStore } from '../../context/ThemeContext';
import TicketPage from './TicketPage';
interface queryType {
    id: string,
    amount_cents: number,
    success: boolean,
    integration_id: string,
    profile_id: string,
    order: string,
    created_at: string,
    currency: string,
    is_refund: boolean,
    error_occured: boolean,
    updated_at: string,
    owner: string,
    hmac: string
    // data.message: string,

}
export default function PaymentPage() {
    // Access query parameters
    const [searchParams] = useSearchParams();
    const { theme } = useThemeStore();

    // Convert all query parameters to an object
    const queryParams = Object.fromEntries(searchParams.entries());
    if (queryParams.success == "true") {
        const { data, isLoading } = useBookingDetails(queryParams.order)
        return (
            <div className='mt-28 w-11/12 mx-auto'>
                <NiceDiv className='px-0'>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <h1 className='text-center'>Payment Succesful!</h1>
                            <img className='w-8/12 mx-auto' src="https://ssniper.sirv.com/Mal3aby%20Project/Payment-success1.svg" alt="Payment Successful" />
                        </div>
                        <CenteredPage>
                            {isLoading ? (
                                <h4 className="text-6xl mb-5 text-orange-700 dark:text-zinc-200 font-medium agu-display">
                                    Loading
                                    <GridLoader size={25} color={theme === 'dark' ? 'white' : 'orange'} />
                                </h4>
                            ) : (
                                <TicketPage ticketPropID={queryParams.order}/>
                            )}
                        </CenteredPage>
                    </div>
                </NiceDiv>
            </div>
        );
    } else {
        return (
            <div className='mt-28 container mx-auto '>
                <NiceDiv>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <h1 className='text-center'>Uh Oh! Payment Failed!</h1>
                            <img className='w-8/12 mx-auto' src="https://ssniper.sirv.com/Mal3aby%20Project/Failed-Payment-color-800px.png" alt="Payment Failed" />
                        </div>
                        <div>
                            <h1>Query Parameters</h1>
                            <pre>{JSON.stringify(queryParams, null, 2)}</pre>
                        </div>
                    </div>
                </NiceDiv>
            </div>
        );
    }

};

