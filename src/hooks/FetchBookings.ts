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
export const useAvailability = (fieldID: string | undefined, date: string | undefined) => {
    return useQuery({
        queryKey: ['availability', fieldID, date],
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
const fetchUserBookings = async (userID: string | undefined) => {
    
    if (!userID) {
        return []
    }
    try {
        const response = await axios.get(BaseURL + "bookingOfUser/" + userID);
        return response.data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array on error
    }
}
export const useUserBookings = (userID: string | undefined) => {
    return useQuery({
        queryKey: ['bookingOfUser' + userID],
        queryFn: () => fetchUserBookings(userID),
        enabled: !!userID,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        placeholderData: [], // Ensure data is never undefined
    });
}
const fetchOwnerBookings = async (userID: string | undefined) => {
    if (!userID) {
        return []
    }
    try {
        const response = await axios.get(BaseURL + "bookingOfOwner/" + userID);
        return response.data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array on error
    }
}
export const useOwnerBookings = (userID: string | undefined) => {
    return useQuery({
        queryKey: ['bookingOfOwner' + userID, userID],
        queryFn: () => fetchOwnerBookings(userID),
        enabled: !!userID,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        placeholderData: [], // Ensure data is never undefined
    });
}
const fetchAdminBookings = async (userID: string | undefined) => {
    if (!userID) {
        return []
    }
    try {
        const response = await axios.get(BaseURL + "bookingOfAdmin/" + userID);
        return response.data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array on error
    }
}
export const useAdminBookings = (userID: string | undefined) => {
    return useQuery({
        queryKey: ['bookingOfAdmin' + userID, userID],
        queryFn: () => fetchAdminBookings(userID),
        enabled: !!userID,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        placeholderData: [], // Ensure data is never undefined
    });
}