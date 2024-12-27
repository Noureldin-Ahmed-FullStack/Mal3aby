import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const BaseURL = import.meta.env.VITE_BASE_URL;
export const fetchUsers = async () => {
    const response = await axios.get(BaseURL + "users")
    return response.data;
};
export const useFetchAllUsers = () => {
    return useQuery({
        queryKey: ['users',],
        queryFn: () => fetchUsers(),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}
