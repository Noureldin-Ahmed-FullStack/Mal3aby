import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const BaseURL = import.meta.env.VITE_BASE_URL;

const fetchUserCustTickets = async (userID: string | undefined) => {
    
    if (!userID) {
        return []
    }
    try {
        const response = await axios.get(BaseURL + "user-tickets/" + userID);
        return response.data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array on error
    }
}
export const useUserTickets = (userID: string | undefined) => {
    return useQuery({
        queryKey: ['user-tickets/' + userID],
        queryFn: () => fetchUserCustTickets(userID),
        enabled: !!userID,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        placeholderData: [], // Ensure data is never undefined
    });
}
const fetchAllCustTickets = async () => {
    try {
        const response = await axios.get(BaseURL + "tickets");
        return response.data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array on error
    }
}
export const useAllCustTickets = (userID: string | undefined) => {
    return useQuery({
        queryKey: ['customerService'],
        queryFn: () => fetchAllCustTickets(),
        enabled: !!userID,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        placeholderData: [], // Ensure data is never undefined
    });
}