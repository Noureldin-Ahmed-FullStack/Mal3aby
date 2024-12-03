import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { useCallback, useState } from "react";
import { SocialPost } from "../../types";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Meteors } from "./meteors";
import { Button, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import CommentsModal from './CommentsModal';
import { useUserContext } from '../../context/UserContext';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ImageGallery from './ImageDisplay';
import CustomDialog from './ModalWithChildren';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

export function SinglePost(props: SocialPost) {
  const { userData } = useUserContext()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [SelectedPost, setSelectedPost] = useState<SocialPost>({});
  const BaseURL = import.meta.env.VITE_BASE_URL;
  function formatDateTime(timestamp: string | undefined) {
    if (!timestamp) {
      return
    }
    const date = new Date(timestamp);
    const now = new Date();

    const diffInMs = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);

    // If the time difference is less than a week, show relative time
    if (diffInWeeks < 1) {
      if (diffInMinutes < 1) return "just now";
      if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
      if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }

    // If it's more than a week old, return the date in the format "DD-MM-YYYY"
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const handleOpenDialog = () => {
    setAnchorEl(null)
    setIsDialogOpen(true)
  };
  const handleCloseDialog = () => {
    setAnchorEl(null)
    setIsDialogOpen(false)
  };

  const handleConfirmAction = async (postID: string | undefined) => {
    // Perform your confirm action here
    if (!postID) {
      console.log("something went wrong with postID");
      handleCloseDialog();
      return
    }
    console.log('Confirmed!', postID);

    try {
      const response = await axios.delete(BaseURL + "post/" + postID);
      queryClient.refetchQueries({ queryKey: ['SocialPosts'] });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    handleCloseDialog();
  };

  const [CommentOpen, setCommentOpen] = useState(false);

  const handleClickCommentOpen = (item: SocialPost) => {
    setSelectedPost(item)
    setCommentOpen(true);
  };

  const handleCommentClose = () => {
    setCommentOpen(false);
  };
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, postID: string | undefined) => {
      setAnchorEl(event.currentTarget);
      console.log(postID);
    },
    []
  );
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const menuOpen = Boolean(anchorEl);
  return (
    <div className="">
      <Menu
        id="basic-menu"
        open={menuOpen}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        disableScrollLock // Add this line
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          className: 'bg-zinc-800 text-white',
        }}
      >
        <MenuItem className="!flex !justify-start hover:!bg-zinc-700" onClick={handleCloseMenu}>
          <EditIcon color="info" /> <p className="ps-2">Edit</p>
        </MenuItem>
        <Divider sx={{ borderBottomWidth: 1, opacity: '0.2', bgcolor: 'white' }} />
        <MenuItem className="!flex !justify-start hover:!bg-zinc-700" onClick={handleOpenDialog}>
          <DeleteIcon color="error" /> <p className="ps-2">Delete</p>
        </MenuItem>
      </Menu>
      <CustomDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={() => handleConfirmAction(props._id)}
        title="Delete post"
        confirmColor='error'
        confirmText="Delete"
        cancelText="cancel"
      >
        <p>Are you sure you want to Delete this post?</p>
      </CustomDialog>
      <CommentsModal postData={SelectedPost} open={CommentOpen} handleClose={handleCommentClose} />
      <div className=" w-full relative maxWidth80vw">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] rounded-full blur-3xl" />
        <div className="relative shadow-xl myLightPost dark:bg-gray-900 border border-gray-800 dark:text-gray-300 text-slate-700 pb-0 p-4 pt-4 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <div className="flex justify-between mb-2 w-full">
            <div className='flex'>
              <img className="me-2 w-12 h-12 rounded-full" src={props.createdBy?.userPFP} alt="PFP" />
              <div>
                <a href="/" className="ProfileLink">{props.createdBy?.name.toLocaleUpperCase()}</a>
                <p>{props.createdBy?.role.toLocaleUpperCase()} · <span className='text-xs'>{formatDateTime(props.createdAt)}</span></p>
              </div>
            </div>
            <div>
              <div className='flex items-start'>{userData?._id == props.createdBy?._id && <div>
                <IconButton
                  id="basic-button"
                  sx={{ color: 'inherit' }}
                  onClick={(event) => handleClick(event, props?._id)}
                >
                  <MoreVertIcon />
                </IconButton>
              </div>}
              </div>
            </div>
          </div>
          <p className={"font-normal w-full text-base whitespace-pre-line text-slate-500 mb-4 relative z-10" + (props.content && /[\u0600-\u06FF]/.test(props.content) ? " text-end" : "")}>
            {/* I don&apos;t know what to write so I&apos;ll just paste something
            cool here. One more sentence because lorem ipsum is just
            unacceptable. Won&apos;t ChatGPT the shit out of this. */}
            {props.content}
          </p>

          {props.Images && <ImageGallery imageUrls={props.Images} />}
          {/* <button className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
              Explore
            </button> */}
          {/* Meaty part - Meteor effect */}
          <div className="bg-slate-500 h-px mt-3 opacity-50 w-full"></div>
          <div className="text-center w-full">
            <Button onClick={() => handleClickCommentOpen(props)} startIcon={<ModeCommentOutlinedIcon />} variant="text">View Comments</Button>
          </div>
          <Meteors number={10} />
        </div>
      </div>
    </div>
  );
}
