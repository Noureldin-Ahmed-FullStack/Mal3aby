import { useSearchParams } from 'react-router-dom';
import { NiceDiv } from '../ui/NiceDiv';
import CenteredPage from '../CenteredPage';
import TicketPage from './TicketPage';
// interface queryType {
//     id: string,
//     amount_cents: number,
//     success: boolean,
//     integration_id: string,
//     profile_id: string,
//     order: string,
//     created_at: string,
//     currency: string,
//     is_refund: boolean,
//     error_occured: boolean,
//     updated_at: string,
//     owner: string,
//     hmac: string
// data.message: string,

// }
export default function PaymentPage() {
    // Access query parameters
    const [searchParams] = useSearchParams();

    // Convert all query parameters to an object
    const queryParams = Object.fromEntries(searchParams.entries());
    if (queryParams.success == "true") {
        return (
            <div className='mt-7 w-11/12 mx-auto'>
                <NiceDiv className='px-0'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h1 className='text-center'>Payment Succesful!</h1>
                            <img className='w-8/12 mx-auto' src="https://ssniper.sirv.com/Mal3aby%20Project/Payment-success1.svg" alt="Payment Successful" />
                        </div>
                        <CenteredPage>
                            <TicketPage ticketPropID={queryParams.order} />
                        </CenteredPage>
                    </div>
                </NiceDiv>
            </div>
        );
    } else {
        return (
            <div className='mt-7 container mx-auto '>
                <NiceDiv>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <h1 className='text-center text-red-900'>Uh Oh! Payment Failed!</h1>
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

