import { useFetchAllUsers } from '../../hooks/FetchUsers'
import CenteredPage from '../CenteredPage'
import LoadingPage from './LoadingPage'
import { NiceDiv } from '../ui/NiceDiv'
import { IoTrash } from 'react-icons/io5'
import { Tooltip } from '@mui/material'
import { useState } from 'react'
import { ContentCopy, Refresh } from '@mui/icons-material'
import { useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export default function ManageAllUsersPage() {
    const BaseURL = import.meta.env.VITE_BASE_URL;
    const { data, isLoading, isError, isRefetching } = useFetchAllUsers()
    const [tooltipText, setTooltipText] = useState('Click to copy');
    const queryClient = useQueryClient();
    const handleRefresh = () => {
        console.log("refreshing");

        queryClient.refetchQueries({ queryKey: ['users'] });
    }
    const ClearUserWallet = async (userID: string | null) => {
        if (!userID) {
            return
        }
        console.log(userID);

        try {
            const response = await axios.put(BaseURL + "userWallet/" + userID);
            console.log(response);
            
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
            return
        }
        await queryClient.refetchQueries({ queryKey: ['users'] });
    }
    const handleCopy = (text: string | undefined) => {
        if (!text) {
            return
        }
        navigator.clipboard.writeText(text).then(() => {
            setTooltipText('Copied!');
            setTimeout(() => setTooltipText('Click to copy'), 1500); // Reset tooltip text after 1.5s
        });
    };
    if (isLoading) {
        return <LoadingPage />
    }
    if (isError) {
        return (
            <CenteredPage>an error has occured</CenteredPage>
        )
    }
    if (data) {
        return <div className='container mx-auto pt-28 text-zinc-800 dark:text-zinc-300'>
            <NiceDiv>
                <h1 className='text-center mb-3'>Manage All Users</h1>
                <div className="my-5 mb-5">
                    <p className='text-center mb-3'>remember to refresh before and after each transaction</p>
                    <button disabled={isLoading || isError || isRefetching} onClick={handleRefresh} className="flex p-3 text-zinc-300 rounded hover:text-zinc-200 justify-center items-center w-full bg-slate-700 hover:bg-slate-800 transition-all duration-100 ease-in"><Refresh sx={{ fontSize: "3rem" }} /> <p className="ms-3 text-2xl">{(isLoading || isError || isRefetching) ? "Pending" : "Refresh"}</p></button>
                </div>
                <div className='w-full grid gap-4 grid-cols-1 sm:grid-cols-2'>
                    {data.map((user: any) => (
                        <NiceDiv key={user._id}>
                            <div className='flex justify-between'>
                                <p>username</p>
                                <p className='capitalize font-bold'>{user.name}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Wallet</p>
                                <div>
                                    <p className='text-end text-inherit hover:text-inherit font-bold'>{user.wallet} Egp.</p>
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='w-full'>
                                    <div className='flex justify-between'>
                                        <p className=''>user iD:</p>
                                        <Tooltip title={tooltipText} arrow followCursor>
                                            <p onClick={() => handleCopy(user?._id)} className='mx-2 hover:text-blue-400 transition-all cursor-pointer break-all'>{user?._id}  <ContentCopy /></p>
                                        </Tooltip>
                                    </div>

                                    <div className='flex justify-between'>
                                        <p>Role</p>
                                        <div className='capitalize'>
                                            <p className={user.role != "user" ? 'text-green-700' : "text-red-700"}>{user.role}</p>
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-between'>
                                        <button disabled={isLoading || isError || isRefetching} onClick={() => ClearUserWallet(user?._id)} className='flex mt-1 cursor-pointer border-transparent border-2 hover:border-red-900 hover:text-red-900 rounded-lg p-1 bg-opacity-95 bg-red-100 dark:bg-red-700 border-red-400 hover:dark:border-red-950 dark:border-red-900 text-red-700 dark:text-red-100 hover:dark:text-red-950 w-full transition-all duration-400'><IoTrash size={30} /> <span className='ms-2 text-2xl'>Clear User wallet</span></button>
                                    </div>

                                </div>

                            </div>
                        </NiceDiv>
                    ))}

                </div>
            </NiceDiv>
        </div>
    }
}
