import { useUserContext } from "../../context/UserContext";
import { useUserTickets } from "../../hooks/FetchCustService"
import CenteredPage from "../CenteredPage";
import { NiceDiv } from "../ui/NiceDiv";
import LoadingPage from "./LoadingPage";
import { IoTimeOutline } from "react-icons/io5";
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AddTicketButton from "./AddTicketButton";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export default function CustomerServicePage() {

    const queryClient = useQueryClient();
    const BaseURL = import.meta.env.VITE_BASE_URL;
    const { userData } = useUserContext();
    const { data, isLoading, isError } = useUserTickets(userData?._id)
    console.log({ data, isLoading, isError });
    const closeTicket = async (id: string) => {
        try {
            const res = await axios.put(BaseURL + "tickets/" + id)
            console.log(res);
            queryClient.refetchQueries({ queryKey: ['user-tickets/'+userData?._id] });
        } catch (error) {
            console.log(error);
            toast.error("Error occoured closing ticket", {
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
    const deleteTicket = async (id: string) => {
        try {
            const res = await axios.delete(BaseURL + "tickets/" + id)
            queryClient.refetchQueries({ queryKey: ['user-tickets/'+userData?._id] });
            console.log(res);
        } catch (error) {
            console.log(error);
            toast.error("Error occoured deleting ticket", {
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
    if (isError) {
        return (
            <CenteredPage>error</CenteredPage>
        )
    }
    if (isLoading) {
        return (
            <LoadingPage />
        )
    }
    if (data) {
        return (
            <NiceDiv>
                <h1 className='text-center'>Manage All Tickets</h1>
                <div className="my-3">
                    <AddTicketButton />
                </div>
                {data.length != 0 ? (
                    <div className='w-full grid gap-4 grid-cols-1 sm:grid-cols-2'>
                        {data.map((ticketItem?: any) => (
                            <NiceDiv key={ticketItem?._id}>
                                <div className='flex justify-between'>
                                    <p>Issue Title</p>
                                    <p>{ticketItem?.title}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Ticket</p>
                                    <div>
                                        <p className='text-end text-inherit hover:text-inherit'>{ticketItem?._id}</p>
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <p>phone number</p>
                                    <div>
                                        <p className='text-end text-inherit hover:text-inherit'>{ticketItem?.phone}</p>
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Client Name</p>
                                    <div>
                                        <p className='text-end text-inherit hover:text-inherit'>{ticketItem?.createdBy.name}</p>
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <div>
                                        <div className='flex items-start'>Problem: <p className="ms-2 whitespace-pre-wrap">{ticketItem?.content}</p></div>
                                        <p className='flex items-center mt-5'><IoTimeOutline className='me-2' />Created At: {ticketItem?.createdAt}</p>
                                        <div className="flex"><p className="me-2">status: </p>{ticketItem?.closed ? <p className='text-green-700'>Closed</p> : <p className='text-red-700'>pending</p>}</div>

                                    </div>

                                </div>
                                <div className="mt-2">
                                    {(userData?._id == ticketItem?.createdBy._id || userData?.role == "admin") && < Button onClick={()=>deleteTicket(ticketItem?._id)} className="!me-3" variant="outlined" color="error"><DeleteIcon /> Delete</Button>}
                                    {userData?.role == "admin" && <Button onClick={()=>closeTicket(ticketItem?._id)} variant="outlined" color="secondary"><LibraryAddCheckIcon /> close ticket</Button>}
                                </div>
                            </NiceDiv>
                        ))}

                    </div>
                ) : (
                    <CenteredPage className="h-80">
                        <h4 className="text-6xl mb-5 text-center text-orange-700 dark:text-zinc-200 font-medium agu-display">You have no Tickets</h4>
                    </CenteredPage>
                )
                }
            </NiceDiv >
        )
    }

}
