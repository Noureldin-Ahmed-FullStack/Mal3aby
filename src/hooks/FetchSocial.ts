import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SocialPost } from '../types'
const BaseURL = import.meta.env.VITE_BASE_URL;
type FetchSocialPostsParams = {
    pageParam?: number; // Optional since it can be undefined
};
export const fetchSocialPosts = async ({ pageParam }: FetchSocialPostsParams) => {
    const response = await axios.get(BaseURL + "post/" + pageParam);
    return response.data;  // Assuming the response matches the SocialPostsResponse structure
};
export const fetchNewsPosts = async ({ pageParam }: FetchSocialPostsParams) => {
    const response = await axios.get(BaseURL + "news/" + pageParam);
    return response.data;  // Assuming the response matches the SocialPostsResponse structure
};
const sendPost = async (userID: string) => {
    try {
        const response = await axios.post(BaseURL + "post/" + userID);
        if (response) {
            return response.data as SocialPost[];
        }
        return []
    } catch (error) {
        console.error(error);
        return []
    }

};
export const useSocialPosts = () => {
    return useInfiniteQuery({
        queryKey: ['SocialPosts'],
        queryFn: fetchSocialPosts,
        getNextPageParam: (lastPage) => {
            return lastPage.page < lastPage.totalPages
                ? lastPage.page + 1
                : undefined;
        },
        initialPageParam: 1,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}
export const useNewsPosts = () => {
    return useInfiniteQuery({
        queryKey: ['newsPosts'],
        queryFn: fetchNewsPosts,
        getNextPageParam: (lastPage) => {
            return lastPage.page < lastPage.totalPages
                ? lastPage.page + 1
                : undefined;
        },
        initialPageParam: 1,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}
export const useSendPost = (userID: string) => {
    return useQuery({
        queryKey: ['SocialPosts', userID],
        queryFn: () => sendPost(userID),
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false, // Do not refetch on window focus
    });
};
