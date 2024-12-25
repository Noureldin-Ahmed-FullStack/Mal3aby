import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const BaseURL = import.meta.env.VITE_BASE_URL;
export const fetchAvailability = async (fieldID: string | undefined, date: string | undefined) => {
    if (!fieldID || !date) throw new Error('Field type and ID are required');
    const response = await axios.get(BaseURL + "availability", {
        params: { fieldID, date },
    });
    return response.data;
};
export const useAvailability = (fieldID: string | undefined,date: string | undefined) => {
    return useQuery({
        queryKey: ['availability' , fieldID, date],
        queryFn: () => fetchAvailability(fieldID, date),
        enabled: !!fieldID && !!date,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}


const fetchBookingDetails = async (bookID: string | undefined) => {
    if (bookID != null || bookID != undefined) {
        try {
            const response = await axios.get(BaseURL + "bookingDetails/" + bookID);
            return response.data;
        } catch (error) {
            console.error(error);
            return "error"
        }
    } else {
        return null
    }


};
export const useBookingDetails = (bookID: string | undefined) => {
    return useQuery({
        queryKey: ['bookingDetails' + bookID, bookID],
        queryFn: () => fetchBookingDetails(bookID),
        enabled: !!bookID,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}