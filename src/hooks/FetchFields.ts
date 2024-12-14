import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const BaseURL = import.meta.env.VITE_BASE_URL;
export const fetchField = async (fieldType: string) => {
    if (fieldType != null || fieldType != undefined) {
        const response = await axios.get(BaseURL + "field" + fieldType);
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
// const fetchFieldDetails = async (FieldId: string) => {
//     try {
//         const response = await axios.get(`${BaseURL}lookup.php?i=${FieldId}`);
//         console.log(response.data);

//         return response.data;
//     } catch (error) {
//         console.error(error);
//         return null
//     }

// };
export const useField = (fieldType: string) => {
    return useQuery({
        queryKey: ['Field' + fieldType, fieldType],
        queryFn: () => fetchField(fieldType),
        enabled: !!fieldType,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}
// export const useSocialPostDetails = (SocialPostId: string) => {
//     return useQuery({
//         queryKey: ['SocialPostDetails', SocialPostId],
//         queryFn: () => fetchSocialPostDetails(SocialPostId),
//         staleTime: 5 * 60 * 1000,
//         refetchOnWindowFocus: false,
//     });
// };