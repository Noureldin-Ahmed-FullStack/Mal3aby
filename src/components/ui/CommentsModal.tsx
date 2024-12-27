import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';
import { IconButton, Slide } from '@mui/material';
import { SocialPost } from '../../types';
import { PlaceholdersAndVanishInput } from './placeholders-and-vanish-input';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { useUserContext } from '../../context/UserContext';
import ImageGallery from './ImageDisplay';
import axios, { AxiosError } from 'axios';
import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
const BaseURL = import.meta.env.VITE_BASE_URL;
const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
];
const handleChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    return
};

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
interface props {
    open: boolean; // The state itself
    handleClose: () => void;
    postData: SocialPost
}
export default function CommentsModal(props: props) {
    const { handleClose, open, postData } = props
    const { userData } = useUserContext()
    const queryClient = new QueryClient()
    const [PendingRequest, setPendingRequest] = React.useState(false);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const firstInputValue = (form.elements[0] as HTMLInputElement).value;
        console.log(firstInputValue);
        const body = {
            postId: postData._id,
            userID: userData?._id,
            commentText: firstInputValue
        }
        setPendingRequest(true)
        try {
            const response = await axios.post(BaseURL + 'comment', body)
            if (response) {
                console.log(response);

                queryClient.refetchQueries({ queryKey: ['SocialPosts'] });
            }
            setPendingRequest(false)
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
            setPendingRequest(false)

        }
    };
    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={"sm"}
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: 'rgba(25, 30, 39, 0.95)', // Change the background color
                        color: 'white', // Optional: Change text color for contrast
                    },
                }}
            >
                <DialogTitle sx={{ justifyContent: "space-between", display: 'flex' }}><p>Comments</p>
                    <IconButton onClick={handleClose} color='inherit' aria-label="close">
                        <CloseTwoToneIcon />
                    </IconButton></DialogTitle>
                <DialogContent className='CommentScreen'>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                        }}
                    >
                        <p className={"my-3 text-start whitespace-pre-wrap" + (postData.content && /[\u0600-\u06FF]/.test(postData.content) ? " text-end" : "")}>
                            {postData.content || ""}
                        </p>
                        {postData.Images && postData.Images?.length != 0 && <ImageGallery imageUrls={postData.Images} />}
                        <div className='text-center border-t-2 border-blue-200 border-opacity-25 mt-3 '>
                            Comments
                        </div>
                        <div className=''>
                            {postData.comments?.map((item, index) => (
                                <div className='flex justify-start my-2' key={index}>
                                    <img className='h-10 w-10 rounded-full' src={item.userID?.userPFP} alt="pfp" />
                                    <div className='bg-zinc-700 opacity-70 w-full ms-5 rounded-lg px-3 whitespace-pre-wrap'>{item.comment}</div>
                                </div>
                            ))}
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "start" }}>
                    <img className='h-10 w-10 rounded-full' src={userData?.userPFP} alt="pfp" />
                    <PlaceholdersAndVanishInput
                        placeholders={PendingRequest? ["sending comment"]: placeholders}
                        onChange={handleChange}
                        onSubmit={onSubmit}
                    />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
