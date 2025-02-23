import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const BaseURL = import.meta.env.VITE_BASE_URL;
export const fetchField = async (fieldType: string, title?: string, address?: string) => {
    if (fieldType != null || fieldType != undefined) {
        const response = await axios.get(BaseURL + "field" + fieldType + `?title=${title}&address=${address}`);
        return response.data;  // Assuming the response matches the FieldResponse structure
    } else {
        return []
    }

};
export const fetchFieldsOfUser = async (userID: string) => {
    if (userID != null || userID != undefined) {
        const response = await axios.get(BaseURL + "fieldsOfUser/" + userID);
        return response.data;  // Assuming the response matches the FieldResponse structure
    } else {
        return []
    }

};
export const fetchFavs = async (user_ID: string | undefined) => {
    if (user_ID != null || user_ID != undefined) {
        const response = await axios.get(BaseURL + "favourites/" + user_ID);
        return response.data;  // Assuming the response matches the FieldResponse structure
    } else {
        return []
    }

};

export const useFavs = (user_ID: string | undefined) => {
    return useQuery({
        queryKey: ['favourites/' + user_ID, user_ID],
        queryFn: () => fetchFavs(user_ID),
        enabled: !!user_ID,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}
const fetchFieldDetails = async (fieldID: string | undefined) => {
    if (fieldID != null || fieldID != undefined) {
        try {
            const response = await axios.get(BaseURL + "fieldDetails/" + fieldID);
            return response.data;
        } catch (error) {
            console.error(error);
            return "error"
        }
    } else {
        return null
    }


};
export const useField = (fieldType: string, title?: string | undefined, address?: string | undefined) => {
    return useQuery({
        queryKey: ['Field' + fieldType, fieldType],
        queryFn: () => fetchField(fieldType,title,address),
        enabled: !!fieldType,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}
export const useFieldOfUser = (userID: string) => {
    return useQuery({
        queryKey: ['FieldOfUser/' + userID, userID],
        queryFn: () => fetchFieldsOfUser(userID),
        enabled: !!userID,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}
export const useFieldDetails = (fieldID: string | undefined) => {
    return useQuery({
        queryKey: ['FieldDetails' + fieldID, fieldID],
        queryFn: () => fetchFieldDetails(fieldID),
        enabled: !!fieldID,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}